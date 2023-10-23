import React from "react";
import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";
import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import styles from "./integrationsBody.module.css";
import Header from "../../../dashboard/header/header";
import WalletIntegration from "../../components/WalletIntegration/WalletIntegration";

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

  return (
    <div className={"dashboard-body"}>
      <Header title="Integrations" />
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
