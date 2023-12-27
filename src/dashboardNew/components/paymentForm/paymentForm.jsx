import Card from "../card/card";

import styles from "./paymentForm.module.css";
import Input from "../../containers/input/input";
import Button from "../button/button";
import { PaymentPopup, QRPopup } from "../popup/popup";
import { useContext, useState } from "react";
import { MessageContext } from "../../../context/message";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";

const PaymentForm = ({ setLoadingData }) => {
  const { t } = useTranslation();

  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const { clearMessages, setErrorMessage, setInfoMessage } =
    useContext(MessageContext);
  const [qrValue, setQRValue] = useState("");

  const vendorAPI = new vendorDashboardApi();

  async function createInvoice() {
    // Check data
    if (!amount) {
      setErrorMessage(t("messages.error.amountValid"));
      return;
    }
    if (!email) {
      setErrorMessage(t("messages.validation.validEmail"));
      return;
    }
    if (!name) {
      setErrorMessage(t("messages.validation.nameValid"));
      return;
    }
    if (!company) {
      setErrorMessage(t("messages.validation.companyValid"));
      return;
    }
    if (!address) {
      setErrorMessage(t("messages.validation.addressValid"));
      return;
    }
    if (!taxNumber) {
      setErrorMessage(t("messages.validation.taxNumberValid"));
      return;
    }

    const data = {
      amountUSD: amount,
      email,
      name,
      company,
      address,
      taxNumber,
    };

    // Create invoice
    const invoiceLinkPart = await vendorAPI.createInvoice(data);

    if (invoiceLinkPart) {
      const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
      setQRValue(invoiceLink);
      setShowPopup("payment");
      setLoadingData((prev) => !prev);
    } else {
      setErrorMessage(t("messages.error.createInvoice"));
    }
  }

  return (
    <>
      <Card>
        <div className={styles.title}>{t("payments.title")}</div>

        <div className={styles.row}>
          <Input
            placeholder={t("payments.enterAmount")}
            value={amount}
            setVaue={setAmount}
          />
          <Input
            placeholder={t("payments.email")}
            value={email}
            setVaue={setEmail}
          />
          <Input
            placeholder={t("payments.name")}
            value={name}
            setVaue={setName}
          />
          <Input
            placeholder={t("payments.company")}
            value={company}
            setVaue={setCompany}
          />
          <Input
            placeholder={t("payments.address")}
            value={address}
            setVaue={setAddress}
          />
          <Input
            placeholder={t("payments.taxNumber")}
            value={taxNumber}
            setVaue={setTaxNumber}
          />
        </div>

        <div className={styles.button}>
          <Button width="14rem" onClick={createInvoice}>
            {t("payments.createInvoice")}
          </Button>
        </div>
      </Card>

      {showPopup === "payment" ? (
        <PaymentPopup
          show={showPopup}
          setShow={setShowPopup}
          price={`$${amount}`}
          tax={`Tax Number ${taxNumber}`}
          name={name}
          email={email}
          company={company}
          address={address}
          link={qrValue}
          onClick={() => setShowPopup("QRPopup")}
        />
      ) : (
        <QRPopup
          show={showPopup}
          setShow={setShowPopup}
          data={{
            amount,
            email,
            name,
            company,
            address,
            taxNumber,
          }}
        />
      )}
    </>
  );
};

export default PaymentForm;
