import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import IntegrationsBody from "../containers/integrationsBody/integrationsBody";
import { checkJwtToken } from "../../utils";

const IntegrationsDashboard = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <IntegrationsBody />
      <SignupByEmail />
    </div>
  );
};

export default IntegrationsDashboard;
