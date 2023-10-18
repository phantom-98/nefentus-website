import Button from "../button/button";
import styles from "./reward.module.css";
import { useTranslation } from "react-i18next";

const Reward = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.sectionWrapper}>
      <div className={`container scroll card ${className}`}>
        <p className="subtitle">{t("reward.subtitle")}</p>
        <h3>
          {t("reward.title1")}{" "}
          <span className="gradient">{t("reward.gradient")}</span>{" "}
          {t("reward.title2")}
        </h3>

        <Button link="/signup">{t("reward.button")}</Button>
      </div>
    </div>
  );
};

export default Reward;
