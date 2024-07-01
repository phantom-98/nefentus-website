import { Button, Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Flex className="page-not-found" align="center" justify="center">
      <Flex vertical gap={16}>
        <div className="default-text page-not-found-title">
          {t("content.pageNotFound")}
        </div>
        <Flex vertical gap={8}>
          <div className="default-text-gray">
            {t("content.pageNotFoundDescription")}
          </div>
          <div className="default-text-gray">{t("content.contentSubText")}</div>
          <div className="default-text-gray">{t("content.thankyouText")}</div>

          <Button
            className="default-text page-back-to-home"
            onClick={() => navigate("/")}
          >
            {t("content.backButton")}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageNotFound;
