import Card from "../../components/card/card";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";
import SecurityItem from "../../components/settings/securityItem";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const SecuritySettings = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const data = useMemo(() => {
    return [
      {
        label: t("security.items.loginLabel"),
        description: t("security.items.loginDescription"),
        type: "password",
        flow: "password",
      },
      {
        label: t("security.items.labelAuthentication"),
        description: t("security.items.descriptionAuthentication"),
        value: JSON.parse(localStorage.getItem("hasTotp")),
        type: "button",
        flow: "totp",
      },
      {
        label: t("security.items.labelPassword"),
        description: t("security.items.descriptionPassword"),
        value: JSON.parse(localStorage.getItem("hasOtp")),
        type: "button",
        flow: "otp",
      },
      {
        label: t("security.items.labelCode"),
        description: t("security.items.descriptionCode"),
        value: localStorage.getItem("antiPhishingCode"),
        type: "phishingCode",
        flow: "phishingCode",
      },
    ];
  }, [language]);

  return (
    <Card className={styles.card}>
      <SettingsTitle
        title={t("security.settings.title")}
        description={t("security.settings.description")}
      />

      {data.map((item) => (
        <SecurityItem data={item} />
      ))}
    </Card>
  );
};

export default SecuritySettings;
