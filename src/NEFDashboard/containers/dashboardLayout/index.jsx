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
import { useTheme } from "../../../context/themeContext/themeContext";
import { useAuth } from "../../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import backendAPI from "../../../api/backendAPI";
import "./dashboardLayout.css";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children, title }) => {
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("europe");
  const { toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const backend_API = new backendAPI();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await backend_API.getProfile();
    if (response) setUser({ ...response });
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
      value: "usa",
      label: (
        <Row className="currency-option">
          <img src={USAFlag} alt="usa-flag" /> <div>USD $</div>
          {/* {selectedLanguage === "usa" && (
            <div>
              <img src={Check} alt="check" />
            </div>
          )} */}
        </Row>
      ),
    },
    {
      value: "europe",
      label: (
        <Row className="currency-option">
          <img src={EuropeFlag} alt="europe-flag" /> <div>EUR €</div>
          {/* {selectedLanguage === "europe" && (
            <div>
              <img src={Check} alt="check" />
            </div>
          )} */}
        </Row>
      ),
    },
  ];

  const items = [
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
          <Switch defaultChecked onChange={(e) => toggleTheme()} />
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
    <Row>
      <Col span={4}>
        <SidebarNew title={title} />
      </Col>

      <Col span={20}>
        <div className="personal-dashboard-container">
          <div className="page-title-container">
            <div className="pageTitle">{t(title)}</div>
            <Flex align="center" gap={24}>
              <Select
                defaultValue={"europe"}
                options={options}
                onChange={handleLanguage}
                className="currency-dropdown"
              />
              <div className="language-container">
                <div className="localisation-container">
                  <Languages />
                </div>
              </div>

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
                      !user?.profileImage ? (
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
        {children}
      </Col>
    </Row>
  );
};

export default DashboardLayout;
