import React, { useState } from "react";
import "./forgotPassword.css";
import { Flex, Form, Input, Button, Divider } from "antd";
import Logo from "../../../assets/newDashboardIcons/keyIcon.svg";
import MailLogo from "../../../assets/newDashboardIcons/mailIcon.svg";

const ForgotPassword = () => {
  const [confirmation, setConfirmation] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setConfirmation(!confirmation);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="auth-form forgot-password-form">
      {confirmation ? (
        <Flex vertical gap={24} className="form-header">
          <div className="logo">
            <img src={MailLogo} alt="Logo" />
          </div>
          <Flex vertical gap={6} className="form-heading">
            <h4>Password reset</h4>
            <h5>
              We send a confirmation link to
              <span>nikolaykislik@gmail.com</span>
            </h5>
          </Flex>
        </Flex>
      ) : (
        <Flex vertical gap={24} className="form-header">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <Flex vertical gap={6} className="form-heading">
            <h4>Forgot your password?</h4>
            <h5>Enter the email address you used to register with.</h5>
          </Flex>
        </Flex>
      )}
      {!confirmation && (
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
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      )}
      {confirmation ? (
        <div className="signup-text">
          Don’t get an email? <span>Click to resend.</span>
        </div>
      ) : (
        <div className="signup-text">
          Any problems? <span>Contact our support</span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
