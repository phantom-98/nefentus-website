import "./landing.css";
import RightArrow from "../../assets/icon/right-arrow.svg";
import Hero1 from "../../assets/landing/hero1.png";
import Hero2 from "../../assets/landing/hero2.png";
import AudienceImg from "../../assets/landing/audience.png";
import ManageCrypto from "../../assets/landing/manage-crypto.png";
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
import Benefit2 from "../../assets/landing/benefit 2.svg";
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
import SeoSvg from "../../assets/landing/seo-services.svg";
import TravelSvg from "../../assets/landing/travel-agency.svg";
import SendSvg from "../../assets/landing/send-ico.svg";

import Telegram from "../../assets/icon/telegram.svg";
import Linkedin from "../../assets/icon/in.svg";
import Twitter from "../../assets/icon/x.svg";
import TalkTo from "../../assets/icon/notification-message.svg";

import Main1 from "../../assets/landing/main1.png";
import Main2 from "../../assets/landing/main2.png";
import Main3 from "../../assets/landing/main3.png";
import Logos from "../../components/logos/logos";

import { useEffect, useState } from "react";
import { Flex } from "antd";
import CommonButton from "../commonButton";

const HomeBody = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("ref")) {
      const paramValue = urlParams.get("ref");
      localStorage.setItem("affiliate", paramValue);
    }
  }, []);

  return (
    <div className="landing-layout home container">
      <Hero />

      <Logos />

      <Helps />

      <CryptoManage />

      <Benefits />

      <MainFeaturesHead />

      <MainFeaturesBody />

      <Industries />

      <Community />

      {/* <Audience /> */}
      <FAQ />

      {/* <Conclusion
        icon={NefentusLogo}
        title={`Begin Crypto Payments Today`}
        subtitle={`Start accepting cryptocurrency payments immediately. Our dedicated support team is here to address all your inquiries, ensuring you feel secure every step of the way.`}
        button={`Get Started`}
      /> */}
    </div>
  );
};

export default HomeBody;

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
        alt="Banner lines"
      />
      <img
        src={HeroLine2}
        style={{
          bottom: "0",
          width: "91%",
        }}
        className="translate-left"
        alt="Banner bottom lines"
      />
      <div className="layout-horizontal">
        <div className="hero-layout">
          <h1 className="title">
            Reach more customers with{" "}
            <span className="gradient">seamless crypto invoicing </span>
          </h1>
          <p className="sub-title">
            Leading the way in mass adoption, our invoicing tool helps
            businesses easily transition into digital assets. Free to start, no
            onboarding fees – seamless crypto payments for businesses of any
            size!
          </p>
          <div className="button-container">
            <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
              <button>Get Started</button>
            </a>
            <a href="/business-support">
              <span>Talk to an expert</span>
              <img src={RightArrow} alt="Right arrow" />
            </a>
          </div>
        </div>
        <div className="hero-img">
          <img src={Hero1} alt="Payment details on Nefentus" />
          <img src={Hero2} alt="Cryptocurrency payments on Nefentus" />
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
    element: <img src={Help2} style={{ width: "100%" }} alt="Invoices" />,
  },
  {
    title: "Product payment links",
    body: "Simplify transactions with direct product payment links. Provide customers with convenient payment options, ensuring seamless & secure purchases.",
    element: (
      <img
        src={Help3}
        style={{ width: "100%" }}
        alt="Create products on Nefentus"
      />
    ),
  },
  // Discussed to remove it on 25 Oct 2024
  // {
  //   title: "Different ways to use cryptocurrency",
  //   body: "Buying and Selling Cryptocurrency: This involves exchanging fiat currency or other cryptocurrencies for a specific digital currency or token. Trading on Exchanges: Traders buy and sell cryptocurrencies on various digital asset exchanges to capitalize on price fluctuations and market trends. Peer-to-Peer Transactions: Users can directly transfer cryptocurrencies to one another without the need for intermediaries, utilizing blockchain technology.",
  //   element: (
  //     <img
  //       src={Help1}
  //       style={{ width: "100%" }}
  //       alt="Send and swap cryptocurrency"
  //     />
  //   ),
  // },
  {
    title: "Sales analytics",
    body: "Gain valuable insights into your sales performance. Analyze key metrics, track trends and make informed decisions to optimize your business strategy & drive growth.",
    element: (
      <img src={Help4} style={{ width: "100%" }} alt="Sales analytics" />
    ),
  },
];

export const Helps = () => {
  const [expands, setExpands] = useState(helps.map((_, index) => !index));

  return (
    <div className="layout-paragraph help">
      <Heading
        title={`Transform your business with \n our all-in-one cryptocurrency platform`}
        subtitle={`Empower your business with a comprehensive suite of cryptocurrency tools conveniently housed under one roof.`}
      />
      <div className="layout-horizontal layout-help">
        <div className="layout-feature help-subcontainer">
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
    </div>
  );
};

