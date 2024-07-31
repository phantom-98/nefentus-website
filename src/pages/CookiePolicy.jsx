import CookiePolicyBody from "../components/cookiepolicyBody/cookiepolicyBody";
import { Helmet } from "react-helmet";
import NefentusLogo from "../assets/logo/logo.svg";
import { Conclusion } from "../components/landing";
import "../components/landing/landing.css";

const CookiePolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | Cookie policy</title>
      </Helmet>
      <CookiePolicyBody />
      <Conclusion
        icon={NefentusLogo}
        title={`Transparent Pricing, <span style="white-space: nowrap;">No Strings Attached</span>`}
        subtitle={`Enjoy peace of mind with our straightforward approach—no hidden fees, no monthly subscriptions. Creating & using an account for personal use is completely free. Get started today!`}
        button={`Create an account`}
      />
    </div>
  );
};

export default CookiePolicy;
