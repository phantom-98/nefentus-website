import React, { useEffect } from "react";
import {
  useAddress,
  useBalance,
  useConnect,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import styles from "./walletConnection.module.css";
import backendAPI from "../../../api/backendAPI";

const WalletConnection = ({
  name,
  config,
  icon,
  connectStatus,
  setConnectStatus,
  index,
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

  useEffect(() => {
    if (
      (name === "Metamask" &&
        connectStatus["Wallet Connect"] === "connected") ||
      (name === "Wallet Connect" && connectStatus["Metamask"] === "connected")
    ) {
      wallet.disconnect();
    }
  }, [connectStatus, name]);

  useEffect(() => {
    if (wallet.status === "connected") {
      if (name === "Wallet Connect") {
        setConnectStatus({
          "Wallet Connect": "connected",
          Metamask: "disconnected",
        });
      } else if (name === "Metamask") {
        setConnectStatus({
          Metamask: "connected",
          "Wallet Connect": "disconnected",
        });
      }

      registerWallet(wallet.address);
    }
  }, [wallet.status, name, setConnectStatus, wallet.address]);

  async function registerWallet(address) {
    if (address) {
      const result = await backend_API.registerWalletAddress(address);
    }
  }

  useEffect(() => {
    if (index === 0) {
      if (name == "WalletConnect") {
        wallet.connect(wallet.config, { chainId: 1 });
      } else {
        wallet.disconnect();
      }
    }

    if (index === 1) {
      if (name == "MetaMask") {
        wallet.connect(wallet.config, { chainId: 1 });
      } else {
        wallet.disconnect();
      }
    }
  }, [index, name]);

  return (
    <div className={styles.walletWrap}>
      <div className={styles.walletInfoWrap}>
        <div>
          <div style={{ display: "flex" }}>
            <img
              src={icon}
              style={{ width: "50px", height: "30px" }}
              alt={`${name}`}
            />
            <p style={{ paddingTop: 1, paddingLeft: 5 }}>{name}</p>
          </div>
          {wallet.address && (
            <div className={styles.walletAddressTitle}>
              Wallet address:{" "}
              <span className={styles.walletAddress}>
                {`${wallet.address.substring(
                  0,
                  5,
                )}...${wallet.address.substring(wallet.address.length - 5)}`}
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
      </div>
    </div>
  );
};

export default WalletConnection;
