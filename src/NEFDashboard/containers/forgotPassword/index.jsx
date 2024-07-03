import React, { useContext, useState } from "react";
import "./forgotPassword.css";
import { Flex, Form, Input, Button, Divider } from "antd";
import Logo from "../../../assets/newDashboardIcons/keyIcon.svg";
import MailLogo from "../../../assets/newDashboardIcons/mailIcon.svg";
import MessageIcon from "../../../assets/newDashboardIcons/mail.svg";
import backendAPI from "../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../context/message";

const ForgotPassword = () => {
  const backend_API = new backendAPI();
  const { t } = useTranslation();
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [form] = Form.useForm();
  const [confirmation, setConfirmation] = useState(false);

  const onFinish = async (data) => {
    try {
      const response = await backend_API.forgotPassword(data?.email);
      if (response == null) {
        setErrorMessage(t("messages.error.email"));
        return;
      }
      setInfoMessage(t("messages.info.email"));
      setConfirmation(!confirmation);
    } catch (error) {
      setErrorMessage(t("messages.error.sendingEmail"));
    }
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
            <h4>Email verification</h4>
            <h5>
              We send a confirmation link to{" "}
              <span>{form.getFieldValue("email")}</span>
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
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              email: "",
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
                  message: "Please input your email!",
                },
              ]}
            >
              <div className="email-field-container">
                <Input
                  placeholder="yourmail@mail.com"
                  className="email-field-input"
                />
                <img
                  src={MessageIcon}
                  alt="icon"
                  className="email-field-icon"
                />
              </div>
              {/* <Input /> */}
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
          Don’t get an email?{" "}
          <span
            className="cursor-pointer"
            onClick={() => onFinish({ email: form.getFieldValue("email") })}
          >
            Click to resend.
          </span>
        </div>
      ) : (
        <div className="signup-text">
          Any problems?{" "}
          <span className="cursor-pointer">Contact our support</span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
