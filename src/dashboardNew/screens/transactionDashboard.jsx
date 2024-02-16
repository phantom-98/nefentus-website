import { useEffect } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import TransactionBody from "../containers/transactionBody/transactionBody";
import { checkJwtToken } from "../../utils";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const TransactionDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.transactions")}</title>
      </Helmet>
      <TransactionBody />
      <SignupByEmail />
    </div>
  );
};

export default TransactionDashboard;
