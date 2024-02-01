import Card from "../card/card";
import { Line } from "react-chartjs-2";

import styles from "./incomeCard.module.css";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/themeContext/themeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,

  tension: 0.1,

  plugins: {
    title: {
      display: true,
    },
    legend: {
      position: "bottom",
    },
  },

  scales: {
    y: {
      beginAtZero: true,

      grid: {
        color: "rgba(255,255,255,0.08)",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value + " $";
        },
        suggestedMin: 0,
        padding: 10,
        color: "rgba(255,255,255,0.6)",
        font: {
          size: window.innerWidth < 550 ? 8 : 12,
          family: "Axiforma ",
          weight: 400,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "rgba(255,255,255,0.6)",
        padding: 10,
        font: {
          family: "Axiforma",
          weight: 400,
          size: window.innerWidth < 550 ? 8 : 12,
        },
      },
    },
  },
};

export const optionsLight = {
  responsive: true,
  maintainAspectRatio: false,

  tension: 0.1,

  plugins: {
    title: {
      display: true,
    },
    legend: {
      position: "bottom",
    },
  },

  scales: {
    y: {
      beginAtZero: true,

      grid: {
        color: "rgba(0,0,0,0.08)",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value + " $";
        },
        suggestedMin: 0,
        padding: 10,
        color: "rgba(0,0,0,0.6)",
        font: {
          size: window.innerWidth < 550 ? 8 : 12,
          family: "Axiforma ",
          weight: 400,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: "rgba(0,0,0,0.6)",
        padding: 10,
        font: {
          family: "Axiforma",
          weight: 400,
          size: window.innerWidth < 550 ? 8 : 12,
        },
      },
    },
  },
};

const IncomeCard = ({ data }) => {
  const { t } = useTranslation();

  const { theme } = useTheme();

  return (
    <Card className={styles.card}>
      <div className={styles.label}>{t("dashboard.balanceTitle")}</div>

      {Object.keys(data).length != 0 && (
        <div className={styles.chart}>
          <Line
            options={theme === "dark" ? options : optionsLight}
            data={data}
          />
        </div>
      )}
    </Card>
  );
};

export default IncomeCard;
