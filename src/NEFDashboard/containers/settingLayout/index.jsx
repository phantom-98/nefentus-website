import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import { useTranslation } from "react-i18next";
import { checkJwtToken } from "../../../utils";
import { Helmet } from "react-helmet";

const SettingLayout = ({ title, children }) => {
  const { i18n, t } = useTranslation();
  const [sideBarShow, setSideBarShow] = useState(false);

  useEffect(() => {
    checkJwtToken();
    document.documentElement.lang = i18n.language;
  }, []);

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
            title=""
            sideBarShow={sideBarShow}
            setSideBarShow={setSideBarShow}
          />
        </Col>
        <Col span={20}>{children}</Col>
      </Row>
    </>
  );
};

export default SettingLayout;
