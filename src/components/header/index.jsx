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
  const onClose = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <>
      <Flex
        align={"center"}
        justify={"space-between"}
        className="header-container"
      >
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={LogoWide} alt="Nefentus" />
        </div>
        <Flex gap={"4.5rem"} className="header-list-container web-options">
          <Flex
            align={"center"}
            justify={"center"}
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/business");
            }}
          >
            Business
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/private");
            }}
          >
            Private
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/pricing");
            }}
          >
            Pricing
          </Flex>
          <ContactUs />
        </Flex>
        <Flex gap={8} className="web-options">
          <CommonButton
            key={"Login"}
            text={"Log in"}
            type={"secondary"}
            onClick={() => {
              window.location.href = `${process.env.VITE_REACT_APP_DASHBOARD}/login`;
            }}
          />
          <CommonButton
            key={"signup"}
            text={"Sign up"}
            type={"primary"}
            onClick={() => {
              window.location.href = `${process.env.VITE_REACT_APP_DASHBOARD}/get-started`;
            }}
          />
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
        gap={"2.5rem"}
        className="mobile-header header-length"
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-190%)",
          transition: "transform 0.5s ease",
        }}
      >
        <Flex align={"center"} justify={"space-between"}>
          <div
            onClick={() => {
              navigate("/");
              onClose();
            }}
          >
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
        <Flex vertical gap={"2.5rem"} className="header-list-container">
          <div
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/business");
              onClose();
            }}
          >
            Business
          </div>
          <div
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/private");
              onClose();
            }}
          >
            Private
          </div>
          <div
            className="default-text cursor-pointer header-text-font"
            onClick={() => {
              navigate("/pricing");
              onClose();
            }}
          >
            Pricing
          </div>
          <ContactUs />
        </Flex>
        {loginAndSignupMobile()}
      </Flex>
    </>
  );
};

export default Header;
