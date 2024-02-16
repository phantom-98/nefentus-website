import { Helmet } from "react-helmet";
import VendorBody from "./vendor/index";
import { useTranslation } from "react-i18next";

const Vendor = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>
          Nefentus | {t("navigation.vender") + " " + t("navigation.dashboard")}
        </title>
      </Helmet>
      <VendorBody />
    </div>
  );
};

export default Vendor;
