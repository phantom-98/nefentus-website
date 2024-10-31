import React from "react";
import SubscriptionPlan from "../../components/subscriptionPlan";
import { FAQ } from "../../components/landing";
import { Helmet } from "react-helmet";

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | Pricing</title>
      </Helmet>
      <div className="landing-layout">
        <SubscriptionPlan />
      </div>
      <div className="landing-layout">
        <FAQ />
      </div>
    </>
  );
};

export default Pricing;
