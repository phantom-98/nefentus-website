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
import { useTranslation } from "react-i18next";

const WalletSetting = ({ value, setValue }) => {
  const { t } = useTranslation();
  const BackandAPI = new backendAPI();
  const [data, setData] = useState(null);
  const [activeWallet, setActiveWallet] = useState(null);
  const [index, setIndex] = useState(null);
  const [connectStatus, setConnectStatus] = useState({
    WalletConnect: t("invoice.action.disconnected"),
    MetaMask: t("invoice.action.disconnected"),
  });
  const [walletAddress, setWalletAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [forConfirm, setForConfirm] = useState(false);
  const [isActiveWalletAdress, setIsActiveWalletAdress] = useState(false);
  const [showLoadingWallet, setShowLoadingWallet] = useState(false);

  const CLIENT_ID = "639eea2ebcabed7eab90b56aceeed08b";

  const { internalWalletAddress, fetchInternalWalletAddress } =
    useInternalWallet();

  const wallets = [
    {
      connect: walletConnect(),
      icon: WalletConnectLogo,
      type: walletConnect().meta.name,
    },
    {
      connect: metamaskWallet(),
      icon: MetaMaskLogo,
      type: metamaskWallet().meta.name,
    },
  ];

  useEffect(() => {
    const getWalletAddresses = async () => {
      try {
        const dataFromBackend = await BackandAPI.getWalletAddresses();
        let filteredData = [];
        dataFromBackend.forEach((item) => {
          !filteredData.find((f) => f.address == item.address) &&
            filteredData.push(item);
        });

        setData(filteredData);
        if (filteredData) {
          const lastObject = filteredData[filteredData.length - 1];
          if (lastObject?.type == "WalletConnect") {
            setActiveWallet(wallets[0]);
          }
          if (lastObject?.type == "MetaMask") {
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
    if (!value) return;
    console.log(value);
    const list = value.split("--");
    if (list.length != 2) return;
    switch (list[0].toLowerCase()) {
      case "metamask":
        setWalletAddress({ type: "MetaMask", address: list[1] });
        break;
      case "walletconnect":
        setWalletAddress({ type: "WalletConnect", address: list[1] });
        break;
      default:
        setWalletAddress({ address: list[1] });
        break;
    }
  }, [value]);

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
        <span className={styles.title}>{t("invoice.walletAddress")}</span>
        <span className={styles.description}>
          {t("invoice.walletDescription")}
        </span>
      </div>
      <div className={styles.right}>
        {walletAddress ? (
          walletAddress.type == null ? (
            <div
              style={{
                paddingTop: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ display: "flex", paddingTop: 2 }}>
                <div>
                  <img src={NefentusLogo} style={{ width: "2rem" }} alt="" />
                </div>
                <span className={styles.text}>
                  {walletAddress.address || "Not available"}
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
                name={walletAddress.type}
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
                  name={walletAddress.type}
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
                name={activeWallet.type}
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
                {/* <div
                  style={{
                    paddingLeft: 10,
                    paddingTop: 5,
                    fontSize: "1.4rem",
                  }}
                ></div> */}
                <div>
                  <img
                    src={NefentusLogo}
                    style={{ width: "30px", height: "30px" }}
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
              <Button
                color="gray"
                fontSize="1rem"
                width="10rem"
                onClick={() => setShowPopup(true)}
              >
                {t("invoice.action.select")}
              </Button>
            </div>
            <div>
              <Popup
                show={showPopup}
                cancelTitle={t("general.cancel")}
                confirmTitle={t("general.confirm")}
                onConfirm={() => {
                  setShowPopup(false),
                    setForConfirm(true),
                    setIsActivePopup(false),
                    setIsActiveWalletAdress(false);
                  if (walletAddress) {
                    setValue(walletAddress.type + "--" + walletAddress.address);
                  } else
                    setValue(wallets[index].type + "--" + activeWallet.address);
                }}
                onClose={() => setShowPopup(false)}
              >
                <div>
                  <div>
                    {data ? (
                      <div style={{ paddingBottom: 20 }}>
                        <span className={styles.dialogSubtitle}>
                          {t("invoice.action.connectedWallets")}
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
                                {address.type == "WalletConnect" ? (
                                  <div>
                                    <img
                                      src={WalletConnectLogo}
                                      style={{ width: "14px", height: "14px" }}
                                      alt=""
                                    />
                                  </div>
                                ) : address.type == "MetaMask" ? (
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
                                  {address.type ? address.type : "Nefentus"}:
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
                        {t("invoice.action.connectWallet")}
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
                              style={{ marginTop: -4 }}
                              className={styles.dialogDescription}
                            >
                              <p>{wallet.type}</p>
                              <span
                                style={{ fontSize: "0.9rem", opacity: "0.6" }}
                              >
                                {connectStatus[wallet.type]}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSetting;
