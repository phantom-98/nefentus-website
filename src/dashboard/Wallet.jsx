import WalletBody from "./wallet/index";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Wallet = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <Helmet>
          <title>Nefentus | {t("navigation.wallet")}</title>
        </Helmet>
        <WalletBody />
      </ThirdwebProvider>
    </div>
  );
};

export default Wallet;
