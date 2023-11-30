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
import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";

const WalletSetting = () => {
  const BackandAPI = new backendAPI();
  const [data, setData] = useState(null);
  const [activeWallet, setActiveWallet] = useState(null);
  const [index, setIndex] = useState(null);
  const [connectStatus, setConnectStatus] = useState({
    "Wallet Connect": "disconnected",
    Metamask: "disconnected",
  });
  const [walletAddress, setWalletAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [forConfirm, setForConfirm] = useState(false);
  const [isActiveWalletAdress, setIsActiveWalletAdress] = useState(false);
  const [showLoadingWallet, setShowLoadingWallet] = useState(false);

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
        const dataFromBackend = await BackandAPI.getWalletAddresses();
        setData(dataFromBackend);
        if (dataFromBackend) {
          const lastObject = dataFromBackend[dataFromBackend.length - 1];
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

    setShowLoadingWallet(true);

    getWalletAddresses();
  }, []);

  useEffect(() => {
    const localWallet = JSON.parse(localStorage.getItem("selected wallet"));
    setWalletAddress(localWallet);
  }, [data]);

  const handleWalletClick = (wallet, index) => {
    setIsActiveWalletAdress(false);
    setIsActivePopup(index);
    setActiveWallet(wallet);
    setIndex(index);
    setWalletAddress(null);
    setForConfirm(false);
  };

  const getWalletAddress = (address, i) => {
    setShowLoadingWallet(false);
    setIsActivePopup(false);
    setWalletAddress(address);
    setIsActiveWalletAdress(i);
    localStorage.setItem("selected wallet", JSON.stringify(address));
    setForConfirm(false);
  };

  const truncateWalletAddress = (address, symbolCount) => {
    if (!address || address.length <= 5) {
      return address;
    }

    const start = address.substring(0, symbolCount + 2);
    const end = address.substring(address.length - symbolCount);
    return `${start}...${end}`;
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
      <div className={styles.right}>
        {walletAddress ? (
          walletAddress.name == null ? (
            <div
              style={{
                paddingTop: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ display: "flex", paddingTop: 2 }}>
                <div>
                  <img
                    src={NefentusLogo}
                    style={{ width: "50px", height: "30px" }}
                    alt=""
                  />
                </div>
                <span className={styles.text}>
                  {internalWalletAddress || "Not available"}
                </span>
              </div>
            </div>
          ) : showLoadingWallet ? (
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
          ) : (
            forConfirm && (
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
          )
        ) : forConfirm ? (
          activeWallet ? (
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
              <div style={{ display: "flex", paddingTop: 2 }}>
                <div
                  style={{
                    paddingLeft: 10,
                    paddingTop: 5,
                    fontSize: "1.4rem",
                  }}
                ></div>
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
          )
        ) : null}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div>
            <div>
              <Button color="gray" onClick={() => setShowPopup(true)}>
                Select
              </Button>
            </div>
            <div>
              <Popup
                show={showPopup}
                onConfirm={() => {
                  setShowPopup(false),
                    setForConfirm(true),
                    setIsActivePopup(false),
                    setIsActiveWalletAdress(false);
                }}
                onClose={() => setShowPopup(false)}
              >
                <div>
                  <div>
                    {data ? (
                      <div style={{ paddingBottom: 20 }}>
                        <span className={styles.dialogSubtitle}>
                          Connected wallets
                        </span>

                        {data.map((address, i) => {
                          return (
                            <div
                              key={i}
                              style={
                                i === isActiveWalletAdress
                                  ? {
                                      display: "flex",
                                      flexDirection: "row",
                                      paddingTop: 2,
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.08)",
                                      borderRadius: "0.5rem",
                                    }
                                  : {
                                      display: "flex",
                                      flexDirection: "row",
                                      paddingTop: 2,
                                    }
                              }
                              onClick={() => getWalletAddress(address, i)}
                            >
                              <div style={{ padding: 5 }}>
                                {address.name == "WalletConnect" ? (
                                  <div>
                                    <img
                                      src={WalletConnectLogo}
                                      style={{ width: "14px", height: "14px" }}
                                      alt=""
                                    />
                                  </div>
                                ) : address.name == "MetaMask" ? (
                                  <div>
                                    <img
                                      src={MetaMaskLogo}
                                      style={{ width: "14px", height: "14px" }}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <img
                                      src={NefentusLogo}
                                      style={{ width: "14px", height: "14px" }}
                                      alt=""
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  paddingTop: 4,
                                  paddingBottom: 4,
                                  display: "flex",
                                }}
                                className={styles.dialogDescription}
                              >
                                <p>
                                  {address.name ? address.name : "Nefentus"}:
                                </p>
                                <p style={{ paddingLeft: 10, paddingRight: 5 }}>
                                  {truncateWalletAddress(address.address, 4)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    <div>
                      <span className={styles.dialogSubtitle}>
                        Connect new wallets
                      </span>
                      {wallets.map((wallet, index) => {
                        return (
                          <div
                            key={index}
                            style={
                              index === isActivePopup
                                ? {
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    paddingTop: 5,
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.08)",
                                    opacity: 1,
                                    borderRadius: 5,
                                  }
                                : {
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    paddingTop: 5,
                                  }
                            }
                            onClick={() => handleWalletClick(wallet, index)}
                          >
                            <div style={{ width: 55, paddingLeft: 10 }}>
                              <img
                                src={wallet.icon}
                                style={{ width: "30px", height: "30px" }}
                                alt=""
                              />
                            </div>
                            <div
                              style={{ paddingTop: 7 }}
                              className={styles.dialogDescription}
                            >
                              <p>{wallet.name}</p>
                              <span>{wallet.connectStatus}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
            {/* {walletAddress ? (
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
            )} */}
          </div>
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WalletSetting;
