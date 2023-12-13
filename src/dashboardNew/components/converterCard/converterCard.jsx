import { useState } from "react";
import Card from "../card/card";
import Convert from "../../../assets/icon/convert.svg";
import styles from "./converterCard.module.css";
import Button from "../button/button";

import Bitcoin from "../../../assets/icon/crypto/bitcoin.svg";
import { useTranslation } from "react-i18next";

const ConverterCard = () => {
  const { t } = useTranslation();

  const [active, setActive] = useState(0);
  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles.label}>{t("converter.wallet")}</div>

          <div className={styles.options}>
            <div
              onClick={() => setActive(0)}
              className={`${styles.option} ${
                active === 0 ? styles.optionActive : ""
              }`}
            >
              <div className={styles.circle}></div>
              <div className={styles.optionText}>Nef Wallet</div>
            </div>
            <div
              onClick={() => setActive(1)}
              className={`${styles.option} ${
                active === 1 ? styles.optionActive : ""
              }`}
            >
              <div className={styles.circle}></div>
              <div className={styles.optionText}>Wallet Connect</div>
            </div>
          </div>
        </div>

        <div>
          <WalletBox />
          <div className={styles.convertIcon}>
            <img src={Convert} alt="" />
          </div>
          <WalletBox />

          <div className={styles.button}>
            <Button>{t("converter.convert")}</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConverterCard;

const WalletBox = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.walletBox}>
      <div className={styles.walletTop}>
        <div>{t("converter.from")}</div>
        <div>{t("converter.balance")}: 0 BTC</div>
      </div>
      <div className={styles.walletBody}>
        <div className={styles.inputWrapper}>
          <input type="number" placeholder="0.00" />
          <div>0.000045-6900</div>
        </div>

        <div className={styles.crypto}>
          <img src={Bitcoin} alt="" />
          <div>BTC</div>
        </div>
      </div>
    </div>
  );
};
