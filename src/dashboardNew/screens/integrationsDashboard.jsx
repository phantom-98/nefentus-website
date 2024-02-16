import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import IntegrationsBody from "../containers/integrationsBody/integrationsBody";
import { checkJwtToken } from "../../utils";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const IntegrationsDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.integration")}</title>
      </Helmet>
      <IntegrationsBody />
      <SignupByEmail />
    </div>
  );
};

export default IntegrationsDashboard;
