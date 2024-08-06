import PrivacyPolicyBody from "./../components/privacyPolicyBody/privacyPolicyBody";
import { Helmet } from "react-helmet";
import NefentusLogo from "../assets/logo/logo.svg";
import { Conclusion } from "../components/landing";
import "../components/landing/landing.css";

const PrivacyPolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | Privacy policy</title>
      </Helmet>
      <PrivacyPolicyBody />
      <Conclusion
        icon={NefentusLogo}
        title={`Transparent Pricing, <span style="white-space: nowrap;">No Strings Attached</span>`}
        subtitle={`Enjoy peace of mind with our straightforward approach—no hidden fees, no monthly subscriptions. Creating & using an account for personal use is completely free. Get started today!`}
        button={`Create an account`}
      />
    </div>
  );
};

export default PrivacyPolicy;
