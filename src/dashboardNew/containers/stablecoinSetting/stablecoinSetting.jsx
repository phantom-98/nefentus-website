import { useEffect, useState } from "react";
import Card from "../../components/card/card";

import styles from "./stablecoinSetting.module.css";
import backendAPI from "../../../api/backendAPI";

import USDCLogo from "../../../assets/logo/usdc.svg";
import USDTLogo from "../../../assets/logo/usdt.svg";

import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";

const StablecoinSetting = () => {
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
  const [stableCoin, setStableCoin] = useState(
    JSON.parse(
      localStorage.getItem("selectedCoin") || JSON.stringify(coins[0]),
    ),
  );

  // const CLIENT_ID = "639eea2ebcabed7eab90b56aceeed08b";

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
        <span className={styles.title}>Stablecoin</span>
        <span className={styles.description}>
          Choose the stablecoin that should be converted to.
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
              <Button color="gray" onClick={() => setShowPopup(true)}>
                Select
              </Button>
            </div>
            <div>
              <Popup
                show={showPopup}
                onConfirm={() => {
                  setShowPopup(false),
                    setIsActivePopup(false),
                    localStorage.setItem(
                      "selectedCoin",
                      JSON.stringify(stableCoin),
                    );
                }}
                onClose={() => setShowPopup(false)}
              >
                <div>
                  <div className={styles.dialogSubtitle}>Select Stablecoin</div>
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
