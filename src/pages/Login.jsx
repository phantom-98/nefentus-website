import { useTranslation } from "react-i18next";
import LoginBox from "./../components/loginBox/loginBox";
import { Helmet } from "react-helmet";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="dashboardFont">
      <Helmet>
        <title>Nefentus | {t("navigation.login")}</title>
      </Helmet>
      <LoginBox />
    </div>
  );
};

export default Login;
