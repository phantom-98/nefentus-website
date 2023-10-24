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

  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });
  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus]);

  return (
    <div className={"dashboard-body"}>
      <div className={styles.titleHeader}>
        <SettingsTitle
          title="Integrations"
          description="Integrate your cryptocurrency wallet"
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
    </div>
  );
};

export default IntegrationsBody;
