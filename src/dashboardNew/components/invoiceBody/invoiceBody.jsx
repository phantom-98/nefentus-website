import { useContext, useState } from "react";
import MessageComponent from "../../../components/message";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message/index";
import styles from "./settings.module.css";
import CheckBox from "../../../assets/icon/whiteCheckmark.svg";
import Card from "../card/card";
import WalletSetting from "../../containers/walletSetting/walletSetting";
import Button from "../button/button";
import { EditPopup } from "../settings/settingsItem";
import SettingsTitle from "../settings/settingsTitle";

const InvoicesBody = () => {
  const [vatNumber, setVatNumber] = useState(localStorage.getItem("vatNumber"));
  const [sendInvoice, setSendInvoice] = useState(
    JSON.parse(localStorage.getItem("sendInvoice")),
  );
  const [showPopup, setShowPopup] = useState(false);

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();

  const handleConfirm = async () => {
    const response = await backendAPI.updateInvoiceSettings({
      sendInvoice,
      vatNumber,
    });
    if (response == null) {
      setErrorMessage("Failed to update");
      return;
    } else {
      setInfoMessage("Successfully updated!");
    }
    setErrorMessage(null);
  };

  return (
    <div className={styles.tabContent}>
      <MessageComponent />
      <Card className={styles.card}>
        <SettingsTitle
          title="Invoice"
          description="Enter your VAT number and confirm if you want to receive invoices."
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <div style={{ paddingTop: 5 }}>
            <span style={{ fontSize: "1.6rem" }}>VAT Number</span>
          </div>
          <div>
            <Button
              color="gray"
              style={{ width: 100, marginRight: 10 }}
              onClick={() => setShowPopup(true)}
            >
              Add
            </Button>
          </div>
        </div>
        <EditPopup
          show={showPopup}
          setShow={setShowPopup}
          value={vatNumber}
          setValue={setVatNumber}
        />
        <div className={styles.input}>
          <p style={{ fontSize: "1.6rem" }}>Send invoices</p>
          <div
            onClick={() => setSendInvoice((prev) => !prev)}
            className={styles.checkBox}
          >
            {sendInvoice && <img src={CheckBox} alt="checkbox" />}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end", paddingTop: 20 }}>
          <Button
            color="gray"
            style={{ width: 100, marginRight: 10 }}
            onClick={() => setVatNumber("")}
          >
            Reset
          </Button>
          <Button style={{ width: 100 }} onClick={handleConfirm}>
            <p style={{ fontSize: "1rem" }}>Confirm</p>
          </Button>
        </div>
      </Card>
      <div>
        <WalletSetting />
      </div>
    </div>
  );
};

export default InvoicesBody;
