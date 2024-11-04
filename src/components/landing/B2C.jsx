import "./landing.css";
import RightArrow from "../../assets/icon/right-arrow.svg";
import { Audience, Conclusion, Heading } from ".";
import NefentusLogo from "../../assets/logo/logo.svg";
import ManageCrypto from "../../assets/landing/manage-crypto.png";
import MultipleWallets from "../../assets/landing/multi-wallets.png";
import Hero1 from "../../assets/landing/hero 1.png";
import Hero2 from "../../assets/landing/hero 2.png";
import Hero3 from "../../assets/landing/hero 3.png";
import Hero4 from "../../assets/landing/hero 4.png";
import MobileHero from "../../assets/landing/mobile-b2c-image.png";
import HeroLineTop from "../../assets/landing/b2c-hero-top.svg";
import HeroLineBottom from "../../assets/landing/b2c-hero-down.svg";
import MobileMultiWallet from "../../assets/landing/mobile-view-multi-wallet.png";
import MobileMultiWallet2 from "../../assets/landing/multi-wallets-mobile-view2.png";
import Blocto from "../../assets/landing/ico-blocto.png";
import Coinbase from "../../assets/landing/ico-coinbase.png";
import MetaMask from "../../assets/landing/ico-metamask.png";
import Onekey from "../../assets/landing/ico-onekey.png";
import Phantom from "../../assets/landing/ico-phantom.png";
import Rabby from "../../assets/landing/ico-rabby.png";
import Rainbow from "../../assets/landing/ico-rainbow.png";
import Trust from "../../assets/landing/ico-trust.png";
import WalletConnect from "../../assets/landing/ico-wallet-connect.png";
import Xdefi from "../../assets/landing/ico-xdefi.png";
import Zerion from "../../assets/landing/ico-zerion.png";
import CoinbaseCard from "../../assets/landing/wallet-card-coinbase.png";
import NefentusCard from "../../assets/landing/wallet-card-nefentus.png";
import MetamaskCard from "../../assets/landing/wallet-card-metamask.png";
import WalletConnectCard from "../../assets/landing/wallet-card-wallet-connect.png";
import RabbyCard from "../../assets/landing/wallet-card-rabby.png";
import RainbowCard from "../../assets/landing/wallet-card-rainbow.png";
import TransactionSend from "../../assets/landing/transaction-send.png";
import TransactionConverter from "../../assets/landing/transaction-converter.png";
import SendIcon from "../../assets/landing/send-ico.svg";
import SwapIcon from "../../assets/landing/swap-ico.svg";
import { useEffect } from "react";
import { Flex } from "antd";
import CommonButton from "../commonButton";

