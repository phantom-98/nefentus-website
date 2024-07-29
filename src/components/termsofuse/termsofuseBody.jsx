import { useTranslation } from "react-i18next";
import styles from "./termsofuseBody.module.css";

const TermsofUseBody = () => {
  const { t } = useTranslation();
  const { t: tou } = useTranslation(["termsofUse"]);

  return (
    <div
      className={`container ${styles.section}`}
      style={{ marginBottom: "0" }}
    >
      <h4>Last Update: June 30, 2024</h4>
      <h2>{t("termsofuse.headline")}</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: tou("contents") }} />
        </div>
      </div>
    </div>
  );
};

export default TermsofUseBody;
