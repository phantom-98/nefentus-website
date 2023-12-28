import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import {
  contractDeposits,
  providerURL,
  blockchainToWrapped,
  blockchainToUSDC,
  blockchainToFactoryAddress,
} from "../constants";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import IUniswapV3FactoryABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import ERC20_ABI from "../assets/abi/ERC20_ABI.json";
import { zeroAddressToNull, toChecksumAddress, findCurrency } from "../utils";

const POOL_FEES = "500";

const provider = (providerURL) => {
  return new ethers.providers.JsonRpcProvider(providerURL);
};

export class uniswapApi {
  /**
   * Determine the price of the two tokens in the pool
   * See https://blog.uniswap.org/uniswap-v3-math-primer
   * @param {*} sqrtPriceX96 The sqrtPriceX96 of the pool
   * @param {*} Decimal0 The decimal of token0
   * @param {*} Decimal1 The decimal of token1
   * @returns The price of one token0 in token1
   */
  calculatePoolPrice(
    sqrtPriceX96,
    tokenAddress0,
    tokenAddress1,
    Decimal0,
    Decimal1,
  ) {
    let buyOneOfToken0 = (sqrtPriceX96 / 2 ** 96) ** 2;

    if (parseInt(tokenAddress0) < parseInt(tokenAddress1)) {
      console.log("Case 1: ", tokenAddress0, tokenAddress1);
      buyOneOfToken0 = buyOneOfToken0 * 10 ** (Decimal0 - Decimal1);
      return buyOneOfToken0;
    } else {
      console.log("Case 2: ", tokenAddress0, tokenAddress1);
      buyOneOfToken0 = buyOneOfToken0 / 10 ** (Decimal0 - Decimal1);
      return 1 / buyOneOfToken0;
    }
  }

  /**
   * Get the number of decimals of a token
   * @param {*} tokenAddress The token address
   * @returns Number of decimals
   */
  async getDecimals(tokenAddress, blockchain) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider(providerURL(blockchain)),
    );
    const digits = await tokenContract.decimals();
    return digits;
  }

  /**
   * Get the price of a token in USDC
   * @param {*} tokenAddress The token address
   * @param {*} blockchain The blockchain
   * @param {*} decimalsToken0 The decimals of token0
   * @param {*} decimalsToken1 The decimals of token1
   * @returns The price of the token in USDC
   */
  async getUSDCPriceForToken(
    tokenAddress,
    blockchain,
    decimalsToken0 = null,
    decimalsToken1 = null,
  ) {
    // Check input
    if (tokenAddress === null)
      tokenAddress = blockchainToWrapped(blockchain).address;
    const stablecoinAddress = blockchainToUSDC(blockchain).address;
    if (tokenAddress.toLowerCase() === stablecoinAddress.toLowerCase()) {
      return 1;
    }
    console.log("tokenAddress: ", tokenAddress);
    console.log("stablecoinAddress: ", stablecoinAddress);
    console.log("blockchain: ", blockchain);

    // Get pool contract
    const factoryContract = new ethers.Contract(
      blockchainToFactoryAddress(blockchain),
      IUniswapV3FactoryABI.abi,
      provider(providerURL(blockchain)),
    );
    const poolAddress = await factoryContract.getPool(
      tokenAddress,
      stablecoinAddress,
      POOL_FEES,
    );
    console.log("poolAddress: ", poolAddress);
    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3PoolABI.abi,
      provider(providerURL(blockchain)),
    );

    // Get pool price
    const slot0 = await poolContract.slot0();
    const sqrtPriceX96 = slot0.sqrtPriceX96.toString();

    if (decimalsToken0 === null || decimalsToken1 === null) {
      [decimalsToken0, decimalsToken1] = await Promise.all([
        this.getDecimals(tokenAddress, blockchain),
        this.getDecimals(stablecoinAddress, blockchain),
      ]);
    }

    console.log("sqrtPriceX96: ", sqrtPriceX96);

    const price = this.calculatePoolPrice(
      sqrtPriceX96,
      tokenAddress,
      stablecoinAddress,
      decimalsToken0,
      decimalsToken1,
    );
    return price;
  }
}

export class web3Api {
  async getBalanceNative(walletAddress, blockchain) {
    const balance = await provider(providerURL(blockchain)).getBalance(
      walletAddress,
    );
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log("balanceInEth: ", balanceInEth);
    return balanceInEth;
  }

  async getBalanceToken(tokenAddress, walletAddress, blockchain) {
    if (!tokenAddress)
      return await this.getBalanceNative(walletAddress, blockchain);

    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider(providerURL(blockchain)),
    );
    const [digits, balanceWei] = await Promise.all([
      tokenContract.decimals(),
      tokenContract.balanceOf(walletAddress),
    ]);

