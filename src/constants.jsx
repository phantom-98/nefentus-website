//import { Ethereum, Goerli, Binance, BinanceTestnet } from "@thirdweb-dev/chains";
import Bitcoin from "./assets/icon/crypto/bitcoin.svg";
import Polygon from "./assets/icon/crypto/polygon.svg";
import Cardano from "./assets/icon/crypto/cardano.svg";
import Binance from "./assets/icon/crypto/binance.svg";
import Ethereum from "./assets/newDashboardIcons/ethereum-logo.svg";
import Tether from "./assets/icon/crypto/tether.svg";
import USDC from "./assets/icon/crypto/usdc.svg";
import Ripple from "./assets/icon/crypto/xrp.svg";
import DAI from "./assets/icon/crypto/dai.svg";
import BSC from "./assets/icon/crypto/bsc.svg";
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

export const useMainnet = () => {
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
    return getCurrencyFromAbbr(blockchain, "USDT-BSC");
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
        name: "Tether (BSC)",
        blockchain: "BNB",
        icon: BSC,
        abbr: "USDT-BSC",
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
        address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
        decimals: 18,
      },
      {
        name: "Tether",
        blockchain: "ETH",
        icon: Tether,
        abbr: "USDT",
        address: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
        decimals: 6,
      },
      {
        name: "USD Coin",
        blockchain: "ETH",
        icon: USDC,
        abbr: "USDC",
        address: "0xf08A50178dfcDe18524640EA6618a1f965821715",
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
        address: "0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6",
        decimals: 18,
      },
      {
        name: "Binance USD",
        blockchain: "BNB",
        icon: BSC,
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
        id: 1, // Not used right now!
        address: "0x253a02f4a4dd97fd0b0d0a840b87770118e2973c",
        abi: SwapAndDistributeETH.abi,
      };
    } else {
      return {
        id: 1, // Not used right now!
        address: "0xc5a70e940925cbf02f093c8fb20a7202d7afe2c4",
        abi: SwapAndDistributeTestETH.abi,
      };
    }
  } else if (blockchain == "BNB") {
    if (useMainnet()) {
      return {
        id: 1, // Not used right now!
        address: "0x7e48dc51d530b786af3e6bec3cc8de86e394897e",
        abi: SwapAndDistributeBNB.abi,
      };
    } else {
      return {
        id: 1, // Not used right now!
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
      return "https://11155111.rpc.thirdweb.com/" + THIRDWEB_CLIENT_ID;
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
      return "Sepolia Testnet";
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

export const countryList = [
  { value: "Afghanistan", display: "countries.Afghanistan" },
  { value: "Albania", display: "countries.Albania" },
  { value: "Algeria", display: "countries.Algeria" },
  { value: "Andorra", display: "countries.Andorra" },
  { value: "Angola", display: "countries.Angola" },
  { value: "Anguilla", display: "countries.Anguilla" },
  { value: "Antigua & Barbuda", display: "countries.AntiguaBarbuda" },
  { value: "Argentina", display: "countries.Argentina" },
  { value: "Armenia", display: "countries.Armenia" },
  { value: "Aruba", display: "countries.Aruba" },
  { value: "Australia", display: "countries.Australia" },
  { value: "Austria", display: "countries.Austria" },
  { value: "Azerbaijan", display: "countries.Azerbaijan" },
  { value: "Bahamas", display: "countries.Bahamas" },
  { value: "Bahrain", display: "countries.Bahrain" },
  { value: "Bangladesh", display: "countries.Bangladesh" },
  { value: "Barbados", display: "countries.Barbados" },
  { value: "Belarus", display: "countries.Belarus" },
  { value: "Belgium", display: "countries.Belgium" },
  { value: "Belize", display: "countries.Belize" },
  { value: "Benin", display: "countries.Benin" },
  { value: "Bermuda", display: "countries.Bermuda" },
  { value: "Bhutan", display: "countries.Bhutan" },
  { value: "Bolivia", display: "countries.Bolivia" },
  {
    value: "Bosnia & Herzegovina",
    display: "countries.BosniaHerzegovina",
  },
  { value: "Botswana", display: "countries.Botswana" },
  { value: "Brazil", display: "countries.Brazil" },
  {
    value: "British Virgin Islands",
    display: "countries.BritishVirginIslands",
  },
  { value: "Brunei", display: "countries.Brunei" },
  { value: "Bulgaria", display: "countries.Bulgaria" },
  { value: "Burkina Faso", display: "countries.BurkinaFaso" },
  { value: "Burundi", display: "countries.Burundi" },
  { value: "Cambodia", display: "countries.Cambodia" },
  { value: "Cameroon", display: "countries.Cameroon" },
  { value: "Cape Verde", display: "countries.CapeVerde" },
  { value: "Cayman Islands", display: "countries.CaymanIslands" },
  { value: "Chad", display: "countries.Chad" },
  { value: "Chile", display: "countries.Chile" },
  { value: "China", display: "countries.China" },
  { value: "Colombia", display: "countries.Colombia" },
  { value: "Congo", display: "countries.Congo" },
  { value: "Cook Islands", display: "countries.CookIslands" },
  { value: "Costa Rica", display: "countries.CostaRica" },
  { value: "Cote D'Ivoire", display: "countries.CoteDIvoire" },
  { value: "Croatia", display: "countries.Croatia" },
  { value: "Cuba", display: "countries.Cuba" },
  { value: "Cyprus", display: "countries.Cyprus" },
  { value: "Czech Republic", display: "countries.CzechRepublic" },
  { value: "Denmark", display: "countries.Denmark" },
  { value: "Djibouti", display: "countries.Djibouti" },
  { value: "Dominica", display: "countries.Dominica" },
  { value: "Dominican Republic", display: "countries.DominicanRepublic" },
  { value: "Ecuador", display: "countries.Ecuador" },
  { value: "Egypt", display: "countries.Egypt" },
  { value: "El Salvador", display: "countries.ElSalvador" },
  { value: "Equatorial Guinea", display: "countries.EquatorialGuinea" },
  { value: "Estonia", display: "countries.Estonia" },
  { value: "Ethiopia", display: "countries.Ethiopia" },
  { value: "Falkland Islands", display: "countries.FalklandIslands" },
  { value: "Faroe Islands", display: "countries.FaroeIslands" },
  { value: "Fiji", display: "countries.Fiji" },
  { value: "Finland", display: "countries.Finland" },
  { value: "France", display: "countries.France" },
  { value: "French Polynesia", display: "countries.FrenchPolynesia" },
  { value: "French West Indies", display: "countries.FrenchWestIndies" },
  { value: "Gabon", display: "countries.Gabon" },
  { value: "Gambia", display: "countries.Gambia" },
  { value: "Georgia", display: "countries.Georgia" },
  { value: "Germany", display: "countries.Germany" },
  { value: "Ghana", display: "countries.Ghana" },
  { value: "Gibraltar", display: "countries.Gibraltar" },
  { value: "Greece", display: "countries.Greece" },
  { value: "Greenland", display: "countries.Greenland" },
  { value: "Grenada", display: "countries.Grenada" },
  { value: "Guam", display: "countries.Guam" },
  { value: "Guatemala", display: "countries.Guatemala" },
  { value: "Guernsey", display: "countries.Guernsey" },
  { value: "Guinea", display: "countries.Guinea" },
  { value: "Guinea Bissau", display: "countries.GuineaBissau" },
  { value: "Guyana", display: "countries.Guyana" },
  { value: "Haiti", display: "countries.Haiti" },
  { value: "Honduras", display: "countries.Honduras" },
  { value: "Hong Kong", display: "countries.HongKong" },
  { value: "Hungary", display: "countries.Hungary" },
  { value: "Iceland", display: "countries.Iceland" },
  { value: "India", display: "countries.India" },
  { value: "Indonesia", display: "countries.Indonesia" },
  { value: "Iran", display: "countries.Iran" },
  { value: "Iraq", display: "countries.Iraq" },
  { value: "Ireland", display: "countries.Ireland" },
  { value: "Isle of Man", display: "countries.IsleofMan" },
  { value: "Israel", display: "countries.Israel" },
  { value: "Italy", display: "countries.Italy" },
  { value: "Jamaica", display: "countries.Jamaica" },
  { value: "Japan", display: "countries.Japan" },
  { value: "Jersey", display: "countries.Jersey" },
  { value: "Jordan", display: "countries.Jordan" },
  { value: "Kazakhstan", display: "countries.Kazakhstan" },
  { value: "Kenya", display: "countries.Kenya" },
  { value: "Kuwait", display: "countries.Kuwait" },
  { value: "Kyrgyz Republic", display: "countries.KyrgyzRepublic" },
  { value: "Laos", display: "countries.Laos" },
  { value: "Latvia", display: "countries.Latvia" },
  { value: "Lebanon", display: "countries.Lebanon" },
  { value: "Lesotho", display: "countries.Lesotho" },
  { value: "Liberia", display: "countries.Liberia" },
  { value: "Libya", display: "countries.Libya" },
  { value: "Liechtenstein", display: "countries.Liechtenstein" },
  { value: "Lithuania", display: "countries.Lithuania" },
  { value: "Luxembourg", display: "countries.Luxembourg" },
  { value: "Macau", display: "countries.Macau" },
  { value: "Macedonia", display: "countries.Macedonia" },
  { value: "Madagascar", display: "countries.Madagascar" },
  { value: "Malawi", display: "countries.Malawi" },
  { value: "Malaysia", display: "countries.Malaysia" },
  { value: "Maldives", display: "countries.Maldives" },
  { value: "Mali", display: "countries.Mali" },
  { value: "Malta", display: "countries.Malta" },
  { value: "Mauritania", display: "countries.Mauritania" },
  { value: "Mauritius", display: "countries.Mauritius" },
  { value: "Mexico", display: "countries.Mexico" },
  { value: "Moldova", display: "countries.Moldova" },
  { value: "Monaco", display: "countries.Monaco" },
  { value: "Mongolia", display: "countries.Mongolia" },
  { value: "Montenegro", display: "countries.Montenegro" },
  { value: "Montserrat", display: "countries.Montserrat" },
  { value: "Morocco", display: "countries.Morocco" },
  { value: "Mozambique", display: "countries.Mozambique" },
  { value: "Namibia", display: "countries.Namibia" },
  { value: "Nepal", display: "countries.Nepal" },
  { value: "Netherlands", display: "countries.Netherlands" },
  {
    value: "Netherlands Antilles",
    display: "countries.NetherlandsAntilles",
  },
  { value: "New Caledonia", display: "countries.NewCaledonia" },
  { value: "New Zealand", display: "countries.NewZealand" },
  { value: "Nicaragua", display: "countries.Nicaragua" },
  { value: "Niger", display: "countries.Niger" },
  { value: "Nigeria", display: "countries.Nigeria" },
  { value: "Norway", display: "countries.Norway" },
  { value: "Oman", display: "countries.Oman" },
  { value: "Pakistan", display: "countries.Pakistan" },
  { value: "Palestine", display: "countries.Palestine" },
  { value: "Panama", display: "countries.Panama" },
  { value: "Papua New Guinea", display: "countries.PapuaNewGuinea" },
  { value: "Paraguay", display: "countries.Paraguay" },
  { value: "Peru", display: "countries.Peru" },
  { value: "Philippines", display: "countries.Philippines" },
  { value: "Poland", display: "countries.Poland" },
  { value: "Portugal", display: "countries.Portugal" },
  { value: "Puerto Rico", display: "countries.PuertoRico" },
  { value: "Qatar", display: "countries.Qatar" },
  { value: "Reunion", display: "countries.Reunion" },
  { value: "Romania", display: "countries.Romania" },
  { value: "Russia", display: "countries.Russia" },
  { value: "Rwanda", display: "countries.Rwanda" },
  {
    value: "Saint Pierre & Miquelon",
    display: "countries.SaintPierreMiquelon",
  },
  { value: "Samoa", display: "countries.Samoa" },
  { value: "San Marino", display: "countries.SanMarino" },
  { value: "Satellite", display: "countries.Satellite" },
  { value: "Saudi Arabia", display: "countries.SaudiArabia" },
  { value: "Senegal", display: "countries.Senegal" },
  { value: "Serbia", display: "countries.Serbia" },
  { value: "Seychelles", display: "countries.Seychelles" },
  { value: "Sierra Leone", display: "countries.SierraLeone" },
  { value: "Singapore", display: "countries.Singapore" },
  { value: "Slovakia", display: "countries.Slovakia" },
  { value: "Slovenia", display: "countries.Slovenia" },
  { value: "South Africa", display: "countries.SouthAfrica" },
  { value: "South Korea", display: "countries.SouthKorea" },
  { value: "Spain", display: "countries.Spain" },
  { value: "Sri Lanka", display: "countries.SriLanka" },
  { value: "St Kitts & Nevis", display: "countries.StKittsNevis" },
  { value: "St Vincent", display: "countries.StVincent" },
  { value: "St. Lucia", display: "countries.StLucia" },
  { value: "Sudan", display: "countries.Sudan" },
  { value: "Suriname", display: "countries.Suriname" },
  { value: "Swaziland", display: "countries.Swaziland" },
  { value: "Sweden", display: "countries.Sweden" },
  { value: "Switzerland", display: "countries.Switzerland" },
  { value: "Syria", display: "countries.Syria" },
  { value: "Taiwan", display: "countries.Taiwan" },
  { value: "Tajikistan", display: "countries.Tajikistan" },
  { value: "Tanzania", display: "countries.Tanzania" },
  { value: "Thailand", display: "countries.Thailand" },
  { value: "Timor L'Este", display: "countries.TimorLEste" },
  { value: "Togo", display: "countries.Togo" },
  { value: "Tonga", display: "countries.Tonga" },
  { value: "Trinidad & Tobago", display: "countries.TrinidadTobago" },
  { value: "Tunisia", display: "countries.Tunisia" },
  { value: "Turkey", display: "countries.Turkey" },
  { value: "Turkmenistan", display: "countries.Turkmenistan" },
  { value: "Turks & Caicos", display: "countries.TurksCaicos" },
  { value: "Uganda", display: "countries.Uganda" },
  { value: "Ukraine", display: "countries.Ukraine" },
  {
    value: "United Arab Emirates",
    display: "countries.UnitedArabEmirates",
  },
  { value: "United Kingdom", display: "countries.UnitedKingdom" },
  { value: "Uruguay", display: "countries.Uruguay" },
  { value: "Uzbekistan", display: "countries.Uzbekistan" },
  { value: "Venezuela", display: "countries.Venezuela" },
  { value: "Vietnam", display: "countries.Vietnam" },
  { value: "Virgin Islands (US", display: "countries.VirginIslandsUS" },
  { value: "Yemen", display: "countries.Yemen" },
  { value: "Zambia", display: "countries.Zambia" },
  { value: "Zimbabwe", display: "countries.Zimbabwe" },
].sort((country1, country2) => {
  return country1.value?.localeCompare(country2.value);
});

export const getChainSlug = (blockchain) => {
  if (useMainnet()) {
    if (blockchain === "ETH") return "ethereum";
    else return "bsc";
  } else {
    if (blockchain === "ETH") return "sepolia";
    else return "bsc-test";
  }
};
