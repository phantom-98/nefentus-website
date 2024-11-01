import styles from "./navigation.module.css";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import Button from "../button/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Flex } from "antd";

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
          href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}
        >
          Get started
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
          link={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}
          color="white"
          onClick={() => setOpenMenu(false)}
        >
          Get started
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
              {/** Removing it as it's not need to show (as per discussion on 25 Oct 2024) */}

              {/* <li className="standard">
                <Products />
              </li> */}
              {/* <li className="standard"> 
                <Resources />
              </li> */}
              <li className="standard">
                <Business />
              </li>
              <li className="standard">
                <Private />
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
          {/** Removing it as it's not need to show (as per discussion on 25 Oct 2024) */}

          {/* <li>
            <Products setOpenMenu={setOpenMenu} />
          </li>
          <li>
            <Resources />
          </li> */}
          <li className="standard">
            <Business />
          </li>
          <li className="standard">
            <Private />
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
        <p className="default-text">{title}</p>
        <p className="default-text-gray">{subtitle}</p>
      </div>
    </div>
  );
};

const Private = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={() => navigate("/b2c")}
    >
      <div className={styles.products}>
        <p>Private</p>
      </div>
    </div>
  );
};

const Business = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={() => navigate("/b2b")}
    >
      <div className={styles.products}>
        <p>Business</p>
      </div>
    </div>
  );
};
// Discussed to remove it on 25 Oct 2024
// const Resources = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       style={{ position: "relative" }}
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       <div className={styles.resources}>
//         <p>Resources</p>
//         <img
//           src={Dropdown}
//           style={{
//             transition: "0.2s",
//             transform: open ? "rotate(180deg)" : "",
//           }}
//           alt="icon"
//         />
//       </div>
//       {open && (
//         <div className={styles.dropdown} style={{ display: "block" }}>
//           <div
//             style={{
//               padding: "1.4rem",
//               borderBottom: "1px solid #323232",
//             }}
//           >
//             <p
//               style={{
//                 color: "#b1b1b1",
//                 padding: "0.8rem",
//               }}
//             >
//               Docs
//             </p>
//             <div className={styles.gridContent}>
//               <a href="/resources">Guides and Tutorials</a>
//               <a href="/resources">Case Studies and Testimonials</a>
//               <a href="/resources">API Documentation</a>
//               <a href="/resources">Blog and News</a>
//               <a href="/resources">Security Information</a>
//             </div>
//           </div>
//           <div
//             style={{
//               padding: "1.4rem",
//             }}
//           >
//             <p
//               style={{
//                 color: "#b1b1b1",
//                 padding: "0.8rem",
//               }}
//             >
//               Community
//             </p>
//             <div className={styles.gridContent}>
//               <a href="https://t.me/nefentus">
//                 Telegram{" "}
//                 <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
//               </a>
//               <a href="https://cy.linkedin.com/company/nefentuspay">
//                 Linkedin{" "}
//                 <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
//               </a>
//               <a href="https://x.com/nefentusapp">
//                 Twitter{" "}
//                 <img src={Send} style={{ width: "0.8rem" }} alt="icon" />
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export const ContactUs = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Flex gap={"1rem"} className={`cursor-pointer default-text`}>
        <p>Contact us</p>
        <img
          src={Dropdown}
          style={{
            transition: "0.2s",
            transform: open ? "rotate(180deg)" : "",
          }}
          alt="icon"
        />
      </Flex>
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
