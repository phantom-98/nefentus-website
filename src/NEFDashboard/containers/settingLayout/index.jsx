import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import backendAPI from "../../../api/backendAPI";
import { useNavigate } from "react-router-dom";

const SettingLayout = ({ children }) => {
  const backend_API = new backendAPI();
  const [sideBarShow, setSideBarShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const jwtIsValid = await backend_API.checkJwt();
    if (!jwtIsValid) {
      logOut();
    }
  }
  const logOut = async () => {
    try {
      const data = await backend_API.signout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
