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
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const checkBalances = (balances) => {
  for (let i = 0; i < balances.length; i++) if (!balances[i]) return false;
  return true;
};

const data = (percentages, balanaces) => ({
  labels: [
    `${percentages[0]}% ETH`,
    `${percentages[1]}% USDT`,
    `${percentages[2]}% USDC`,
    `${percentages[3]}% Bitcoin`,
    `${percentages[4]}% DAI`,
  ],
  datasets: [
    {
      data: [
        balanaces[0],
        balanaces[1],
        balanaces[2],
        balanaces[3],
        balanaces[4],
      ],
      backgroundColor: ["#0784B5", "#AF26E7", "#F5B51B", "#FFFFFF", "#66AABB"],
      borderWidth: 0,
    },
  ],
});

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: { enabled: false },
  },
};

const BalanceCard = () => {
  const [total, setTotal] = useState(0);
  const metamask = {
    connect: useConnect(),
    disconnect: useDisconnect(),
    config: metamaskWallet(),
    address: useAddress(),
    status: useConnectionStatus(),
  };
  const { balances } = useBalances(metamask);
  const [percentages, setPercentages] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (checkBalances(balances[1])) {
      let totalBalance = balances[1].reduce(
        (pre, cur) => parseFloat(cur) + parseFloat(pre),
        0,
      );
      setTotal(totalBalance);

      if (totalBalance > 0) {
        const pers = balances[1].map((balance) =>
          parseFloat((balance / (totalBalance * 1.0)) * 100).toFixed(2),
        );

        setPercentages(pers);
      }
    }
  }, [balances]);

  return (
    <Card className={styles.card}>
      <div className={styles.left}>
        <div className={styles.label}>Balance</div>
        <div className={styles.value}>${parseFloat(total).toFixed(2)}</div>
        <div className={styles.subtitle}>{currencies().length} Crypto</div>
      </div>

      {total !== 0 && (
        <div className={styles.right}>
          <Doughnut data={data(percentages, balances[1])} options={options} />

          <div className={styles.legend}>
            {data(percentages, balances[1]).labels.map((item, index) => (
              <div className={styles.legendItem}>
                <div
                  className={styles.circle}
                  style={{
                    backgroundColor: data(percentages, balances[1]).datasets[0]
                      .backgroundColor[index],
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
