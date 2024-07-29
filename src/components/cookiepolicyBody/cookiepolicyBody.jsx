import { useTranslation } from "react-i18next";
import styles from "./cookiepolicyBody.module.css";

const CookiePolicyBody = () => {
  const { t } = useTranslation();
  const { t: tcp } = useTranslation(["cookie_policy"]);

  return (
    <div
      className={`container ${styles.section}`}
      style={{ marginBottom: "0" }}
    >
      <h4>Last Update: May 10, 2024</h4>
      <h2>{t("cookiepolicy.headline")}</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: tcp("contents") }} />
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyBody;
