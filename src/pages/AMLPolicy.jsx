import AMLPolicyBody from "../components/amlpolicyBody/amlpolicyBody";
import { Helmet } from "react-helmet";
import "../components/landing/landing.css";

const AMLPolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | AML policy</title>
      </Helmet>
      <AMLPolicyBody />
    </div>
  );
};

export default AMLPolicy;
