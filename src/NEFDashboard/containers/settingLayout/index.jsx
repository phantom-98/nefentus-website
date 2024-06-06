import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import backendAPI from "../../../api/backendAPI";
import { useAuth } from "../../../context/auth/authContext";

const SettingLayout = ({ children }) => {
  const backend_API = new backendAPI();
  const { setUser } = useAuth();
  const [sideBarShow, setSideBarShow] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await backend_API.getProfile();
    if (response) setUser({ ...response });
  };
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
