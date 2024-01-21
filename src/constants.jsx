//import { Ethereum, Goerli, Binance, BinanceTestnet } from "@thirdweb-dev/chains";
import Bitcoin from "./assets/icon/crypto/bitcoin.svg";
import Polygon from "./assets/icon/crypto/polygon.svg";
import Cardano from "./assets/icon/crypto/cardano.svg";
import Binance from "./assets/icon/crypto/binance.svg";
import Ethereum from "./assets/icon/crypto/ethereum.svg";
import Tether from "./assets/icon/crypto/tether.svg";
import USDC from "./assets/icon/crypto/usdc.svg";
import Ripple from "./assets/icon/crypto/xrp.svg";
import DAI from "./assets/icon/crypto/dai.svg";
import Doge from "./assets/icon/crypto/doge.svg";
import SwapAndDistributeTestETH from "./assets/abi/SwapAndDistributeTestETH.json";
import SwapAndDistributeTestBNB from "./assets/abi/SwapAndDistributeTestBNB.json";
import SwapAndDistributeBNB from "./assets/abi/SwapAndDistributeBNB.json";
import SwapAndDistributeETH from "./assets/abi/SwapAndDistributeETH.json";

export const ROLE_TO_NAME = {
  vendor: "Vendor",
  affiliate: "Affiliate",
  broker: "Broker",
  seniorbroker: "Senior Broker",
  "senior broker": "Senior Broker",
  leader: "Leader",
  admin: "Admin",
};

const useMainnet = () => {
  return process.env.VITE_REACT_APP_USE_MAINNET === "true";
};

export const blockchainToWrapped = (blockchain) => {
  if (blockchain === "ETH") {
    return getCurrencyFromAbbr(blockchain, "WETH");
  } else if (blockchain == "BNB") {
    return getCurrencyFromAbbr(blockchain, "WBNB");
  }
};

export const blockchainToStablecoin = (blockchain) => {
  if (blockchain === "ETH") {
    return getCurrencyFromAbbr(blockchain, "USDC");
  } else if (blockchain == "BNB") {
    return getCurrencyFromAbbr(blockchain, "BUSD");
  }
};

export const blockchainToFactoryAddress = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      // See https://docs.uniswap.org/contracts/v3/reference/deployments
      return "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    } else {
      // Same as mainnet! See https://docs.uniswap.org/contracts/v3/reference/deployments
      return "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    }
  } else if (blockchain == "BNB") {
    if (useMainnet()) {
      // See https://docs.pancakeswap.finance/developers/smart-contracts/pancakeswap-exchange/v3-contracts
      return "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865";
    } else {
      // Same as mainnet! See https://docs.pancakeswap.finance/developers/smart-contracts/pancakeswap-exchange/v3-contracts
      return "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865";
    }
  }
};

export const currencies = () => {
  if (useMainnet()) {
    // MAINNET
    return [
      {
        name: "Ethereum",
        blockchain: "ETH",
        icon: Ethereum,
        abbr: "ETH",
        address: null,
        decimals: 18,
      },
      {
        name: "Wrapped Ethereum",
        blockchain: "ETH",
        icon: Ethereum,
        abbr: "WETH",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18,
      },
      {
        name: "Tether",
        blockchain: "ETH",
        icon: Tether,
        abbr: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
      },
      {
        name: "USD Coin",
        blockchain: "ETH",
        icon: USDC,
        abbr: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
      },
      /*
			{
				icon: Bitcoin,
				name: "Bitcoin",
				abbr: "BTC",
				address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
				decimals: 8,
			},
			*/
      {
        name: "Binance Coin",
        blockchain: "BNB",
        icon: Binance,
        abbr: "BNB",
        address: null,
        decimals: 18,
      },
      {
        name: "Wrapped Binance Coin",
        blockchain: "BNB",
        icon: Binance,
        abbr: "WBNB",
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        decimals: 18,
      },
      {
        name: "Ripple",
        blockchain: "BNB",
        icon: Ripple,
        abbr: "XRP",
        address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        decimals: 18,
      },
      {
        name: "DAI",
        blockchain: "ETH",
        icon: DAI,
        abbr: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        decimals: 18,
      },
      {
        name: "Binance USD",
        blockchain: "BNB",
        icon: Binance,
        abbr: "BUSD",
        address: "0x55d398326f99059fF775485246999027B3197955",
        decimals: 18,
      },
      /*
      {
        name: "Dogecoin",
        blockchain: "BNB",
        icon: Doge,
        abbr: "DOGE",
        address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
        decimals: 8,
      },
			*/
      // {
      //   icon: Polygon,
      //   name: "Polygon",
      //   abbr: "MATIC",
      //   address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      //   decimals: 18,
      // },
    ];
  } else {
    // TESTNET
    return [
      {
        name: "Ethereum",
        blockchain: "ETH",
        icon: Ethereum,
        abbr: "ETH",
        address: null,
        decimals: 18,
      },
      {
        name: "Wrapped Ethereum",
        blockchain: "ETH",
        icon: Ethereum,
        abbr: "WETH",
        address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        decimals: 18,
      },
      {
        name: "Tether",
        blockchain: "ETH",
        icon: Tether,
        abbr: "USDT",
        address: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49",
        decimals: 6,
      },
      {
        name: "USD Coin",
        blockchain: "ETH",
        icon: USDC,
        abbr: "USDC",
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        decimals: 6,
      },
      /*
			{
				icon: Bitcoin,
				name: "Bitcoin",
				abbr: "BTC",
				address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
				decimals: 8,
			},
			*/
      {
        name: "Binance Coin",
        blockchain: "BNB",
        icon: Binance,
        abbr: "BNB",
        address: null,
        decimals: 18,
      },
      {
        name: "Wrapped Binance Coin",
        blockchain: "BNB",
        icon: Binance,
        abbr: "WBNB",
        address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        decimals: 18,
      },
      /*
			// There is no real XRP on the testnet
			{
				blockchain: "BNB",
			  icon: Ripple,
			  name: "Ripple",
			  abbr: "XRP",
			  address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
			  decimals: 18,
			},
			*/
      {
        name: "DAI",
        blockchain: "ETH",
        icon: DAI,
        abbr: "DAI",
        address: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
        decimals: 18,
      },
      {
        name: "Binance USD",
        blockchain: "BNB",
        icon: Binance,
        abbr: "BUSD",
        address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        decimals: 18,
      },
      /*
      {
        name: "Dogecoin",
        blockchain: "BNB",
        icon: Doge,
        abbr: "DOGE",
        address: "0xebef27461fe0c88bd5d6829de7226d68fce021c1",
        decimals: 8,
      },
			*/
      // {
      //   icon: Polygon,
      //   name: "Polygon",
      //   abbr: "MATIC",
      //   address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      //   decimals: 18,
      // },
    ];
  }
};

