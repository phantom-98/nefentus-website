import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Landing from "../components/landing";
import B2C from "../components/landing/B2C";
import B2B from "../components/landing/B2B";

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

export const NewB2C = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2C</title>
      </Helmet>
      <B2C />
    </>
  );
};

export const NewB2B = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2B</title>
      </Helmet>
      <B2B />
    </>
  );
};
