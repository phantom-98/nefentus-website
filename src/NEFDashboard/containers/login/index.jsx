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
import Cookies from "js-cookie";

const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const { setUser } = useAuth();
  const backendAPI = new backend_API();
  const [verificationLoader, setVerificationLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState({});
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [checkBox] = useState(
    Cookies.get("nefentus-remember-me")
      ? JSON.parse(Cookies.get("nefentus-remember-me"))
      : false,
  );

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
    if (loading) return;
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
      setVerification({
        totp: response.hasOtp && response.hasTotp ? false : response.hasTotp,
        otp: response.hasOtp && response.hasTotp ? true : response.hasOtp,
        both: response.hasOtp && response.hasTotp,
      });
      setEmail(response.email);
    } else if (response.resetPassword) {
      navigate("/new-settings", {
        state: { recommendRecover: true },
      });
    } else {
      setUser(response);
      navigate("/personal-dashboard");
    }
  };

  const verifyOtpCode = async (
    email,
    checkbox = checkBox,
    verificationCode = code,
  ) => {
    if (verificationLoader || verificationCode == "") return;
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    try {
      const response = await backendAPI.verifyOTP(
        email,
        verificationCode,
        checkbox,
        setUser,
      );
      if (response == null) {
        setErrorMessage(t("messages.error.confirm"));
        return;
      }
      if (verification?.both) {
        setVerification({ ...verification, otp: false, totp: true });
        setCode("");
        document
          .getElementById("code-input-container")
          .firstElementChild.focus();
      } else {
        setUser(response);
        navigate("/personal-dashboard");
      }
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  };

  const verifyTotpCode = async (email, checkbox, verificationCode = code) => {
    if (verificationLoader || verificationCode == "") return;
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    const response = await backendAPI.verifyTotpToken(
      email,
      verificationCode,
      checkbox,
      setUser,
    );
    try {
      if (response == null) {
        setErrorMessage("Failed to Confirm");
        return;
      } else {
        setUser(response);
        navigate("/personal-dashboard");
      }
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="authLayout">
        <Row align="middle">
          {verification?.otp || verification?.totp ? (
            <Col span={24} lg={12}>
              <div className="auth-form">
                <Flex vertical gap={32} className="form-header">
                  <Flex vertical gap={12} className="form-heading">
                    <h4>
                      {verification?.otp
                        ? "Please enter the verification code"
                        : t("login.TOTPTitle")}
                    </h4>
                    {verification?.otp ? (
                      <h5>
                        To ensure the security of your account, please enter the
                        One-Time Password (OTP) sent to <span> {email}</span>
                      </h5>
                    ) : (
                      <h5>{t("login.TOTPSubtitle")}</h5>
                    )}
                  </Flex>
                  <Flex vertical gap={24}>
                    <Flex className="authenticator-code-container">
                      <Input.OTP
                        id="code-input-container"
                        length={6}
                        value={code}
                        onChange={(value) => {
                          setCode(value);
                          verification?.otp
                            ? verifyOtpCode(email, checkBox, value)
                            : verifyTotpCode(email, checkBox, value);
                        }}
                      />
                    </Flex>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={verificationLoader}
                      className="login-submit-button"
                      onClick={() =>
                        verification?.otp
                          ? verifyOtpCode(email, checkBox)
                          : verifyTotpCode(email, checkBox)
                      }
                    >
                      <span className="default-text login-button-text">
                        Verify
                      </span>
                    </Button>
                  </Flex>
                </Flex>
                <div className="signup-text">
                  Don’t have an account?{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign up
                  </span>
                </div>
              </div>
            </Col>
          ) : (
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
                      <div
                        className="forgot-password"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </div>
                      <Button
                        type="primary"
                        htmlType="submit"
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
          )}

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
