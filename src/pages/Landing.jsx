import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Landing from "../components/landing";
import B2C from "../components/landing/B2C";
import B2B from "../components/landing/B2B";
import Navigation from "../components/navigation/navigation";
import Resources from "../components/resources";
import ContactUs from "../components/landing/ContactUs";

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
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.b2c")}</title>
      </Helmet>
      <B2C />
    </>
  );
};

export const NewB2B = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.b2b")}</title>
      </Helmet>
      <B2B />
    </>
  );
};

export const NewResources = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.resources")}</title>
      </Helmet>
      <Navigation />
      <Resources />
    </>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.contact")}</title>
      </Helmet>
      <ContactUs />
    </div>
  );
};
