import "./landing.css";
import Hero1 from "../../assets/landing/hero1.png";
import Hero2 from "../../assets/landing/hero2.png";
import HeroLine1 from "../../assets/landing/hero-line-top-left.svg";
import HeroLine2 from "../../assets/landing/hero-line-bottom-left.svg";
import VerticalLine from "../../assets/landing/hero lines 2.svg";
import VerticalDashedLine from "../../assets/landing/VerticalDashedLine.svg";
import HorizontalDashedLine from "../../assets/landing/HorizontalDashedLine.svg";
import DashedLine from "../../assets/landing/DashedLine.svg";
import BlueLine from "../../assets/landing/BlueLine.svg";
import Plus from "../../assets/landing/plus.svg";
import Minus from "../../assets/landing/minus.svg";
import Help1 from "../../assets/landing/help 1.png";
import Help2 from "../../assets/landing/help 2.png";
import Help3 from "../../assets/landing/help 3.png";
import Help4 from "../../assets/landing/help 4.png";
import WalletsPng from "../../assets/landing/wallets.png";
import Benefit1 from "../../assets/landing/benefit 1.png";
import Benefit2 from "../../assets/landing/benefit 2.png";
import ServiceLine1 from "../../assets/landing/service line left.svg";
import ServiceLine2 from "../../assets/landing/service line right.svg";
import GettingStarted1 from "../../assets/landing/started left.svg";
import GettingStarted2 from "../../assets/landing/started right.svg";
import HeartSquare from "../../assets/landing/heart-square.svg";
import HeartChecked from "../../assets/landing/heart-checked.svg";
import Smile from "../../assets/landing/smile.svg";
import PC from "../../assets/landing/pc.svg";
import Dollar from "../../assets/landing/dollar.svg";
import Chain from "../../assets/landing/chain.svg";
import NefentusLogo from "../../assets/logo/logo.svg";
import WalletSvg from "../../assets/landing/wallet.svg";
import ShoppingCartSvg from "../../assets/landing/shopping-cart.svg";
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

const Landing = () => {
  return (
    <div className="landing-layout home container">
      <Hero />

      <Logos />

      <Helps />

      <Benefits />

      <MainFeaturesHead />

      <MainFeaturesBody />

      <Industries />

      <Conclusion
        icon={NefentusLogo}
        title={`Start accepting payments in crypto right now`}
        subtitle={`Our support team will answer all your questions so you feel safe on your journey`}
        button={`Get Started`}
      />
    </div>
  );
};

export default Landing;

const Hero = () => {
  return (
    <div className="layout-paragraph hero">
      <img
        src={HeroLine1}
        style={{
          top: "0",
          width: "91%",
        }}
        className="translate-left"
      />
      <img
        src={HeroLine2}
        style={{
          bottom: "0",
          width: "91%",
        }}
        className="translate-left"
      />
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
            Create and receive payments. Manage all wallets and the sales
            process in one place.
          </p>
          <a href="/signup">
            <button>Get Started</button>
          </a>
        </div>
        <div className="hero-img">
          <img src={Hero1} />
          <img src={Hero2} />
        </div>
      </div>
      <img
        src={VerticalLine}
        style={{
          right: "24rem",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "0",
          bottom: "0",
          height: "100%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "18rem",
          bottom: "0",
          height: "100%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "42rem",
          bottom: "0",
          height: "100%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          position: "absolute",
          top: "0",
          width: "100vw",
          border: "1px solid #202020",
        }}
      />
    </div>
  );
};

export const Heading = ({ title, subtitle }) => {
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
    element: <img src={Help2} style={{ width: "100%" }} />,
  },
  {
    title: "Product payment links",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
    element: <img src={Help3} style={{ width: "100%" }} />,
  },
  {
    title: "All types of financial transactions with cryptocurrency",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
    element: <img src={Help1} style={{ width: "100%" }} />,
  },
  {
    title: "Analytics of your sales",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
    element: <img src={Help4} style={{ width: "100%" }} />,
  },
];

const Helps = () => {
  const [expands, setExpands] = useState(helps.map((_, index) => !index));

  return (
    <div className="layout-paragraph help">
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
                element={help.element}
                expands={expands}
                setExpands={setExpands}
              />
            );
          })}
        </div>
        <div className="layout-feature-img">
          {helps.map((help, index) => {
            return expands[index] ? help.element : null;
          })}
        </div>
      </div>
      <img
        src={VerticalDashedLine}
        style={{
          position: "absolute",
          right: "0",
          top: "2rem",
          zIndex: "-1",
        }}
      />
      <img
        src={DashedLine}
        style={{
          position: "absolute",
          right: "18rem",
          top: "0",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={BlueLine}
        style={{
          position: "absolute",
          right: "18rem",
          top: "28rem",
          zIndex: "1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={BlueLine}
        style={{
          position: "absolute",
          left: "0",
          top: "10rem",
          zIndex: "1",
        }}
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          height: "100%",
          zIndex: "-1",
        }}
      />
      <img
        src={HorizontalDashedLine}
        style={{
          position: "absolute",
          bottom: "16rem",
          zIndex: "-1",
        }}
      />
    </div>
  );
};