export const ownerAddress = "0xBE011f8F08d05feCc83abeabb6C38b987B9bdD45";

export const transactionLimit = 10000;

export const contractDeposits = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      return {
        id: 2, // Not used right now!
        address: "0xd577766dd079c123ce677b8a27f9a01e5f4c9905",
        abi: SwapAndDistributeETH.abi,
      };
    } else {
      return {
        id: 1,
        address: "0xc5a70e940925cbf02f093c8fb20a7202d7afe2c4",
        abi: SwapAndDistributeTestETH.abi,
      };
    }
  } else if (blockchain == "BNB") {
    if (useMainnet()) {
      return {
        id: 2, // Not used right now!
        address: "0xabcdeff",
        abi: SwapAndDistributeBNB.abi,
      };
    } else {
      return {
        id: 2, // Not used right now!
        address: "0xee5711fab04f7e8555395e00987b594a752ed08f",
        abi: SwapAndDistributeTestBNB.abi,
      };
    }
  }
};

const THIRDWEB_CLIENT_ID = "639eea2ebcabed7eab90b56aceeed08b";

export const providerURL = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      return "https://ethereum.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID;
    } else {
      return "https://goerli.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID;
    }
  } else if (blockchain === "BNB") {
    if (useMainnet()) {
      return "https://binance.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID;
    } else {
      return "https://binance-testnet.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID;
    }
  }
};

export const chainId = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      return 1;
    } else {
      return 5;
    }
  } else if (blockchain === "BNB") {
    if (useMainnet()) {
      return 56;
    } else {
      return 97;
    }
  }
};

export const chainThirdweb = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      return Ethereum;
    } else {
      return Goerli;
    }
  } else if (blockchain === "BNB") {
    if (useMainnet()) {
      return Binance;
    } else {
      return BinanceTestnet;
    }
  }
};

export const blockchainToName = (blockchain) => {
  if (blockchain === "ETH") {
    if (useMainnet()) {
      return "Ethereum";
    } else {
      return "Görli Testnet";
    }
  } else if (blockchain === "BNB") {
    if (useMainnet()) {
      return "BNB Chain";
    } else {
      return "BNB Testnet";
    }
  }
};

const getCurrencyFromAbbr = (blockchain, abbr) => {
  return currencies().find(
    (currency) =>
      currency.blockchain === blockchain &&
      currency.abbr?.toLowerCase() === abbr?.toLowerCase(),
  );
};

export const coinList = [
  {
    icon: Ethereum,
    name: "Ethereum",
    abbr: "ETH",
    url: "ethereum",
  },
  {
    icon: Bitcoin,
    name: "Bitcoin",
    abbr: "BTC",
    url: "bitcoin",
  },
  {
    icon: Cardano,
    name: "Cardano",
    abbr: "ADA",
    url: "cardano",
  },
  {
    icon: Binance,
    name: "Binance Coin",
    abbr: "BNB",
    url: "binancecoin",
  },
  {
    icon: Ripple,
    name: "Ripple",
    abbr: "XRP",
    url: "ripple",
  },
  //   {
  //     icon: Polygon,
  //     name: "Polygon",
  //     abbr: "MATIC",
  //     url: "matic-network",
  //   },
];
