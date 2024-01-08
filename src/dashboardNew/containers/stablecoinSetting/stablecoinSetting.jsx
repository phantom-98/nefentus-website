import { useEffect, useState } from "react";
import Card from "../../components/card/card";

import styles from "./stablecoinSetting.module.css";
import backendAPI from "../../../api/backendAPI";

import USDCLogo from "../../../assets/logo/usdc.svg";
import USDTLogo from "../../../assets/logo/usdt.svg";

import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import { useTranslation } from "react-i18next";

const StablecoinSetting = ({ value, setValue }) => {
  const { t } = useTranslation();
  const coins = [
    {
      icon: USDCLogo,
      name: "USDC",
    },
    {
      icon: USDTLogo,
      name: "USDT",
    },
  ];

  const [isActivePopup, setIsActivePopup] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [stableCoin, setStableCoin] = useState({});

  useEffect(() => {
    if (coins[0].name == value) {
      setStableCoin(coins[0]);
    } else {
      setStableCoin(coins[1]);
    }
  }, [value]);

  const handleCoinClick = (coin, index) => {
    setIsActivePopup(index);
    setStableCoin(coin);
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
        <span className={styles.title}>{t("invoice.stablecoin")}</span>
        <span className={styles.description}>
          {t("invoice.stablecoinDescription")}
        </span>
      </div>
      <div className={styles.right}>
        <div
          style={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", paddingTop: 2 }}>
            <div>
              <img src={stableCoin.icon} style={{ width: "2rem" }} alt="" />
            </div>
            <span className={styles.text}>
              {stableCoin.name || "Not available"}
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
                  setValue(stableCoin.name);
                  setShowPopup(false);
                  setIsActivePopup(false);
                }}
                onClose={() => setShowPopup(false)}
              >
                <div>
                  <div className={styles.dialogSubtitle}>
                    {t("invoice.action.selectCoin")}
                  </div>
                  {coins.map((coin, index) => {
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
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
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
                        onClick={() => handleCoinClick(coin, index)}
                      >
                        <div style={{ width: 40, paddingLeft: 12 }}>
                          <img
                            src={coin.icon}
                            style={{ width: "20px", height: "20px" }}
                            alt=""
                          />
                        </div>
                        <div
                          style={{ paddingTop: 1 }}
                          className={styles.dialogDescription}
                        >
                          <p>{coin.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StablecoinSetting;
