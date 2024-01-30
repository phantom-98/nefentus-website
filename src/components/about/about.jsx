import styles from "./about.module.css";

import Graphic1 from "../../assets/image/graphic4.svg";
import Graphic1Light from "../../assets/image/graphic4Light.svg";
import Graphic2 from "../../assets/image/graphic2.svg";
import Graphic2Light from "../../assets/image/graphic2Light.svg";
import Graphic3 from "../../assets/image/graphic3.svg";
import Graphic3Light from "../../assets/image/graphic3Light.svg";
import { useTranslation } from "react-i18next";
import Button from "../button/button";

import Arrow from "../../assets/icon/arrow.svg";
import { separateText } from "../../func/separate";
import Reward from "../reward/reward";
import { useTheme } from "../../context/themeContext/themeContext";

const About = () => {
  const { t } = useTranslation();

  const { theme } = useTheme();

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={`${styles.card} ${styles.horizontalCard} card scroll`}>
          <div>
            <p className={`subtitle ${styles.subtitle}`}>
              {t("home.aboutCard1Subtitle")}
            </p>
            <h3>
              {separateText(t("home.aboutCard1Title"))}
              <div className="gradient">
                {t("home.aboutCard1TitleGradient")}
              </div>
            </h3>
            <p className="standard mb-2">{t("home.aboutCard1Description")}</p>

            <div className={styles.button}>
              <Button link="/" color="white">
                <p>{t("home.aboutCardButton")}</p>
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.2708 5.70592C15.6506 5.31548 15.6506 4.6814 15.2708 4.29096L11.3817 0.292831C11.0019 -0.0976107 10.3852 -0.0976107 10.0054 0.292831C9.62558 0.683273 9.62558 1.31735 10.0054 1.70779L12.2355 4.00047L0.972375 4.00047C0.434588 4.00047 0.00010471 4.44713 0.000104686 5C0.000104661 5.55286 0.434588 5.99953 0.972375 5.99953L12.2355 5.99953L10.0054 8.29221C9.62558 8.68265 9.62558 9.31673 10.0054 9.70717C10.3852 10.0976 11.0019 10.0976 11.3817 9.70717L15.2708 5.70904L15.2708 5.70592Z" />
                </svg>
              </Button>
            </div>
          </div>
          <img
            className={styles.horizontalImg}
            src={theme === "light" ? Graphic1Light : Graphic1}
            alt="cryptocurrency graphics"
          />
        </div>
        <div className={`${styles.cardRow}`}>
          <div
            className={`${styles.card} ${styles.verticalCard} slide-right card`}
          >
            <img
              className={styles.verticalImg}
              src={theme === "light" ? Graphic2Light : Graphic2}
              alt="tracking graphics"
            />
            <div className={styles.content}>
              <p className={`subtitle ${styles.subtitle}`}>
                {t("home.aboutCard2Subtitle")}
              </p>
              <h3>
                {t("home.aboutCard2TitleP1")}
                <br />
                {t("home.aboutCard2TitleP2")}
              </h3>
              <p className="standard mb-2">
                {" "}
                {t("home.aboutCard2Description")}
              </p>

              <div className={styles.button}>
                <Button link="/" color="white">
                  <p>{t("home.aboutCardButton")}</p>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.2708 5.70592C15.6506 5.31548 15.6506 4.6814 15.2708 4.29096L11.3817 0.292831C11.0019 -0.0976107 10.3852 -0.0976107 10.0054 0.292831C9.62558 0.683273 9.62558 1.31735 10.0054 1.70779L12.2355 4.00047L0.972375 4.00047C0.434588 4.00047 0.00010471 4.44713 0.000104686 5C0.000104661 5.55286 0.434588 5.99953 0.972375 5.99953L12.2355 5.99953L10.0054 8.29221C9.62558 8.68265 9.62558 9.31673 10.0054 9.70717C10.3852 10.0976 11.0019 10.0976 11.3817 9.70717L15.2708 5.70904L15.2708 5.70592Z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`${styles.card} ${styles.verticalCard} slide-left card`}
          >
            <img
              className={styles.verticalImg}
              src={theme === "light" ? Graphic3Light : Graphic3}
              alt="integrating logos"
            />

            <div className={styles.content}>
              <p className={`subtitle ${styles.subtitle}`}>
                {t("home.aboutCard3Subtitle")}
              </p>
              <h3>
                {t("home.aboutCard3TitleP1")}
                <br />
                {separateText(t("home.aboutCard3TitleP2"))}
              </h3>
              <p className="standard mb-2">{t("home.aboutCard3Description")}</p>

              <div className={styles.button}>
                <Button link="/" color="white">
                  <p>{t("home.aboutCardButton")}</p>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.2708 5.70592C15.6506 5.31548 15.6506 4.6814 15.2708 4.29096L11.3817 0.292831C11.0019 -0.0976107 10.3852 -0.0976107 10.0054 0.292831C9.62558 0.683273 9.62558 1.31735 10.0054 1.70779L12.2355 4.00047L0.972375 4.00047C0.434588 4.00047 0.00010471 4.44713 0.000104686 5C0.000104661 5.55286 0.434588 5.99953 0.972375 5.99953L12.2355 5.99953L10.0054 8.29221C9.62558 8.68265 9.62558 9.31673 10.0054 9.70717C10.3852 10.0976 11.0019 10.0976 11.3817 9.70717L15.2708 5.70904L15.2708 5.70592Z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Reward className={`${styles.card}`} />
      </div>

      <div className={styles.bg} />
    </div>
  );
};

export default About;
