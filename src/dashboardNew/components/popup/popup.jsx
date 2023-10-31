import Button from "../button/button";
import Card from "../card/card";

import styles from "./popup.module.css";
import ReactDOM from "react-dom";
import Close from "../../../assets/icon/close.svg";
import Verify from "../../../assets/icon/verify.svg";
import Clipboard from "../../../assets/icon/clipboard.svg";

import Checkmark from "../../../assets/icon/checkmark.svg";

const Popup = ({
  show,
  setShow,
  children,
  onClick = () => {},
  title = "Change Value",
}) => {
  const dashboardElement = document.getElementById("dashboard");

  const handleConfirmClick = () => {
    onClick();
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div
      className={styles.popup}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.title}>{title}</div>
        {children}
        <div className={styles.buttons}>
          <Button color="light" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmClick}>Confirm</Button>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export default Popup;

export const VerifyPopup = ({
  show,
  setShow,
  children,
  onClick = () => {},
}) => {
  const dashboardElement = document.getElementById("dashboard");

  return ReactDOM.createPortal(
    <div
      className={`${styles.popup} ${styles.verifyPopup}`}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.close}>
          <img src={Close} alt="" onClick={() => setShow(false)} />
        </div>

        <img src={Verify} alt="" />
        <div className={styles.title}>{"Verify your email"}</div>
        <div className={styles.description}>
          Please check your email address by clicking on the verification link
          in the confirmation email
        </div>

        <div className={styles.resend}>Resend in 60s </div>

        <div className={styles.buttons}>
          <Button onClick={onClick}>Send Again</Button>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export const PaymentPopup = ({
  price,
  show,
  setShow,
  tax,
  name,
  email,
  company,
  address,
  link,
  onClick = () => {},
}) => {
  const dashboardElement = document.getElementById("dashboard");

  return ReactDOM.createPortal(
    <div
      className={`${styles.popup} ${styles.paymentPopup}`}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.close}>
          <img src={Close} alt="" onClick={() => setShow(false)} />
        </div>

        <img src={Checkmark} style={{ width: "5rem" }} alt="" />
        <div className={styles.title}>{price}</div>
        <div className={styles.description}>{tax}</div>

        <div className={styles.body}>
          <div className={styles.row}>
            <p>Name:</p>
            <p>{name}</p>
          </div>
          <div className={styles.row}>
            <p>Email:</p>
            <p>{email}</p>
          </div>
          <div className={styles.row}>
            <p>Company:</p>
            <p>{company}</p>
          </div>
          <div className={styles.row}>
            <p>Address:</p>
            <p>{address}</p>
          </div>
        </div>

        <div className={styles.linkRow}>
          <p>Link:</p>
          <div>
            <img src={Clipboard} alt="" />

            <p>{link}</p>
          </div>
        </div>

        <div className={styles.paymentButtons}>
          <Button onClick={onClick}>Scan QR Code</Button>
          <div>Download invoice</div>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export const QRPopup = ({
  show,
  setShow,
  name,
  email,
  company,
  address,
  link,
  onClick = () => {},
}) => {
  const dashboardElement = document.getElementById("dashboard");

  return ReactDOM.createPortal(
    <div
      className={`${styles.popup} ${styles.paymentPopup}`}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.close}>
          <img src={Close} alt="" onClick={() => setShow(false)} />
        </div>

        <div className={styles.title}>Scan QR Code</div>
        <div className={styles.description}>
          To confirm you need to scan QR code
        </div>

        <img
          src={
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          }
          style={{ width: "20rem", margin: "2rem 0 3rem 0" }}
          alt=""
        />

        <div className={styles.paymentButtons}>
          <Button onClick={() => setShow(false)}>Close</Button>
          <div onClick={onClick}>Download invoice</div>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};
