import React from "react";
import { Helmet } from "react-helmet";
import {
  B2CHero,
  MultiWallets,
  Transactions,
} from "../../components/landing/B2C";
import { B2BCryptoManage } from "../../components/landing/B2B";
import { Audience } from "../../components/landing";

const Private = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | B2C</title>
      </Helmet>
      <div className="landing-layout">
        <B2CHero />
      </div>
      <div className="landing-layout">
        <MultiWallets />
      </div>
      <div className="landing-layout">
        <B2BCryptoManage />
      </div>
      <div className="landing-layout">
        <Transactions />
      </div>
      <div className="landing-layout">
        <Audience />
      </div>
    </>
  );
};

export default Private;
