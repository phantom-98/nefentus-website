import { useContext, useState } from "react";
import TopInfo from "../../../dashboard/topInfo/topInfo";
import MessageComponent from "../../../components/message";
import { Buttons } from "../../../dashboard/settings/components/buttons";
import backend_API from "../../../api/backendAPI";
import InputComponent, { RawInput } from "../../../dashboard/input/input";
import { MessageContext } from "../../../context/message/index";
import styles from "./settings.module.css";
import CheckBox from "../../../assets/icon/whiteCheckmark.svg";

const InvoiceBody = () => {
  const [vatNumber, setVatNumber] = useState(localStorage.getItem("vatNumber"));
  const [sendInvoice, setSendInvoice] = useState(
    JSON.parse(localStorage.getItem("sendInvoice")),
  );
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
      <TopInfo
        title="Invoice"
        description="Enter your VAT number and confirm if you want to receive invoices."
      />
      <MessageComponent />

      <InputComponent
        label="VAT Number"
        placeholder="Enter your VAT number"
        type="text"
        setState={setVatNumber}
        value={vatNumber}
        secure
      />
      <div className={styles.input}>
        <p>Send invoices</p>
        <div
          onClick={() => setSendInvoice((prev) => !prev)}
          className={styles.checkBox}
        >
          {sendInvoice && <img src={CheckBox} alt="checkbox" />}
        </div>
      </div>

      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};

export default InvoiceBody;
