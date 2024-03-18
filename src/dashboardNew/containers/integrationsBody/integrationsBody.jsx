import React from "react";
import styles from "./integrationsBody.module.css";
import WalletIntegration from "../../components/WalletIntegration/WalletIntegration";
import SettingsTitle from "../../components/settings/settingsTitle";
import Card from "../../components/card/card";
import { useTranslation } from "react-i18next";
import { checkJwtToken } from "../../../utils";

const IntegrationsBody = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <div className={styles.titleHeader}>
        <SettingsTitle
          title={t("integrations.title")}
          description={t("integrations.subtitle")}
        />
      </div>

      <div className={styles.walletsWrap}>
        <WalletIntegration />
      </div>
    </Card>
  );
};

export default IntegrationsBody;
