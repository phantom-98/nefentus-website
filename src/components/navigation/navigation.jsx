import styles from "./navigation.module.css";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import Button from "../button/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MultiWallet from "../../assets/icon/wallet-01.svg";
import MultiWalletBlue from "../../assets/icon/wallet-01 - blue.svg";
import InternalWallet from "../../assets/icon/wallet-02.svg";
import InternalWalletBlue from "../../assets/icon/wallet-02 - blue.svg";
import Sales from "../../assets/icon/pie-chart-01.svg";
import SalesBlue from "../../assets/icon/pie-chart-01 - blue.svg";
import Invoicing from "../../assets/icon/receipt-check.svg";
import InvoicingBlue from "../../assets/icon/receipt-check - blue.svg";
import Shopping from "../../assets/icon/shopping-bag-01.svg";
import ShoppingBlue from "../../assets/icon/shopping-bag-01 - blue.svg";
import Convert from "../../assets/landing/swap-ico.svg";
import ConvertBlue from "../../assets/landing/swap-ico - blue.svg";
import ContactSupport from "../../assets/icon/contact-support.svg";
import ContactSupportBlue from "../../assets/icon/contact-support-blue.svg";
import ContactExpert from "../../assets/icon/contact-expert.svg";
import ContactExpertBlue from "../../assets/icon/contact-expert-blue.svg";
import Send from "../../assets/landing/send-ico.svg";
import Dropdown from "../../assets/icon/dropdown.svg";

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState(false);

  function loginAndSignupWeb() {
    return (
      <>
        <a
          className={styles.login}
          href={`${process.env.VITE_REACT_APP_DASHBOARD}/login`}
        >
          Log in
        </a>
        <a
          className={`${styles.button}`}
          href={`${process.env.VITE_REACT_APP_DASHBOARD}/signup`}
        >
          Sign up
        </a>
      </>
    );
  }

  function loginAndSignupMobile() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          pointerEvents: "auto",
        }}
      >
        <Button
          style={{ width: "100%" }}
          link={`${process.env.VITE_REACT_APP_DASHBOARD}/login`}
          onClick={() => setOpenMenu(false)}
        >
          Log in
        </Button>
        <Button
          style={{ width: "100%" }}
          link={`${process.env.VITE_REACT_APP_DASHBOARD}/signup`}
          color="white"
          onClick={() => setOpenMenu(false)}
        >
          Sign up
        </Button>
      </div>
    );
  }

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      // setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  return (
    <nav className={`${styles.navigation} load `}>
      <div className={` ${styles.contentWrapper}`}>
        <div className={`container ${styles.content}`}>
          <div className={styles.left}>
            <Link className={styles.logoWrapper} to="/">
              <img className={styles.logo} src={LogoWide} alt="nefentus logo" />
            </Link>

            <ul className={styles.navList}>
              <li className="standard">
                <Products />
              </li>
              <li className="standard">
                <Resources />
              </li>
              <li className="standard">
                <ContactUs />
              </li>
            </ul>
          </div>

          <div className={styles.right}>
            <div className={styles.rightWrapper}>{/* <QR /> */}</div>

            {loginAndSignupWeb()}

            <div className={styles.mobMenu}>
              <div
                className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
              ></div>
              <div
                className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
              ></div>
              <div
                className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
              ></div>

              <div
                onClick={() => setOpenMenu((prev) => !prev)}
                className={styles.lineButton}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobileMenu"
        className={`${styles.mobileMenu}`}
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-120%)",
          borderTop: "1px solid var(--lightBlack-color)",
        }}
      >
        <ul>
          <li>
            <Products setOpenMenu={setOpenMenu} />
          </li>
          <li>
            <Resources />
          </li>
          <li>
            <ContactUs />
          </li>
          <hr
            style={{
              margin: "-4px -2.5rem 11px -2.5rem",
              width: "100vw",
              display: "block",
              border: "none",
              borderTop: "1px solid var(--lightBlack-color)",
            }}
          />
          {loginAndSignupMobile()}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

