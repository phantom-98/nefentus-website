import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./securitySettings.module.css";
import { useTranslation } from "react-i18next";

const data = [
  {
    list: [
      {
        label: "Login Password",
        description: "Login password is used to log in to your account.",
        value: "1234567",
        type: "password",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Authenticator App",
        description:
          "Setup Multi-Factor-Authentication using Google Authenticator, Authy, Lastpass or similar.",
        value: false,
      },
      {
        label: "One-time passwords via email",
        description:
          "Setup Multi-Factor-Authentication based on one-time password sent via email.",
        value: true,
      },
    ],
    type: "enable",
  },
  {
    list: [
      {
        label: "Anti-Phishing Code",
        description:
          "Protect your account from phishing attempts and ensure that your notification emails are from Nefentus only.",
        value: true,
      },
    ],
    type: "enable",
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

      {/*
      <div
        className={styles.button}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="light">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
	  */}
    </Card>
  );
};

export default SecuritySettings;
