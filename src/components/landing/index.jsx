import "./landing.css";
import Hero1 from "../../assets/landing/hero1.png";
import Hero2 from "../../assets/landing/hero2.png";
import HeroLine1 from "../../assets/landing/hero-line-top-left.svg";
import HeroLine2 from "../../assets/landing/hero-line-bottom-left.svg";
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
import ConsultingSvg from "../../assets/landing/consulting.svg";
import DropshippingSvg from "../../assets/landing/dropshipping.svg";
import EducationSvg from "../../assets/landing/education.svg";
import FreelancingSvg from "../../assets/landing/freelancing.svg";
import HealthSvg from "../../assets/landing/health.svg";
import AccountingSvg from "../../assets/landing/accounting.svg";
import LegalServiceSvg from "../../assets/landing/legal-services.svg";
import MarketingSvg from "../../assets/landing/marketing.svg";
import SeoSvg from "../../assets/landing/seo-services.svg";
import TravelSvg from "../../assets/landing/travel-agency.svg";

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
        title={`Begin Crypto Payments Today`}
        subtitle={`Start accepting cryptocurrency payments immediately. Our dedicated support team is here to address all your inquiries, ensuring you feel secure every step of the way.`}
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
            Revolutionize Your Business with Crypto Payment Integration
          </h1>
          <p className="sub-title">
            Effortlessly generate & receive payments. Consolidate wallet
            management and streamline the sales process, all within a single
            platform.
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
      <hr
        style={{
          right: "24rem",
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
      <hr
        style={{
          right: "18rem",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          right: "42rem",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
      />
      <hr
        style={{
          top: "0",
          width: "100vw",
        }}
      />
    </div>
  );
};

export const Heading = ({ title, subtitle }) => {
  return (
    <div className="layout-title">
      <h1
        className="title"
        dangerouslySetInnerHTML={{ __html: title.replace("\n", "<br/>") }}
      ></h1>
      <p
        className="sub-title"
        dangerouslySetInnerHTML={{ __html: subtitle.replace("\n", "<br/>") }}
      ></p>
    </div>
  );
};

const helps = [
  {
    title: "Invoices",
    body: "Streamline your billing process with easy-to-create & track invoices. Generate invoices, monitor payment statuses and send reminders effortlessly.",
    element: <img src={Help2} style={{ width: "100%" }} />,
  },
  {
    title: "Product payment links",
    body: "Simplify transactions with direct product payment links. Provide customers with convenient payment options, ensuring seamless & secure purchases.",
    element: <img src={Help3} style={{ width: "100%" }} />,
  },
  {
    title: "Different ways to use cryptocurrency",
    body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
    element: <img src={Help1} style={{ width: "100%" }} />,
  },
  {
    title: "Sales analytics",
    body: "Gain valuable insights into your sales performance. Analyze key metrics, track trends and make informed decisions to optimize your business strategy & drive growth.",
    element: <img src={Help4} style={{ width: "100%" }} />,
  },
];

const Helps = () => {
  const [expands, setExpands] = useState(helps.map((_, index) => !index));

  return (
    <div className="layout-paragraph help">
      <Heading
        title={`Transform your business with our all-in-one cryptocurrency platform`}
        subtitle={`Empower your business with a comprehensive suite of cryptocurrency tools conveniently housed under one roof.`}
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
      <div
        className="vertical-dashed-line"
        style={{
          right: "0",
          top: "2rem",
          zIndex: "-1",
          height: "200%",
        }}
      />
      <div
        className="vertical-dashed-line hide-in-tablet"
        style={{
          right: "18rem",
          top: "0",
          height: "50%",
        }}
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
      <hr
        style={{
          left: "0",
          top: "0",
          height: "100%",
        }}
      />
      <div
        className="horizontal-dashed-line"
        style={{
          bottom: "16rem",
          width: "100vw",
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
        title={`Here's why your customers will love it`}
        subtitle={`Nefentus prioritizes your customers' convenience at every step.`}
      />
      <div className="layout-benefits">
        <div style={{ objectFit: "cover" }}>
          <img src={WalletsPng} style={{ height: "100%" }} />
          <div className="outlook">
            <p>Access a diverse range of currencies & wallets</p>
            <p className="sub-title">
              Customers have the flexibility to pay using their preferred wallet
              & currency, spanning across Bitcoin, Ethereum and numerous other
              networks.
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
            <p>
              Streamline Your Online{" "}
              <span style={{ textWrap: "nowrap" }}>Checkout Experience</span>
            </p>
            <img src={Benefit2} />
            <p className="sub-title">
              Easily complete payments online with a successful transaction of
              $5 via Payme. Integrate a pre-built payment page into your website
              to attract clients who favor cryptocurrency payments.
            </p>
          </div>
        </div>
      </div>

      <hr
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: "-1",
          height: "calc(100% - 16rem)",
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
          width: "100vw",
          bottom: "8rem",
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
    icon: ShoppingCartSvg,
    img: Main2,
    title: `Product creation`,
    subtitle: `Creating product payment links simplifies the purchasing process for your customers by allowing them to buy products directly through a unique, secure link.`,
  },
  {
    icon: Chain,
    img: Main3,
    title: `Insightful sales analytics`,
    subtitle: `Access a high-level summary of your key sales metrics, including total sales, total revenue, and number of transactions over selectable time periods (daily, weekly, monthly, etc.).`,
  },
];

const ScrollAnimation = () => {
  const [pos, setPos] = useState(0);

  const handleScroll = (e) => {
    const position =
      (100 * document.documentElement.scrollTop) /
      document.documentElement.offsetHeight;
    // console.log("scroll >", position);
    setPos(position < 51.2 ? 0 : position < 60 ? 1 : 2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-container container">
      <div className="text-part">
        {features.map((item, i) => {
          return (
            <div className="feature-heading">
              <div className="ico-wrapper">
                <img src={item.icon} />
              </div>
              <p>{item.title}</p>
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
          top: "calc(100vh - 58rem)",
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
        width: "100vw",
        borderBlock: "1px solid #343434",
        background: "#131313",
        overflow: "hidden",
      }}
    >
      <IcoGroup icons={[PC, Dollar, Chain]} />
      <Heading
        title={`Insightful dashboards`}
        subtitle={`Nefentus prioritizes customer convenience through thoughtfully designed dashboards`}
      />
      <hr
        style={{
          right: "25%",
          width: "1px",
          height: "100%",
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
      <div
        style={{
          left: "25%",
          height: "100%",
          top: "0",
          zIndex: "1",
        }}
        className="hide-in-tablet vertical-dashed-line"
      />
    </div>
  );
};
const MainFeaturesBody = () => {
  return (
    <div className="main-feature">
      <ScrollAnimation />
    </div>
  );
};

const industries_up = [
  {
    name: "Health and Wellness",
    icon: HealthSvg,
  },
  {
    name: "Travel agency",
    icon: TravelSvg,
  },
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
    name: "Finance and Accounting",
    icon: FinanceSvg,
  },
  {
    name: "Marcketing and Advertising",
    icon: MarketSvg,
  },
  {
    name: "Education and E-learning",
    icon: EducationSvg,
  },
  {
    name: "Technology and IT service",
    icon: ItTechSvg,
  },
];
const industries_down = [
  {
    name: "Dropshipping",
    icon: DropshippingSvg,
  },
  {
    name: "Freelancing",
    icon: FreelancingSvg,
  },
  {
    name: "Legal Services",
    icon: LegalServiceSvg,
  },
  {
    name: "Logistics and Transportation",
    icon: TransportSvg,
  },
  {
    name: "SEO services",
    icon: SeoSvg,
  },
  {
    name: "Accounting and tax services",
    icon: AccountingSvg,
  },
  {
    name: "Restaurant and Food",
    icon: FoodSvg,
  },
  {
    name: "Consulting",
    icon: ConsultingSvg,
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
        title={`Who we serve`}
        subtitle={`We cater to businesses of all sizes & industries, both online & offline, ensuring usefulness across the board.`}
      />
      <div class="slider">
        <div class="animation-wrapper">
          <div className="industry-wrapper1 move-right1">
            {industries_up.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
          <div className="industry-wrapper2 move-right2">
            {industries_up.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
        </div>
        <div
          class="animation-wrapper"
          style={{
            minWidth: "138rem",
          }}
        >
          <div className="industry-wrapper1 move-left1">
            {industries_down.map((ind) => {
              return <IndustryCard icon={ind.icon} name={ind.name} />;
            })}
          </div>
          <div className="industry-wrapper2 move-left2">
            {industries_down.map((ind) => {
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
          width: "100vw",
          bottom: "-1px",
        }}
      />
      <hr
        style={{
          width: "100vw",
          top: "-1px",
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
        <button>{button}</button>
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
