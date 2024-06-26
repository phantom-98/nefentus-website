import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import { checkJwtToken } from "../../../utils";

const SettingLayout = ({ children }) => {
  const [sideBarShow, setSideBarShow] = useState(false);

  useEffect(() => {
    checkJwtToken();
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
