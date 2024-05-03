import { declineCookie } from "../../func/cookies";
import { useTranslation } from "react-i18next";
import styles from "./privacyPolicyBody.module.css";

const PrivacyPolicyBody = () => {
  const { t } = useTranslation();
  const { t: tpp } = useTranslation(["privacy_policy"]);

  return (
    <div className={`container ${styles.section}`}>
      <h2>{t("privacyPolicy.headline")}</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: tpp("contents") }} />

          <p>
            <a href="javascript:;" onClick={() => declineCookie()}>
              {t("privacyPolicy.revoke")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyBody;
