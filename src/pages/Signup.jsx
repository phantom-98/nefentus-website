import { useTranslation } from "react-i18next";
import Signup from "./../components/signup/signup";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.signUp")}</title>
      </Helmet>
      <Signup className="dashboardFont" />
    </div>
  );
};

export default SignUp;
