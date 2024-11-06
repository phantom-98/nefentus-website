import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";
import Button from "../../components/button/button";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import HeroLine1 from "../../assets/landing/hero-line-top-left.svg";
import HeroLine2 from "../../assets/landing/hero-line-bottom-left.svg";
import HeroImage from "../../assets/landing/hero.png";
// import Hero1 from "../../assets/landing/hero1.png";
// import Hero2 from "../../assets/landing/hero2.png";
import RightArrow from "../../assets/icon/right-arrow.svg";
// import HomeBackground from "../../assets/landing/home-banner-background.svg";
import Logos from "../../components/logos/logos";
import {
  Benefits,
  Community,
  CryptoManage,
  FAQ,
  Helps,
  Industries,
  MainFeaturesBody,
  MainFeaturesHead,
} from "../../components/landing";
import CommonButton from "../../components/commonButton";
import Footer from "../../components/footer";
import { ContactUs } from "../../components/navigation/navigation";
import SubscriptionPlan from "../../components/subscriptionPlan";
import { Helmet } from "react-helmet";
import "./home.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Nefentus | Home</title>
      </Helmet>
      <Flex className="home-banner">
        <Flex vertical gap={"2rem"} className="home-banner-left">
          <h1 className="title">
            Reach more customers with{" "}
            <span className="gradient">seamless crypto invoicing </span>
          </h1>
          <p className="default-text-gray home-banner-subtext">
            Leading the way in mass adoption, our invoicing tool helps
            businesses easily transition into digital assets. Free to start, no
            onboarding fees – seamless crypto payments for businesses of any
            size!
          </p>
          <Flex gap={"2rem"} className="button-container">
            <a href={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}>
              <CommonButton
                text={"Get started"}
                type={"primary"}
                className={"banner-get-started-button"}
              />
            </a>
            <a href="/business-support">
              <span className="talk-to-expert default-text">
                Talk to an expert
              </span>
              <img src={RightArrow} alt="Right arrow" />
            </a>
          </Flex>
        </Flex>
        <Flex className="home-banner-right" justify={"flex-end"}>
          <img
            src={HeroImage}
            // className="horizontal-border vertical-border"
            alt="Payment details on Nefentus"
          />
          {/* <img
              src={Hero2}
              className="horizontal-border vertical-border"
              alt="Cryptocurrency payments on Nefentus"
            /> */}
        </Flex>
      </Flex>
      <div className="logos-scroller">
        <Logos />
      </div>

      <div className="landing-layout">
        <Helps />
      </div>

      <div className="landing-layout crypto-manage-layout">
        <CryptoManage />
      </div>
      <div className="landing-layout">
        <Benefits />
      </div>
      <div className="landing-layout main-features">
        <MainFeaturesHead />
        <MainFeaturesBody />
      </div>
      <div className="landing-layout">
        <Industries />
      </div>
      <div className="landing-layout">
        <Community />
      </div>
      <div className="landing-layout">
        <FAQ />
      </div>
    </>
  );
};

export default Home;
