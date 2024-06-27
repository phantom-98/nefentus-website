import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import { useTranslation } from "react-i18next";
import { checkJwtToken } from "../../../utils";

const SettingLayout = ({ children }) => {
  const { i18n } = useTranslation();
  const [sideBarShow, setSideBarShow] = useState(false);

  useEffect(() => {
    checkJwtToken();
    document.documentElement.lang = i18n.language;
  }, []);

  return (
    <Row>
      <Col
        span={4}
        className={sideBarShow ? "sideBarHide sideBarShow" : "sideBarHide"}
      >
        <SidebarNew
          title=""
          sideBarShow={sideBarShow}
          setSideBarShow={setSideBarShow}
        />
      </Col>
      <Col span={20}>{children}</Col>
    </Row>
  );
};

export default SettingLayout;
