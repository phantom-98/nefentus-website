import styles from "./footer.module.css";
import Logo from "../../assets/logo/logo2.svg";

import Instagram from "../../assets/icon/instagram.svg";
import Linkedin from "../../assets/icon/linkedin.svg";
import Youtube from "../../assets/icon/youtube.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { separateText } from "../../func/separate";
import { reformatFooterInfo } from "../../utils";

const content = [
  { link: "/" },
  { link: "/payment" },
  { link: "/support" },
  { link: "/affiliate" },
];

const Footer = () => {
  const { t } = useTranslation();

  const footerContentTranslation = t("footer.content", { returnObjects: true });

  const footerContent = reformatFooterInfo(footerContentTranslation, content);
  const footerContentTranslation2 = t("footer.content2", {
    returnObjects: true,
  });

  const footerContent2 = reformatFooterInfo(footerContentTranslation2, content);
  console.log(footerContent, "footerContent2");
  console.log(footerContent2, "footerContent2");

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={`${styles.footer} `}>
      <div className={`${styles.footerContainer} container`}>
        <div className={styles.leftBox}>
          <div className={`${styles.left}`}>
            <img src={Logo} alt="nefentus logo" />
            <div className={styles.content}>
              <div className={styles.linkWrapper}>
                <div className={styles.linkBox}>
                  <p className={styles.contentLabel}>
                    {t("footer.contentLabel1")}
                  </p>
                  {footerContent.map((item, index) => (
                    <Link key={index} to={item.link}>
                      <p>{item.text}</p>
                    </Link>
                  ))}
                </div>
                <div className={styles.linkBox}>
                  <p className={styles.contentLabel}>
                    {t("footer.contentLabel2")}
                  </p>
                  {footerContent2.map((item, index) => (
                    <Link key={index} to={item.link}>
                      <p>{item.text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>{t("footer.copyright")}</div>
        </div>

        <div className={styles.socialBox}>
          <h3>{t("footer.socialTitle")}</h3>

          <div className={styles.icons}>
            <Link to="https://www.linkedin.com/company/nefentuspay/">
              <img src={Linkedin} alt="" />
            </Link>
            <Link to="https://www.instagram.com/nefentus/">
              <img src={Instagram} alt="" />
            </Link>
            <Link to="https://www.youtube.com/channel/UCV1QWqkZXtZvXl6bq3AgkTA">
              <img src={Youtube} alt="" />
            </Link>
          </div>

          <div className={styles.boxBottom}>
            <p>{separateText(t("footer.socialDescription"))}</p>

            <div className={styles.arrowWrapper} onClick={handleScroll}>
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
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
