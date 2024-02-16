import PaymentBody from "./payment/index";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PaymentDashboard = () => {
  const { t } = useTranslation();
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      supportedWallets={[metamaskWallet()]}
      clientId="639eea2ebcabed7eab90b56aceeed08b"
    >
      <Helmet>
        <title>Nefentus | {t("navigation.payment")}</title>
      </Helmet>
      <div className="dashboard-body">
        <PaymentBody />
      </div>
    </ThirdwebProvider>
  );
};

export default PaymentDashboard;