const B2CBody = () => {
  useEffect(() => {
    const href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1,
    );
    setTimeout(() => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, []);

  return (
    <div
      className="landing-layout b2c container"
      style={{
        gap: "4rem",
      }}
    >
      <B2CHero />

      <MultiWallets />

      <CryptoManage />

      <Transactions />

      <Audience />
    </div>
  );
};

export default B2CBody;

export const B2CHero = () => {
  return (
    <div
      id="hero"
      className="hero b2c-hero"
      style={{
        paddingBlock: "0",
      }}
    >
      <div
        className="layout-horizontal b2c-banner"
        style={{
          paddingBottom: "0",
        }}
      >
        <div
          className="hero-layout b2c-hero-layout"
          style={{
            width: "50%",
          }}
        >
          <h1 className="title">
            <span className="gradient">Take charge</span> of your <br /> crypto
            with Nefentus
          </h1>
          <p className="sub-title b2b-subtext">
            Seamlessly create & receive payments. Manage all your wallets and
            streamline your sales process—all from a single platform.
          </p>
          <div className="button-container">
            <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
              <CommonButton text={"Get started"} type={"primary"} />
            </a>
            <a href="/business-support">
              <span>Talk to an expert</span>
              <img src={RightArrow} alt="Right arrow" />
            </a>
          </div>
        </div>
        <div className="hero-img b2c-banner-image">
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              justifyContent: "start",
            }}
          >
            <img
              src={Hero1}
              style={{
                width: "100%",
                borderTop: "none",
                borderTopRightRadius: "0",
                borderTopLeftRadius: "0",
              }}
              alt="Send cryptocurrency"
            />
            <img
              src={Hero2}
              style={{
                width: "100%",
                borderBottom: "none",
                borderBottomRightRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              alt="Send cryptocurrency on Nefentus"
            />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            <img
              src={Hero3}
              style={{ width: "100%" }}
              alt="Swap cryptocurrency"
            />
          </div>
        </div>
        <div className="mobile-b2c-image">
          <img
            src={MobileHero}
            alt="Swap currency"
            width="100%"
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

const wallets = [
  {
    icon: Rainbow,
    name: "Rainbow Wallet",
    color: "#2659a6",
  },
  {
    icon: MetaMask,
    name: "MetaMask Wallet",
    color: "#212121",
  },
  {
    icon: Blocto,
    name: "Blocto Wallet",
    color: "white",
  },
  {
    icon: Trust,
    name: "Trust Wallet",
    color: "white",
  },
  {
    icon: Phantom,
    name: "Phantom Wallet",
    color: "#c4b8ff",
  },
  {
    icon: WalletConnect,
    name: "Wallet Connect",
    color: "white",
  },
  {
    icon: Xdefi,
    name: "Rainbow Wallet",
    color: "white",
  },
  {
    icon: Onekey,
    name: "Onekey Wallet",
    color: "white",
  },
  {
    icon: Zerion,
    name: "Zerion Wallet",
    color: "#1d6ade",
  },
  {
    icon: Coinbase,
    name: "Coinbase Wallet",
    color: "white",
  },
  {
    icon: Rabby,
    name: "Rabby Wallet",
    color: "white",
  },
  {
    icon: Xdefi,
    name: "XDefi Wallet",
    color: "white",
  },
];

export const MultiWallets = () => {
  return (
    <>
      <div
        id="multi-wallets"
        className="layout-paragraph b2c-multi-wallet"
        style={{
          paddingBottom: "0",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div className="multi-wallet-head">
          <Flex vertical gap={"1rem"}>
            <div className="default-text multi-wallet-title">
              Juggle multiple wallets seamlessly
            </div>
            <div className="multi-wallet-subtitle default-text-gray">
              Effortlessly handle multiple wallets with our platform. Choose our
              built-in wallet or link countless external wallets for ultimate
              flexibility.
            </div>
          </Flex>
        </div>

        <img src={MultipleWallets} alt="Multiple Wallets" width={"100%"} />
      </div>
      <div>
        <Flex vertical className="multi-wallet-mobile-view" gap={24}>
          <div className="multi-wallet-head">
            <Flex vertical gap={"1rem"}>
              <div className="default-text multi-wallet-title">
                Juggle multiple wallets seamlessly
              </div>
              <div className="multi-wallet-subtitle default-text-gray">
                Effortlessly handle multiple wallets with our platform. Choose
                our built-in wallet or link countless external wallets for
                ultimate flexibility.
              </div>
            </Flex>
          </div>
          <img src={MobileMultiWallet} alt="Multi wallets" width="100%" />
          <div className="default-text-gray">
            Having an internal wallet integrated into your platform or service
            can make transactions more convenient. You can easily send and
            receive payments without having to use external wallets or
            exchanges.
          </div>
          <img
            src={MobileMultiWallet2}
            alt="Multi wallets"
            width="100%"
            style={{ marginTop: "6rem" }}
          />
        </Flex>
      </div>
    </>
  );
};

const CryptoManage = () => {
  return (
    <div className="layout-paragraph b2c-manage">
      <div className="layout-horizontal layout-manage">
        <div className="manage-title-layout">
          <h1 className="title">
            Manage your crypto
            <br />
            on the go with our app
          </h1>
          <p className="sub-title">
            Stay connected to your cryptocurrency transactions anytime, anywhere
            with the Nefentus mobile app.
          </p>
          <p className="sub-title">
            Download the app today and experience the future of crypto payments
            at your fingertips.
          </p>
          <div className="button-container">
            <a
              href={`${process.env.VITE_REACT_APP_DASHBOARD}/install-app`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Download App</button>
            </a>
          </div>
        </div>
        <div className="manage-img">
          <img src={ManageCrypto} alt="Manage cryptocurrency using Nefentus" />
        </div>
      </div>
    </div>
  );
};

export const Transactions = () => {
  return (
    <div id="transactions" className="layout-paragraph">
      <div className="layout-transactions first">
        <img
          className="transaction-img"
          src={TransactionSend}
          alt="Cryptocurrency transactions using Nefentus"
        />

        <div className="transaction-description">
          <div
            style={{
              width: "fit-content",
              border: "1px solid #202020",
              background: "#171717",
              borderRadius: "0.6rem",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={SendIcon}
              style={{
                width: "1rem",
                height: "1rem",
              }}
              alt="Send cryptocurrency"
            />
          </div>
          <p
            style={{
              fontSize: "3.8rem",
            }}
          >
            Send/Receive with Ease
          </p>
          <p className="sub-title">
            Access hundreds of currencies across all Web3 wallets. Customers can
            pay using their preferred wallet & currency, spanning Bitcoin,
            Ethereum and various other networks.
          </p>
        </div>
      </div>
      {/** Discussed to remove converter content on 25 Oct 2024 */}
      {/* <div className="layout-transactions">
        <hr
          style={{
            top: "0",
            width: "100vw",
          }}
          className="hide-in-tablet"
        />
        <hr
          style={{
            bottom: "0",
            width: "100vw",
          }}
          className="hide-in-tablet"
        />
        <div
          className="transaction-description"
          style={{
            paddingInline: "0 3rem",
          }}
        >
          <div
            style={{
              width: "fit-content",
              border: "1px solid #202020",
              background: "#171717",
              borderRadius: "0.6rem",
              padding: "0.7rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={SwapIcon}
              style={{
                width: "1.6rem",
                height: "1.6rem",
              }}
              alt="Swap currency"
            />
          </div>
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            Currency converter
          </p>
          <p className="sub-title">
            Explore a wide array of currencies compatible with all Web3 wallets.
            Customers can conveniently pay using their preferred wallet and
            currency including Bitcoin, Ethereum & other networks.
          </p>
        </div>
        <img
          className="transaction-img"
          src={TransactionConverter}
          alt="Convert cryptocurrency"
        />
      </div> */}
    </div>
  );
};
