import React, { useState } from "react";
import { Divider, Menu } from "antd";
import WalletIcon from "../../../assets/newDashboardIcons/wallet-gray.svg";
import ArrowLeftUp from "../../../assets/newDashboardIcons/arrow-up-left-gray.svg";
import ArrowDownRight from "../../../assets/newDashboardIcons/arrow-down-right-gray.svg";
import ConverterIcon from "../../../assets/newDashboardIcons/converter.svg";
import LogoWide from "../../../assets/logo/logo_wide2.svg";
import AddUserIcon from "../../../assets/newDashboardIcons/add-user.svg";
import ReferralDashboardIcon from "../../../assets/newDashboardIcons/referral-dashboard.svg";
import { useTranslation } from "react-i18next";
import "./sidebar.css";
import SendCrypto from "../sendCrypto";
import ReceiveCrypto from "../receiveCrypto";
import Converter from "../converter";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SidebarNew = ({ title }) => {
  const { t } = useTranslation();
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openConvertModal, setOpenConvertModal] = useState(false);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);

  const handleSubmitCrypto = () => {
    setOpenSendModal(!openSendModal);
  };

  const handleConvertCrypto = () => {
    setOpenConvertModal(!openConvertModal);
  };

  const handleReceiveCrypto = () => {
    setOpenReceiveModal(!openReceiveModal);
  };
  const onClick = (e) => {
    console.log("click ", e);
    switch (+e?.key) {
      case 2:
        setOpenSendModal(!openSendModal);
        break;
      case 3:
        setOpenReceiveModal(!openReceiveModal);
        break;
      case 4:
        setOpenConvertModal(!openConvertModal);
        break;
    }
  };

  const items = [
    getItem(
      t("personalDashboard.sidebar.menu"),
      "grp",
      null,
      t(title) == t("referralDashboard.title")
        ? [
            getItem(
              t("referralDashboard.title"),
              "14",
              <img src={ReferralDashboardIcon} />,
            ),
            getItem(
              t("personalDashboard.sidebar.wallets"),
              "13",
              <img src={WalletIcon} />,
            ),
            getItem(
              t("referralDashboard.addUser"),
              "15",
              <img src={AddUserIcon} />,
            ),
          ]
        : [
            getItem(
              t("personalDashboard.sidebar.wallets"),
              "13",
              <img src={WalletIcon} />,
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
          <img src={ConverterIcon} />,
        ),
      ],
      "group",
    ),
  ];
  return (
    <>
      {openSendModal && (
        <SendCrypto
          openSendModal={openSendModal}
          handleSubmitCrypto={handleSubmitCrypto}
          onCloseModal={() => setOpenSendModal(false)}
        />
      )}
      {openReceiveModal && (
        <ReceiveCrypto
          openReceiveModal={openReceiveModal}
          handleReceiveCrypto={handleReceiveCrypto}
          onCloseModal={() => setOpenReceiveModal(false)}
        />
      )}
      <Converter
        openConvertModal={openConvertModal}
        onCloseModal={() => setOpenConvertModal(!openConvertModal)}
        handleConvertCrypto={handleConvertCrypto}
      />

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
    </>
  );
};

export default SidebarNew;
