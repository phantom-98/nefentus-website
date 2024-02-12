import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import TransactionBody from "../containers/transactionBody/transactionBody";
import { checkJwtToken } from "../../utils";

const TransactionDashboard = () => {
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <TransactionBody />
      <SignupByEmail />
    </div>
  );
};

export default TransactionDashboard;
