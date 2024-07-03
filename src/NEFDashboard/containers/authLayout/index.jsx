import React, { useEffect } from "react";
import "./authLayout.css";
import AuthLayoutImg from "../../../assets/newDashboardIcons/login-img.svg";
import { Col, Flex, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div className="authLayout">
      {location?.pathname == "/forgot-password" ? (
        <div className="back-btn" onClick={() => navigate("/login")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M12.4996 6.0875C12.1746 5.7625 11.6496 5.7625 11.3246 6.0875L7.49961 9.9125C7.17461 10.2375 7.17461 10.7625 7.49961 11.0875L11.3246 14.9125C11.6496 15.2375 12.1746 15.2375 12.4996 14.9125C12.8246 14.5875 12.8246 14.0625 12.4996 13.7375L9.26628 10.4958L12.4996 7.2625C12.8246 6.9375 12.8163 6.40417 12.4996 6.0875Z"
              fill="#E9E9E9"
            />
          </svg>
          <span>Back to log in</span>
        </div>
      ) : null}

      <Row align="middle">
        <Col span={24} lg={12}>
          {children}
        </Col>
        <Col span={24} lg={12}>
          <div
            className="authLayout-img-container"
            style={{ backgroundImage: `url(${AuthLayoutImg})` }}
          >
            <Flex vertical gap={20} className="authLayout-img-text">
              <h1>Implement cryptocurrency payments in your business.</h1>
              <p>Use cryptocurrencies without risk</p>
            </Flex>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
