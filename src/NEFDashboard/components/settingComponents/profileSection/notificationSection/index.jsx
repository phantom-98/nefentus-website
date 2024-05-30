import React from "react";
import { Col, Dropdown, Flex, Row, Switch } from "antd";
import ArrowDownIcon from "../../../../../assets/newDashboardIcons/down-arrow.svg";
import TickIcon from "../../../../../assets/newDashboardIcons/tick.svg";
import "./notificationSection.css";

const NotificationSection = ({ user, onSubmit }) => {
  const language = { en: "English", uk: "Українська", de: "Deutsch" };

  const onClick = ({ key }) => {
    switch (+key) {
      case 1:
        onSubmit("en", "notificationLanguage");
        break;
      case 2:
        onSubmit("uk", "notificationLanguage");
        break;
      case 3:
        onSubmit("de", "notificationLanguage");
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Flex
          align="center"
          justify="space-between"
          className="notification-language-width"
        >
          <div>
            <div className="default-text">English</div>
            <div className="default-text-gray">English (US)</div>
          </div>
          {user?.notificationLanguage == "en" && (
            <img src={TickIcon} alt="icon" />
          )}
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <Flex
          align="center"
          justify="space-between"
          className="notification-language-width"
        >
          <div>
            <div className="default-text">Українська</div>
            <div className="default-text-gray">Ukrainian</div>
          </div>
          {user?.notificationLanguage == "uk" && (
            <img src={TickIcon} alt="icon" />
          )}
        </Flex>
      ),
    },
    {
      key: "3",
      label: (
        <Flex
          align="center"
          justify="space-between"
          className="notification-language-width"
        >
          <div>
            <div className="default-text">Deutsch</div>
            <div className="default-text-gray">German</div>
          </div>
          {user?.notificationLanguage == "de" && (
            <img src={TickIcon} alt="icon" />
          )}
        </Flex>
      ),
    },
  ];

  const notificationOptions = [
    {
      title: "Marketing Updates",
      subtitle:
        "Receive marketing updates via Email, push notifications and inbox notifications",
      actionItem: (
        <Switch
          className="notification-switch"
          checked={user?.marketingUpdates}
          onChange={(value) => onSubmit(value, "marketingUpdates")}
        />
      ),
    },
    {
      title: "Email notifications",
      subtitle: "Receive notifications via Email",
      actionItem: (
        <Switch
          className="notification-switch"
          checked={user?.emailNotifications}
          onChange={(value) => onSubmit(value, "emailNotifications")}
        />
      ),
    },
    {
      title: "App notifications",
      subtitle:
        "Receive notifications via push notifications (in the mobile app).",
      actionItem: (
        <Switch
          className="notification-switch"
          checked={user?.appNotifications}
          onChange={(value) => onSubmit(value, "appNotifications")}
        />
      ),
    },
    {
      title: "Notifications language",
      subtitle:
        "Select your preferred language for email, app push and on-site inbox notifications.",
      actionItem: (
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          overlayClassName="notification-language"
          trigger={["click"]}
          onOpenChange={(e) => console.log(e)}
        >
          <Flex align="center" gap={2}>
            <div className="cursor-pointer">
              {language[user?.notificationLanguage]}
            </div>
            <img src={ArrowDownIcon} alt="icon" />
          </Flex>
        </Dropdown>
      ),
    },
  ];

  return (
    <Flex vertical gap={32}>
      <div className="default-text profile-notification-title">
        Notifications
      </div>
      <Row gutter={[32, 24]}>
        {notificationOptions.map((item, index) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
            key={index}
            className="notification-options-subcontainer"
          >
            <Flex align="center" justify="space-between">
              <div>
                <div className="notification-option-title">{item.title}</div>
                <div className="default-text-gray notification-option-subtitle">
                  {item.subtitle}
                </div>
              </div>
              {item.actionItem}
            </Flex>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default NotificationSection;
