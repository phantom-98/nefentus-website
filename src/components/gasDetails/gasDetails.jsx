import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themeContext/themeContext";
import { useEffect, useState } from "react";
import { currencies } from "../../constants";
import { uniswapApi } from "../../api/web3Api";
import { formatTokenBalance, formatUSDBalance } from "../../utils";
import styles from "./gasDetails.module.css";
import InfoMarkDark from "../../assets/icon/dark/info.svg";
import InfoMarkLight from "../../assets/icon/light/info.svg";
import GasDark from "../../assets/icon/dark/gas.svg";
import GasLight from "../../assets/icon/light/gas.svg";

export const GasDetails = ({ currency, usdAmount, gasLimit = 600_000 }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [gasValues, setGasValues] = useState({});
  const [gasPriceAsWei, setGasPrice] = useState(0);
  const [maxFee, setMaxFee] = useState(0);
  const [blockchain, setBlockchain] = useState(
    currencies().find((c) => currency.blockchain === c.abbr),
  );
  const [blockchainPrice, setBlockchainPrice] = useState(0);
  const uniswap = new uniswapApi();

  const init = async () => {
    setMaxFee((gasValues.gasPrice * gasLimit) / 10 ** blockchain.decimals);
    setBlockchainPrice(await uniswap.getNativeTokenPrice(blockchain.abbr));
  };

  const fetch = async () => {
    const res = await uniswap.getGasValues(blockchain.abbr);
    setGasValues(res);
    setGasPrice(res.gasPrice);
  };

  useEffect(() => {
    setBlockchain(currencies().find((c) => currency.blockchain === c.abbr));
  }, [currency]);

  useEffect(() => {
    fetch();
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
            <div>
              <span>
                {formatTokenBalance(maxFee, 8)} {blockchain.abbr}
              </span>
              <span style={{ marginLeft: "3rem" }}>
                ${formatUSDBalance(maxFee * blockchainPrice)}
              </span>
            </div>
          </div>
        </div>
        <div
          className={styles.feeRow}
          style={{
            padding: "1.2rem",
            borderTop: "1px solid var(--border-color)",
            fontSize: "1.4rem",
          }}
        >
          <span>{t("payments.fee.total")}:</span>
          <span>${formatUSDBalance(usdAmount + maxFee * blockchainPrice)}</span>
        </div>
      </div>
    </div>
  );
};
