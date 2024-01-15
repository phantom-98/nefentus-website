import styles from "./footer.module.css";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { separateText } from "../../func/separate";
import { reformatFooterInfo } from "../../utils";
import { Instagram, Linkedin, Youtube } from "../../assets/icon/icons";

import FooterArrow from "../../assets/icon/footerArrow.svg";
import { useTheme } from "../../context/themeContext/themeContext";
import { NefentusLogo } from "../../assets/icon/logos/logos";

const content = [
  { link: "/" },
  { link: "/payment" },
  { link: "/support" },
  { link: "/affiliate" },
];

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const footerContentTranslation = t("footer.content", { returnObjects: true });

  const footerContent = reformatFooterInfo(footerContentTranslation, content);
  const footerContentTranslation2 = t("footer.content2", {
    returnObjects: true,
  });

  const footerContent2 = reformatFooterInfo(footerContentTranslation2, content);

  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={`${styles.footer} `}>
      <div className={`${styles.footerContainer} container`}>
        <div className={styles.leftBox}>
          <div className={`${styles.left}`}>
            <NefentusLogo />
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
              <Linkedin />
            </Link>
            <Link to="https://www.instagram.com/nefentus/">
              <Instagram />
            </Link>
            <Link to="https://www.youtube.com/channel/UCV1QWqkZXtZvXl6bq3AgkTA">
              <Youtube />
            </Link>
          </div>

          <div className={styles.boxBottom}>
            <p>{separateText(t("footer.socialDescription"))}</p>

            <div className={styles.arrowWrapper} onClick={handleScroll}>
              <img
                style={{ filter: theme === "light" ? "invert()" : "" }}
                src={FooterArrow}
                alt=""
              />
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
