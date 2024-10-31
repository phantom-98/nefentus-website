import { Audience, Conclusion, Heading } from ".";
import "./landing.css";
import RightArrow from "../../assets/icon/right-arrow.svg";
import ManageCrypto from "../../assets/landing/manage-crypto.png";
import APIBlockPng1 from "../../assets/landing/b2b-api-block1.png";
import APIBlockPng2 from "../../assets/landing/b2b-api-block2.png";
import WorldPng from "../../assets/landing/world.png";
import NefentusLogo from "../../assets/logo/logo.svg";
import HeroLineTop from "../../assets/landing/b2c-hero-top.svg";
import HeroLineBottom from "../../assets/landing/b2c-hero-down.svg";
import HeroPng from "../../assets/landing/b2b-hero.png";
import Invoicing1Png from "../../assets/landing/b2b-invoice1.png";
import Invoicing2Png from "../../assets/landing/b2b-invoice2.png";
import Invoicing3Png from "../../assets/landing/b2b-invoice3.png";
import Invoicing4Png from "../../assets/landing/b2b-invoice4.png";
import Product1Png from "../../assets/landing/b2b-product1.png";
import Product2Png from "../../assets/landing/b2b-product2.png";
import Product3Png from "../../assets/landing/b2b-product3.png";
import AnalyticsPng from "../../assets/landing/b2b-analytics.png";
import Security1Png from "../../assets/landing/security1.png";
import Security2Png from "../../assets/landing/security2.png";
import Security3Png from "../../assets/landing/security3.png";
import CreateSvg from "../../assets/landing/create.svg";
import EmailSvg from "../../assets/landing/email.svg";
import TrackingSvg from "../../assets/landing/tracking.svg";
import CheckoutSvg from "../../assets/landing/checkout.svg";
import SafeSvg from "../../assets/landing/safe.svg";
import CheckSvg from "../../assets/landing/checkmark.svg";
import ShoppingCartSvg from "../../assets/landing/shopping-cart.svg";
import Dollar from "../../assets/landing/dollar.svg";
import SwapIcon from "../../assets/landing/swap-ico.svg";
import { useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import CommonButton from "../commonButton";

const B2BBody = () => {
  const b2bContainer = useRef();

  useEffect(() => {
    const href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1,
    );
    setTimeout(() => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView();
      }
    }, 500);
  }, []);

  return (
    <div>
      <div
        className="landing-layout container b2b"
        style={{
          gap: "4rem",
        }}
        ref={b2bContainer}
      >
        <HeroB2B />

        <World />

        <Invoicing />

        <CryptoPayment />

        <Product />

        <APIBlock />

        <Safe />

        <Analytics />

        <Security />

        <B2BCryptoManage />

        <Audience />
      </div>
    </div>
  );
};

export default B2BBody;

export const HeroB2B = () => {
  return (
    <div
      id="hero"
      className="layout-paragraph hero b2b-banner"
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
            Streamlined <span className="gradient">crypto </span>
            invoicing
          </h1>
          <p className="sub-title">
            Simplify invoicing, centralize your wallets, and boost your sales
            efficiency—get it all done on one powerful platform.
          </p>
          <Flex gap={"2rem"} className="button-container">
            <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
              <CommonButton text={"Get started"} type={"primary"} />
            </a>
            <a href="/business-support">
              <span className="talk-to-expert default-text">
                Talk to an expert
              </span>
              <img src={RightArrow} alt="Right arrow" />
            </a>
          </Flex>
        </div>
        <img
          src={HeroPng}
          className="hero-img"
          style={{
            width: "50%",
          }}
          alt="Payment details on Nefentus"
        />
      </div>
      {/* <img
        src={HeroLineTop}
        style={{
          position: "absolute",
          top: "0",
          width: "80%",
          left: "-10rem",
        }}
        alt="Background lines"
      />
      <img
        src={HeroLineBottom}
        style={{
          bottom: "0",
          width: "70%",
        }}
        className="translate-left"
        alt="Background lines"
      />
      <hr
        style={{
          right: "calc(25% + 0.92rem)",
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
          height: "100%",
          right: "calc(25% - 1.3rem)",
          bottom: "0",
        }}
        className="hide-in-tablet vertical-dashed-line"
      />
      <hr
        style={{
          right: "50%",
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
      <hr
        style={{
          bottom: "0",
          width: "100vw",
        }}
        className="hide-in-tablet"
      /> */}
    </div>
  );
};