export const CryptoManage = () => {
  return (
    <div className="layout-paragraph">
      <div className="layout-horizontal layout-manage">
        <div className="manage-title-layout">
          <h1 className="title">Manage your crypto on the go with our app</h1>
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
              <CommonButton text={"Download App"} type={"primary"} />
            </a>
          </div>
        </div>
        <div className="manage-img">
          <img src={ManageCrypto} alt="Manage crypto currency using Nefentus" />
        </div>
      </div>
      <hr
        style={{
          left: "0",
          bottom: "0",
          height: "100%",
        }}
        className="hide-in-tablet"
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
          alt="icon"
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
            <img src={ico} alt="icon" />
          </div>
        );
      })}
    </div>
  );
};

export const Benefits = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        borderTop: "1px solid #202020",
        padding: "5rem",
      }}
    >
      <IcoGroup icons={[HeartSquare, Smile, HeartChecked]} />
      <Heading
        title={`Here's why your customers <span style="text-wrap: nowrap">will love it</span>`}
        subtitle={`Nefentus prioritizes your customers' convenience at every step.`}
      />
      <div className="layout-benefits">
        <div style={{ objectFit: "cover", borderRadius: "16px" }}>
          <img
            src={WalletsPng}
            style={{ height: "100%", width: "100%" }}
            alt="Wallets for cryptocurrency"
          />
          <div className="outlook">
            <p>Access a diverse range of currencies & wallets</p>
            <p className="sub-title crypto-wallet-subtext">
              Customers have the flexibility to pay using their preferred wallet
              & currency, spanning across Bitcoin, Ethereum and numerous other
              networks.
            </p>
          </div>
        </div>
        <div className="benefits">
          <div style={{ borderRadius: "16px" }}>
            <p>Pre-configured payment.</p>
            <img src={Benefit1} alt="Pre configured payments using Nefentus" />
            <p className="sub-title">
              Commerce shares payment information directly with their wallet,
              removing any need for manual data entry.
            </p>
          </div>
          <div style={{ borderRadius: "16px" }}>
            <img src={Benefit2} alt="Cryptocurrency checkout" />
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
        alt="line"
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
    alt: "Wallets management",
    title: `Multi-wallet management`,
    subtitle: `Hundreds of currencies, all Web3 wallets. Customers can pay with their preferred wallet and currency across Bitcoin, Ethereum, and other networks`,
  },
  {
    icon: ShoppingCartSvg,
    img: Main2,
    alt: "Purchase products using Nefentus",
    title: `Product creation`,
    subtitle: `Creating product payment links simplifies the purchasing process for your customers by allowing them to buy products directly through a unique, secure link.`,
  },
  {
    icon: Chain,
    img: Main3,
    alt: "Track Sales using Nefentus",
    title: `Insightful sales analytics`,
    subtitle: `Access a high-level summary of your key sales metrics, including total sales, total revenue, and number of transactions over selectable time periods (daily, weekly, monthly, etc.).`,
  },
];

