import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Landing from "../components/landing";

const NewLanding = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.home")}</title>
      </Helmet>
      <Landing />
    </>
  );
};

export default NewLanding;
