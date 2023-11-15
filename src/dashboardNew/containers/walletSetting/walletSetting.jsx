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
import WalletConnection from "../../components/walletConnection/walletConnection";

const WalletSetting = () => {
  const [activeToggle, setActiveToggle] = useState(true);
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

  // useEffect(() => {
  //   BackandAPI.registerWalletAddress()
  // },[])

  console.log(walletConnect());

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
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          {wallets.map((item, index) => (
            <div key={index}>
              <WalletConnection name={item.name} icon={item.icon} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div
          onClick={() => setActiveToggle((prev) => !prev)}
          className={`${activeToggle ? styles.activeToggle : ""} ${
            styles.toggle
          }`}
        >
          <div className={`${styles.toggleCircle}`}></div>
        </div>
      </div>
    </Card>
  );
};

export default WalletSetting;
