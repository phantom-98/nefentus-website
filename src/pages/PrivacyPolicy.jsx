import PrivacyPolicyBody from "./../components/privacyPolicyBody/privacyPolicyBody";
import { Helmet } from "react-helmet";
import "../components/landing/landing.css";

const PrivacyPolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | Privacy policy</title>
      </Helmet>
      <PrivacyPolicyBody />
    </div>
  );
};

export default PrivacyPolicy;
