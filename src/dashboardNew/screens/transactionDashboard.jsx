import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import TransactionBody from "../containers/transactionBody/transactionBody";

const TransactionDashboard = () => {
  return (
    <div>
      <TransactionBody />
      <SignupByEmail />
    </div>
  );
};

export default TransactionDashboard;
