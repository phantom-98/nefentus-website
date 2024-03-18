import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import backendAPI from "./api/backendAPI";
import MetaMaskLogo from "./assets/logo/MetaMask.svg";
import WalletConnectLogo from "./assets/logo/WalletConnect.svg";
import Ethereum from "./assets/icon/crypto/ethereum.svg";
import CoinbaseLogo from "./assets/logo/coinbase.svg";
import TrustLogo from "./assets/logo/trust.png";
import Cookies from "js-cookie";

export function formatTokenBalance(x, round = 2) {
  const parsedFloat = parseFloat(x);
  if (isNaN(parsedFloat)) {
    return "0.0";
  } else {
    return parsedFloat
      .toFixed(round)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function formatUSDBalance(x) {
  const parsedFloat = parseFloat(x);
  if (isNaN(parsedFloat)) {
    return "0.0";
  } else {
    return parsedFloat
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function nullToZeroAddress(address) {
  if (address === null) return ethers.constants.AddressZero;
  return address;
}

export function zeroAddressToNull(address) {
  if (address === ethers.constants.AddressZero) return null;
  return address;
}

export function toChecksumAddress(address) {
  if (address === null) return null;
  return ethers.utils.getAddress(address);
}

export function getRole(user) {
  // const roles = "ROLE_ADMIN";
  const roles = user?.roles || [];
  // const roleArray = roles?.split(",");
  const isVendor = roles?.includes("ROLE_VENDOR");
  const isAffiliate = roles?.includes("ROLE_AFFILIATE");
  const isBroker = roles?.includes("ROLE_BROKER");
  const isSeniorBroker = roles?.includes("ROLE_SENIOR_BROKER");
  const isLeader = roles?.includes("ROLE_LEADER");
  const isAdmin = roles?.includes("ROLE_ADMIN");

  if (isAdmin) {
    return "admin";
  } else if (isVendor) {
    return "vendor";
  } else if (isAffiliate) {
    return "affiliate";
  } else if (isBroker) {
    return "broker";
  } else if (isSeniorBroker) {
    return "seniorbroker";
  } else if (isLeader) {
    return "leader";
  }
}

export function dashboardLink(user) {
  let role = getRole(user);
  if (
    role === "affiliate" ||
    role === "broker" ||
    role === "seniorbroker" ||
    role === "leader"
  ) {
    role = "partner";
  } else if (role === "admin") {
    role = "admin";
  } else if (role === "vendor") {
    return "/dashboard";
  } else if (role === undefined) {
    return "/login";
  }
  return "/dashboard/" + role;
}

export const encryptData = (password) => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.VITE_REACT_APP_SECRET_WORD,
    ).toString();
  } catch (error) {
    console.error("Encryption failed. Please check your input.");
  }
};

export const decryptData = (password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      password,
      process.env.VITE_REACT_APP_SECRET_WORD,
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed. Please check your input.");
  }
};

export const reformatFooterInfo = (pages, links) => {
  let result = [];

  for (let i = 0; i < pages.length; i++) {
    result[i] = { text: pages[i], link: links[i] };
  }
  return result;
};

export const checkJwtToken = async () => {
  const isAuthorize = await new backendAPI().checkJwt();
  if (!isAuthorize) {
    Cookies.remove("token");
    window.location.href = "/";
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (number) => {
  const phoneRegex = /[\+\-\/\\\(\)0-9]*/;
  return phoneRegex.test(number);
};

export const formatIncome = (income) => {
  if (Number.isInteger(income)) return income;
  else return income.toFixed(2);
};

export const getWalletIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "metamask":
      return MetaMaskLogo;
    case "walletconnect":
      return WalletConnectLogo;
    case "coinbase":
      return CoinbaseLogo;
    case "trust":
      return TrustLogo;
    default:
      return Ethereum;
  }
};
