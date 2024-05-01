import styles from "./imprintBody.module.css";
import { useTranslation } from "react-i18next";

const ImprintBody = () => {
  const { t } = useTranslation();
  const { t: ti } = useTranslation(["imprint"]);

  return (
    <div className={`container ${styles.section}`}>
      <h2>{t("imprint.headline")}</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: ti("contents") }} />
        </div>
      </div>
    </div>
  );
};

export default ImprintBody;