const steps = [
  {
    icon: CreateSvg,
    abbr: `New Invoice`,
    title: `Generate a new invoice`,
    subtitle: `Our system creates the invoice & assigns a unique number if needed. Simply review the details for accuracy`,
    img: Invoicing1Png,
  },
  {
    icon: EmailSvg,
    abbr: `Share Invoice`,
    title: `Email invoices instantly`,
    subtitle: `Send invoices directly from our platform, download them as PDFs or share a link`,
    img: Invoicing2Png,
  },
  {
    icon: TrackingSvg,
    abbr: `Track Payment`,
    title: `Track payments effortlessly`,
    subtitle: `Monitor invoice status (paid, pending, overdue) & receive notifications for any changes.`,
    img: Invoicing3Png,
  },
  {
    icon: CheckoutSvg,
    abbr: `Post-Payment`,
    title: `Post-Payment Actions`,
    subtitle: `Quickly generate & send receipts to your clients after payment.`,
    img: Invoicing4Png,
  },
];

export const World = () => {
  return (
    <div className="layout-paragraph world">
      <div className="layout-world">
        <div className="world-title-layout">
          <h1 className="title">Over 580M crypto owners worldwide</h1>
          <p className="sub-title">
            As of 2024, the global cryptocurrency community has grown to over
            580 million users. This number could reach over 1 billion in the
            coming years.
          </p>
          <p className="sub-title">
            By accepting crypto payments, your business can unlock the potential
            of connecting with millions of new customers globally.
          </p>
        </div>
        <div className="world-img">
          <img src={WorldPng} alt="Worldwide crypto payments" />
        </div>
      </div>
    </div>
  );
};

