import "./landing.css";
import Hero1 from "../../assets/landing/hero1.png";
import Hero2 from "../../assets/landing/hero2.png";
import Plus from "../../assets/landing/plus.svg";
import Minus from "../../assets/landing/minus.svg";
import Send from "../../assets/landing/send.png";
import Swap from "../../assets/landing/swap.png";
import HeartSquare from "../../assets/landing/heart-square.svg";
import HeartChecked from "../../assets/landing/heart-checked.svg";
import Smile from "../../assets/landing/smile.svg";
import PC from "../../assets/landing/pc.svg";
import Dollar from "../../assets/landing/dollar.svg";
import Chain from "../../assets/landing/chain.svg";
import Copy from "../../assets/icon/copy.png";
import NefentusLogo from "../../assets/logo/logo.svg";
import CoinbaseLogo from "../../assets/logo/coinbase.svg";
import WalletconnectLogo from "../../assets/logo/WalletConnect.svg";
import MetamaskLogo from "../../assets/logo/MetaMask.svg";
import BloctoLogo from "../../assets/logo/blocto.png";
import TrustLogo from "../../assets/logo/trust.png";
import WalletSvg from "../../assets/landing/wallet.svg";
import ShoppingCartSvg from "../../assets/landing/shopping-cart.svg";
import CheckSquareSvg from "../../assets/landing/check-square.svg";
import SendModalPng from "../../assets/landing/send-modal.png";
import CheckoutPng from "../../assets/landing/checkout.png";
import SuccessPng from "../../assets/landing/success.png";
import FitnessSvg from "../../assets/landing/fitness.svg";
import RealEstateSvg from "../../assets/landing/real-estate.svg";
import FoodSvg from "../../assets/landing/food.svg";
import ItTechSvg from "../../assets/landing/it-tech.svg";
import FinanceSvg from "../../assets/landing/finance.svg";
import TransportSvg from "../../assets/landing/transport.svg";
import ECommerceSvg from "../../assets/landing/e-commerce.svg";
import MarketSvg from "../../assets/landing/market.svg";

import Main1 from "../../assets/landing/main1.png";
import Main2 from "../../assets/landing/main2.png";
import Main3 from "../../assets/landing/main3.png";
import Logos from "../logos/logos";

import { useEffect, useState } from "react";
import { useENS } from "@thirdweb-dev/react";

const Landing = () => {
  return (
    <div className="landing-layout container">
      <Hero />

      <Logos />

      <Helps />

      <Benefits />

      <MainFeatures />

      <Industries />

      <GettingStarted />
    </div>
  );
};

export default Landing;

const Hero = () => {
  return (
    <div className="layout-horizontal">
      <div className="hero-layout">
        <h1 className="title">
          Integrate{" "}
          <span
            style={{
              color: "#4BA6C5",
            }}
          >
            cryptocurrency payments
          </span>{" "}
          into your business
        </h1>
        <p className="sub-title">
          Create and receive payments. Manage all wallets and the sales process
          in one place.
        </p>
        <button>Get Started</button>
      </div>
      <div className="hero-img">
        <img src={Hero1} style={{ width: "24rem" }} />
        <img
          src={Hero2}
          style={{
            width: "24rem",
            position: "absolute",
            top: "4.4rem",
            right: "-2rem",
          }}
        />
      </div>
    </div>
  );
};

const Heading = ({ title, subtitle }) => {
  return (
    <div className="layout-title">
      <h1 className="title">{title}</h1>
      <p className="sub-title">{subtitle}</p>
    </div>
  );
};

const helps = [
  {
    title: "Invoices",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
  },
  {
    title: "Product payment links",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
  },
  {
    title: "All types of financial transactions with cryptocurrency",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
  },
  {
    title: "Analytics of your sales",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
  },
];

