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
import WalletConnectLogo from "../../../assets/logo/WalletConnect.svg";
import NefentusLogo from "../../../assets/logo/logo.svg";
import WalletConnection from "../../components/walletConnection/walletConnection";
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
  const [walletAddress, setWalletAddress] = useState(null);

  const CLIENT_ID = "639eea2ebcabed7eab90b56aceeed08b";

  const internalWalletAddress = useInternalWallet();

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
        if (data) {
          const lastObject = data[data.length - 1];
          if (lastObject?.name == "WalletConnect") {
            setActiveWallet(wallets[0]);
          }
          if (lastObject?.name == "MetaMask") {
            setActiveWallet(wallets[1]);
          }
        }
      } catch (error) {
        console.error("Error fetching wallet addresses:", error);
      }
    };
    const localWallet = JSON.parse(localStorage.getItem("selected wallet"));
    setWalletAddress(localWallet);
    localStorage.removeItem("selected wallet");
    getWalletAddresses();
  }, []);

  const handleWalletClick = (wallet, index) => {
    setActiveWallet(wallet);
    setIndex(index);
    setDropdownVisible(false);
    setWalletAddress(null);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const getWalletAddress = (address) => {
    setWalletAddress(address);
    localStorage.setItem("selected wallet", JSON.stringify(address));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div className={styles.left}>
        <span className={styles.title}>
          Wallet to receive funds Description
        </span>
        <span className={styles.description}>
          Choose the wallet that receives funds when creating an invoice or
          selling product
        </span>
      </div>
      <div onMouseLeave={handleMouseLeave}>
        <div style={{ position: "relative" }}>
          <div onMouseEnter={handleMouseEnter}>
            {walletAddress ? (
              walletAddress.name == null ? (
                <div
                  style={{
                    paddingTop: 20,
                    paddingLeft: 10,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ display: "flex", paddingTop: 2 }}>
                    <div
                      style={{
                        paddingLeft: 10,
                        paddingTop: 5,
                        fontSize: "1.4rem",
                      }}
                    >
                      Wallet:
                    </div>
                    <div>
                      <img
                        src={NefentusLogo}
                        style={{ width: "50px", height: "30px" }}
                        alt=""
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 5,
                        paddingTop: 5,
                        fontSize: "1.4rem",
                      }}
                    >
                      {internalWalletAddress || "Not available"}
                    </div>
                  </div>
                </div>
              ) : (
                <ThirdwebProvider
                  clientId={CLIENT_ID}
                  // supportedWallets={[activeWallet.connect]}
                >
                  <WalletConnection
                    walletAddress={walletAddress.address}
                    name={walletAddress.name}
                    walletConnect={walletConnect}
                    metamaskWallet={metamaskWallet}
                  />
                </ThirdwebProvider>
              )
            ) : activeWallet ? (
              <ThirdwebProvider
                clientId={CLIENT_ID}
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
                style={{
                  paddingTop: 20,
                  paddingLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  <img
                    src={NefentusLogo}
                    style={{ width: "50px", height: "30px" }}
                    alt=""
                  />
                </div>

                <div style={{ display: "flex", paddingTop: 2 }}>
                  <div
                    style={{
                      paddingLeft: 10,
                      paddingTop: 5,
                      fontSize: "1.4rem",
                    }}
                  >
                    Wallet:
                  </div>
                  <div>
                    <img
                      src={NefentusLogo}
                      style={{ width: "50px", height: "30px" }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: 5,
                      paddingTop: 5,
                      fontSize: "1.4rem",
                    }}
                  >
                    {internalWalletAddress || "Not available"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              width: 450,
              zIndex: 5,
              top: "55px",
              right: "20px",
            }}
          >
            {dropdownVisible && (
              <div>
                <Card>
                  {data ? (
                    <div style={{ paddingBottom: 20 }}>
                      <p>Actual wallets</p>

                      {data.map((address, i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              paddingTop: 4,
                            }}
                            onClick={() => getWalletAddress(address)}
                          >
                            <div style={{ paddingTop: 10, paddingRight: 5 }}>
                              {address.name == "WalletConnect" ? (
                                <div>
                                  <img
                                    src={WalletConnectLogo}
                                    style={{ width: "10px", height: "10px" }}
                                    alt=""
                                  />
                                </div>
                              ) : address.name == "MetaMask" ? (
                                <div>
                                  <img
                                    src={MetaMaskLogo}
                                    style={{ width: "10px", height: "10px" }}
                                    alt=""
                                  />
                                </div>
                              ) : (
                                <div>
                                  <img
                                    src={NefentusLogo}
                                    style={{ width: "10px", height: "10px" }}
                                    alt=""
                                  />
                                </div>
                              )}
                            </div>
                            <div style={{ paddingTop: 8, display: "flex" }}>
                              <p>{address.name ? address.name : "Nefentus"}:</p>
                              <p style={{ paddingLeft: 10 }}>
                                {address.address}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
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
                        <div style={{ width: 55 }}>
                          <img
                            src={wallet.icon}
                            style={{ width: "30px", height: "30px" }}
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
      </div>
    </div>
  );
};

export default WalletSetting;
