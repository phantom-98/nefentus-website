import { useEffect } from "react";
import IdentificationBody from "../containers/identificationBody/identificationBody";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { checkJwtToken } from "../../utils";

const IdentificationDashboard = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <IdentificationBody />
      <SignupByEmail />
    </div>
  );
};

export default IdentificationDashboard;
