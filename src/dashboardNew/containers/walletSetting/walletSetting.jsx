import { useEffect, useState } from "react";
import Card from "../../components/card/card";

import styles from "./walletSetting.module.css";
import backendAPI from "../../../api/backendAPI";

import {
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";

import MetaMaskLogo from "../../../assets/logo/MetaMask.svg";
import WalletConnectLogo from "../../../assets/logo/logo.svg";

const WalletSetting = () => {
  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });
  const BackandAPI = new backendAPI();

  useEffect(() => {
    BackandAPI.getWalletAddresses();
  }, []);

  const wallets = [
    {
      connect: walletConnect(),
      icon: WalletConnectLogo,
      name: walletConnect().meta.name,
    },
    {
      connect: metamaskWallet(),
      icon: MetaMaskLogo,
      name: metamaskWallet().meta.name,
    },
  ];

  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus]);

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>
            Wallet to receive funds Description
          </div>
          <div className={styles.description}>
            Choose the wallet that receives funds when creating an invoice or
            selling product
          </div>
        </div>
        <div>
          {wallets.map((item) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <p style={{ fontSize: 20 }}>{item.name}</p>
                <img src={item.icon} style={{ height: 100 }} alt=" " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WalletSetting;
