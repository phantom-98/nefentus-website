import { Col, Row } from "antd";
import React from "react";
import SidebarNew from "../../components/sidebarNew";

const SettingLayout = ({ children }) => {
  return (
    <Row>
      <Col span={4}>
        <SidebarNew title="" />
      </Col>
      <Col span={20}>{children}</Col>
    </Row>
  );
};

export default SettingLayout;
