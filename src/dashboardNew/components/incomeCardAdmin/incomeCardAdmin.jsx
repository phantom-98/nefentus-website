import { formatUSDBalance } from "../../../utils";

import Card from "../card/card";
import { Line } from "react-chartjs-2";

import styles from "./incomeCardAdmin.module.css";

import { Options } from "../../../components/input/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const optionsChart = {
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
        color: "#b1b1b159",
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value + " $";
        },
        suggestedMin: 0,
        padding: 10,
        color: "#b1b1b1",
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
        color: "#b1b1b1",
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

const today = new Date();

// Anzahl der Tage zwischen heute und dem 1. April 2023
const oneDay = 24 * 60 * 60 * 1000; // Millisekunden in einem Tag
const days = Math.round((today - new Date("Apr 01 2023")) / oneDay);

// Erstelle die Labels für den Chart
const labels1 = [];
let labels = [];
for (let i = 0; i < days; i += 2) {
  const date = new Date("Apr 01 2023");
  date.setDate(date.getDate() + i);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  labels1.push(`${month}, ${day}`);
}
if (labels1[labels1.length - 1] !== today.toLocaleDateString()) {
  const month = today.toLocaleString("default", { month: "short" });
  const day = today.getDate();
  labels1.push(`${month}, ${day}`);
}

const randomData = Array.from({ length: days }, () => 0);

function populateGraph(totalPrices) {
  labels = totalPrices ? Object.keys(totalPrices) : [];
  const values = totalPrices ? Object.values(totalPrices) : [];
  return {
    labels,
    datasets: [
      {
        label: "Income",
        data: values,
        borderColor: "#0784B5",
        backgroundColor: "#0784B5",
      },
    ],
  };
}

function getStartDate(data) {
  if (data == null) {
    return "2023-04-01";
  } else {
    return Object.keys(data)[0];
  }
}

function getTotalIncome(totalPrices) {
  if (totalPrices) {
    const values = Object.values(totalPrices);
    const sum = values.reduce(function (prev, currentValue) {
      return prev + currentValue;
    }, 0);
    return "$" + formatUSDBalance(sum);
  } else {
    return "$0";
  }
}

function getEndDate(data) {
  if (data == null) {
    return "2023-04-30";
  } else {
    const keys = Object.keys(data);
    return keys[keys.length - 1];
  }
}

const IncomeCardAdmin = ({ data }) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(t("graph.choosePeriod"));

  const months = [
    t("graph.months.January"),
    t("graph.months.February"),
    t("graph.months.March"),
    t("graph.months.April"),
    t("graph.months.May"),
    t("graph.months.June"),
    t("graph.months.July"),
    t("graph.months.August"),
    t("graph.months.September"),
    t("graph.months.October"),
    t("graph.months.November"),
    t("graph.months.December"),
  ];

  const extractUniqueMonthsAndYears = (data) => {
    return Object.keys(data).reduce((uniqueDates, date) => {
      const dateParts = date.split("-");
      const month = months[parseInt(dateParts[1], 10) - 1];
      const year = dateParts[0];
      const key = `${month} ${year}`;

      if (!uniqueDates.includes(key)) {
        uniqueDates.push(key);
      }

      return uniqueDates;
    }, []);
  };

  const options = [t("graph.allTime"), ...extractUniqueMonthsAndYears(data)];

  const filterDataByPeriod = (data, selectedPeriod) => {
    if (
      selectedPeriod === t("graph.allTime") ||
      selectedPeriod === t("graph.choosePeriod")
    ) {
      return data;
    } else {
      const filteredData = {};
      for (const date in data) {
        const dateParts = date.split("-");
        const month = months[parseInt(dateParts[1], 10) - 1];
        const year = `${dateParts[0]}`;
        const key = `${month} ${year}`;

        if (key === selectedPeriod) {
          filteredData[date] = data[date];
        }
      }
      return filteredData;
    }
  };

  const graphData = filterDataByPeriod({ ...data }, period);

  return (
    <Card className={`${styles.card}`}>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.label}>{t("dashboard.refIncome")}</div>
          <div className={styles.graphAmount}>{getTotalIncome(graphData)}</div>
        </div>

        <div className={styles.dropdownWrap}>
          <div className={styles.dropdownBorder}>
            <Options
              label={""}
              value={period}
              options={options}
              setValue={setPeriod}
            />
          </div>
          <div className={styles.datePicker}>
            <p>{getStartDate(graphData)}</p>
            <p> - </p>
            <p>{getEndDate(graphData)}</p>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <Line options={optionsChart} data={populateGraph(graphData)} />
      </div>
    </Card>
  );
};

export default IncomeCardAdmin;
