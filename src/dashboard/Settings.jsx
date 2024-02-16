import { useTranslation } from "react-i18next";
import SettingsBody from "./settings/index";
import Sidebar from "./sidebar/sidebar";
import { Helmet } from "react-helmet";

const Settings = ({ type = "" }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.settings")}</title>
      </Helmet>
      <SettingsBody type={type} />
    </div>
  );
};

export default Settings;
