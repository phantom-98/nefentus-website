import { t } from "i18next";
import CookiePolicyBody from "./../components/cookiepolicyBody/cookiepolicyBody";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import NefentusLogo from "../assets/logo/logo.svg";
import { Conclusion } from "../components/landing";
import "../components/landing/landing.css";

const CookiePolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | {t("navigation.cookiepolicy")}</title>
      </Helmet>
      <CookiePolicyBody />
      <Conclusion
        icon={NefentusLogo}
        title={`Transparent Pricing, No Strings Attached`}
        subtitle={`Enjoy peace of mind with our straightforward approach—no hidden fees, no monthly subscriptions. Creating & using an account for personal use is completely free. Get started today!`}
        button={`Create an account`}
        isLanding={false}
      />
    </div>
  );
};

export default CookiePolicy;
