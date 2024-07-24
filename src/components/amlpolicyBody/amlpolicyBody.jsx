import { useTranslation } from "react-i18next";
import styles from "./amlpolicyBody.module.css";

const AMLPolicyBody = () => {
  const { t } = useTranslation();
  const { t: tap } = useTranslation(["aml_policy"]);

  return (
    <div
      className={`container ${styles.section}`}
      style={{ marginBottom: "0" }}
    >
      <h4>Last Update: Juli 23, 2024</h4>
      <h2>{t("amlpolicy.headline")}</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: tap("contents") }} />
        </div>
      </div>
    </div>
  );
};

export default AMLPolicyBody;