const Feature = ({
  title,
  description,
  element,
  setExpands,
  expands,
  index,
}) => {
  return (
    <div className="feature">
      <div
        className="feature-header title"
        onClick={() => {
          setExpands &&
            !expands[index] &&
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
          <div className="feature-img">{element}</div>
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

const Benefits = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        borderTop: "1px solid #202020",
        paddingTop: "5rem",
      }}
    >
      <IcoGroup icons={[HeartSquare, Smile, HeartChecked]} />
      <Heading
        title={`Why your customers will love it`}
        subtitle={`Nefentus was designed with your customers' convenience in mind`}
      />
      <div className="layout-benefits">
        <div style={{ objectFit: "cover" }}>
          <img src={WalletsPng} style={{ height: "100%" }} />
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
            <img src={Benefit1} />
            <p className="sub-title">
              Commerce shares payment information directly with their wallet,
              removing any need for manual data entry.
            </p>
          </div>
          <div>
            <p>Online checkout</p>
            <img src={Benefit2} />
            <p className="sub-title">
              Integrate a ready-made payment page to your website and attract
              clients who prefer paying in crypto
            </p>
          </div>
        </div>
      </div>

      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: "-1",
        }}
      />
      <img
        src={BlueLine}
        style={{
          position: "absolute",
          left: "0",
          top: "6rem",
          zIndex: "1",
        }}
      />
      <hr
        style={{
          border: "1px solid #202020",
          width: "100vw",
          position: "absolute",
          bottom: "8rem",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
    </div>
  );
};

const features = [
  {
    icon: WalletSvg,
    img: Main1,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
  {
    icon: WalletSvg,
    img: Main2,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
  {
    icon: WalletSvg,
    img: Main3,
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
];

const ScrollAnimation = () => {
  const [pos, setPos] = useState(0);

  const handleScroll = (e) => {
    const position =
      (100 * document.documentElement.scrollTop) /
      document.documentElement.offsetHeight;
    console.log("scroll >", position);
    setPos(position < 51.2 ? 0 : position < 60 ? 1 : 2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
              <img
                src={HorizontalDashedLine}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "-32rem",
                }}
                className="hide-in-tablet"
              />
              <hr
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "200vw",
                  left: "-32rem",
                  border: "1px solid #202020",
                }}
                className="hide-in-tablet"
              />
              <p className="sub-title">{item.subtitle}</p>
              <img src={item.img} />
            </div>
          );
        })}
      </div>
      <div
        className="img-part"
        style={{
          position: "sticky",
          top: "20rem",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <img
            className="image-transition"
            style={{ opacity: pos == 0 ? "1" : "0" }}
            src={Main1}
          />
          <img
            className="image-transition"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              opacity: pos == 1 ? "1" : "0",
            }}
            src={Main2}
          />
          <img
            className="image-transition"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              opacity: pos == 2 ? "1" : "0",
            }}
            src={Main3}
          />
        </div>
      </div>
    </div>
  );
};

const MainFeaturesHead = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        marginTop: "8rem",
        paddingBlock: "5rem",
        background: "#171717",
        width: "100vw",
        borderBlock: "1px solid #343434",
        overflow: "hidden",
      }}
    >
      <IcoGroup icons={[PC, Dollar, Chain]} />
      <Heading
        title={`Why your customers will love it`}
        subtitle={`Nefentus was designed with your customers' convenience in mind`}
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "25%",
          width: "2px",
          top: "0",
          zIndex: "1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={BlueLine}
        style={{
          position: "absolute",
          right: "25%",
          top: "6rem",
          zIndex: "1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalDashedLine}
        style={{
          position: "absolute",
          left: "25%",
          width: "2px",
          top: "0",
          zIndex: "1",
        }}
        className="hide-in-tablet"
      />
    </div>
  );
};
const MainFeaturesBody = () => {
  return (
    <div className="layout-paragraph main-feature">
      <ScrollAnimation />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          height: "101%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          bottom: "0",
          right: "63%",
          height: "101%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          position: "absolute",
          bottom: "0",
          width: "200vw",
          left: "-32rem",
          border: "1px solid #202020",
        }}
        className="hide-in-tablet"
      />
    </div>
  );
};

const industries = [
  //   {
  //     name: "Fitnesss",
  //     icon: FitnessSvg,
  //   },
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
  //   {
  //     name: "Logistics and Transportation",
  //     icon: TransportSvg,
  //   },
  //   {
  //     name: "Restaurant and Food",
  //     icon: FoodSvg,
  //   },
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
      <img
        src={ServiceLine1}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "42%",
          zIndex: "1",
        }}
      />
      <img
        src={ServiceLine2}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          width: "36%",
          zIndex: "1",
        }}
      />
      <hr
        style={{
          border: "1px solid #202020",
          width: "100vw",
          position: "absolute",
          bottom: "0",
        }}
      />
      <hr
        style={{
          border: "1px solid #202020",
          width: "100vw",
          position: "absolute",
          top: "0",
        }}
      />
    </div>
  );
};

export const Conclusion = ({ icon, title, subtitle, button }) => {
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
          boxShadow: "5px 5px 32px #070707",
        }}
      >
        <img
          src={icon}
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
      <Heading title={title} subtitle={subtitle} />
      <a href="/signup">
        <button>Get Started</button>
      </a>

      <img
        src={GettingStarted1}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "40%",
          zIndex: "1",
        }}
      />
      <img
        src={GettingStarted2}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          width: "40%",
          zIndex: "1",
        }}
      />
    </div>
  );
};
