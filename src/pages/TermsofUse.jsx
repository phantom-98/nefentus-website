import TermsofUseBody from "./../components/termsofuse/termsofuseBody";
import { Helmet } from "react-helmet";
import "../components/landing/landing.css";

const TermsofUse = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | Terms of use</title>
      </Helmet>
      <TermsofUseBody />
    </div>
  );
};

export default TermsofUse;
