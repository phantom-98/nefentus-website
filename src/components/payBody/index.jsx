import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Popup from "../../dashboardNew/components/popup/popup";
import { PaymentInfo } from "../receivePayment";
import Edit from "../../assets/icon/edit.svg";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import backendAPI from "../../api/backendAPI";

const PayBody = ({ invoice }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
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
  };

  useEffect(() => {
    if (changed) {
      updateInvoiceData();
      setChanged(false);
    }
  }, [changed]);

  return (
    <ReceivePayment
      priceUSD={invoice.price}
      seller={invoice.user}
      transInfoArg={{ invoiceId: invoice.id }}
      info={
        <PaymentInfo
          fullName={name}
          setFullName={setName}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          business={company}
          setBusiness={setCompany}
          tax={tax}
          setTax={setTax}
          setChanged={setChanged}
        />
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
