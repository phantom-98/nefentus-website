import Button from "../button/button";
import Card from "../card/card";
import styles from "./cryptoCard.module.css";

import Ethereum from "../../../assets/icon/crypto/ethereum.svg";
import { useState } from "react";

const data = [
  {
    icon: Ethereum,
    title: "Ethereum",
    subtitle: "$1,226.08",
    middleName: "Ethereum",
    middleInfo: "Network",
    value: "$37,953.88",
    cryptoValue: "ETH 30.94823503",
  },
  {
    icon: Ethereum,
    title: "Ethereum",
    subtitle: "$1,226.08",
    middleName: "Ethereum",
    middleInfo: "Network",
    value: "$37,953.88",
    cryptoValue: "ETH 30.94823503",
  },
  {
    icon: Ethereum,
    title: "Ethereum",
    subtitle: "$1,226.08",
    middleName: "Ethereum",
    middleInfo: "Network",
    value: "$37,953.88",
    cryptoValue: "ETH 30.94823503",
  },
  {
    icon: Ethereum,
    title: "Ethereum",
    subtitle: "$1,226.08",
    middleName: "Ethereum",
    middleInfo: "Network",
    value: "$37,953.88",
    cryptoValue: "ETH 30.94823503",
  },
  {
    icon: Ethereum,
    title: "Ethereum",
    subtitle: "$1,226.08",
    middleName: "Ethereum",
    middleInfo: "Network",
    value: "$37,953.88",
    cryptoValue: "ETH 30.94823503",
  },
];

const CryptoCard = () => {
  const [activeToggle, setActiveToggle] = useState(true);

  return (
    <Card>
      <div className={styles.top}>
        <div className={styles.label}>Crypto Market</div>

        <div className={styles.buttonWrapper}>
          <div className={styles.btn}>
            <p>Hide Zero Balance Assets</p>

            <div
              onClick={() => setActiveToggle((prev) => !prev)}
              className={`${activeToggle ? styles.activeToggle : ""} ${
                styles.toggle
              }`}
            >
              <div className={`${styles.toggleCircle}`}></div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button color="light">Receive</Button>
            <Button>Send</Button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {data.map((item) => (
          <CryptoItem data={item} />
        ))}
      </div>
    </Card>
  );
};

export default CryptoCard;

const CryptoItem = ({ data }) => {
  return (
    <div className={styles.cryptoItem}>
      <div className={styles.left}>
        <img src={data.icon} alt="" />

        <div>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.subtitle}>{data.subtitle}</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.title}>{data.middleName}</div>
        <div className={styles.subtitle}>{data.middleInfo}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{data.value}</div>
        <div className={styles.subtitle}>{data.cryptoValue}</div>
      </div>
    </div>
  );
};
