import React, { useState } from "react";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import CommonButton from "../commonButton";
import { ContactUs } from "../navigation/navigation";
import Button from "../button/button";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import "./header.css";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const loginAndSignupMobile = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          pointerEvents: "auto",
        }}
      >
        <Button
          style={{ width: "100%" }}
          link={`${process.env.VITE_REACT_APP_DASHBOARD}/login`}
          onClick={() => setOpenMenu(false)}
        >
          Log in
        </Button>
        <Button
          style={{ width: "100%" }}
          link={`${process.env.VITE_REACT_APP_DASHBOARD}/get-started`}
          color="white"
          onClick={() => setOpenMenu(false)}
        >
          Get started
        </Button>
      </div>
    );
  };
  return (
    <>
      <Flex align={"center"} justify={"space-between"}>
        <div className="cursor-pointer" onClick={() => navigate("/home2")}>
          <img src={LogoWide} alt="Nefentus" />
        </div>
        <Flex gap={"4.5rem"} className="header-list-container web-options">
          <Business />
          <Private />
          <ContactUs />
          <Pricing />
        </Flex>
        <Flex gap={8} className="web-options">
          <CommonButton text={"Log in"} type={"secondary"} />
          <CommonButton text={"Sign up"} type={"primary"} />
        </Flex>
        <div className={"mobMenu"}>
          <div className={`line ${openMenu ? "openLine" : ""}`}></div>
          <div className={`line ${openMenu ? "openLine" : ""}`}></div>
          <div className={`line ${openMenu ? "openLine" : ""}`}></div>

          <div
            onClick={() => setOpenMenu((prev) => !prev)}
            className={"lineButton"}
          ></div>
        </div>
      </Flex>
      <Flex
        vertical
        gap={12}
        className="mobile-header"
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-190%)",
          transition: "transform 0.5s ease",
        }}
      >
        <Flex align={"center"} justify={"space-between"}>
          <div>
            <img src={LogoWide} alt="Nefentus" />
          </div>
          <div className={"mobMenu"}>
            <div className={`line ${openMenu ? "openLine" : ""}`}></div>
            <div className={`line ${openMenu ? "openLine" : ""}`}></div>
            <div className={`line ${openMenu ? "openLine" : ""}`}></div>

            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className={"lineButton"}
            ></div>
          </div>
        </Flex>
        <Flex vertical gap={"4.5rem"} className="header-list-container">
          <div className="default-text">Business</div>
          <div className="default-text">Private</div>
          <ContactUs />
        </Flex>
        {loginAndSignupMobile()}
      </Flex>
    </>
  );
};

export default Header;

const Business = () => {
  const navigate = useNavigate();

  return (
    <div
      className="default-text cursor-pointer"
      onClick={() => navigate("/business")}
    >
      <p>Business</p>
    </div>
  );
};

const Private = () => {
  const navigate = useNavigate();

  return (
    <div
      className="default-text cursor-pointer"
      onClick={() => navigate("/private")}
    >
      <p>Private</p>
    </div>
  );
};

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="default-text cursor-pointer"
      onClick={() => navigate("/pricing")}
    >
      <p>Pricing</p>
    </div>
  );
};
