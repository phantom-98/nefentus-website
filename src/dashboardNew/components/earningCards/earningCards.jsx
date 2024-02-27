import Card from "../card/card";

import Positive from "../../../assets/icon/positive.svg";
import Negative from "../../../assets/icon/negative.svg";

import styles from "./earningCards.module.css";
import { useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";

const EarningCards = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const dashboardApi = new vendorDashboardApi();

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    fetchData();
  }, [language]);

  const fetchData = async () => {
    const getPromises = [dashboardApi.getTotalIncome()];
    const [sales] = await Promise.allSettled(getPromises);

    const cardsContent = [
      {
        title: t("dashboard.earningCards.first"),
        value: `$${parseFloat(sales?.value?.total?.number)?.toLocaleString(
          undefined,
          { maximumFractionDigits: 2 },
        )}`,
        percentage: sales?.value?.total?.percentage
          ? parseFloat(sales?.value?.total?.percentage).toFixed(2)
          : 0,
      },
      {
        title: t("dashboard.earningCards.second"),
        value: `$${parseFloat(
          sales?.value?.last24Hours?.number,
        )?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
        percentage: sales?.value?.last24Hours?.percentage
          ? parseFloat(sales?.value?.last24Hours?.percentage).toFixed(2)
          : 0,
      },
      {
        title: t("dashboard.earningCards.third"),
        value: `$${parseFloat(sales?.value?.last30Days?.number)?.toLocaleString(
          undefined,
          { maximumFractionDigits: 2 },
        )}`,
        percentage: sales?.value?.last30Days?.percentage
          ? parseFloat(sales?.value?.last30Days?.percentage).toFixed(2)
          : 0,
      },
    ];

    setCardInfo(cardsContent);
  };

  return (
    <div className={styles.cards}>
      {cardInfo.map((item, index) => (
        <SingleCard data={item} key={index} />
      ))}
    </div>
  );
};

export default EarningCards;

const SingleCard = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <div className={styles.label}>{data.title}</div>
      <div className={styles.value}>{data.value}</div>
      <div className={styles.percentage}>
        <img src={data.percentage >= 0 ? Positive : Negative} alt="" />
        <div className={styles.percentageText}>
          <div
            className={data.percentage >= 0 ? styles.positive : styles.negative}
          >
            {data.percentage}%
          </div>
          <div className={styles.rest}>
            {t("dashboard.earningCards.progress")}
          </div>
        </div>
      </div>
    </Card>
  );
};
