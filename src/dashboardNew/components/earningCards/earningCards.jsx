import Card from "../card/card";

import Positive from "../../../assets/icon/positive.svg";
import Negative from "../../../assets/icon/negative.svg";

import styles from "./earningCards.module.css";

const EarningCards = ({ data }) => {
  return (
    <div className={styles.cards}>
      {data.map((item, index) => (
        <SingleCard data={item} key={index} />
      ))}
    </div>
  );
};

export default EarningCards;

const SingleCard = ({ data }) => {
  return (
    <Card>
      <div className={styles.label}>{data.title}</div>
      <div className={styles.value}>{data.amount}</div>
      <div className={styles.percentage}>
        <img src={data.percentage > 0 ? Positive : Negative} alt="" />
        <div className={styles.percentageText}>
          <div
            className={data.percentage > 0 ? styles.positive : styles.negative}
          >
            {data.percentage}%
          </div>
          <div className={styles.rest}>vs last 30 days</div>
        </div>
      </div>
    </Card>
  );
};