    const balance = ethers.utils.formatUnits(balanceWei, digits);
    return balance;
  }

  /* Send cryptocurrency (native token or token) */

  async send(tokenAddress, blockchain, amount, toAddress) {
    if (!tokenAddress)
      return await this.sendNative(blockchain, amount, toAddress);
    else
      return await this.sendToken(tokenAddress, blockchain, amount, toAddress);
  }

  async sendNative(blockchain, amount, toAddress) {
    const signer = providerURL(blockchain).getSigner();
    const transaction = {
      to: toAddress,
      value: ethers.utils.parseEther(amount),
    };
    const txRequest = await signer.sendTransaction(transaction);
    const txReceipt = await txRequest.wait();
    return txReceipt;
  }

  async sendToken(tokenAddress, blockchain, amount, toAddress) {
    const signer = providerURL(blockchain).getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const decimals = await tokenContract.decimals();
    const txRequest = await tokenContract.transfer(
      toAddress,
      ethers.utils.parseUnits(amount, decimals),
    );
    const txReceipt = await txRequest.wait();
    return txReceipt;
  }

  /* Call deposit smart contract */

  async callDepositContract(
    sellerAddress,
    affiliateAddress,
    brokerAddress,
    seniorBrokerAddress,
    leaderAddress,
    currency,
    stablecoinAddress,
    price,
    serviceFee,
    feeFree,
  ) {
    const currencyAddress = currency["address"];
    const blockchain = currency["blockchain"];

    // Get min amount out
    const uniswap = new uniswapApi();
    const decimalsIn = findCurrency(currencies(), currencyAddress)["decimals"];
    const stablecoinDecimals = await uniswap.getDecimals(stablecoinAddress);
    const priceConvert = await uniswap.getUSDCPriceForToken(
      currencyAddress,
      blockchain,
      decimalsIn,
      stablecoinDecimals,
    );
    // Amount in token
    const amountIn = price / priceConvert;
    const amountInInt = Math.ceil(amountIn * 10 ** decimalsIn);
    // Amount in USD stablecoin
    const minAmountOut = price * 0.99 * 10 ** stablecoinDecimals;

    // Deposit contract
    const contractInfo = contractDeposits(blockchain);
    const signer = provider(providerURL(blockchain)).getSigner();
    const contract = new ethers.Contract(
      contractInfo.address,
      contractInfo.abi,
      signer,
    );

    const timestampSent = Date.now();
    let txRequest;
    if (currencyAddress === null) {
      txRequest = await contract.deposit(
        sellerAddress,
        affiliateAddress,
        brokerAddress,
        seniorBrokerAddress,
        leaderAddress,
        stablecoinAddress,
        minAmountOut,
        POOL_FEES,
        serviceFee,
        feeFree,
        { value: amountInInt },
      );
    } else {
      txRequest = await contract.depositToken(
        sellerAddress,
        affiliateAddress,
        brokerAddress,
        seniorBrokerAddress,
        leaderAddress,
        currencyAddress,
        stablecoinAddress,
        amountInInt,
        minAmountOut,
        POOL_FEES,
        serviceFee,
        feeFree,
      );
    }
    const txReceipt = await txRequest.wait();

    const timestampMined = Date.now();
    // const transaction = await this.provider.getTransaction(txReceipt.transactionHash);

    // Create transaction info
    // 1. 0x000 to null  2. Make checksum addresses
    const info = this.parseReceipt(txRequest, txReceipt);
    info.timestampSent = timestampSent;
    info.timestampMined = timestampMined;
    info.sellerAddress = zeroAddressToNull(toChecksumAddress(sellerAddress));
    info.affiliateAddress = zeroAddressToNull(
      toChecksumAddress(affiliateAddress),
    );
    info.brokerAddress = zeroAddressToNull(toChecksumAddress(brokerAddress));
    info.seniorBrokerAddress = zeroAddressToNull(
      toChecksumAddress(seniorBrokerAddress),
    );
    info.leaderAddress = zeroAddressToNull(toChecksumAddress(leaderAddress));
    info.currencyAddress = currencyAddress;
    info.blockchain = blockchain;
    info.stablecoinAddress = toChecksumAddress(stablecoinAddress);
    this.serviceFee = serviceFee;
    this.feeFree = feeFree;
    info.transactionHash = txReceipt.transactionHash;
    return info;
  }

  parseReceipt(request, receipt) {
    function bigNumberArgToBigInt(arg) {
      try {
        return arg.toBigInt();
      } catch (error) {
        console.log(error);
      }
      return BigNumber.from(arg.hex).toBigInt();
    }

    let info = {};

    // Basic info
    info.contractAddress = toChecksumAddress(request.to);
    info.status = receipt.status;

    // Gas & value
    info.gasPrice = BigNumber.from(request.gasPrice).toBigInt();
    info.gasUsed = BigNumber.from(receipt.gasUsed).toBigInt();
    info.value = BigNumber.from(request.value).toBigInt();

    // Amounts distributed
    for (const event of receipt.events) {
      if (event.event === "Distributed") {
        const values = event.args.map((arg) => bigNumberArgToBigInt(arg));
        // 	event Distributed(uint seller, uint affiliate, uint broker, uint leader, uint owner);
        info = {
          ...info,
          sellerAmount: values[0],
          affiliateAmount: values[1],
          brokerAmount: values[2],
          seniorBrokerAmount: values[3],
          leaderAmount: values[4],
          ownerAmount: values[5],
        };
      }
    }

    // Amount swapped
    const decodeInterface = new ethers.utils.Interface(IUniswapV3PoolABI.abi);
    for (const log of receipt.logs) {
      try {
        const swapReturn = decodeInterface.decodeEventLog(
          "Swap",
          log.data,
          log.topics,
        );
        info.swappedAmount = BigNumber.from(swapReturn[3]).abs().toBigInt();
      } catch (error) {}
    }

    return info;
  }

  /**
   * Convert BigInts to String because they are not serializable.
   * @param {*} obj The boject to be converted
   */
  convertBigIntToString(obj) {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === "bigint") {
        obj[key] = obj[key].toString();
      }
    }
  }
}
