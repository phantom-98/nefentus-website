import Button from "../button/button";
import Card from "../card/card";

import styles from "./balanceCard.module.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { currencies } from "../../../constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["80.54% ETH", "20.05% BTC", "10.41% XPR"],
  datasets: [
    {
      data: [80, 20, 10],
      backgroundColor: ["#0784B5", "#AF26E7", "#F5B51B"],
      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: { enabled: false },
  },
};

const BalanceCard = ({ total }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.left}>
        <div className={styles.label}>Balance</div>
        <div className={styles.value}>${total}</div>
        <div className={styles.subtitle}>{currencies.length} Crypto</div>
      </div>

      <div className={styles.right}>
        <Doughnut data={data} options={options} />

        <div className={styles.legend}>
          {data.labels.map((item, index) => (
            <div className={styles.legendItem}>
              <div
                className={styles.circle}
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></div>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
