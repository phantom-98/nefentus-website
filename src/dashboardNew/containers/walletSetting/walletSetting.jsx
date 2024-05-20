import { useEffect, useState } from "react";
import Card from "../../components/card/card";

import styles from "./walletSetting.module.css";
import backendAPI from "../../../api/backendAPI";

import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import { useTranslation } from "react-i18next";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import { OptionsWithImage } from "../../../components/input/input";
import { getWalletIcon } from "../../../utils";

const WalletSetting = ({ value, setValue }) => {
  const { t } = useTranslation();
  const BackandAPI = new backendAPI();
  const [activeWallet, setActiveWallet] = useState(null);
  const [walletOptions, setWalletOptions] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getWalletAddresses = async () => {
      try {
        const dataFromBackend = await BackandAPI.getWalletAddresses();
        let filteredData = [];
        dataFromBackend.forEach((item) => {
          !filteredData.find((f) => f.address == item.address) &&
            filteredData.push(item);
        });

        setWalletOptions(
          filteredData?.map((wallet) => ({
            ...wallet,
            name:
              wallet?.type.toLowerCase() === "internal"
                ? "Nefentus"
                : wallet?.type,
            icon: getWalletIcon(wallet?.type),
          })),
        );
        if (filteredData) {
          setActiveWallet({
            ...filteredData[0],
            name:
              filteredData[0]?.type.toLowerCase() === "internal"
                ? "Nefentus"
                : filteredData[0]?.type,
            icon: getWalletIcon(filteredData[0]?.type),
          });
        }
      } catch (error) {
        console.error("Error fetching wallet addresses:", error);
      }
    };

    getWalletAddresses();
  }, []);

  useEffect(() => {
    if (!value || !walletOptions?.length) return;
    console.log(value);
    const list = value.split("--");
    if (list.length != 2) return;
    const getActiveWallet = walletOptions?.find(
      (wlt) => wlt?.address === list[1],
    );
    setWalletAddress({ ...getActiveWallet });
  }, [value, walletOptions]);

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
        <div
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", paddingTop: 2 }}>
            <div>
              <img src={walletAddress?.icon} style={{ width: "2rem" }} alt="" />
            </div>
            <span className={styles.text}>
              {walletAddress?.address?.length
                ? WalletAddressFormatter(walletAddress?.address)
                : null}
            </span>
          </div>
        </div>
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
                    setValue(activeWallet?.type + "--" + activeWallet.address);
                }}
                onClose={() => setShowPopup(false)}
              >
                <div>
                  {/* <div>
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
                                  {WalletAddressFormatter(address.address)}
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
                  </div> */}
                  <OptionsWithImage
                    label={t("dashboard.cryptoCard.sendModal.walletLabel")}
                    dashboard
                    wallet={activeWallet}
                    options={walletOptions}
                    setValue={(data) => {
                      console.log(data);
                      setActiveWallet(data);
                      // handleWallet(data);
                    }}
                  />
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
