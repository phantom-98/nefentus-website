import { Flex, Typography } from "antd";
import React from "react";
import ArrowLeft from "../../../assets/newDashboardIcons/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import "./setting.css";

import "../sidebarNew/sidebar.css";
import { useTranslation } from "react-i18next";

const SettingSideBar = ({
  openSettingDrawer,
  setOpenSettingDrawer,
  setSideBarShow,
  sideBarShow,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const menuList = [
    {
      key: 1,
      value: "General",
      name: t("settingPage.general"),
      icon: <img src={ArrowLeft} alt="right arrow" width={20} height={20} />,
    },
    {
      key: 2,
      value: "Security",
      name: t("settingPage.security"),
      icon: <img src={ArrowLeft} alt="right arrow" width={20} height={20} />,
    },
    {
      key: 3,
      value: "Identification",
      name: t("settingPage.identification"),
      icon: <img src={ArrowLeft} alt="right arrow" width={20} height={20} />,
    },
    {
      key: 4,
      value: "Invoice",
      name: t("settingPage.invoice"),
      icon: <img src={ArrowLeft} alt="right arrow" width={20} height={20} />,
    },
  ];

  const handleMenu = (name) => {
    setSideBarShow(!sideBarShow);
    navigate(`?tab_name=${encodeURIComponent(name)}`);
  };
  return (
    <>
      <Flex
        vertical
        gap={16}
        align="flex-start"
        className="settingSideBar-container"
      >
        <Flex
          className="backbtn"
          gap={"5px"}
          onClick={() => {
            setOpenSettingDrawer(!openSettingDrawer);
          }}
          align="center"
        >
          <img src={ArrowLeft} alt="ArrowLeft" width={20} height={20} />
          <Typography.Text>{t("settingPage.back")}</Typography.Text>
        </Flex>

        <div className="settingSideBar-body">
          <div>
            <Typography.Title level={3}>
              {t("settingPage.title")}
            </Typography.Title>
            <Typography.Text
              className="default-text-grey settingTitle"
              type="secondary"
            >
              {t("settingPage.subTitle")}
            </Typography.Text>
          </div>
          <div>
            <Flex vertical className="settingSideBarMenu">
              {menuList?.map((item) => {
                return (
                  <Flex
                    key={item.name}
                    onClick={() => handleMenu(item.value)}
                    justify="space-between"
                    align="center"
                    className="settingSideBarMenuItem"
                  >
                    <Typography.Text className="list-font-size">
                      {item?.name}
                    </Typography.Text>{" "}
                    {item?.icon}
                  </Flex>
                );
              })}
            </Flex>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default SettingSideBar;
