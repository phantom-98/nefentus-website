import "./landing.css";
import RightArrow from "../../assets/icon/right-arrow.svg";
import { Conclusion, Heading } from ".";
import NefentusLogo from "../../assets/logo/logo.svg";
import Hero1 from "../../assets/landing/Hero 1.png";
import Hero2 from "../../assets/landing/Hero 2.png";
import Hero3 from "../../assets/landing/hero 3.png";
import Hero4 from "../../assets/landing/hero 4.png";
import HeroLineTop from "../../assets/landing/b2c-hero-top.svg";
import HeroLineBottom from "../../assets/landing/b2c-hero-down.svg";
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
import RabbyCard from "../../assets/landing/wallet-card-rabby.png";
import RainbowCard from "../../assets/landing/wallet-card-rainbow.png";
import TransactionSend from "../../assets/landing/transaction-send.png";
import TransactionConverter from "../../assets/landing/transaction-converter.png";
import SendIcon from "../../assets/landing/send-ico.svg";
import SwapIcon from "../../assets/landing/swap-ico.svg";

const B2C = () => {
  return (
    <div
      className="landing-layout b2c container"
      style={{
        gap: "4rem",
      }}
    >
      <Hero />

      <MultiWallets />

      <Transactions />

      <Conclusion
        icon={NefentusLogo}
        title={`Transparent Pricing,\nNo Strings Attached`}
        subtitle={`Enjoy peace of mind with our straightforward approach—no hidden fees, no monthly subscriptions. Creating and using an account for personal use is completely free. Get started today!`}
        button={`Create an account`}
      />
    </div>
  );
};

export default B2C;

const Hero = () => {
  return (
    <div
      className="layout-paragraph hero"
      style={{
        paddingBlock: "0",
      }}
    >
      <div
        className="layout-horizontal"
        style={{
          paddingBottom: "0",
        }}
      >
        <div
          className="hero-layout"
          style={{
            width: "50%",
          }}
        >
          <h1 className="title">
            Take charge of your <br /> crypto with Nefentus
          </h1>
          <p className="sub-title">
            Simplify your crypto experience. Easily send & receive payments,
            manage all your wallets and handle sales—all in one convenient
            place.
          </p>
          <div className="button-container">
            <a href="/signup">
              <button>Get Started</button>
            </a>
            <a href="/contact">
              <span>Talk to an expert</span>
              <img src={RightArrow} />
            </a>
          </div>
        </div>
        <div
          className="hero-img"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            width: "50%",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              justifyContent: "start",
              paddingBottom: "4rem",
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
            />
            <img src={Hero2} style={{ width: "100%" }} />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              justifyContent: "end",
              paddingTop: "4rem",
            }}
          >
            <img src={Hero3} style={{ width: "100%" }} />
            <img
              src={Hero4}
              style={{
                width: "100%",
                borderBottom: "none",
                borderBottomRightRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            />
          </div>
        </div>
      </div>
      <img
        src={HeroLineTop}
        style={{
          top: "0",
          width: "80%",
        }}
      />
      <img
        src={HeroLineBottom}
        style={{
          bottom: "0",
          width: "80%",
        }}
        className="translate-left"
      />
      <hr
        style={{
          right: "calc(25% - 0.5rem)",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          right: "0",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <div
        style={{
          right: "calc(25% - 2.6rem)",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet vertical-dashed-line"
      />
      <hr
        style={{
          right: "calc(50% - 3rem)",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          top: "0",
          width: "100vw",
          zIndex: "1",
        }}
      />
      <hr
        style={{
          bottom: "0",
          width: "100vw",
          zIndex: "1",
        }}
      />
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

const MultiWallets = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        paddingBottom: "0",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Heading
        title={`Juggle multiple wallets seamlessly`}
        subtitle={`Effortlessly handle multiple wallets with our platform. Choose our built-in wallet or link countless external wallets for ultimate flexibility.`}
      />

      <div className="multi-wallet-management container">
        <hr
          style={{
            top: "0",
            width: "100vw",
          }}
          className="hide-in-mobile"
        />
        <hr
          style={{
            bottom: "0",
            width: "100vw",
          }}
        />
        <div className="wallet-internal">
          <div
            style={{
              width: "fit-content",
              background: "#202020",
              borderRadius: "50%",
              padding: "0.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={NefentusLogo}
              style={{
                width: "2rem",
                height: "2rem",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            Utilize our trusted Nefentus wallet
          </p>
          <p className="sub-title">
            Rely on our internal Nefentus Wallet, fortified with advanced
            security features. Benefit from encryption, multi-factor
            authentication and other robust protocols, ensuring the safety of
            your digital assets.
          </p>
          <div
            className="ico-card-wallet"
            style={{
              transform: "rotate(-5deg)",
              top: "29rem",
              left: "2rem",
            }}
          >
            <img src={NefentusCard} />
          </div>
        </div>
        <div className="wallet-external">
          <p>Or connect an unlimited number of external wallets</p>
          <div className="wallet-club">
            {wallets.map((item) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={item.icon}
                  style={{
                    width: "3.6rem",
                    height: "3.6rem",
                    borderRadius: "50%",
                  }}
                />
                <p
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <hr style={{ display: "none" }} />

          <div
            className="ico-card-wallet coinbase"
            style={{
              transform: "rotate(16deg)",
              top: "8rem",
              left: "46rem",
            }}
          >
            <img src={CoinbaseCard} />
          </div>

          <div
            className="ico-card-wallet hide-in-mobile"
            style={{
              transform: "rotate(-9deg)",
              top: "34rem",
              left: "49rem",
            }}
          >
            <img src={RabbyCard} />
          </div>

          <div
            className="ico-card-wallet metamask"
            style={{
              transform: "rotate(6deg)",
              top: "12rem",
              left: "75rem",
            }}
          >
            <img src={MetamaskCard} />
          </div>

          <div
            className="ico-card-wallet hide-in-mobile"
            style={{
              transform: "rotate(-12deg)",
              top: "36rem",
              left: "79rem",
            }}
          >
            <img src={RainbowCard} />
          </div>
          <p className="sub-title">
            Integrating an external wallet into your platform or service
            enhances transaction convenience. Seamlessly send & receive payments
            without the need for external wallets or exchanges, simplifying the
            process for you.
          </p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        paddingBottom: "0",
      }}
    >
      <Heading
        title={`All financial transactions involving your wallets`}
        subtitle={`A cryptocurrency conversion function serves as a tool or software capability crafted to simplify the transformation of one cryptocurrency into another.`}
      />
      <div className="layout-transactions first">
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

        <img className="transaction-img" src={TransactionSend} />

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
            />
          </div>
          <p
            style={{
              fontSize: "2rem",
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
      <div className="layout-transactions">
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
        <img className="transaction-img" src={TransactionConverter} />
      </div>
    </div>
  );
};
