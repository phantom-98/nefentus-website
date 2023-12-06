import Card from "../card/card";

import styles from "./paymentForm.module.css";
import Input from "../../containers/input/input";
import Button from "../button/button";
import { PaymentPopup, QRPopup } from "../popup/popup";
import { useContext, useState } from "react";
import { MessageContext } from "../../../context/message";
import vendorDashboardApi from "../../../api/vendorDashboardApi";

const PaymentForm = ({ setLoadingData }) => {
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
      setErrorMessage("Please enter a valid amount");
      return;
    }
    if (!email) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (!name) {
      setErrorMessage("Please enter a valid name");
      return;
    }
    if (!company) {
      setErrorMessage("Please enter a valid company");
      return;
    }
    if (!address) {
      setErrorMessage("Please enter a valid address");
      return;
    }
    if (!taxNumber) {
      setErrorMessage("Please enter a valid tax number");
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
      setErrorMessage("Could not create an invoice!");
    }
  }

  return (
    <>
      <Card>
        <div className={styles.title}>Create a new invoice</div>

        <div className={styles.row}>
          <Input
            placeholder="Enter amount in $"
            value={amount}
            setVaue={setAmount}
          />
          <Input placeholder="Email" value={email} setVaue={setEmail} />
          <Input placeholder="Name" value={name} setVaue={setName} />
          <Input placeholder="Company" value={company} setVaue={setCompany} />
          <Input placeholder="Address" value={address} setVaue={setAddress} />
          <Input
            placeholder="Tax number"
            value={taxNumber}
            setVaue={setTaxNumber}
          />
        </div>

        <div className={styles.button}>
          <Button onClick={createInvoice}>Create Invoice</Button>
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
