import { useEffect } from "react";
import Card from "../../components/card/card";

import styles from "./choiceWallet.module.css";
import backendAPI from "../../../api/backendAPI";

const ChoiceWallet = () => {
  const BackandAPI = new backendAPI();

  useEffect(() => {
    BackandAPI.getWalletAddresses();
  }, []);

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>
            Wallet to receive funds Description
          </div>
          <div className={styles.description}>
            Choose the wallet that receives funds when creating an invoice or
            selling product
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};

export default ChoiceWallet;
