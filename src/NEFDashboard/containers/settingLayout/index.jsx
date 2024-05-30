import { Col, Row } from "antd";
import React, { useEffect } from "react";
import SidebarNew from "../../components/sidebarNew";
import backendAPI from "../../../api/backendAPI";
import { useAuth } from "../../../context/auth/authContext";

const SettingLayout = ({ children }) => {
  const backend_API = new backendAPI();
  const { setUser } = useAuth();
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await backend_API.getProfile();
    if (response) setUser({ ...response });
  };
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
