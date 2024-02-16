import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { checkJwtToken } from "../../utils";
import ConverterCard from "../components/converterCard/converterCard";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const ConverterDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.converter")}</title>
      </Helmet>
      <ConverterCard />
      <SignupByEmail />
    </>
  );
};

export default ConverterDashboard;
