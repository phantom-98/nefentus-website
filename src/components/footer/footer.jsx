import styles from "./footer.module.css";

import LogoIcon from "../../assets/logo/logo.svg";
import Logo from "../../assets/logo/logo2.svg";

import Instagram from "../../assets/icon/instagram.svg";
import Linkedin from "../../assets/icon/linkedin.svg";
import Youtube from "../../assets/icon/youtube.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../button/button";

const content = [
  { link: "/" },
  { link: "/payment" },
  { link: "/support" },
  { link: "/affiliate" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerContent = t("footer.content", { returnObjects: true });

  return (
    <footer className={`${styles.footer} `}>
      <div className={`${styles.footerContainer} container`}>
        <div className={styles.leftBox}>
          <div className={`${styles.left}`}>
            <img src={Logo} alt="nefentus logo" />
            <div className={styles.content}>
              <div className={styles.linkWrapper}>
                <div className={styles.linkBox}>
                  <p className={styles.contentLabel}>Overview</p>
                  <p>Home</p>
                  <p>Payment</p>
                  <p>Resources</p>
                  <p>Affiliate</p>
                  <p>Privacy Policy</p>
                </div>
                <div className={styles.linkBox}>
                  <p className={styles.contentLabel}>Action</p>
                  <p>Play Store</p>
                  <p>Sign In</p>
                  <p>App Store</p>
                  <p>Sign Up</p>
                  <p>Imprint</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            © 2023 Nefentus. All rights reserved. www.nefentus.com Cutting Edge{" "}
            <br />
            Cryptocurrency Trading and Research Platform DXone Ltd., Floor 7,{" "}
            <br />
            Novel Tower, Alexandrou Panagouli 1, Avenue, 6057 Larnaca, Cyprus
            Reg Nr.: HE407003
          </div>
        </div>

        <div className={styles.socialBox}>
          <h3>Follow us on:</h3>

          <div className={styles.icons}>
            <img src={Instagram} alt="" />
            <img src={Linkedin} alt="" />
            <img src={Youtube} alt="" />
          </div>

          <div className={styles.boxBottom}>
            <p>
              Go to the top <br /> of the page
            </p>

            <div className={styles.arrowWrapper}>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.7059 27.5066C35.3155 27.1268 34.6814 27.1268 34.291 27.5066L30.2928 31.3957C29.9024 31.7755 29.9024 32.3922 30.2928 32.772C30.6833 33.1519 31.3174 33.1519 31.7078 32.772L34.0005 30.5419L34.0005 41.8051C34.0005 42.3429 34.4471 42.7773 35 42.7773C35.5529 42.7773 35.9995 42.3429 35.9995 41.8051L35.9995 30.5419L38.2922 32.772C38.6826 33.1519 39.3167 33.1519 39.7072 32.772C40.0976 32.3922 40.0976 31.7755 39.7072 31.3957L35.709 27.5066L35.7059 27.5066Z"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="69.5"
                  width="69"
                  height="69"
                  transform="rotate(-90 0.5 69.5)"
                  stroke="white"
                  stroke-opacity="0.2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={`${styles.copyright} ${styles.copyrightMob}`}>
          © 2023 Nefentus. All rights reserved. www.nefentus.com Cutting Edge
          Cryptocurrency Trading and Research Platform DXone Ltd., Floor 7,
          Novel Tower, Alexandrou Panagouli 1, Avenue, 6057 Larnaca, Cyprus Reg
          Nr.: HE407003
        </div>
      </div>
    </footer>
  );
};

export default Footer;
