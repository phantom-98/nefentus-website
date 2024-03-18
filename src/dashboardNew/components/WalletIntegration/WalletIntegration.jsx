import React, { useEffect } from "react";
import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import Button from "../../components/button/button";
import styles from "./walletIntegrations.module.css";
import { useTranslation } from "react-i18next";
import backendAPI from "../../../api/backendAPI";

const WalletIntegration = () => {
  const backend_API = new backendAPI();

  const wallet = useWallet();
  const address = useAddress();

  useEffect(() => {
    if (wallet && wallet?.walletId && address) registerWallet(wallet?.walletId);
  }, [wallet, address]);

  const { t } = useTranslation();

  async function registerWallet(name) {
    if (address) {
      const ConnectedWallet = {
        address: address,
        name: name,
      };
      if (name !== null) {
        const result = await backend_API.registerWalletAddress(ConnectedWallet);
      }
    }
  }

  return (
    <div className={styles.walletWrap}>
      <div className={styles.walletAddressTitle}>Wallet: </div>
      <ConnectWallet
        theme={"dark"}
        modalSize={"wide"}
        btnTitle={t("dashboard.integrations.connect")}
        className={`${styles.walletDropdownContainer} ${
          wallet == undefined && styles.connectButtonBackground
        }`}
      />
    </div>
  );
};

export default WalletIntegration;
