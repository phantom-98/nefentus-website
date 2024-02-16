import { useTranslation } from "react-i18next";
import PassswordForgot from "./../components/passwordForgot/passwordForgot";
import Helmet from "react-helmet";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="dashboardFont">
      <Helmet>
        <title>Nefentus | {t("navigation.forgotPassword")}</title>
      </Helmet>
      <PassswordForgot />
    </div>
  );
};

export default Login;
