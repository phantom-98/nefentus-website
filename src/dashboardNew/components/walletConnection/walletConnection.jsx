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
import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";

const WalletConnection = ({
  name,
  config,
  icon,
  connectStatus,
  setConnectStatus,
  index,
  walletAddress,
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

      registerWallet(wallet.address, name);
    }
  }, [wallet.status, name, setConnectStatus, wallet.address]);

  async function registerWallet(address, name) {
    if (address && name) {
      const ConnectedWallet = {
        address: address,
        name: name,
      };
      const result = await backend_API.registerWalletAddress(ConnectedWallet);
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

  useEffect(() => {
    if (walletAddress) {
      wallet.connect({ walletAddress });
    }
  }, [walletAddress]);

  return (
    <div className={styles.walletWrap}>
      <div className={styles.walletInfoWrap}>
        <div>
          <div style={{ display: "flex" }}>
            {/* <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ paddingTop: 1, paddingLeft: 5 }}>
                {name ? name : null}
              </p>

              {wallet.status == "connected" && (
                <p style={{ color: "green", paddingLeft: 5 }}>Connected</p>
              )}
            </div> */}

            <div className={styles.walletAddressTitle}>
              <span> Wallet address: </span>
            </div>
            <div style={{ paddingLeft: 5 }}>
              {walletAddress ? (
                name == "MetaMask" ? (
                  <img
                    src={MetaMaskLogo}
                    style={{ width: "50px", height: "30px" }}
                    alt={`${name}`}
                  />
                ) : name == "WalletConnect" ? (
                  <img
                    src={WalletConnectLogo}
                    style={{ width: "30px", height: "30px" }}
                    alt={`${name}`}
                  />
                ) : (
                  <div></div>
                )
              ) : (
                <img
                  src={icon}
                  style={{ width: "30px", height: "30px" }}
                  alt={`${name}`}
                />
              )}
            </div>
            {wallet.address && (
              <div>
                <div className={styles.walletAddress}>
                  {`${wallet.address.substring(
                    0,
                    5,
                  )}...${wallet.address.substring(wallet.address.length - 5)}`}
                </div>
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
    </div>
  );
};

export default WalletConnection;
