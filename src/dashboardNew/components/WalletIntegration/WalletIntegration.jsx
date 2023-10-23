import React from "react";
import {
  useAddress,
  useBalance,
  useConnect,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import Button from "../../components/button/button";
import styles from "./walletIntegrations.module.css";

const WalletIntegration = ({ name, config, icon }) => {
  const wallet = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: config,
    address: useAddress(),
    status: useConnectionStatus(),
    balance: useBalance(),
  };

  return (
    <div className={styles.walletWrap}>
      <div className={styles.walletInfoWrap}>
        <div className={styles.walletLogoWrap}>
          <img src={icon} className={styles.walletLogo} alt="MetaMask Wallet" />
        </div>
        <div className={styles.walletTitle}>{name}</div>
        {wallet.address && (
          <div className={styles.walletAddressTitle}>
            Wallet address:{" "}
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
              {wallet?.balance?.data?.displayValue}{" "}
              {wallet?.balance?.data?.symbol}
            </span>
          </div>
        )}
      </div>

      {wallet.status === "disconnected" && (
        <Button onClick={() => wallet.connect(wallet.config, { chainId: 1 })}>
          Connect to Wallet
        </Button>
      )}
      {wallet.status === "unknown" && (
        <Button disabled>Connect wallet is not available!</Button>
      )}
      {wallet.status === "connecting" && (
        <Button disabled>Connecting...</Button>
      )}
      {wallet.status === "connected" && (
        <Button onClick={() => wallet.disconnect()}>Disconnect Wallet</Button>
      )}
    </div>
  );
};

export default WalletIntegration;
