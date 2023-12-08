import { Link } from "react-router-dom";

import Cookie from "../../assets/icon/cookie.svg";

import styles from "./cookie.module.css";
import setCookie from "../setCookie/setCookie";
import { useTranslation } from "react-i18next";

const CookieBanner = ({ close }) => {
  const accept = () => {
    setCookie("acceptCookie", true);
    close();
  };

  const { t } = useTranslation();
  const decline = () => {
    setCookie("acceptCookie", false);
    close();
  };

  return (
    <div className={`${styles.banner} card`}>
      <div className={styles.left}>
        <img src={Cookie} alt="cookie" />

        <p className={styles.text}>
          {t("cookieBanner.first")}
          <Link to="/privacy">{t("cookieBanner.cookies")}</Link>
          {t("cookieBanner.second")} <br />
          {t("cookieBanner.last")}
        </p>
      </div>

      <div className={styles.buttons}>
        <div className={`${styles.button} ${styles.button1}`} onClick={decline}>
          {t("cookieBanner.decline")}
        </div>
        <div className={`${styles.button} ${styles.button2}`} onClick={accept}>
          {t("cookieBanner.accept")}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
