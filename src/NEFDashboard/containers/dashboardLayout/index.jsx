import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Row,
  Flex,
  Select,
  Dropdown,
  Avatar,
  Switch,
  Button,
  Typography,
} from "antd";
import SidebarNew from "../../components/sidebarNew";
import Languages from "../../../components/navigation/languages.jsx/languages";
import { getRole } from "../../../utils";
import SettingIcon from "../../../assets/newDashboardIcons/settings.svg";
import ProfileImg from "../../../assets/icon/user.svg";
import SupportIcon from "../../../assets/newDashboardIcons/support.svg";
import ThemeModeIcon from "../../../assets/newDashboardIcons/theme-mode.svg";
import LogoutIcon from "../../../assets/newDashboardIcons/logout.svg";
import EuropeFlag from "../../../assets/newDashboardIcons/europe-flag.svg";
import USAFlag from "../../../assets/newDashboardIcons/usa-flag.svg";
import DownArrow from "../../../assets/newDashboardIcons/down-arrow-gray.svg";
import UpArrow from "../../../assets/newDashboardIcons/arrow-up.svg";
import MobileBtnIcon from "../../../assets/newDashboardIcons/mobileBtnIcon.svg";
import NotificationIcon from "../../../assets/newDashboardIcons/notificationIcon.svg";
import { useTheme } from "../../../context/themeContext/themeContext";
import { useAuth } from "../../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import backendAPI from "../../../api/backendAPI";
import "./dashboardLayout.css";
import { useNavigate } from "react-router-dom";
import LogoWide from "../../../assets/logo/logo_wide2.svg";
import Logo from "../../../assets/logo/logo.svg";
import { getCurrencySymbol, getFlagLink } from "../../../countries";
import { Helmet } from "react-helmet";

const DashboardLayout = ({ children, title }) => {
  const [sideBarShow, setSideBarShow] = useState(false);
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { user, setUser, setCurrencyRate } = useAuth();
  const backend_API = new backendAPI();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (currency !== "USD") {
      fetchRate("USD", currency);
    } else {
      setCurrencyRate({
        from: "USD",
        to: "USD",
        rate: 1,
        symbol: "$",
      });
    }
  }, [currency]);

  const fetchProfile = async () => {
    const response = await backend_API.getProfile();
    if (response) setUser({ ...response });
  };

  const fetchRate = async (from, to) => {
    const res = await backend_API.getCurrencyRate(from, to);
    if (res) {
      setCurrencyRate({
        ...res,
        symbol: getCurrencySymbol()[to],
      });
    }
  };

  const logOut = async () => {
    try {
      const data = await backend_API.signout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    {
      value: "USD",
      label: (
        <Row className="currency-option">
          <img src={getFlagLink("US")} alt="usa-flag" width={18} height={14} />
          <div>USD $</div>
        </Row>
      ),
    },
    {
      value: "EUR",
      label: (
        <Row className="currency-option">
          <img
            src={getFlagLink("EU")}
            alt="europe-flag"
            width={18}
            height={14}
          />{" "}
          <div>EUR €</div>
        </Row>
      ),
    },
    {
      value: "AED",
      label: (
        <Row className="currency-option">
          <img src={getFlagLink("AE")} alt="flag" width={18} height={14} />{" "}
          <div>{"AED د.إ"}</div>
        </Row>
      ),
    },
    {
      value: "UAH",
      label: (
        <Row className="currency-option">
          <img src={getFlagLink("UA")} alt="flag" width={18} height={14} />{" "}
          <div>UAH ₴</div>
        </Row>
      ),
    },
    {
      value: "CHF",
      label: (
        <Row className="currency-option">
          <img src={getFlagLink("CH")} alt="flag" width={18} height={14} />{" "}
          <div>CHF</div>
        </Row>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div className="default-text profile-dropdown-width">
          {t("personalDashboard.profileDropdown.setting")}
        </div>
      ),
      icon: <img src={SettingIcon} alt="setting" />,
    },
    {
      key: "2",
      label: (
        <div className="default-text profile-dropdown-width">
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
          className="default-text profile-dropdown-width"
        >
          <div>{t("personalDashboard.profileDropdown.darkMode")}</div>
          <Switch
            defaultChecked
            onChange={(e) => toggleTheme()}
            className="switch-theme-mode"
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
        <div
          className="default-text profile-dropdown-width"
          onClick={() => logOut()}
        >
          {t("personalDashboard.profileDropdown.logout")}
        </div>
      ),
      icon: <img src={LogoutIcon} alt="logout" />,
    },
  ];

  const handleDropDown = (e) => {
    setDropDownToggle(e);
  };

  const handleLanguage = (lng) => {
    setSelectedLanguage(lng);
  };

  const onOptionClick = (e) => {
    switch (+e?.key) {
      case 1:
        navigate("/new-settings");
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Nefentus | {t(title)}</title>
      </Helmet>
      <Row>
        <Col
          span={4}
          className={sideBarShow ? "sideBarHide sideBarShow" : "sideBarHide"}
        >
          <SidebarNew
            title={title}
            sideBarShow={sideBarShow}
            setSideBarShow={setSideBarShow}
          />
        </Col>

        <Col span={24} xl={20}>
          <div className="personal-dashboard-container">
            <div className="page-title-container">
              <div className="nefentus-logo">
                <img src={LogoWide} alt="logo" />
              </div>
              {/** Add logo for mobile view */}
              <div className="nefentus-logo-mobile">
                <img src={Logo} alt="logo" />
              </div>
              <div className="pageTitle pageTitleDesktop">{t(title)}</div>
              <Flex align="center" gap={24}>
                <Select
                  defaultValue={"europe"}
                  options={options}
                  value={currency}
                  onChange={setCurrency}
                  className="currency-dropdown"
                />
                <div className="dashboard-language-container">
                  <div className="localisation-container">
                    <Languages />
                  </div>
                </div>
                <Button className="notificationIconMobileBtn">
                  <img src={NotificationIcon} alt="MobileBtnIcon" />
                </Button>
                <Button
                  className="mobileBtn"
                  onClick={() => {
                    setSideBarShow(!sideBarShow);
                  }}
                >
                  <img src={MobileBtnIcon} alt="MobileBtnIcon" />
                </Button>

                <Divider type="vertical" className="verticalDivider" />
                <Dropdown
                  menu={{
                    items,
                    onClick: (e) => onOptionClick(e),
                  }}
                  className="profile-dropdown"
                  onOpenChange={handleDropDown}
                >
                  <Row className="user-block">
                    <Avatar
                      shape="square"
                      size={35}
                      icon={
                        user?.profileImage ? (
                          <img
                            src={user?.profileImage}
                            className="user-avatar"
                          />
                        ) : (
                          <img src={ProfileImg} className="user-avatar" />
                        )
                      }
                    />
                    <Col>
                      <div className="username-text">
                        {user?.firstName + " " + user?.lastName}
                      </div>
                      <div className="user-role-text">
                        {getRole(user) || (user?.roles && user?.roles[0])}
                      </div>
                    </Col>
                    <img
                      src={dropDownToggle ? UpArrow : DownArrow}
                      className={
                        dropDownToggle
                          ? `user-block-arrow`
                          : `user-block-arrow-down`
                      }
                    />
                  </Row>
                </Dropdown>
              </Flex>
            </div>
            <Divider className="divider-without-margin" />
          </div>
          <div className="pageTitle pageTitleMobile">{t(title)}</div>

          {children}
        </Col>
      </Row>
    </>
  );
};

export default DashboardLayout;
