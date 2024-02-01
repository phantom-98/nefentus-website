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
  walletConnect,
  metamaskWallet,
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
  }, [wallet.address]);

  async function registerWallet(address, name) {
    if (address && name) {
      const ConnectedWallet = {
        address: address,
        name: name,
      };
      if (name !== null) {
        const result = await backend_API.registerWalletAddress(ConnectedWallet);
      }
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
      if (name == "WalletConnect") {
        wallet.connect(walletConnect());
      } else {
        wallet.disconnect();
      }

      if (name == "MetaMask") {
        wallet.connect(metamaskWallet());
      } else {
        wallet.disconnect();
      }
    }
  }, [walletAddress]);

  return (
    <div className={styles.walletWrap}>
      <div className={styles.walletInfoWrap}>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              {walletAddress ? (
                name == "MetaMask" ? (
                  <img
                    src={MetaMaskLogo}
                    style={{
                      minWidth: "30px",
                      maxWidth: "50px",
                      height: "30px",
                    }}
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
                    6,
                  )} .... ${wallet.address.substring(
                    wallet.address.length - 4,
                  )}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