const ScrollAnimation = () => {
  const [pos, setPos] = useState(0);

  const handleScroll = (e) => {
    let scrollPercentage =
      (100 * document.documentElement.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    if (window.innerWidth <= 1300) scrollPercentage += 5;
    // else if (window.innerWidth <= 1920) scrollPercentage += 3;
    setPos(scrollPercentage < 52.5 ? 0 : scrollPercentage < 59 ? 1 : 2);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="scroll-wrapper" className="scroll-container container">
      <div className="text-part">
        {features.map((item, i) => {
          return (
            <div className="feature-heading">
              <div className="ico-wrapper">
                <img src={item.icon} alt={"icon"} />
              </div>
              <p>{item.title}</p>
              <p className="sub-title">{item.subtitle}</p>
              <img src={item.img} alt={item.alt} />
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
        <div
          style={{ position: "relative", width: "100%", overflow: "hidden" }}
        >
          <img
            className="image-transition dashboard-image-container"
            style={{ opacity: pos == 0 ? "1" : "0" }}
            src={Main1}
            alt="Image transition"
          />
          <img
            className="image-transition dashboard-image-container"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              opacity: pos == 1 ? "1" : "0",
            }}
            src={Main2}
            alt="Image transition"
          />
          <img
            className="image-transition dashboard-image-container"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              opacity: pos == 2 ? "1" : "0",
            }}
            src={Main3}
            alt="Image transition"
          />
        </div>
      </div>
    </div>
  );
};

export const MainFeaturesHead = () => {
  return (
    <div className="layout-paragraph main-feature-head">
      <IcoGroup icons={[PC, Dollar, Chain]} />
      <Heading
        title={`Insightful dashboards`}
        subtitle={`Nefentus prioritizes customer convenience through thoughtfully designed dashboards`}
      />
    </div>
  );
};
export const MainFeaturesBody = () => {
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
        <img src={icon} alt="Nefentus services" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export const Industries = () => {
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
    </div>
  );
};

const communities = [
  {
    icon: Telegram,
    title: "Telegram",
    subtitle:
      "Join our Telegram community for real-time updates, support, and discussions on integrating cryptocurrency payments into your business.",
    link: "https://t.me/nefentus",
  },
  {
    icon: Linkedin,
    title: "Linkedin",
    subtitle:
      "Connect with us on LinkedIn for professional insights, industry updates, and networking opportunities.",
    link: "https://cy.linkedin.com/company/nefentuspay",
  },
  {
    icon: Twitter,
    title: "Twitter",
    subtitle:
      "Follow us on Twitter for the latest news, updates, and insights on cryptocurrency payments. Stay informed about new features, industry trends.",
    link: "https://x.com/nefentusapp",
  },
  {
    icon: TalkTo,
    title: "Talk to an expert",
    subtitle:
      "Get personalized advice and insights from our knowledgeable team to help you seamlessly integrate cryptocurrency payments into your business.",
    link: "/business-support",
  },
];

export const Community = () => {
  return (
    <div className="layout-paragraph layout-community">
      <Heading
        title={`Join Our Community`}
        subtitle={`Become a part of our vibrant community of like-minded individuals and businesses. Together, we can learn, grow, and lead the future of digital finance.`}
      />
      <div className="community-container">
        {communities.map((com) => (
          <a className="community" href={com.link}>
            <img src={com.icon} alt={`${com.title} icon`} />
            <div className="community-body">
              <h3>
                {com.title} <img src={SendSvg} alt="Send icon" />
              </h3>
              <p>{com.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Conclusion = ({
  icon,
  title,
  subtitle,
  button = "Get Started",
}) => {
  return (
    <div id="conclusion" className="layout-paragraph layout-getting-started">
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
          alt="icon"
        />
      </div>
      <Heading title={title} subtitle={subtitle} />
      <div className="button-container">
        <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
          <button>{button}</button>
        </a>
        <a href="/business-support">
          <span>Talk to an expert</span>
          <img src={RightArrow} alt="icon" />
        </a>
      </div>

      <img
        src={GettingStarted1}
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "40%",
          zIndex: "1",
        }}
        alt="icon"
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
        alt="icon"
      />
    </div>
  );
};

export const Audience = () => {
  return (
    <div className="layout-paragraph audience">
      <div className="layout-horizontal">
        <div className="hero-layout audience-layout">
          <h1 className="title">
            We've earned the trust of over 10,000 active users worldwide.
          </h1>
          <p className="sub-title audience-sub-title">
            Join them and be a part of the Nefentus community to providing a
            seamless and secure experience.
          </p>
          <div className="button-container">
            <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
              <CommonButton text={"Get started"} type={"primary"} />
            </a>
            <a href="/business-support">
              <span>Talk to an expert</span>
              <img src={RightArrow} alt="icon" />
            </a>
          </div>
        </div>
        <div className="audience-img">
          <img src={AudienceImg} alt="Nefentus users" />
        </div>
      </div>
      <hr
        style={{
          top: "0",
          width: "100vw",
        }}
      />
    </div>
  );
};

const FAQList = [
  {
    title: "How does Nefentus crypto invoicing platform work?",
    body: "Our platform allows you to create and send invoices that your customers can pay using a variety of cryptocurrencies. Payments are processed seamlessly, and you can track everything from one dashboard.",
    element: null,
  },
  {
    title: "Is it complicated to set up?",
    body: "Not at all! You can get started in minutes with no onboarding fees or monthly costs. It's designed to be user-friendly for businesses of any size.",
    element: null,
  },
  {
    title: "Do I need to understand cryptocurrencies to use the platform?",
    body: "No prior knowledge is needed. Our platform simplifies the process, so even if you're new to crypto, you can easily accept payments without any hassle.",
    element: null,
  },
  {
    title: "What cryptocurrencies do Nefentus support?",
    body: "We support a wide range of popular cryptocurrencies, including Bitcoin, Ethereum, and stablecoins, allowing your customers flexibility in how they pay.",
    element: null,
  },
  {
    title: "Are there any hidden fees?",
    body: "No hidden fees! We offer a transparent pricing model with zero monthly charges and no onboarding costs.",
    element: null,
  },
];

export const FAQ = () => {
  const [expands, setExpands] = useState(FAQList.map((_, index) => !index));
  return (
    <Flex
      gap={20}
      className="faq-container"
      align={"flex-start"}
      justify={"center"}
    >
      <Flex vertical gap={16}>
        <div className="faq-first-section">FAQ</div>
        <div className="faq-first-section-text">
          {" "}
          Everything you need to know about the product.
          <br /> Can't find the answer you're looking for?
          <span className="faq-contact-text">
            {" "}
            Please chat to our friendly team
          </span>
        </div>
      </Flex>

      <Flex vertical align={"flex-start"} className="faq-list">
        {FAQList.map((help, index) => {
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
      </Flex>
    </Flex>
  );
};
