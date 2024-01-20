import Button from "../button/button";
import Card from "../card/card";

import styles from "./balanceCard.module.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { currencies } from "../../../constants";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import useBalances from "../../../hooks/balances";
import useInternalWallet from "../../../hooks/internalWallet";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getIsExternal } from "../../../utils";
import usePrices from "../../../hooks/prices";

ChartJS.register(ArcElement, Tooltip, Legend);

const checkBalances = (balances) => {
  for (let i = 0; i < balances.length; i++)
    if (balances[i] === undefined) return false;
  return true;
};

const checkPrices = (priceList) => {
  return priceList?.length && priceList.every((price) => price != undefined);
};

const data = (percentages, balanaces, priceList) => {
  return {
    labels: currencies()?.map((currency, index) => {
      return `${percentages[index]}% ${currency.abbr}`;
    }),
    datasets: [
      {
        data: balanaces.map((balance, index) => balance * priceList[index]),
        backgroundColor: [
          "#27A4D1",
          "#E15554",
          "#E1BC29",
          "#3BB273",
          "#102542",
          "#6016D9",
          "#39DCBC",
          "#FFAF63",
          "#86D4FF",
        ],
        borderWidth: 0,
      },
    ],
  };
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: { enabled: false },
  },
};

const BalanceCard = ({ wallet }) => {
  const { t } = useTranslation();

  const [total, setTotal] = useState(0);
  const metamask = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: metamaskWallet(),
    address: useAddress(),
    status: useConnectionStatus(),
  };
  const { balances, fetchBalances } = useBalances(wallet);
  const { prices, fetchPrices } = usePrices(wallet);
  let internalWalletAddress = useInternalWallet();
  const [percentages, setPercentages] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    fetchBalances(wallet?.address);
    fetchPrices();
  }, [wallet]);

  // useEffect(() => {
  //   if (internalWalletAddress) {
  //     fetchBalances(internalWalletAddress);
  //   }
  // }, []);

  useEffect(() => {
    if (checkBalances(balances) && checkPrices(prices)) {
      let totalBalance = balances
        .map((balance, index) => balance * prices[index])
        .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);
      setTotal(totalBalance || 0);

      if (totalBalance > 0) {
        const pers = balances.map((balance, index) =>
          parseFloat(
            ((balance * prices[index]) / (totalBalance * 1.0)) * 100,
          ).toFixed(2),
        );
        setPercentages(pers);
      }
    }
  }, [balances, prices]);

  return (
    <Card className={styles.card}>
      <div className={styles.left}>
        <div className={styles.label}>{t("dashboard.balance")}</div>
        <div className={styles.value}>${parseFloat(total).toFixed(2)}</div>
        <div className={styles.subtitle}>{currencies().length} Crypto</div>
      </div>

      {total !== 0 && (
        <div className={styles.right}>
          <Doughnut
            data={data(percentages, balances, prices)}
            options={options}
            className="Test-Donut"
          />

          <div className={styles.legend}>
            {data(percentages, balances, prices).labels.map((item, index) => (
              <div className={styles.legendItem}>
                <div
                  className={styles.circle}
                  style={{
                    backgroundColor: data(percentages, balances, prices)
                      .datasets[0].backgroundColor[index],
                  }}
                ></div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default BalanceCard;
