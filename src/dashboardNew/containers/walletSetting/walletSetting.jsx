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
import SettingsTitle from "../../components/settings/settingsTitle";
import internal from "stream";
import useInternalWallet from "../../../hooks/internalWallet";

const WalletSetting = () => {
  const BackandAPI = new backendAPI();
  const [data, setData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeWallet, setActiveWallet] = useState(null);
  const [index, setIndex] = useState(null);
  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });

  let internalWalletAddress = useInternalWallet();

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
    const getWalletAddresses = async () => {
      try {
        const data = await BackandAPI.getWalletAddresses();
        setData(data);
      } catch (error) {
        console.error("Error fetching wallet addresses:", error);
      }
    };
    getWalletAddresses();
  }, []);

  const handleWalletClick = (wallet, index) => {
    setActiveWallet(wallet);
    setIndex(index);
    setDropdownVisible(false);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <>
      <Card className={styles.card}>
        <SettingsTitle
          title="Wallet to receive funds Description"
          description="Choose the wallet that receives funds when creating an invoice or selling product"
        />
        <div onMouseLeave={handleMouseLeave}></div>
        <div style={{ position: "relative", width: 600 }}>
          <div onMouseEnter={handleMouseEnter}>
            {activeWallet ? (
              <ThirdwebProvider
                clientId="639eea2ebcabed7eab90b56aceeed08b"
                supportedWallets={[activeWallet.connect]}
              >
                <WalletConnection
                  name={activeWallet.name}
                  icon={activeWallet.icon}
                  connectStatus={connectStatus}
                  setConnectStatus={setConnectStatus}
                  config={activeWallet.connect}
                  index={index}
                />
              </ThirdwebProvider>
            ) : (
              <div
                style={{ paddingTop: 20, paddingLeft: 10, fontSize: "1.4rem" }}
              >
                <span>Wallet:</span>
                <span style={{ paddingLeft: 10 }}>{internalWalletAddress}</span>
              </div>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              width: 200,
              zIndex: 5,
              top: "40px",
              left: "10px",
            }}
            onMouseLeave={handleMouseLeave}
          >
            {dropdownVisible && (
              <div>
                <Card>
                  {wallets.map((wallet, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingTop: 5,
                        }}
                        onClick={() => handleWalletClick(wallet, index)}
                      >
                        <div>
                          <img
                            src={wallet.icon}
                            style={{ width: "50px", height: "30px" }}
                            alt=""
                          />
                        </div>
                        <div style={{ paddingTop: 8 }}>
                          <p>{wallet.name}</p>
                          <span>{wallet.connectStatus}</span>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default WalletSetting;
