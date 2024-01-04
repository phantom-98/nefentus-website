import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Popup from "../../dashboardNew/components/popup/popup";
import Edit from "../../assets/icon/edit.svg";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import backendAPI from "../../api/backendAPI";

const PayBody = ({ invoice }) => {
  const { t } = useTranslation();

  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState();
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState();
  const [showCompany, setShowCompany] = useState(false);
  const [company, setCompany] = useState();
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState();
  const [showTax, setShowTax] = useState(false);
  const [tax, setTax] = useState();
  const [changed, setChanged] = useState(false);
  const backend_API = new backendAPI();

  useEffect(() => {
    setEmail(invoice.email);
    setName(invoice.name);
    setCompany(invoice.company);
    setAddress(invoice.address);
    setTax(invoice.taxNumber);
  }, [invoice]);

  const updateInvoiceData = async () => {
    const req = {
      amountUSD: invoice.price,
      name,
      email,
      company,
      address,
      taxNumber: tax,
    };
    const data = await backend_API.updateInvoice(invoice.link, req);
    if (data) {
      console.log("success");
    } else {
      console.log("failed");
    }
    setChanged(false);
  };

  useEffect(() => {
    if (changed) {
      updateInvoiceData();
    }
  }, [changed]);

  return (
    <ReceivePayment
      priceUSD={invoice.price}
      seller={invoice.user}
      transInfoArg={{ invoiceId: invoice.id }}
      info={
        <>
          <div className={`card ${styles.payInfo}`}>
            <div className={styles.body}>
              <div className={styles.top}>
                <div>
                  <p className={styles.title}>{t("payments.pay.title")}</p>
                  <p className={styles.description}>
                    {t("payments.pay.description")}
                  </p>
                </div>
              </div>
              <p className={styles.seller}>{t("payments.buyer")}</p>
              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>{t("payments.price")}:</span>{" "}
                  <span>{invoice.price} USD</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.name")}:</span>
                  <span>
                    <img
                      className={styles.edit}
                      src={Edit}
                      onClick={() => {
                        setShowName(true);
                      }}
                    />
                    {name}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.email")}:</span>{" "}
                  <span>
                    <img
                      className={styles.edit}
                      src={Edit}
                      onClick={() => {
                        setShowEmail(true);
                      }}
                    />
                    {email}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.company")}:</span>{" "}
                  <span>
                    <img
                      className={styles.edit}
                      src={Edit}
                      onClick={() => {
                        setShowCompany(true);
                      }}
                    />
                    {company}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.address")}:</span>{" "}
                  <span>
                    <img
                      className={styles.edit}
                      src={Edit}
                      onClick={() => {
                        setShowAddress(true);
                      }}
                    />
                    {address}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.taxNumber")}:</span>{" "}
                  <span>
                    <img
                      className={styles.edit}
                      src={Edit}
                      onClick={() => {
                        setShowTax(true);
                      }}
                    />
                    {tax}
                  </span>
                </p>
              </div>
              <p className={styles.seller}>{t("payments.seller")}</p>
              <div className={styles.columns}>
                <p className={styles.price}>
                  <span>{t("payments.name")}:</span>{" "}
                  <span>
                    {invoice.user?.firstName} {invoice.user?.lastName}
                  </span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.email")}:</span>{" "}
                  <span>{invoice.user?.email}</span>
                </p>
                <p className={styles.price}>
                  <span>{t("payments.company")}:</span>{" "}
                  <span>{invoice.user?.business}</span>
                </p>
              </div>
            </div>
          </div>
          <>
            <EditPopup
              title={t("payments.email")}
              show={showEmail}
              setShow={setShowEmail}
              value={email}
              setValue={setEmail}
              setChanged={setChanged}
            />
            <EditPopup
              title={t("payments.name")}
              show={showName}
              setShow={setShowName}
              value={name}
              setValue={setName}
              setChanged={setChanged}
            />
            <EditPopup
              title={t("payments.company")}
              show={showCompany}
              setShow={setShowCompany}
              value={company}
              setValue={setCompany}
              setChanged={setChanged}
            />
            <EditPopup
              title={t("payments.address")}
              show={showAddress}
              setShow={setShowAddress}
              value={address}
              setValue={setAddress}
              setChanged={setChanged}
            />
            <EditPopup
              title={t("payments.taxNumber")}
              show={showTax}
              setShow={setShowTax}
              value={tax}
              setValue={setTax}
              setChanged={setChanged}
            />
          </>
        </>
      }
    />
  );
};

export default PayBody;

const EditPopup = ({ title, show, setShow, value, setValue, setChanged }) => {
  const [text, setText] = useState();
  const [head, setHead] = useState();
  useEffect(() => {
    setText(value);
    setHead(title);
  }, [value, title]);

  return (
    <Popup
      show={show}
      onClose={() => {
        setShow(false);
        setText(value);
      }}
      onConfirm={() => {
        setShow(false);
        setValue(text);
        setChanged(true);
      }}
      title={head}
    >
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Popup>
  );
};
