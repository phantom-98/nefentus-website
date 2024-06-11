import { Conclusion, Heading } from ".";
import "./landing.css";
import NefentusLogo from "../../assets/logo/logo.svg";
import HeroLineTop from "../../assets/landing/b2c-hero-top.svg";
import HeroLineBottom from "../../assets/landing/b2c-hero-down.svg";
import VerticalLine from "../../assets/landing/hero lines 2.svg";
import VerticalDashedLine from "../../assets/landing/VerticalDashedLine.svg";
import BlueLine from "../../assets/landing/BlueLine.svg";
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

const B2B = () => {
  return (
    <div
      className="landing-layout container b2b"
      style={{
        gap: "4rem",
      }}
    >
      <Hero />

      <Invoicing />

      <Product />

      <Safe />

      <Analytics />

      <Security />

      <Conclusion
        icon={NefentusLogo}
        title={`No hidden fees or monthly subscription`}
        subtitle={`Creating and using an account for personal purposes is absolutely free`}
        button={`Create an account`}
      />
    </div>
  );
};

export default B2B;

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
            Empower Your Business with Seamless Crypto Payments Integration
          </h1>
          <p className="sub-title">
            Create and receive payments. Manage all wallets and the sales
            process in one place.
          </p>
          <a href="/signup">
            <button>Get Started</button>
          </a>
        </div>
        <img
          src={HeroPng}
          className="hero-img"
          style={{
            width: "50%",
          }}
        />
      </div>
      <img
        src={HeroLineTop}
        style={{
          position: "absolute",
          top: "0",
          width: "80%",
          left: "-10rem",
        }}
      />
      <img
        src={HeroLineBottom}
        style={{
          bottom: "0",
          width: "70%",
        }}
        className="translate-left"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "calc(25% + 0.8rem)",
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
          right: "0",
          bottom: "0",
          height: "100%",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalDashedLine}
        style={{
          position: "absolute",
          right: "calc(25% - 1.35rem)",
          bottom: "0",
          zIndex: "-1",
        }}
        className="hide-in-tablet"
      />
      <img
        src={VerticalLine}
        style={{
          position: "absolute",
          right: "50%",
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
      <hr
        style={{
          position: "absolute",
          bottom: "0",
          width: "100vw",
          border: "1px solid #202020",
        }}
        className="hide-in-tablet"
      />
    </div>
  );
};

const steps = [
  {
    icon: CreateSvg,
    abbr: `New Invoice`,
    title: `Create a new Invoice`,
    subtitle: `The system generates the invoice and assigns a unique invoice number if not provided. User reviews the entered details for accuracy.`,
    img: Invoicing1Png,
  },
  {
    icon: EmailSvg,
    abbr: `Share Invoice`,
    title: `Email the invoice directly from the platform`,
    subtitle: `Email the invoice directly from the platform. Download the invoice as a PDF. Share a link to the invoice.`,
    img: Invoicing2Png,
  },
  {
    icon: TrackingSvg,
    abbr: `Payment Tracking`,
    title: `Payment Tracking`,
    subtitle: `User can view the status of the sent invoice (paid, pending, overdue). Notifications for payment status changes.`,
    img: Invoicing3Png,
  },
  {
    icon: CheckoutSvg,
    abbr: `Post-Payment`,
    title: `Post-Payment Actions`,
    subtitle: `User can generate a receipt for the payment. Options to send the receipt to the recipient.`,
    img: Invoicing4Png,
  },
];

