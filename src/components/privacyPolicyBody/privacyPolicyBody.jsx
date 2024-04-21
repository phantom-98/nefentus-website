import { declineCookie } from "../../func/cookies";
import { useTranslation } from "react-i18next";
import styles from "./privacyPolicyBody.module.css";

const PrivacyPolicyBody = () => {
  const { t } = useTranslation(["privacy_policy"]);

  console.log(t("contents"));

  return (
    <div className={`container ${styles.section}`}>
      <h2>Privacy Policy</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: t("contents") }} />

          <p>
            <a href="javascript:;" onClick={() => declineCookie()}>
              Revoke my consent to the storage of cookies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyBody;
