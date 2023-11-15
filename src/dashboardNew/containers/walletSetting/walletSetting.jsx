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
  const BackandAPI = new backendAPI();
  const [activeToggle, setActiveToggle] = useState(true);

  const [connectedWallet, setConnectedWallet] = useState(null);

  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });
  useEffect(() => {
    console.log(connectStatus);
  }, [connectStatus]);

  useEffect(() => {
    const getWalletAddresses = async () => {
      const data = await BackandAPI.getWalletAddresses();
      data.map((item) => setConnectedWallet(item));
    };
    getWalletAddresses();
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
            width: "40%",
            justifyContent: "space-between",
          }}
        >
          {wallets.map((wallet, index) => (
            <div key={index}>
              <ThirdwebProvider
                clientId="639eea2ebcabed7eab90b56aceeed08b"
                supportedWallets={[wallet.connect]}
              >
                <WalletConnection
                  name={wallet.name}
                  icon={wallet.icon}
                  connectStatus={connectStatus}
                  setConnectStatus={setConnectStatus}
                  config={wallet.connect}
                  activeToggle={activeToggle}
                  connectedWallet={connectedWallet}
                />
              </ThirdwebProvider>
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
