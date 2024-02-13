import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";
import SecurityItem from "../../components/settings/securityItem";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import backendAPI from "../../../api/backendAPI";
import MessageComponent from "../../../components/message";
import { useLocation } from "react-router-dom";
import { checkJwtToken } from "../../../utils";

const SecuritySettings = () => {
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { recommendRecover } = state || {};
  const { language } = i18n;
  const [password, setPassword] = useState("");
  const [hasTotp, setHasTotp] = useState(false);
  const [hasOtp, setHasOtp] = useState(false);
  const [antiPhishingCode, setAntiPhishingCode] = useState("");
  const [changed, setChanged] = useState(false);
  const data = [
    {
      label: t("security.items.loginLabel"),
      description: t("security.items.loginDescription"),
      value: password,
      type: "password",
      flow: "password",
    },
    {
      label: t("security.items.labelAuthentication"),
      description: t("security.items.descriptionAuthentication"),
      value: hasTotp,
      type: "button",
      flow: "totp",
    },
    {
      label: t("security.items.labelPassword"),
      description: t("security.items.descriptionPassword"),
      value: hasOtp,
      type: "button",
      flow: "otp",
    },
    {
      label: t("security.items.labelCode"),
      description: t("security.items.descriptionCode"),
      value: antiPhishingCode,
      type: "phishingCode",
      flow: "phishingCode",
    },
    {
      label: t("security.items.seedPhrase"),
      description: t("security.items.seedDescription"),
      value: false,
      type: "button",
      flow: "seed",
    },
    {
      label: t("security.items.recover"),
      description: t("security.items.recoverDescription"),
      value: false,
      type: "button",
      flow: "recover",
    },
  ];

  const fetchSettings = async () => {
    await checkJwtToken();
    const data = await new backendAPI().getSecuritySettings();

    setHasTotp(data["hasTotp"]);
    setHasOtp(data["hasOtp"]);
    setAntiPhishingCode(data["antiPhishingCode"]);
    setPassword(data["password"]);
  };

  useEffect(() => {
    fetchSettings();
    console.log(recommendRecover, "recommendRecover");
  }, []);

  return (
    <>
      <Card className={styles.card}>
        <SettingsTitle
          title={t("security.settings.title")}
          description={t("security.settings.description")}
        />

        {data.map((item, i) => (
          <SecurityItem data={item} key={i} recover={recommendRecover} />
        ))}
      </Card>
    </>
  );
};

export default SecuritySettings;
