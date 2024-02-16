import { useTranslation } from "react-i18next";
import SupportBody from "./../components/supportBody/supportBody";
import { Helmet } from "react-helmet";

const Support = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.support")}</title>
      </Helmet>
      <SupportBody />
    </div>
  );
};

export default Support;
