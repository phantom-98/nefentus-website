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
import { useAuth } from "../../../context/auth/authContext";
import { formatUSDBalance } from "../../../utils";

const Popup = ({
  show,
  children,
  onConfirm,
  onClose,
  cancelTitle = "Cancel",
  confirmTitle = "Confirm",
  title,
  className = "",
  spinner,
}) => {
  const dashboardElement = document.getElementById("dashboard");

  return ReactDOM.createPortal(
    <div
      className={
        className == "" ? styles.popup : `${styles.popup} ${className}`
      }
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
          {onConfirm && (
            <Button onClick={onConfirm} spinner={spinner}>
              {confirmTitle}
            </Button>
          )}
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
  onInvoice,
  onReceipt,
}) => {
  const dashboardElement = document.getElementById("dashboard");
  // const { name, email, price, company, address, taxNumber, link } = data;
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  return ReactDOM.createPortal(
    <div
      className={`${styles.popup} ${styles.paymentPopup}`}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={`${styles.popupBox} ${styles.scroll}`}>
        <div className={styles.close}>
          <img src={Close} alt="" onClick={() => setShow(false)} />
        </div>

        <div className={styles.title}>{t("payments.scan")}</div>
        <div className={styles.description}>
          {t("payments.scanDescription")}
        </div>

        <Table
          data={[
            [`${t("payments.amount")}:`, `${price} ${currencyRate.to}`],
            [`${t("payments.email")}:`, email],
            [`${t("payments.name")}:`, name],
            [`${t("payments.company")}:`, company],
            [`${t("payments.address")}:`, address],
            [`${t("payments.taxNumber")}:`, taxNumber],
            ["Link: ", <CopyValue value={link} onCopy={() => {}} link />],
          ]}
          colSizes={[1, 2]}
        />
        {link && (
          <div
            style={{
              backgroundColor: "#fff",
              margin: "16px",
              borderRadius: "1rem",
            }}
          >
            <QRCode value={link} size={200} style={{ margin: "10px" }} />
          </div>
        )}
        <div className={styles.paymentButtons}>
          <Button onClick={() => setShow(false)}>{t("general.close")}</Button>
          {email &&
            email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") &&
            onInvoice && (
              <div onClick={onInvoice} className={styles.download}>
                {t("payments.downloadInvoice")}
              </div>
            )}
          {email &&
            email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$") &&
            onReceipt && (
              <div onClick={onReceipt} className={styles.download}>
                {t("payments.downloadReceipt")}
              </div>
            )}
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export const TransactionInfo = ({ show, setShow, transaction }) => {
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  return (
    <Popup
      show={show}
      title={t("transactions.detail.title")}
      onConfirm={() => setShow(false)}
      confirmTitle={t("general.close")}
    >
      <div className={styles.transaction}>
        <div className={styles.transactionWrapper}>
          <div className={styles.transactionHeader}>
            <div style={{ alignItems: "flex-start;" }}>
              <p>{t("transactions.detail.concurrencyTitle")}</p>
              <p>{transaction.crypto}</p>
            </div>
          </div>
          <div className={styles.transactionHeader}>
            <div
              style={{ alignItems: "flex-end", textAlign: "right !important;" }}
            >
              <p>{t("transactions.detail.amountTitle")}</p>
              <p>
                {currencyRate.symbol}
                {formatUSDBalance(transaction.amount * currencyRate.rate)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.billWrapper}>
          <div>
            <span>{t("transactions.detail.fees")}</span>
          </div>
          <div className={styles.bill}>
            <div>
              <div className={styles.fee}>
                <span>{t("transactions.detail.swap")}</span>
                <span>
                  {currencyRate.symbol}
                  {formatUSDBalance(transaction.swapFee * currencyRate.rate)}
                </span>
              </div>
              <div className={styles.fee}>
                <span>{t("transactions.detail.transaction")}</span>
                <span>
                  {currencyRate.symbol}
                  {formatUSDBalance(
                    transaction.transactionFee * currencyRate.rate,
                  )}
                </span>
              </div>
              <div className={styles.fee}>
                <span>{t("transactions.detail.commission")}</span>
                <span>
                  {currencyRate.symbol}
                  {formatUSDBalance(
                    transaction.commissionFee * currencyRate.rate,
                  )}
                </span>
              </div>
            </div>
            <div className={styles.fee}>
              <span>{t("transactions.detail.total")}</span>
              <span>
                {currencyRate.symbol}
                {formatUSDBalance(transaction.total * currencyRate.rate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
