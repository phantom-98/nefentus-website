import { t } from "i18next";
import PrivacyBody from "./../components/privacyBody/privacyBody";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.privacy")}</title>
      </Helmet>
      <PrivacyBody />
    </div>
  );
};

export default Privacy;