export const Invoicing = () => {
  const [step, setStep] = useState(steps.map((_, i) => !i));
  const timeRef = useRef();
  const updateProgress = () => {
    setStep((prev) => {
      const id = step.findIndex((item) => item == true);
      step[id] = false;
      step[(id + 1) % step.length] = true;
      return [...step];
    });
  };
  const start = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(updateProgress, 5000);
  };
  useEffect(() => {
    start();
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  return (
    <div id="invoicing" className="layout-paragraph b2b-invoice-section">
      <Heading
        title={`Effortless invoice creation`}
        subtitle={`Use our built-in wallet or link an unlimited number of external wallets for seamless transactions.`}
      />
      <div className="invoicing-step-container" style={{ display: "none" }}>
        {steps.map((item, id) => (
          <div
            className={`step-invoicing ${step[id] && "step-invoicing-visible"}`}
          >
            <p style={{ fontSize: "1.6rem", color: "#e9e9e9" }}>{item.title}</p>
            <p style={{ fontSize: "1.2rem", color: "#b1b1b1" }}>
              {item.subtitle}
            </p>
          </div>
        ))}
        <div className="invoicing-tab-container">
          {steps.map((item, id) => (
            <div
              className={`invoicing-tab ${
                step[id] && "invoicing-tab-selected"
              }`}
              onClick={() => {
                !step[id] &&
                  id !== undefined &&
                  setStep(
                    step.map((s, i) => {
                      if (i == id) return !s;
                      return false;
                    }),
                  );
                clearInterval(timeRef.current);
              }}
            >
              <img src={item.icon} alt={item.abbr} />
              <p>{item.abbr}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="layout-invoicing">
        <div className="invoicing-step-wrapper">
          {steps.map((item, id) => (
            <div
              className={`invoicing-step ${
                step[id] && "invoicing-step-selected"
              }`}
              onClick={() => {
                !step[id] &&
                  id !== undefined &&
                  setStep(
                    step.map((s, i) => {
                      if (i == id) return !s;
                      return false;
                    }),
                  );
                clearInterval(timeRef.current);
              }}
            >
              <img src={item.icon} alt={item.abbr} />
              <p>{item.title}</p>
              <p className="sub-title">{item.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="invoicing-img">
          {steps.map((item, id) => (
            <img
              className={step[id] && "visible"}
              src={item.img}
              alt={item.abbr}
            />
          ))}
        </div>
        <hr
          style={{
            top: "0",
            width: "100vw",
          }}
        />
        <hr
          style={{
            bottom: "1px",
            width: "100vw",
          }}
        />
      </div>
    </div>
  );
};
const products = [
  {
    title: `Create product`,
    subtitle: `Fill out a simple form with product details like name, description, category & optional tags.`,
    img: Product1Png,
    alt: "Create product using Nefentus",
  },
  {
    title: `Explore the product catalog`,
    subtitle: `Clients can browse, filter & sort products by categories, price and other attributes.`,
    img: Product2Png,
    alt: "Explore product using Nefentus",
  },
  {
    title: `Seamless checkout`,
    subtitle: `Clients enter billing & shipping info. The system shows the payment amount in their chosen cryptocurrency and provides a wallet address or QR code for easy payment.`,
    img: Product3Png,
    alt: "Seamless checkout using Nefentus",
  },
];

const CryptoPayment = () => {
  return (
    <Flex
      justify={"space-between"}
      gap={"6rem"}
      className="crypto-payment-container"
    >
      <Flex vertical gap={32} className="crypto-payment-first-block">
        <div className="crypto-payment-title">
          Crypto payments are borderless and limitless
        </div>
        <Flex vertical gap={24}>
          <Flex vertical gap={12}>
            <p className="crypto-payment-subtext crypto-payment-subtext1">
              Unlike traditional banking, crypto transactions operate 24/7
              without restrictions on the amount.
            </p>
            <p className="crypto-payment-subtext crypto-payment-subtext2">
              They cannot be blocked or reversed, as every blockchain
              transaction is final by design.
            </p>
          </Flex>
          <Flex className="crypto-payment-subtext" vertical gap={12}>
            <li>99.9% acceptance rate</li>
            <li>No chargebacks or rolling reserves</li>
            <li>Unlimited transaction amounts</li>
          </Flex>
        </Flex>
      </Flex>

      <Flex vertical gap={"2rem"} className="crypto-payment-second-block">
        <div className="best-suited">Best suited for:</div>
        <Flex vertical gap={12} className="best-suited-list">
          <li className="sub-title">Software Development</li>
          <li className="sub-title">Travel</li>
          <li className="sub-title">Real Estate</li>
          <li className="sub-title">E-Commerce</li>
          <li className="sub-title">Marketing & Advertising</li>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const Product = () => {
  const [stepId, setStepId] = useState(0);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(products.map((item, id) => !id));
  const timeRef = useRef();
  const updateProgress = () => {
    if (progress <= 300) {
      const newProgress = progress + 0.3;
      setProgress(newProgress);
      setStepId(Math.trunc(progress / 100));
    } else {
      setProgress(0);
      setStepId(0);
    }
  };
  const start = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(updateProgress, 10);
  };
  useEffect(() => {
    start();
    return () => {
      clearInterval(timeRef.current);
    };
  }, [progress]);

  useEffect(() => {
    setStep((prev) => {
      const id = step.findIndex((item) => item == true);
      step[id] = false;
      step[stepId % step.length] = true;
      return [...step];
    });
  }, [stepId]);
  return (
    <div id="product" className="layout-paragraph product b2b-product">
      <Heading
        title={`Simplified <span style="text-wrap: nowrap">product creation</span>`}
        subtitle={`Utilize our internal wallet or link an unlimited number of external wallets for hassle-free product creation.`}
      />
      <div className="layout-product">
        <div className="product-img">
          {products.map((p, id) => (
            <img
              className={step[id] && "product-img-showed"}
              src={p.img}
              alt={p.alt}
            />
          ))}
        </div>
        <div className="product-creation-step">
          {products.map((p, id) => (
            <div
              className={`product-step`}
              onClick={() => {
                if (!step[id] && id !== undefined) {
                  setStep(
                    step.map((s, i) => {
                      if (i == id) return !s;
                      return false;
                    }),
                  );
                  setStepId(id);
                  setProgress(id * 100);
                }
              }}
              style={{
                width: `calc(${100 / products.length}%)`,
              }}
            >
              <p>{p.title}</p>
              <hr
                className={`${step[id] && "product-step-selected"}`}
                style={{
                  width: `${Math.max(0, Math.min(100, progress - 100 * id))}%`,
                }}
              />
              <p className="sub-title">{p.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="step-product-creation" style={{ display: "none" }}>
          {products.map((p, id) => (
            <div
              className={`step-product ${step[id] && "step-product-selected"}`}
            >
              <p
                style={{
                  color: "#e9e9e9",
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                }}
              >
                {p.title}
              </p>
              <p style={{ color: "#b1b1b1", fontSize: "1.4rem", width: "84%" }}>
                {p.subtitle}
              </p>
            </div>
          ))}
          <div className="progress-bar">
            {products.map((p, id) => (
              <div
                style={{
                  background: `#202020`,
                  height: "1px",
                  width: `calc(${100 / products.length}%)`,
                  position: "relative",
                  display: "block",
                }}
              >
                <hr
                  style={{
                    borderInline: "none",
                    borderBottom: `1px solid #e9e9e9`,
                    width: `${Math.max(
                      0,
                      Math.min(100, progress - 100 * id),
                    )}%`,
                    position: "absolute",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const safeties = [
  {
    icon: ShoppingCartSvg,
    title: `Payment Initiation`,
    subtitle: `Buyers choose their preferred cryptocurrency (e.g., BTC) for the transaction.`,
  },
  {
    icon: CheckSvg,
    title: `Transaction Completion`,
    subtitle: `Buyers send their payment in the selected cryptocurrency.`,
  },
  // Discussed to remove converter on 25 Oct 2024
  // {
  //   icon: SwapIcon,
  //   title: `Real-Time Conversion`,
  //   subtitle: `Received cryptocurrency is instantly converted to stablecoins`,
  // },
  {
    icon: Dollar,
    title: `Stablecoin Deposit`,
    subtitle: `The converted stablecoin amount (e.g., USDT) is then securely deposited into the seller's account.`,
  },
];

const APIBlock = () => {
  return (
    <div className="layout-paragraph api-block">
      <div className="layout-horizontal">
        <div className="hero-layout api-block-layout">
          <h1 className="title">Seamless API Integration for Your Website</h1>
          <p className="sub-title api-block-sub-title">
            Integrate Nefentus into your website effortlessly with our powerful
            and flexible API solutions. Our APIs are designed to enable smooth
            and secure cryptocurrency transactions directly on your platform,
            allowing your customers to make payments with ease.
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
        <div className="api-block-img">
          <img src={APIBlockPng1} alt="Crypto payments API" />
          <img src={APIBlockPng2} alt="Product details on Nefentus" />
        </div>
        <hr
          style={{
            right: "0",
            bottom: "-50%",
            height: "200%",
            zIndex: "5",
          }}
          className="hide-in-tablet"
        />
        <hr
          style={{
            right: "26.5%",
            bottom: "-50%",
            height: "200%",
            zIndex: "5",
          }}
          className="hide-in-tablet"
        />
        <hr
          style={{
            right: "52.9%",
            bottom: "-50%",
            height: "200%",
            zIndex: "5",
          }}
          className="hide-in-tablet"
        />
      </div>
    </div>
  );
};

const Safe = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "4rem",
        padding: "4rem",
        position: "relative",
        borderInline: "1px solid #202020",
        background: "#171717",
      }}
    >
      <div className="safe-top">
        <div
          style={{
            width: "30%",
          }}
        >
          <img
            src={SafeSvg}
            style={{
              width: "2.4rem",
              marginBottom: "1rem",
            }}
            alt="Safeguarding funds"
          />
          <p style={{ fontSize: "2.8rem" }}>
            Safeguarding <span style={{ textWrap: "nowrap" }}>your funds</span>
          </p>
        </div>
        <p className="sub-title" style={{ width: "50%" }}>
          To protect against crypto price fluctuations, we convert
          cryptocurrencies into stablecoins upon transaction completion,
          ensuring stability & peace of mind.
        </p>
      </div>
      <div className="safe-bottom">
        {safeties.map((item, id) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: `calc(${100 / safeties.length}%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.6rem",
                  borderRadius: "50%",
                  border: "1px solid #323232",
                  background: "#202020",
                }}
              >
                <img
                  src={item.icon}
                  style={{ width: "1.8rem", height: "1.8rem" }}
                  alt={item.title}
                />
              </div>
              {id + 1 !== safeties.length && (
                <hr
                  style={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    zIndex: "1",
                  }}
                />
              )}
            </div>
            <div>
              <p style={{ fontSize: "1.6rem" }}>{item.title}</p>
              <p className="sub-title">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
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

export const Analytics = () => {
  return (
    <div id="sales" className="layout-paragraph analytics">
      <Heading
        title={`Insightful sales analytics`}
        subtitle={`Harness the power of our internal wallet or connect an unlimited number of external wallets for comprehensive sales analytics.`}
      />

      <img
        src={AnalyticsPng}
        style={{
          width: "100%",
          border: "2px solid #202020",
          borderRadius: "1rem",
        }}
        alt="Sales analytics on Nefentus"
      />
    </div>
  );
};

const securities = [
  {
    img: Security1Png,
    title: `Your assets, your control`,
    subtitle: `Rest assured, your assets remain in your hands. Every transaction on our platform is direct, between your cryptocurrency wallet & the recipient's—no intermediaries, no fund-holding.`,
    alt: "Assets security",
  },
  {
    img: Security2Png,
    title: `Data Encryption`,
    subtitle: `Your security is paramount. All data transmitted between your device and our platform is shielded with industry-standard SSL/TLS encryption.`,
    alt: "Data encryption security",
  },
  {
    img: Security3Png,
    title: `2-Factor Authentication`,
    subtitle: `For an extra layer of security, use our 2-factor authentication methods such as time-based one-time passwords.`,
    alt: "2-Factor Authentication",
  },
];

export const Security = () => {
  return (
    <div className="layout-paragraph security">
      <Heading
        title={`Fortified protection`}
        subtitle={`Employ our internal wallet or link limitless external wallets for enhanced security measures.`}
      />
      <div
        className="layout-security"
        style={{ borderInline: "1px solid #202020" }}
      >
        {securities.map((s) => (
          <div
            style={{
              width: `calc(${100 / securities.length}%)`,
              position: "relative",
              borderInline: "1px solid #323232",
              background: "#202020",
            }}
          >
            <img
              src={s.img}
              style={{
                width: "100%",
              }}
              alt={s.alt}
            />
            <div
              style={{
                position: "absolute",
                width: "100%",
                bottom: "0",
                padding: "2rem",
              }}
            >
              <p style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>
                {s.title}
              </p>
              <p className="sub-title">{s.subtitle}</p>
            </div>
          </div>
        ))}

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
    </div>
  );
};

export const B2BCryptoManage = () => {
  return (
    <div className="layout-paragraph b2b-manage">
      <div className="layout-horizontal layout-b2b-manage">
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
          <img
            src={ManageCrypto}
            alt="Manage cryptocurrencies using Nefentus"
          />
        </div>
      </div>
    </div>
  );
};
