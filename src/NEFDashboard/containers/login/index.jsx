import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Col, Row, Flex, Form, Input, Button, Divider } from "antd";

import Logo from "../../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message";
import { useAuth } from "../../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import AuthLayoutImg from "../../../assets/newDashboardIcons/personal-account.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const { setUser } = useAuth();
  const backendAPI = new backend_API();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      activateUser(paramValue);
    }
  }, []);

  const activateUser = async (token) => {
    try {
      const response = await backendAPI.activateAccount(token);
      if (response == null) {
        setErrorMessage(t("messages.error.activateAccount"));
        return;
      }
      setInfoMessage(t("messages.success.activateAccount"));
    } catch (error) {
      setErrorMessage(t("messages.error.activateAccount"));
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const response = await backendAPI.login(
      values.email,
      values.password,
      true,
    );
    setLoading(false);
    if (response == null) {
      setErrorMessage(t("messages.error.loginData"));
      // setSpinner(false);
      return;
    } else if (response.hasOtp || response.hasTotp) {
      // setShowConfirmMeEmail(true);
      // setOtp(response.hasOtp);
      // setTotp(response.hasTotp);
      // setEmail(response.email);
    } else if (response.resetPassword) {
      navigate("/new-settings", {
        state: { recommendRecover: true },
      });
    } else {
      setUser(response);
      navigate("/personal-dashboard");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="authLayout">
        <Row align="middle">
          <Col span={24} lg={12}>
            <div className="auth-form">
              <Flex vertical gap={24} className="form-header">
                {/* <div className="logo">
                  <img src={Logo} alt="Logo" />
                </div> */}
                <Flex vertical gap={6} className="form-heading">
                  <h4>Welcome back!</h4>
                  <h5>Log in to your Nefentus account</h5>
                </Flex>
              </Flex>
              <Flex vertical gap={12}>
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email*"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="yourmail@mail.com" />
                  </Form.Item>

                  <Form.Item
                    label="Password*"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>
                  <Form.Item>
                    <div className="forgot-password">
                      <span
                        className="cursor-pointer"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </span>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={loading}
                      loading={loading}
                      className="login-submit-button"
                    >
                      <span className="default-text login-button-text">
                        Log in
                      </span>
                    </Button>
                  </Form.Item>
                </Form>
              </Flex>
              {/* <Flex gap={16} align="center" className="continue-text-wrapper">
                <Divider />
                <div className="continue-text">Or continue with</div>
                <Divider />
              </Flex> */}
              <div className="signup-text">
                Don’t have an account?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </div>
            </div>
          </Col>
          <Col span={24} lg={12}>
            <div
              className="authLayout-img-container"
              style={{ backgroundImage: `url(${AuthLayoutImg})` }}
            ></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginForm;
