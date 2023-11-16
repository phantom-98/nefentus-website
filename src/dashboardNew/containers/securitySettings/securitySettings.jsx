import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";
import SecurityItem from "../../components/settings/securityItem";
import { useTranslation } from "react-i18next";

const data = [
  {
    label: "Login Password",
    description: "Login password is used to log in to your account.",
    type: "password",
    flow: "password",
  },
  {
    label: "Authenticator App",
    description:
      "Setup Multi-Factor-Authentication using Google Authenticator, Authy, Lastpass or similar.",
    value: JSON.parse(localStorage.getItem("hasTotp")),
    type: "button",
    flow: "totp",
  },
  {
    label: "One-time passwords via email",
    description:
      "Setup Multi-Factor-Authentication based on one-time password sent via email.",
    value: JSON.parse(localStorage.getItem("hasOtp")),
    type: "button",
    flow: "otp",
  },
  {
    label: "Anti-Phishing Code",
    description:
      "Protect your account from phishing attempts and ensure that your notification emails are from Nefentus only.",
    value: localStorage.getItem("antiPhishingCode"),
    type: "phishingCode",
    flow: "phishingCode",
  },
];

const SecuritySettings = () => {
  const { t } = useTranslation();

  return (
    <Card className={styles.card}>
      <SettingsTitle
        title={t("security.settings.title")}
        description={t("security.settings.description")}
      />

      {data.map((item) => (
        <SettingsItem data={item} />
      ))}
    </Card>
  );
};

export default SecuritySettings;
