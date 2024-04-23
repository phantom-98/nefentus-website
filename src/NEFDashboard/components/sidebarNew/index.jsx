import React from "react";
import { Divider, Menu } from "antd";
import Walleticon from "../../../assets/newDashboardIcons/wallets.svg";
import ArrowLeftUp from "../../../assets/newDashboardIcons/arrow-up-left-gray.svg";
import ArrowDownRight from "../../../assets/newDashboardIcons/arrow-down-right-gray.svg";
import Converter from "../../../assets/newDashboardIcons/converter.svg";
import LogoWide from "../../../assets/logo/logo_wide2.svg";
import { useTranslation } from "react-i18next";
import "./sidebar.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SidebarNew = () => {
  const { t } = useTranslation();
  const onClick = (e) => {
    console.log("click ", e);
  };

  const items = [
    getItem(
      t("personalDashboard.sidebar.menu"),
      "grp",
      null,
      [
        getItem(
          t("personalDashboard.sidebar.wallets"),
          "13",
          <img src={Walleticon} />,
        ),
      ],
      "group",
    ),
    { type: "divider" },
    getItem(
      t("personalDashboard.sidebar.payments"),
      "sub1",
      null,
      [
        getItem(
          t("personalDashboard.sidebar.sendCrypto"),
          "2",
          <img src={ArrowLeftUp} />,
        ),
        getItem(
          t("personalDashboard.sidebar.receiveCrypto"),
          "3",
          <img src={ArrowDownRight} />,
        ),
        getItem(
          t("personalDashboard.sidebar.convert"),
          "4",
          <img src={Converter} />,
        ),
      ],
      "group",
    ),
  ];
  return (
    <div className="sidebar-container">
      <div className="nefentus-logo">
        <img src={LogoWide} alt="logo" />
      </div>
      <Divider className="logo-divider" />
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className="sidebar-menu"
      />
    </div>
  );
};

export default SidebarNew;
