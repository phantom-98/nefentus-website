import React from "react";
import { Button, Flex } from "antd";
import InvoiceNotFoundIcon from "../../../assets/newDashboardIcons/invoice-not-found.svg";
import { useNavigate } from "react-router-dom";
import "./contentNotFound.css";
import { useTranslation } from "react-i18next";

const ContentNotFound = ({ icon, title, description }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Flex className="content-not-found" align="center" justify="center">
      <Flex gap={16} align="start" className="content-not-found-sub-container">
        <img src={icon} alt="icon" />
        <Flex vertical gap={16}>
          <div className="default-text content-not-found-title">{t(title)}</div>
          <Flex vertical gap={8}>
            <div className="default-text-gray">{t(description)}</div>
            <div className="default-text-gray">
              {t("content.contentSubText")}
            </div>
            <div className="default-text-gray">{t("content.thankyouText")}</div>

            <Button
              className="default-text content-back-to-home"
              onClick={() => navigate("/")}
            >
              {t("content.backButton")}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContentNotFound;
