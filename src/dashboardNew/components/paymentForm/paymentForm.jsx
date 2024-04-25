import Card from "../card/card";

import styles from "./paymentForm.module.css";
import Input from "../../containers/input/input";
import Button from "../button/button";
import { QRPopup } from "../popup/popup";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../../context/message";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/auth/authContext";
import { Options } from "../../../components/input/input";

const PaymentForm = ({ setLoadingData }) => {
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [taxInfo, setTaxInfo] = useState();
  const [showEuro, setShowEuro] = useState(false);
  const [reverseCharge, setReverseCharge] = useState(false);
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
    if (!taxPercent) {
      setErrorMessage(t("messages.error.taxPercentValid"));
      return;
    }
    // if (!email) {
    //   setErrorMessage(t("messages.validation.validEmail"));
    //   return;
    // }
    // if (!name) {
    //   setErrorMessage(t("messages.validation.nameValid"));
    //   return;
    // }
    // if (!company) {
    //   setErrorMessage(t("messages.validation.companyValid"));
    //   return;
    // }
    // if (!address) {
    //   setErrorMessage(t("messages.validation.addressValid"));
    //   return;
    // }
    // if (!taxNumber) {
    //   setErrorMessage(t("messages.validation.taxNumberValid"));
    //   return;
    // }

    const data = {
      amountUSD: parseFloat(amount) / currencyRate.rate,
      email,
      name,
      company,
      address,
      taxNumber,
      vatPercent: taxPercent,
      showEuro,
      reverseCharge,
    };

    // Create invoice
    const invoiceLinkPart = await vendorAPI.createInvoice(data);

    if (invoiceLinkPart) {
      const invoiceLink = window.location.origin + "/pay/" + invoiceLinkPart;
      setQRValue(invoiceLink);
      setShowPopup("qrcode");
      setLoadingData((prev) => !prev);
    } else {
      setErrorMessage(t("messages.error.createInvoice"));
    }
  }
  async function loadTaxInfo() {
    const info = await vendorAPI.getTaxInfo();
    if (info && info[0]) {
      setTaxInfo(JSON.parse(info[0].vatPercent));
    }
  }

  useEffect(() => {
    loadTaxInfo();
  }, []);

  return (
    <>
      <Card>
        <div className={styles.title}>{t("payments.title")}</div>

        <div className={styles.row}>
          <Input
            placeholder={t("payments.enterAmount").concat(
              currencyRate.symbol + "*",
            )}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <Input
              placeholder={t("payments.taxNumber")}
              value={taxNumber}
              setVaue={setTaxNumber}
            />
            {taxInfo && (
              <Options
                dashboard
                value={taxPercent}
                setValue={setTaxPercent}
                options={taxInfo}
              />
            )}
          </div>
          <Input
            placeholder={t("payments.address")}
            value={address}
            setVaue={setAddress}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              fontSize: "1.4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <label style={{ marginTop: "0.2rem" }}>
                {t("payments.showEuro")}
              </label>
              <Input
                type={"checkbox"}
                value={showEuro}
                setVaue={setShowEuro}
                placeholder={""}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <label style={{ marginTop: "0.2rem" }}>
                {t("payments.reverseCharge")}
              </label>
              <Input
                type={"checkbox"}
                value={reverseCharge}
                setVaue={setReverseCharge}
                placeholder={""}
              />
            </div>
          </div>

          <div className={styles.button}>
            <Button width="14rem" onClick={createInvoice}>
              {t("payments.createInvoice")}
            </Button>
          </div>
        </div>
      </Card>

      {showPopup === "qrcode" && (
        <QRPopup
          show={showPopup}
          setShow={setShowPopup}
          price={amount}
          taxNumber={taxNumber}
          name={name}
          email={email}
          company={company}
          address={address}
          link={qrValue}
        />
      )}
    </>
  );
};

export default PaymentForm;
