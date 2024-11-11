import React from "react";
import { Flex } from "antd";
import CommonButton from "../commonButton";
import BusinessFeatureImage from "../../assets/landing/business-features.png";
import MobileBusinessFeatureImage1 from "../../assets/landing/MobileBusinessFeatureImage-1.png";
import MobileBusinessFeatureImage2 from "../../assets/landing/MobileBusinessFeatureImage-2.png";

import Logo from "../../assets/logo/logo_n.png";
import { Heading } from "../landing";
import "./businessFeatures.css";

const BusinessFeatures = () => {
  return (
    <div>
      <Flex vertical gap={"5rem"} className="business-features">
        <Heading
          title={`Built for business owners like you`}
          subtitle={`Empowers businesses to streamline cryptocurrency transactions seamlessly,`}
        />

        <Flex
          gap={24}
          justify={"space-between"}
          className="business-features-container"
        >
          <Flex vertical gap={32} className="business-feature-left">
            <div className="business-nefentus-logo">
              <img src={Logo} alt="Nefentus" width={26} />
            </div>
            <div className="business-feature-text-btn">
              <div className="default-text-gray business-feature-left-text">
                Nefentus supports your business with efficient crypto solutions.
              </div>
              <CommonButton
                text={"Create an account"}
                type={"primary"}
                className="business-account-create"
              />
            </div>
          </Flex>
          <div className="business-feature-right">
            <img
              src={BusinessFeatureImage}
              alt="Business Features"
              width="100%"
            />
          </div>
          <Flex vertical gap={0} className="mobile-business-feature-right">
            <img
              src={MobileBusinessFeatureImage1}
              alt=" Business Features"
              width="100%"
            />
            <img
              src={MobileBusinessFeatureImage2}
              alt=" Business Features"
              width="100%"
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default BusinessFeatures;
