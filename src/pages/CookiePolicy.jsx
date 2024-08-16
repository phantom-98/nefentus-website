import CookiePolicyBody from "../components/cookiepolicyBody/cookiepolicyBody";
import { Helmet } from "react-helmet";
import "../components/landing/landing.css";

const CookiePolicy = () => {
  return (
    <div className="landing-layout container">
      <Helmet>
        <title>Nefentus | Cookie policy</title>
      </Helmet>
      <CookiePolicyBody />
    </div>
  );
};

export default CookiePolicy;
