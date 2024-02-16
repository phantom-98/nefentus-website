import { useTranslation } from "react-i18next";
import ImprintBody from "./../components/imprintBody/imprintBody";
import { Helmet } from "react-helmet";

const Imprint = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.imprint")}</title>
      </Helmet>
      <ImprintBody />
    </div>
  );
};

export default Imprint;
