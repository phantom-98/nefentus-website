import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themeContext/themeContext";
import { useEffect, useRef, useState } from "react";
import { currencies } from "../../constants";
import { uniswapApi } from "../../api/web3Api";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import styles from "./gasDetails.module.css";
import InfoMarkDark from "../../assets/icon/dark/info.svg";
import InfoMarkLight from "../../assets/icon/light/info.svg";
import GasDark from "../../assets/icon/dark/gas.svg";
import GasLight from "../../assets/icon/light/gas.svg";
import HourglassDark from "../../assets/icon/dark/hourglass.svg";
import HourglassLight from "../../assets/icon/light/hourglass.svg";
import { getCurrencySymbol } from "../../countries";

export const GasDetails = ({
  token,
  usdAmount,
  setFeeUSD,
  vatPercent,
  vatUSD,
  currency = "USD",
  rate = 1,
  gasLimit = 600_000,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [gasValues, setGasValues] = useState({});
  const [gasPriceAsWei, setGasPrice] = useState(0);
  const [maxFee, setMaxFee] = useState(0);
  const [blockchain, setBlockchain] = useState(
    currencies().find((c) => token.blockchain === c.abbr),
  );
  const [blockchainPrice, setBlockchainPrice] = useState(0);
  const uniswap = new uniswapApi();
  const intervalRef = useRef();

  const init = async () => {
    const max = (gasValues.gasPrice * gasLimit) / 10 ** blockchain.decimals;
    setMaxFee(max);
    setFeeUSD(max * blockchainPrice);
  };

  const fetch = async () => {
    const getPromises = [
      uniswap.getGasValues(blockchain.abbr),
      uniswap.getNativeTokenPrice(blockchain.abbr),
    ];
    const [gas, tokenPrice] = await Promise.allSettled(getPromises);
    if (gas) {
      setGasValues(gas.value);
      setGasPrice(gas.value.gasPrice);
    }
    if (tokenPrice) {
      setBlockchainPrice(tokenPrice.value);
    }
  };

  useEffect(() => {
    setBlockchain(currencies().find((c) => token.blockchain === c.abbr));
  }, [token]);

  const startTimer = async () => {
    fetch();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetch, 30000);
  };
  useEffect(() => {
    startTimer();
  }, [blockchain.abbr]);

  useEffect(() => {
    init();
  }, [gasValues]);

  return (
    <div className={styles.feeContainer} style={{ width: "100%" }}>
      <div
        className={styles.feeContainer}
        style={{
          gap: "0",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
        }}
      >
        <div style={{ padding: "1.2rem" }}>
          <div className={styles.feeRow}>
            <span>
              {t("payments.fee.gasPrice")}:{" "}
              {Math.round(gasPriceAsWei / 10 ** 9)} Gwei
            </span>
            <span>
              {t("payments.fee.gasLimit")}: {gasLimit}
            </span>
          </div>
          <div className={styles.feeRow}>
            <div
              style={{ display: "flex", gap: "0.4rem", alignItems: "start" }}
            >
              <img
                style={{ width: "1.4rem" }}
                src={theme === "dark" ? GasDark : GasLight}
              />
              <span>{t("payments.fee.maxFee")}</span>
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>
                  {t("payments.fee.description")}
                </span>
                <img
                  style={{ width: "1.4rem" }}
                  src={theme === "dark" ? InfoMarkDark : InfoMarkLight}
                />
              </div>
              :
            </div>
            <div
              style={{
                display: "flex",
                width: "16rem",
                justifyContent: "space-between",
              }}
            >
              <span>
                {formatTokenBalance(maxFee, 8)} {blockchain.abbr}
              </span>
              <span>
                {getCurrencySymbol()[currency]}
                {formatUSDBalance(maxFee * blockchainPrice * rate)}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0 0.4rem",
            }}
          >
            <img
              style={{ width: "1.4rem" }}
              src={theme === "dark" ? HourglassDark : HourglassLight}
            />
            <p style={{ marginTop: "0.2rem" }}>{t("payments.fee.updating")}</p>
          </div>
        </div>
        {parseFloat(vatPercent) > 0 && (
          <div
            className={styles.feeRow}
            style={{
              padding: "1.2rem",
              borderTop: "1px solid var(--border-color)",
              fontSize: "1.4rem",
            }}
          >
            <span>{t("payments.vat")}</span>
            <div>
              <span>{vatPercent}%</span>
              <span style={{ marginLeft: "3rem" }}>
                {getCurrencySymbol()[currency]}
                {formatUSDBalance(vatUSD * rate)}
              </span>
            </div>
          </div>
        )}
        <div
          className={styles.feeRow}
          style={{
            padding: "1.2rem",
            borderTop: "1px solid var(--border-color)",
            fontSize: "1.4rem",
          }}
        >
          <span>{t("payments.fee.total")}</span>
          <span>
            {getCurrencySymbol()[currency]}{" "}
            {formatUSDBalance((usdAmount + maxFee * blockchainPrice) * rate)}
          </span>
        </div>
      </div>
    </div>
  );
};
