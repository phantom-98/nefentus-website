import Card from "../card/card";

import Positive from "../../../assets/icon/positive.svg";
import Negative from "../../../assets/icon/negative.svg";

import styles from "./earningCards.module.css";

const EarningCards = ({ cardInfo }) => {
  return (
    <div
      className={styles.cards}
      style={{ gridTemplateColumns: "1fr ".repeat(cardInfo.length) }}
    >
      {cardInfo.map((item, index) => (
        <SingleCard data={item} key={index} />
      ))}
    </div>
  );
};

export default EarningCards;

const SingleCard = ({ data }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.label}>{data.title}</div>
      <div className={styles.value}>{data.value}</div>
      {data.percentage !== null && data.percentage !== undefined && (
        <div className={styles.percentage}>
          <img src={data.percentage >= 0 ? Positive : Negative} alt="" />
          <div className={styles.percentageText}>
            <div
              className={
                data.percentage >= 0 ? styles.positive : styles.negative
              }
            >
              {data.percentage}%
            </div>
            <div className={styles.rest}>{data.progress}</div>
          </div>
        </div>
      )}
    </Card>
  );
};
