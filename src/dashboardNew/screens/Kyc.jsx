import { useEffect } from "react";
import KycBody from "../components/kyc/index";
import { checkJwtToken } from "../../utils";

const Kyc = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <>
      <div className="dashboardFont">
        <KycBody />
      </div>
    </>
  );
};

export default Kyc;
