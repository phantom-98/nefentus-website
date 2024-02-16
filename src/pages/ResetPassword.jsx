import { useTranslation } from "react-i18next";
import ResetPasswords from "./../components/resetPassword/resetPassword";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const { t } = useTranslation();
  return (
    <div className="dashboardFont">
      <Helmet>
        <title>Nefentus | {t("navigation.resetPassword")}</title>
      </Helmet>
      <ResetPasswords />
    </div>
  );
};

export default ResetPassword;