const Invoicing = () => {
  const [step, setStep] = useState(steps.map((_, i) => !i));
  return (
    <div className="layout-paragraph">
      <Heading
        title={`Invoice creation`}
        subtitle={`Use our internal wallet or connect an unlimited number of external wallets`}
      />
      <div className="invoicing-step-container" style={{ display: "none" }}>
        {steps.map((item, id) => (
          <div
            className={`step-invoicing ${step[id] && "step-invoicing-visible"}`}
          >
            <p style={{ fontSize: "1.4rem", color: "#e9e9e9" }}>{item.abbr}</p>
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
              }}
            >
              <img src={item.icon} />
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
              }}
            >
              <img src={item.icon} />
              <p>{item.title}</p>
              <p className="sub-title">{item.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="invoicing-img">
          {steps.map((item, id) => (
            <img className={step[id] && "visible"} src={item.img} />
          ))}
        </div>
        <hr
          style={{
            position: "absolute",
            top: "0",
            left: "-32rem",
            width: "150vw",
            border: "1px solid #202020",
          }}
        />
        <hr
          style={{
            position: "absolute",
            bottom: "0",
            left: "-32rem",
            width: "150vw",
            border: "1px solid #202020",
          }}
        />
      </div>
    </div>
  );
};
const products = [
  {
    title: `Create product`,
    subtitle: `CreatVendor is presented with a form to fill in the details of the product.e product. Product name. Description. Category. Tags (optional)`,
    img: Product1Png,
  },
  {
    title: `Client visits the product catalog page`,
    subtitle: `Client can filter and sort products based on categories, price and other attributes.`,
    img: Product2Png,
  },
  {
    title: `Checkout`,
    subtitle: `Client enters billing and shipping information. The system displays the payment amount in the selected cryptocurrency and provides a wallet address or QR code for payment.`,
    img: Product3Png,
  },
];
const Product = () => {
  const [step, setStep] = useState(products.map((item, id) => !id));
  const timeRef = useRef();
  const start = () => {
    clearInterval(timeRef.current);
    timeRef.current = setInterval(() => {
      setStep((prev) => {
        const id = step.findIndex((item) => item == true);
        step[id] = false;
        step[(id + 1) % step.length] = true;
        return [...step];
      });
    }, 10000);
  };
  useEffect(() => {
    start();
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);
  return (
    <div className="layout-paragraph product">
      <Heading
        title={`Product creation`}
        subtitle={`use our internal wallet or connect an unlimited number of external wallets`}
      />
      <div className="layout-product">
        <div
          className="product-img"
          onMouseEnter={() => {
            clearInterval(timeRef.current);
          }}
          onMouseLeave={start}
        >
          {products.map((p, id) => (
            <img className={step[id] && "product-img-showed"} src={p.img} />
          ))}
        </div>
        <div className="product-creation-step">
          {products.map((p, id) => (
            <div
              className={`product-step ${step[id] && "product-step-selected"}`}
              onClick={() => {
                !step[id] &&
                  id !== undefined &&
                  setStep(
                    step.map((s, i) => {
                      if (i == id) return !s;
                      return false;
                    }),
                  );
              }}
              style={{
                width: `calc(${100 / products.length}%)`,
              }}
            >
              <p>{p.title}</p>
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
            <div style={{ width: "96%", display: "flex", gap: "2rem" }}>
              {products.map((p, id) => (
                <hr
                  style={{
                    border: `1px solid ${step[id] ? "#e1e1e1" : "#202020"}`,
                    width: `calc(${100 / products.length}%)`,
                  }}
                />
              ))}
            </div>
            <div
              style={{ width: "2%" }}
              onClick={() => {
                setStep((prev) => {
                  const id = step.findIndex((item) => item == true);
                  step[id] = false;
                  step[(id - 1) % step.length] = true;
                  return [...step];
                });
              }}
            >{`<`}</div>
            <div
              style={{ width: "2%" }}
              onClick={() => {
                setStep((prev) => {
                  const id = step.findIndex((item) => item == true);
                  step[id] = false;
                  step[(id + 1) % step.length] = true;
                  return [...step];
                });
              }}
            >{`>`}</div>
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
    subtitle: `The buyer selects their preferred cryptocurrency (e.g., BTC) for the transaction. `,
  },
  {
    icon: CheckSvg,
    title: `Transaction Completion`,
    subtitle: `The buyer sends the payment in their selected cryptocurrency.`,
  },
  {
    icon: SwapIcon,
    title: `Automatic Conversion`,
    subtitle: `The received cryptocurrency is converted to the stablecoin in real-time.`,
  },
  {
    icon: Dollar,
    title: `Stablecoin Deposit`,
    subtitle: `The converted stablecoin amount (e.g., USDT) is then deposited into the seller’s account.`,
  },
];

const Safe = () => {
  return (
    <div
      style={{
        display: "flex",
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
          />
          <p style={{ fontSize: "2.8rem" }}>Ensuring security of your funds</p>
        </div>
        <p className="sub-title" style={{ width: "50%" }}>
          To mitigate the risks associated with fluctuating crypto prices, a
          secure and reliable solution is to convert cryptocurrencies into
          stablecoins upon transaction completion. This process helps safeguard
          client funds, providing stability and peace of mind.
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
                />
              </div>
              {id + 1 !== safeties.length && (
                <hr
                  style={{
                    border: "1px solid #202020",
                    width: "100%",
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
          position: "absolute",
          top: "0",
          left: "-32rem",
          width: "150vw",
          border: "1px solid #202020",
        }}
      />
      <hr
        style={{
          position: "absolute",
          bottom: "0",
          left: "-32rem",
          width: "150vw",
          border: "1px solid #202020",
        }}
      />
    </div>
  );
};

const Analytics = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        paddingBottom: "0",
      }}
    >
      <Heading
        title={`Sales analytics`}
        subtitle={`Use our internal wallet or connect an unlimited number of external wallets`}
      />

      <img
        src={AnalyticsPng}
        style={{
          width: "100%",
          border: "2px solid #202020",
          borderRadius: "1rem",
        }}
      />

      <p
        style={{
          fontSize: "2.8rem",
          textAlign: "center",
          width: "70%",
        }}
      >
        By leveraging these insights, you can make data-driven decisions,
        optimize your operations, and grow your business{" "}
      </p>
    </div>
  );
};

const securities = [
  {
    img: Security1Png,
    title: `We are not holding your assets`,
    subtitle: `All transactions on our platform occur directly between your cryptocurrency wallet and the recipient's wallet. We do not intermediate or hold funds at any point during the transaction process.`,
  },
  {
    img: Security2Png,
    title: `Data Encryption`,
    subtitle: `All data transmitted between your device and our platform is encrypted using industry-standard SSL/TLS protocols.`,
  },
  {
    img: Security3Png,
    title: `Biometric Authentication`,
    subtitle: `For added security, we support biometric authentication methods such as fingerprint and facial recognition on compatible devices.`,
  },
];

const Security = () => {
  return (
    <div
      className="layout-paragraph"
      style={{
        paddingBottom: "0",
      }}
    >
      <Heading
        title={`Security`}
        subtitle={`Use our internal wallet or connect an unlimited number of external wallets`}
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
              borderInline: "1px solid #202020",
              background: "#171717",
            }}
          >
            <img
              src={s.img}
              style={{
                width: "100%",
              }}
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
            position: "absolute",
            top: "0",
            left: "-32rem",
            width: "200vw",
            border: "1px solid #202020",
          }}
        />
        <hr
          style={{
            position: "absolute",
            bottom: "0",
            left: "-32rem",
            width: "200vw",
            border: "1px solid #202020",
          }}
        />
      </div>
    </div>
  );
};
