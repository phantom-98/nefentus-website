import { currencies, blockchainToStablecoin, chainId } from "../../constants";
import backendAPI from "../../api/backendAPI";
import { web3Api } from "../../api/web3Api";
import { nullToZeroAddress } from "../../utils";

export const usePayment = ({
  password,
  priceUSD,
  seller,
  transInfoArg,
  switchNetwork,
}) => {
  async function handleBuy(
    currencyIdx,
    walletAddress,
    payWithExternalwallet,
    quantity = 1,
  ) {
    // Checks
    if (!(priceUSD > 0.0)) {
      return "invalid price";
    }
    if (!seller) {
      return "invalid seller";
    }

    const currency = currencies()[currencyIdx];
    const currencyAddress = currency.address;
    // Get stablecoin from backend
    const stablecoin = blockchainToStablecoin(currency.blockchain);
    const backend_API = new backendAPI();

    if (payWithExternalwallet) {
      await switchNetwork(chainId(currency.blockchain));

      const web3API = new web3Api();

      const [hierarchy, fees] = await Promise.all([
        backend_API.getHierarchy(seller.id),
        backend_API.getFees(seller.id),
      ]);
      console.log(hierarchy);
      console.log(fees);

      const transactionInfo = await web3API.callDepositContract(
        nullToZeroAddress(hierarchy.sellerAddress),
        hierarchy.partnerAddresses.map((address) => {
          return nullToZeroAddress(address);
        }),
        hierarchy.feeShares,
        currency,
        stablecoin,
        priceUSD,
        fees?.serviceFee || 0.03,
        fees?.remainingFeeFree || 0,
      );

      if (transactionInfo) {
        transactionInfo.quantity = quantity;
        transactionInfo.totalPrice = priceUSD;

        web3API.convertBigIntToString(transactionInfo);
        const ret = await backend_API.setTransactionInfo(
          transactionInfo,
          walletAddress,
          transInfoArg,
        );
        if (ret) {
          return "success";
        } else {
          return "not sent";
        }
      } else {
        return "failed";
      }
    } else {
      const ret = await backend_API.makePayment(
        currencyAddress,
        currency.blockchain,
        priceUSD,
        quantity,
        password,
        stablecoin.address,
        transInfoArg,
      );

      if (ret === "insufficientFunds") {
        return "insufficient fund";
      } else if (ret) {
        return "success";
      } else {
        return "failed";
      }
    }
  }

  return { handleBuy };
};
