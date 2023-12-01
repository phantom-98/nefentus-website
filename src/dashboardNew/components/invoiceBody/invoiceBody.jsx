import { useContext, useEffect, useState } from "react";
import MessageComponent from "../../../components/message";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message/index";
import styles from "./settings.module.css";
import Card from "../card/card";
import WalletSetting from "../../containers/walletSetting/walletSetting";
import StablecoinSetting from "../../containers/stablecoinSetting/stablecoinSetting";
import Button from "../button/button";
import { EditPopup } from "../settings/settingsItem";
import SettingsTitle from "../settings/settingsTitle";
import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";

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

  useEffect(() => {
    handleConfirm();
  }, [vatNumber, sendInvoice]);

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
          <div style={{ paddingTop: 5 }} className={styles.left}>
            <span style={{ fontSize: "1.6rem" }}>VAT Number</span>
          </div>
          <div className={styles.right}>
            <span className={styles.value}>{vatNumber ? vatNumber : " "}</span>
          </div>
          <div>
            <Button color="gray" onClick={() => setShowPopup(true)}>
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
          <div className={styles.left}>
            <p style={{ fontSize: "1.6rem" }}>Send invoices</p>
          </div>
          <div className={styles.right}>
            <EnableType value={sendInvoice} />
          </div>
          <div>
            <Button
              color="gray"
              onClick={() => {
                setSendInvoice((prev) => !prev);
              }}
            >
              Enable
            </Button>
          </div>
        </div>
        <div style={{ paddingTop: 20 }}>
          <WalletSetting />
        </div>
        <div style={{ paddingTop: 20 }}>
          <StablecoinSetting />
        </div>
      </Card>
      <div></div>
    </div>
  );
};

export default InvoicesBody;

export const EnableType = ({ value }) => {
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>{value ? "On" : "Off"}</div>
    </div>
  );
};
