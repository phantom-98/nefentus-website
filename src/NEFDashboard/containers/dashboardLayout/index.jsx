import React from "react";
import { Col, Divider, Row } from "antd";
import SidebarNew from "../../components/sidebarNew";
import PersonalDashboard from "../personalDashboard";

const DashboardLayout = () => {
  return (
    <Row>
      <Col span={4}>
        <SidebarNew />
      </Col>

      <Col span={20}>
        <PersonalDashboard />
      </Col>
    </Row>
  );
};

export default DashboardLayout;