const Helps = () => {
  const [expands, setExpands] = useState(helps.map((item) => false));

  return (
    <div className="layout-paragraph">
      <Heading
        title={`How our platform can help your business`}
        subtitle={`All the cryptocurrency tools your business needs in one place`}
      />
      <div className="layout-horizontal layout-help">
        <div className="layout-feature">
          {helps.map((help, index) => {
            return (
              <Feature
                title={help.title}
                description={help.body}
                index={index}
                expands={expands}
                setExpands={setExpands}
              />
            );
          })}
        </div>
        <div className="layout-feature-img">
          <div>
            <img
              src={Send}
              style={{
                width: "22rem",
                transform: "translateY(1rem)",
              }}
            />
            <img
              src={Swap}
              style={{
                width: "24rem",
                position: "absolute",
                top: "6rem",
                right: "-17rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, description, setExpands, expands, index }) => {
  return (
    <div className="feature">
      <div
        className="feature-header title"
        onClick={() => {
          setExpands &&
            index !== undefined &&
            setExpands(
              expands.map((item, i) => {
                if (i == index) return !item;
                return false;
              }),
            );
        }}
      >
        <p>{title}</p>
        <img
          src={expands && expands[index] ? Minus : Plus}
          style={{
            width: "2rem",
          }}
        />
      </div>
      {expands && expands[index] && (
        <div className="feature-body sub-title">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

const IcoGroup = ({ icons }) => {
  return (
    <div className="ico-group">
      {icons.map((ico) => {
        return (
          <div className="ico-wrapper">
            <img src={ico} />
          </div>
        );
      })}
    </div>
  );
};

const WalletCard = ({
  color1,
  color2,
  icon,
  bgColor,
  name,
  address,
  balance,
  x,
  y,
  rot,
}) => {
  return (
    <div
      className="wallet-card"
      style={{
        transform: `translate(${x}, ${y}) rotate(${rot})`,
      }}
    >
      <div className="wallet-banner">
        <div
          className="logo-wrapper"
          style={{
            background: bgColor,
          }}
        >
          <img src={icon} />
        </div>
        <p>{name}</p>
        <div
          className="banner-back"
          style={{
            background: `radial-gradient(90% 80% at 20% 35%, ${color1}, ${color2})`,
          }}
        >
          <svg
            className="banner-back"
            width="134"
            height="159"
            viewBox="0 0 134 159"
          >
            <path
              d="M139.041 -84.7168C135.23 -68.0345 122.3 -21.182 101.061 32.7692C74.5133 100.208 46.6767 121.306 6.99764 103.404C-24.7456 89.0826 -23.1996 60.9586 -19.7008 47.8482C-14.5105 31.1731 9.37897 -7.06968 51.1638 10.2573C92.9486 27.5843 107.27 71.3332 75.1075 122.226C65.5278 138.814 41.3411 148.452 19.3375 156.761"
              stroke={color2}
              stroke-width="3"
            />
          </svg>
        </div>
      </div>
      <div className="wallet-body">
        <div>
          <p>Wallet address</p>
          <p
            style={{
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {address}{" "}
            <img src={Copy} style={{ width: "2rem", marginLeft: "1rem" }} />
          </p>
          <p>Balance</p>
          <p style={{ fontSize: "1.6rem" }}>{balance}</p>
        </div>
        <div className="detail">{`Wallet details >`}</div>
      </div>
    </div>
  );
};

const wallets = [
  {
    color1: "#42256d",
    color2: "#25506d",
    icon: NefentusLogo,
    bgColor: "#202020",
    name: "NEFENTUS",
    address: "0xf7635...d70D7",
    balance: "€5.478,35",
    x: "-2%",
    y: "10%",
    rot: "-20deg",
  },
  {
    color1: "#6e4418",
    color2: "#2b1b09",
    icon: MetamaskLogo,
    bgColor: "#202020",
    name: "MetaMask",
    address: "0xf7635...d70D7",
    balance: "€15.724,50",
    x: "359%",
    y: "179%",
    rot: "14deg",
  },
  {
    color1: "#12385c",
    color2: "#0c1c2b",
    icon: WalletconnectLogo,
    bgColor: "#e9e9e9",
    name: "Wallet Connect",
    address: "0xf7635...d70D7",
    balance: "€65125",
    x: "206%",
    y: "168%",
    rot: "-15deg",
  },
  {
    color1: "#0a4d5c",
    color2: "#0b252b",
    icon: BloctoLogo,
    bgColor: "#e9e9e9",
    name: "Blocto Wallet",
    address: "0xf7635...d70D7",
    balance: "€56",
    x: "130%",
    y: "20%",
    rot: "24deg",
  },
  {
    color1: "#0e2b75",
    color2: "#2e5266",
    icon: TrustLogo,
    bgColor: "#e9e9e9",
    name: "Trust Wallet",
    address: "0xf7635...d70D7",
    balance: "€162.478",
    x: "264%",
    y: "2%",
    rot: "-16deg",
  },
  {
    color1: "#143263",
    color2: "#3d4757",
    icon: CoinbaseLogo,
    bgColor: "#e9e9e9",
    name: "Coinbase",
    address: "0xf7635...d70D7",
    balance: "€5.478",
    x: "396%",
    y: "18%",
    rot: "10deg",
  },
];

const IcoCard = ({ icon, name, x, y }) => {
  return (
    <div
      className="ico-card"
      style={{
        top: `${y}rem`,
        left: `${x}rem`,
      }}
    >
      <img src={icon} />
      <p>{name}</p>
    </div>
  );
};

const Benefits = () => {
  return (
    <div className="layout-paragraph">
      <IcoGroup icons={[HeartSquare, Smile, HeartChecked]} />
      <Heading
        title={`Why your customers will love it`}
        subtitle={`Nefentus was designed with your customers' convenience in mind`}
      />
      <div className="layout-benefits">
        <div>
          {wallets.map((wallet) => {
            return <WalletCard {...wallet} />;
          })}
          <div className="outlook">
            <p>Hundreds of currencies, all Web3 wallets</p>
            <p className="sub-title">
              Customers can pay with their preferred wallet
              <br /> and currency across Bitcoin, Ethereum, and other networks
            </p>
          </div>
        </div>
        <div className="benefits">
          <div>
            <p>Pre-configured payment.</p>
            <div
              style={{
                background: "#202020",
                position: "absolute",
                top: "14rem",
                left: "7rem",
                width: "4.2rem",
                height: "4.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={NefentusLogo}
                style={{
                  width: "2.4rem",
                  height: "2.4rem",
                }}
              />
            </div>
            <img
              src={SendModalPng}
              style={{
                width: "45%",
                position: "absolute",
                right: "2rem",
                bottom: "0",
              }}
            />
            <IcoCard icon={WalletSvg} name={"Client's wallet"} x={35} y={5} />
            <IcoCard
              icon={ShoppingCartSvg}
              name={"Nefentus checkout"}
              x={3}
              y={10}
            />
            <IcoCard
              icon={CheckSquareSvg}
              name={"Payment data"}
              x={14}
              y={18}
            />
            <p className="sub-title">
              Commerce shares payment information directly with their wallet,
              removing any need for manual data entry.
            </p>
          </div>
          <div>
            <p>Online checkout</p>
            <img
              src={SuccessPng}
              style={{
                position: "absolute",
                width: "38%",
                border: "1px solid #202020",
                borderRadius: "0.4rem",
                transform: "translate(5rem, 6.4rem)",
              }}
            />
            <img
              src={CheckoutPng}
              style={{
                position: "absolute",
                width: "52%",
                border: "0.8rem solid #202020",
                borderRadius: "1.2rem",
                transform: "translate(26rem, -4rem) rotate(-16deg)",
              }}
            />
            <p className="sub-title">
              Integrate a ready-made payment page to your website and attract
              clients who prefer paying in crypto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: WalletSvg,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
  {
    icon: WalletSvg,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
  {
    icon: WalletSvg,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
];

const ScrollAnimation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("scroll position ----->", scrollPosition);
  }, [scrollPosition]);
  const betScroll = (from, to) =>
    scrollPosition > from && scrollPosition < to ? true : false;

  //   2260, 2927, 3927
  return (
    <div className="scroll-container">
      <div className="text-part">
        {features.map((item, i) => {
          return (
            <div className="feature-heading" id={`heading_${i}`}>
              <div className="ico-wrapper">
                <img src={item.icon} />
              </div>
              <p>{item.title}</p>
              <p className="sub-title">{item.subtitle}</p>
            </div>
          );
        })}
      </div>
      <div className="img-part">
        <img
          alt="scroll_image"
          className="image-transition"
          style={
            betScroll(2260, 2800)
              ? { opacity: 1, position: "sticky", top: "100px" }
              : { opacity: 0 }
          }
          src={Main1}
          width={500}
        />
        <img
          alt="scroll_image"
          className="image-transition"
          style={
            betScroll(2800, 3400)
              ? { opacity: 1, position: "sticky", top: "100px" }
              : { opacity: 0 }
          }
          src={Main2}
          width={500}
        />
        <img
          alt="scroll_image"
          className="image-transition"
          style={
            betScroll(3400, 3927)
              ? { opacity: 1, position: "sticky", top: "100px" }
              : { opacity: 0 }
          }
          src={Main3}
          width={500}
        />
      </div>
    </div>
  );
};

const MainFeatures = () => {
  return (
    <div className="layout-paragraph">
      <IcoGroup icons={[PC, Dollar, Chain]} />
      <Heading
        title={`Why your customers will love it`}
        subtitle={`Nefentus was designed with your customers' convenience in mind`}
      />
      <ScrollAnimation />
    </div>
  );
};

const industries = [
  {
    name: "Fitnesss",
    icon: FitnessSvg,
  },
  {
    name: "E-commerce",
    icon: ECommerceSvg,
  },
  {
    name: "Real Estate",
    icon: RealEstateSvg,
  },
  {
    name: "Technology and IT service",
    icon: ItTechSvg,
  },
  {
    name: "Finance and Accounting",
    icon: FinanceSvg,
  },
  {
    name: "Marcketing and Advertising",
    icon: MarketSvg,
  },
  {
    name: "Logistics and Transportation",
    icon: TransportSvg,
  },
  {
    name: "Restaurant and Food",
    icon: FoodSvg,
  },
];

const IndustryCard = ({ icon, name }) => {
  return (
    <div className="industry-card">
      <div className="ico-wrapper">
        <img src={icon} />
      </div>
      <p>{name}</p>
    </div>
  );
};

const Industries = () => {
  return (
    <div className="layout-paragraph layout-industry">
      <Heading
        title={`Industries we serve`}
        subtitle={`Small, medium, and large businesses in any niche. Whether offline or online, we will be useful to everyone.`}
      />
      <div class="slider">
        <div class="animation-wrapper">
          <div className="industry-wrapper1 move-right1">
            {industries.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
          <div className="industry-wrapper2 move-right2">
            {industries.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
        </div>
        <div class="animation-wrapper">
          <div className="industry-wrapper1 move-left1">
            {industries.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
          <div className="industry-wrapper2 move-left2">
            {industries.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const GettingStarted = () => {
  return (
    <div className="layout-paragraph layout-getting-started">
      <div
        style={{
          border: "1px solid #202020",
          borderRadius: "1rem",
          background: "#171717",
          width: "7.2rem",
          height: "7.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={NefentusLogo}
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
      <Heading
        title={`Start accepting payments in crypto right now`}
        subtitle={`Our support team will answer all your questions so you feel safe on your journey`}
      />
      <button>Get started</button>
    </div>
  );
};
