import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SidebarNew from "../../components/sidebarNew";
import backendAPI from "../../../api/backendAPI";
import { useAuth } from "../../../context/auth/authContext";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const SettingLayout = ({ title, children }) => {
  const backend_API = new backendAPI();
  const { t } = useTranslation();
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
