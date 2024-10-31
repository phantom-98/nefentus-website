import React from "react";
import { Helmet } from "react-helmet";
import {
  Analytics,
  B2BCryptoManage,
  HeroB2B,
  Invoicing,
  Product,
  Security,
  World,
} from "../../components/landing/B2B";
import BusinessFeatures from "../../components/businessFeatures";
import { FAQ } from "../../components/landing";

const Business = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2B</title>
      </Helmet>
      <div className="landing-layout">
        <HeroB2B />
      </div>
      <div className="landing-layout">
        <World />
      </div>
      <div className="landing-layout">
        <Invoicing />
      </div>
      <div className="landing-layout">
        <BusinessFeatures />
      </div>
      <div className="landing-layout">
        <Product />
      </div>
      <div className="landing-layout">
        <Analytics />
      </div>
      <div className="landing-layout">
        <Security />
      </div>
      <div className="landing-layout">
        <B2BCryptoManage />
      </div>
      <div className="landing-layout">
        <FAQ />
      </div>
    </>
  );
};

export default Business;
