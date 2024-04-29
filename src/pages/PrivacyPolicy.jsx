import { t } from "i18next";
import PrivacyPolicyBody from "./../components/privacyPolicyBody/privacyPolicyBody";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.privacy")}</title>
      </Helmet>
      <PrivacyPolicyBody />
    </div>
  );
};

export default PrivacyPolicy;
