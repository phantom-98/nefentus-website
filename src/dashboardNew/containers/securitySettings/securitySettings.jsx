import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";
import SecurityItem from "../../components/settings/securityItem";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import backendAPI from "../../../api/backendAPI";

const SecuritySettings = () => {
  const { t, i18n } = useTranslation();
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
  ];

  const fetchSettings = async () => {
    const data = await new backendAPI().getSecuritySettings();
    console.log(data);
    setHasTotp(data["hasTotp"]);
    setHasOtp(data["hasOtp"]);
    setAntiPhishingCode(data["antiPhishingCode"]);
    setPassword(data["password"]);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // useEffect(()=>{
  //   if (changed){

  //   }
  // }, [changed])

  return (
    <Card className={styles.card}>
      <SettingsTitle
        title={t("security.settings.title")}
        description={t("security.settings.description")}
      />

      {data.map((item, i) => (
        <SecurityItem data={item} key={i} />
      ))}
    </Card>
  );
};

export default SecuritySettings;
