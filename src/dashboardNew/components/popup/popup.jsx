import Button from "../button/button";
import Card from "../card/card";

import styles from "./popup.module.css";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import Close from "../../../assets/icon/close.svg";
import Verify from "../../../assets/icon/verify.svg";
import Clipboard from "../../../assets/icon/clipboard.svg";

import Checkmark from "../../../assets/icon/checkmark.svg";
import Table from "../../../components/table";
import CopyValue from "../../../dashboard/copyValue";
import { useTranslation } from "react-i18next";

const Popup = ({
  show,
  children,
  onConfirm,
  onClose,
  cancelTitle = "Cancel",
  confirmTitle = "Confirm",
  title,
}) => {
  const dashboardElement = document.getElementById("dashboard");

  return ReactDOM.createPortal(
    <div
      className={styles.popup}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        {title && <div className={styles.title}>{title}</div>}
        {children}
        <div className={styles.buttons}>
          {onClose && (
            <Button color="light" onClick={onClose}>
              {cancelTitle}
            </Button>
          )}
          {onConfirm && <Button onClick={onConfirm}>{confirmTitle}</Button>}
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

  const { t } = useTranslation();

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
        <div className={styles.title}>{`$${price}`}</div>
        <div className={styles.description}>
          {t("payments.taxNumber")} {tax}
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <p>{t("payments.name")}:</p>
            <p>{name}</p>
          </div>
          <div className={styles.row}>
            <p>{t("payments.email")}:</p>
            <p>{email}</p>
          </div>
          <div className={styles.row}>
            <p>{t("payments.company")}:</p>
            <p>{company}</p>
          </div>
          <div className={styles.row}>
            <p>{t("payments.address")}:</p>
            <p>{address}</p>
          </div>
        </div>

        <div className={styles.linkRow}>
          <p>Link:</p>
          <div
            style={{ marginLeft: "16px" }}
            onClick={() => navigator.clipboard.writeText(link)}
          >
            <img src={Clipboard} alt="" />

            <p>{link}</p>
          </div>
        </div>

        <div className={styles.paymentButtons}>
          <Button onClick={onClick}>{t("payments.scan")}</Button>
          <div>{t("payments.downloadInvoice")}</div>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export const QRPopup = ({
  show,
  setShow,
  price,
  taxNumber,
  name,
  email,
  company,
  address,
  link,
  onClick,
}) => {
  const dashboardElement = document.getElementById("dashboard");
  // const { name, email, price, company, address, taxNumber, link } = data;
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <div
      className={`${styles.popup} ${styles.paymentPopup}`}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.close}>
          <img src={Close} alt="" onClick={() => setShow(false)} />
        </div>

        <div className={styles.title}>{t("payments.scan")}</div>
        <div className={styles.description}>
          {t("payments.scanDescription")}
        </div>

        <Table
          data={[
            [`${t("payments.amount")}:`, `${price} USD`],
            [`${t("payments.email")}:`, `${email}`],
            [`${t("payments.name")}:`, `${name}`],
            [`${t("payments.company")}:`, `${company}`],
            [`${t("payments.address")}:`, `${address}`],
            [`${t("payments.taxNumber")}:`, `${taxNumber}`],
            ["Link: ", <CopyValue value={link} onCopy={() => {}} link />],
          ]}
          colSizes={[1, 2]}
        />

        {/* <img
          src={
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          }
          style={{ width: "20rem", margin: "2rem 0 3rem 0" }}
          alt=""
        /> */}
        {link && <QRCode value={link} size={256} />}
        <div className={styles.paymentButtons}>
          <Button onClick={() => setShow(false)}>{t("general.close")}</Button>
          <div onClick={onClick}>{t("payments.downloadInvoice")}</div>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};
