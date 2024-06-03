import React, { useState } from "react";
import {
  Divider,
  Menu,
  Avatar,
  Row,
  Col,
  Flex,
  Switch,
  Select,
  Button,
} from "antd";
import WalletIcon from "../../../assets/newDashboardIcons/wallet-gray.svg";
import ArrowLeftUp from "../../../assets/newDashboardIcons/arrow-up-left-gray.svg";
import ArrowDownRight from "../../../assets/newDashboardIcons/arrow-down-right-gray.svg";
import ConverterIcon from "../../../assets/newDashboardIcons/converter.svg";
import LogoWide from "../../../assets/logo/logo_wide2.svg";
import AddUserIcon from "../../../assets/newDashboardIcons/add-user.svg";
import ProductIcon from "../../../assets/newDashboardIcons/products.svg";
import CreditCardIcon from "../../../assets/newDashboardIcons/credit-card.svg";
import DashboardIcon from "../../../assets/newDashboardIcons/referral-dashboard.svg";
import { useTranslation } from "react-i18next";
import SendCrypto from "../sendCrypto";
import ReceiveCrypto from "../receiveCrypto";
import Converter from "../converter";
import ProfileImg from "../../../assets/icon/user.svg";
import SettingIcon from "../../../assets/newDashboardIcons/settings.svg";
import SupportIcon from "../../../assets/newDashboardIcons/support.svg";
import ThemeModeIcon from "../../../assets/newDashboardIcons/theme-mode.svg";
import LogoutIcon from "../../../assets/newDashboardIcons/logout.svg";
import USAFlag from "../../../assets/newDashboardIcons/usa-flag.svg";
import EuropeFlag from "../../../assets/newDashboardIcons/europe-flag.svg";
import CurrencyIcon from "../../../assets/newDashboardIcons/currencyIcon.svg";
import Languages from "../../../components/navigation/languages.jsx/languages";
import NotificationIcon from "../../../assets/newDashboardIcons/notificationIcon.svg";
import CrossBtnIcon from "../../../assets/newDashboardIcons/crossIcon.svg";
import { useAuth } from "../../../context/auth/authContext";
import { getRole } from "../../../utils";
import Logo from "../../../assets/logo/logo.svg";
import backendAPI from "../../../api/backendAPI";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themeContext/themeContext";
import "./sidebar.css";
import AddUser from "../addUser";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const SidebarNew = ({ title, setSideBarShow, sideBarShow }) => {
  const { toggleTheme } = useTheme();

  const { t, i18n } = useTranslation();
  const { user, setUser, setIsWalletConnected } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [openSendModal, setOpenSendModal] = useState(false);
  const [openConvertModal, setOpenConvertModal] = useState(false);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const backend_API = new backendAPI();
  const navigate = useNavigate();

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
    switch (+e?.key) {
      case 1:
        navigate("/create-invoice");
        break;
      case 2:
        setOpenSendModal(!openSendModal);
        break;
      case 3:
        setOpenReceiveModal(!openReceiveModal);
        break;
      case 4:
        setOpenConvertModal(!openConvertModal);
        break;
      case 5:
        navigate("/personal-dashboard");
        break;
      case 6:
        navigate("/referral-dashboard");
        break;
      case 7:
        navigate("/sales-dashboard");
        break;
      case 8:
        navigate("/products-dashboard");
        break;
      case 9:
        setOpenAddModal(!openAddModal);

        break;
    }
  };
  const options = [
    {
      value: "usa",
      label: (
        <Row className="currency-option">
          <img src={USAFlag} alt="usa-flag" /> <div>USD $</div>
        </Row>
      ),
    },
    {
      value: "europe",
      label: (
        <Row className="currency-option">
          <img src={EuropeFlag} alt="europe-flag" /> <div>EUR €</div>
        </Row>
      ),
    },
  ];
  const userItems = [
    {
      key: "1",
      label: (
        <div className="profile-dropdown-width">
          {t("personalDashboard.profileDropdown.setting")}
        </div>
      ),
      icon: <img src={SettingIcon} alt="setting" />,
    },
    {
      key: "2",
      label: (
        <div className="profile-dropdown-width">
          {t("personalDashboard.profileDropdown.support")}
        </div>
      ),
      icon: <img src={SupportIcon} alt="support" />,
    },
    {
      key: "3",
      label: (
        <Flex
          justify="space-between"
          align="center"
          className="profile-dropdown-width"
        >
          <div>{t("personalDashboard.profileDropdown.darkMode")}</div>
          <Switch
            defaultChecked
            onChange={(e) => toggleTheme()}
            className="toggle-theme-button"
          />
        </Flex>
      ),
      icon: <img src={ThemeModeIcon} alt="theme-mode" />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <div className="profile-dropdown-width" onClick={() => logOut()}>
          {t("personalDashboard.profileDropdown.logout")}
        </div>
      ),
      icon: <img src={LogoutIcon} alt="logout" />,
    },
  ];
  const items = [
    getItem(
      t("personalDashboard.sidebar.menu"),
      "grp",
      null,
      [
        getItem(
          t("personalDashboard.sidebar.wallets"),
          "5",
          <img src={WalletIcon} />,
        ),
        getItem(
          t("personalDashboard.sidebar.referral"),
          "6",
          <img src={DashboardIcon} />,
        ),
        getItem(t("salesDashboard.sales"), "7", <img src={DashboardIcon} />),
        getItem(t("salesDashboard.products"), "8", <img src={ProductIcon} />),
        getItem(t("referralDashboard.addUser"), "9", <img src={AddUserIcon} />),
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
          t("salesDashboard.createInvoice"),
          "1",
          <img src={CreditCardIcon} />,
        ),
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

  const languages = [
    {
      label: (
        <Flex>
          <div>{t("languages.english")}</div>
        </Flex>
      ),
      value: "en",
    },
    {
      label: (
        <Flex>
          <div>{t("languages.deutsch")}</div>
        </Flex>
      ),
      value: "de",
    },
    {
      label: (
        <Flex>
          <div>{t("languages.ukrainian")}</div>
        </Flex>
      ),
      value: "uk",
    },
  ];

  const handleLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
  };
  const logOut = async () => {
    try {
      const data = await backend_API.signout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUserSuccess = () => {
    setOpenAddModal(!openAddModal);
  };

  return (
    <>
      {openSendModal && (
        <SendCrypto
          openSendModal={openSendModal}
          handleSubmitCrypto={handleSubmitCrypto}
          onCloseModal={() => {
            setIsWalletConnected(false);
            setOpenSendModal(false);
          }}
          onWalletSuccess={(toggle) => {
            setIsWalletConnected(toggle);
          }}
        />
      )}
      {openReceiveModal && (
        <ReceiveCrypto
          openReceiveModal={openReceiveModal}
          handleReceiveCrypto={handleReceiveCrypto}
          onCloseModal={() => setOpenReceiveModal(false)}
        />
      )}
      {openConvertModal && (
        <Converter
          openConvertModal={openConvertModal}
          onCloseModal={() => setOpenConvertModal(!openConvertModal)}
          handleConvertCrypto={handleConvertCrypto}
        />
      )}

      {openAddModal && (
        <AddUser
          open={openAddModal}
          handleSubmit={handleAddUserSuccess}
          onClose={() => setOpenAddModal(!openAddModal)}
        />
      )}
      <div className="sidebar-container">
        <Flex justify="space-between" className="sidebar-header">
          <div className="sidebar-nefentus-logo">
            <img src={LogoWide} alt="logo" />
          </div>
          <div className="nefentus-logo-mobile">
            <img src={Logo} alt="logo" />
          </div>
          <Flex align="center" gap={"20px"}>
            <Button className="notificationIconMobileBtn">
              <img src={NotificationIcon} alt="MobileBtnIcon" />
            </Button>
            <Button
              className="mobileBtn"
              onClick={() => {
                setSideBarShow(!sideBarShow);
              }}
            >
              <img src={CrossBtnIcon} alt="MobileBtnIcon" />
            </Button>
          </Flex>
        </Flex>
        <div className="sidebar-body">
          <Divider className="logo-divider" />
          <Row className="user-block user-block-mobile">
            <Avatar
              shape="square"
              size={35}
              icon={
                user?.profileImage ? (
                  <img src={user?.profileImage} className="user-avatar" />
                ) : (
                  <img src={ProfileImg} className="user-avatar" />
                )
              }
            />
            <Col>
              <div className="username-text">
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className="user-role-text">{getRole(user)}</div>
            </Col>
          </Row>

          <Menu
            onClick={onClick}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            className="sidebar-menu"
          />
          <Divider className="logo-divider logo-divider-mobile" />

          <Flex justify="space-between" className="currency-block">
            <Flex gap={"6px"} align="center">
              <img src={CurrencyIcon} alt="CurrencyIcon" />
              <p>Currency</p>
            </Flex>
            <Flex gap={"6px"} align="center">
              <Select
                defaultValue={"europe"}
                options={options}
                // onChange={handleLanguage}
                className="currency-dropdown"
              />
            </Flex>
          </Flex>

          <div className="language-container">
            <div className="localisation-container">
              <Flex justify="space-between">
                <Flex gap={"6px"} align="center">
                  <Languages />
                  <p>Language</p>
                </Flex>
                <Flex gap={"6px"} align="center">
                  <Select
                    defaultValue={"English"}
                    options={languages}
                    onChange={handleLanguage}
                    className="currency-dropdown"
                    value={selectedLanguage}
                  />
                  {/* <p>English</p>
                <img src={DownArrow} alt="down-arrow" /> */}
                </Flex>
              </Flex>
            </div>
          </div>
          <Menu
            // onClick={onClick}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={userItems}
            className="sidebar-menu sidebar-menu-mobile"
          />
        </div>
      </div>
    </>
  );
};

export default SidebarNew;
