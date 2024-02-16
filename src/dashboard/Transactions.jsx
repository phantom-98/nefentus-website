import { Helmet } from "react-helmet";
import TransactionsBody from "./transactions/index";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.transactions")}</title>
      </Helmet>
      <TransactionsBody />
    </div>
  );
};

export default Transactions;
