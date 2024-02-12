import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { checkJwtToken } from "../../utils";
import ConverterCard from "../components/converterCard/converterCard";

const ConverterDashboard = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <>
      <ConverterCard />
      <SignupByEmail />
    </>
  );
};

export default ConverterDashboard;
