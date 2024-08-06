import AMLPolicyBody from "../components/amlpolicyBody/amlpolicyBody";
import { Helmet } from "react-helmet";
import NefentusLogo from "../assets/logo/logo.svg";
import { Conclusion } from "../components/landing";
import "../components/landing/landing.css";

const AMLPolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | AML policy</title>
      </Helmet>
      <AMLPolicyBody />
      <Conclusion
        icon={NefentusLogo}
        title={`Transparent Pricing, <span style="white-space: nowrap;">No Strings Attached</span>`}
        subtitle={`Enjoy peace of mind with our straightforward approach—no hidden fees, no monthly subscriptions. Creating & using an account for personal use is completely free. Get started today!`}
        button={`Create an account`}
      />
    </div>
  );
};

export default AMLPolicy;