const DropDownMenuItem = ({ icon, title, subtitle }) => {
  const [ico, setIcon] = useState(icon.normal);
  return (
    <div
      onMouseEnter={() => setIcon(icon.hover)}
      onMouseLeave={() => setIcon(icon.normal)}
      className={styles.dropdownMenuItem}
    >
      <div className={styles.iconWrapper}>
        <img src={ico} alt="icon" />
      </div>
      <div className={styles.body}>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

const Products = ({ setOpenMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.products}>
        <p>Products</p>
        <img
          src={Dropdown}
          style={{
            transition: "0.2s",
            transform: open ? "rotate(180deg)" : "",
          }}
          alt="icon"
        />
      </div>
      {open && (
        <div className={styles.dropdown}>
          <div
            style={{
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #323232",
            }}
          >
            <a href="/b2b" onClick={() => setOpenMenu(false)}>
              <p
                style={{
                  color: "#b1b1b1",
                  padding: "0.8rem",
                }}
              >
                Business tools
              </p>
            </a>
            <a href="/b2b#hero" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: Shopping, hover: ShoppingBlue }}
                title={`Cryptocurrency payments`}
                subtitle={`Accept cryptocurrencies using unique payment links`}
              />
            </a>
            <a href="/b2b#invoicing" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: Invoicing, hover: InvoicingBlue }}
                title={`Invoicing`}
                subtitle={`Create and send professional invoices that can be paid in cryptocurrency`}
              />
            </a>
            <a href="/b2b#sales" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: Sales, hover: SalesBlue }}
                title={`Sales dashboard`}
                subtitle={`Track your sales and monitor transaction trends`}
              />
            </a>
          </div>
          <div
            style={{
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <a href="/b2c" onClick={() => setOpenMenu(false)}>
              <p
                style={{
                  color: "#b1b1b1",
                  padding: "0.8rem",
                }}
              >
                Personal use
              </p>
            </a>
            <a href="/b2c#multi-wallets" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: MultiWallet, hover: MultiWalletBlue }}
                title={`Multi-wallet management`}
                subtitle={`Manage multiple cryptocurrency wallets effortlessly in one place`}
              />
            </a>
            <a href="/b2c#transactions" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: Convert, hover: ConvertBlue }}
                title={`Converter`}
                subtitle={`Instantly convert between different cryptocurrencies with ease`}
              />
            </a>
            <a href="/b2c#multi-wallets">
              <DropDownMenuItem
                icon={{ normal: InternalWallet, hover: InternalWalletBlue }}
                title={`Nefentus wallet`}
                subtitle={`Manage your digital assets securely within the Nefentus ecosystem`}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Resources = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.resources}>
        <p>Resources</p>
        <img
          src={Dropdown}
          style={{
            transition: "0.2s",
            transform: open ? "rotate(180deg)" : "",
          }}
          alt="icon"
        />
      </div>
      {open && (
        <div className={styles.dropdown} style={{ display: "block" }}>
          <div
            style={{
              padding: "1.4rem",
              borderBottom: "1px solid #323232",
            }}
          >
            <p
              style={{
                color: "#b1b1b1",
                padding: "0.8rem",
              }}
            >
              Docs
            </p>
            <div className={styles.gridContent}>
              <a href="/resources">Guides and Tutorials</a>
              <a href="/resources">Case Studies and Testimonials</a>
              <a href="/resources">API Documentation</a>
              <a href="/resources">Blog and News</a>
              <a href="/resources">Security Information</a>
            </div>
          </div>
          <div
            style={{
              padding: "1.4rem",
            }}
          >
            <p
              style={{
                color: "#b1b1b1",
                padding: "0.8rem",
              }}
            >
              Community
            </p>
            <div className={styles.gridContent}>
              <a href="https://t.me/nefentus">
                Telegram{" "}
                <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
              </a>
              <a href="https://cy.linkedin.com/company/nefentuspay">
                Linkedin{" "}
                <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
              </a>
              <a href="https://x.com/nefentusapp">
                Twitter{" "}
                <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactUs = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.contactus}>
        <p>Contact us</p>
        <img
          src={Dropdown}
          style={{
            transition: "0.2s",
            transform: open ? "rotate(180deg)" : "",
          }}
          alt="icon"
        />
      </div>
      {open && (
        <div className={styles.dropdown} style={{ left: "-28rem" }}>
          <div
            className={styles.contactus_dropdown}
            style={{
              padding: "1.4rem",
              display: "flex",
              borderRight: "1px solid #323232",
            }}
          >
            <a href="/technical-support" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: ContactSupport, hover: ContactSupportBlue }}
                title={`Technical support`}
                subtitle={`Report technical issues with the platform`}
              />
            </a>
            <a href="/business-support" onClick={() => setOpenMenu(false)}>
              <DropDownMenuItem
                icon={{ normal: ContactExpert, hover: ContactExpertBlue }}
                title={`Business support`}
                subtitle={`Let us discuss how to integrate Nefentus into your own business`}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
