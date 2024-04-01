import { useEffect, useState } from "react";
import { coinList } from "../../constants";
import { useTranslation } from "react-i18next";
import styles from "./prices.module.css";
import { useAuth } from "../../context/auth/authContext";
import { formatUSDBalance } from "../../utils";

const Prices = () => {
  const [prices, setPrices] = useState([]);
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  useEffect(() => {
    const getPrices = async () => {
      const prices = await Promise.all(
        coinList.map(async (coin) => {
          const price = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin.url}`,
          );
          const priceJson = await price.json();
          return {
            ...coin,
            price: priceJson.market_data.current_price.usd,
            priceChange: priceJson.market_data.price_change_percentage_24h,
          };
        }),
      );
      setPrices(prices);
    };
    getPrices();
  }, []);

  return (
    prices && (
      <div className={`card ${styles.priceCard}`}>
        <h2>{t("home.latestPrice")}</h2>
        <div className={styles.container}>
          {prices?.map((price, index) => {
            return (
              <div className={styles.price_box} key={index}>
                <div className={styles.main_info}>
                  <img
                    src={price.icon}
                    alt={price.name}
                    className={styles.logo}
                  />
                  <p className={styles.currency}>
                    <span className={styles.abbr}>{price.abbr}</span>{" "}
                    <span className={styles.opacity}>{price.name}</span>
                  </p>
                </div>
                <span className={styles.abbr}>
                  {currencyRate.symbol}
                  {formatUSDBalance(price.price * currencyRate.rate)}
                </span>
                <span
                  className={`${styles.change} ${
                    price.priceChange >= 0 ? styles.positive : styles.negative
                  }`}
                >
                  {price.priceChange.toFixed(2)}%
                </span>
              </div>
            );
          })}
          <div className={styles.descriptionWrapper}>
            <span className={styles.description}>{t("home.priceChange")}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Prices;
