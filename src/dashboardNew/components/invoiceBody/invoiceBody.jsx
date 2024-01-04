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
import { useTranslation } from "react-i18next";
import { get } from "react-hook-form";
import Popup from "../popup/popup";

const InvoicesBody = () => {
  const [vatNumber, setVatNumber] = useState();
  const [enableInvoicing, setEnableInvoicing] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [stablecoin, setStablecoin] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [changed, setchanged] = useState(false);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  // const [settings, setSettings] = useState({});
  const { t } = useTranslation();

  const backendAPI = new backend_API();

  const updateSettings = async () => {
    const response = await backendAPI.updateInvoiceSettings({
      enableInvoicing,
      vatNumber,
      stablecoin,
      walletAddress,
    });
    if (response == null) {
      setErrorMessage("Failed to update");
      return;
    } else {
      setInfoMessage("Successfully updated!");
    }
    setErrorMessage(null);
    setchanged(false);
  };

  const loadSettings = async () => {
    const invoice = await backendAPI.getInvoiceSettings();
    const res = await invoice.json();
    setStablecoin(res["stablecoin"]);
    setVatNumber(res["vatNumber"]);
    setWalletAddress(res["walletAddress"]);
    setEnableInvoicing(res["enableInvoicing"]);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (changed) {
      updateSettings();
    }
  }, [changed]);

  return (
    <div className={styles.tabContent}>
      <MessageComponent />
      <Card className={styles.card}>
        <SettingsTitle
          title={t("invoice.title")}
          description={t("invoice.description")}
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
            <span style={{ fontSize: "1.6rem" }}>{t("invoice.vatNumber")}</span>
          </div>
          <div className={styles.right}>
            <span className={styles.value}>{vatNumber || " "}</span>
          </div>
          <div>
            <Button
              color="gray"
              fontSize="1rem"
              width="8rem"
              onClick={() => setShowPopup(true)}
            >
              {t("invoice.action.add")}
            </Button>
          </div>
        </div>
        <EditPopup
          show={showPopup}
          setShow={setShowPopup}
          value={vatNumber}
          setValue={(v) => {
            setVatNumber(v);
            setchanged(true);
          }}
        />
        <div className={styles.input}>
          <div className={styles.left}>
            <p style={{ fontSize: "1.6rem" }}>{t("invoice.enableInvoicing")}</p>
          </div>
          <div className={styles.right}>
            <EnableType value={enableInvoicing} />
          </div>
          <div>
            <Button
              color="gray"
              fontSize="1rem"
              width="9.5rem"
              onClick={() => {
                setEnableInvoicing((prev) => !prev);
                setchanged(true);
              }}
            >
              {enableInvoicing
                ? t("invoice.action.disable")
                : t("invoice.action.enable")}
            </Button>
          </div>
        </div>
        <div
          style={{
            paddingTop: 20,
            borderBottom: "solid 1px rgba(255,255,255,0.1)",
            paddingBottom: 20,
          }}
        >
          <WalletSetting
            value={walletAddress}
            setValue={(w) => {
              setWalletAddress(w);
              setchanged(true);
            }}
          />
        </div>
        <div style={{ paddingTop: 20 }}>
          <StablecoinSetting
            value={stablecoin}
            setValue={(c) => {
              setStablecoin(c);
              setchanged(true);
            }}
          />
        </div>
      </Card>
      <div></div>
    </div>
  );
};

export default InvoicesBody;

export const EnableType = ({ value }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>
        {value ? t("invoice.action.turnOn") : t("invoice.action.turnOff")}
      </div>
    </div>
  );
};
