import { useEffect } from "react";
import IdentificationBody from "../containers/identificationBody/identificationBody";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { checkJwtToken } from "../../utils";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const IdentificationDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.identification")}</title>
      </Helmet>
      <IdentificationBody />
      <SignupByEmail />
    </div>
  );
};

export default IdentificationDashboard;
