import React, { useEffect, useState } from "react";
import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";
import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import styles from "./integrationsBody.module.css";
import WalletIntegration from "../../components/WalletIntegration/WalletIntegration";
import SettingsTitle from "../../components/settings/settingsTitle";
import Card from "../../components/card/card";
import { useTranslation } from "react-i18next";

const IntegrationsBody = () => {
  const wallets = [
    {
      connect: walletConnect(),
      icon: WalletConnectLogo,
      name: "Wallet Connect",
    },
    {
      connect: metamaskWallet(),
      icon: MetaMaskLogo,
      name: "Metamask",
    },
  ];
  const { t } = useTranslation();

  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });
  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus]);

  return (
    <Card>
      <div className={styles.titleHeader}>
        <SettingsTitle
          title={t("integrations.title")}
          description={t("integrations.subtitle")}
        />
      </div>

      <div className={styles.walletsWrap}>
        {wallets.map((wallet) => {
          return (
            <React.Fragment key={wallet.name}>
              <ThirdwebProvider
                clientId="639eea2ebcabed7eab90b56aceeed08b"
                supportedWallets={[wallet.connect]}
              >
                <WalletIntegration
                  name={wallet.name}
                  config={wallet.connect}
                  icon={wallet.icon}
                  connectStatus={connectStatus}
                  setConnectStatus={setConnectStatus}
                />
              </ThirdwebProvider>
            </React.Fragment>
          );
        })}
      </div>
    </Card>
  );
};

export default IntegrationsBody;
