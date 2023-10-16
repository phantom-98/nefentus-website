import Card from "../card/card";

import styles from "./paymentForm.module.css";
import Input from "../../containers/input/input";
import Button from "../button/button";
import { PaymentPopup, QRPopup } from "../popup/popup";
import { useState } from "react";

const PaymentForm = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Card>
        <div className={styles.title}>Create a new invoice</div>

        <div className={styles.row}>
          <Input placeholder="Enter amount in $" />
          <Input placeholder="Email" />
          <Input placeholder="Name" />
          <Input placeholder="Company" />
          <Input placeholder="Address" />
          <Input placeholder="Tax number" />
        </div>

        <div className={styles.button}>
          <Button onClick={() => setShowPopup("payment")}>
            Create Invoice
          </Button>
        </div>
      </Card>

      {showPopup === "payment" ? (
        <PaymentPopup
          show={showPopup}
          setShow={setShowPopup}
          price="$200"
          tax="Tax Number 2132981390"
          name="John Doe"
          email="john.doe@gmail.com"
          company="Nefentus"
          address="500 McDowel"
          link="nefentus.com/pay/giJxzc8"
          onClick={() => setShowPopup("QRPopup")}
        />
      ) : showPopup === "QRPopup" ? (
        <QRPopup
          show={showPopup}
          setShow={setShowPopup}
          price="$200"
          tax="Tax Number 2132981390"
          name="John Doe"
          email="john.doe@gmail.com"
          company="Nefentus"
          address="500 McDowel"
          link="nefentus.com/pay/giJxzc8"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PaymentForm;
