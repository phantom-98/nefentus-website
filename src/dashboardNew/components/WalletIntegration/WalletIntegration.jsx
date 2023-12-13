import React, { useEffect } from "react";
import {
  useAddress,
  useBalance,
  useConnect,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import Button from "../../components/button/button";
import styles from "./walletIntegrations.module.css";
import { useTranslation } from "react-i18next";
import backendAPI from "../../../api/backendAPI";

const WalletIntegration = ({
  name,
  config,
  icon,
  connectStatus,
  setConnectStatus,
}) => {
  const backend_API = new backendAPI();

  const wallet = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: config,
    address: useAddress(),
    status: useConnectionStatus(),
    balance: useBalance(),
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (
      (name === "MetaMask" && connectStatus["WalletConnect"] === "connected") ||
      (name === "WalletConnect" && connectStatus["MetaMask"] === "connected")
    ) {
      wallet.disconnect();
    }
  }, [connectStatus, name]);

  useEffect(() => {
    if (wallet.status === "connected") {
      if (name === "WalletConnect") {
        setConnectStatus({
          WalletConnect: "connected",
          Metamask: "disconnected",
        });
      } else if (name === "MetaMask") {
        setConnectStatus({
          Metamask: "connected",
          WalletConnect: "disconnected",
        });
      }

      registerWallet(wallet.address);
    }
  }, [wallet.status, name, setConnectStatus, wallet.address]);

  async function registerWallet(address) {
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
      <div className={styles.walletInfoWrap}>
        <div className={styles.walletLogoWrap}>
          <img src={icon} className={styles.walletLogo} alt={`${name}`} />
        </div>
        <div className={styles.walletTitle}>{name}</div>
        {wallet.address && (
          <div className={styles.walletAddressTitle}>
            Wallet address:
            <span className={styles.walletAddress}>
              {`${wallet.address.substring(0, 5)}...${wallet.address.substring(
                wallet.address.length - 5,
              )}`}
            </span>
          </div>
        )}
        {wallet.address && (
          <div className={styles.walletBalanceTitle}>
            Wallet balance:{" "}
            <span className={styles.walletBalance}>
              {wallet?.balance?.data?.displayValue.slice(0, 5)}{" "}
              {wallet?.balance?.data?.symbol}
            </span>
          </div>
        )}
      </div>
      <div className={styles.buttonWrap}>
        {wallet.status === "disconnected" && (
          <Button
            onClick={() => {
              wallet.connect(wallet.config, { chainId: 1 });
            }}
          >
            {t("dashboard.integrations.connect")}
          </Button>
        )}
        {wallet.status === "unknown" && (
          <Button disabled>{t("dashboard.integrations.don'tConnect")}</Button>
        )}
        {wallet.status === "connecting" && (
          <Button disabled>{t("dashboard.integrations.connecting")}</Button>
        )}
        {wallet.status === "connected" && (
          <Button color={"green"} onClick={() => wallet.disconnect()}>
            {t("dashboard.integrations.disconnect")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WalletIntegration;
