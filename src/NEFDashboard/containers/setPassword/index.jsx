import React, { useContext, useEffect, useState } from "react";
import "./setPassword.css";
import { Flex, Form, Input, Button, Divider } from "antd";
import SetPasswordIcon from "../../../assets/newDashboardIcons/setPasswordIcon.svg";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../context/message";
import backendAPI from "../../../api/backendAPI";
import { useTranslation } from "react-i18next";

const SetPasswordForm = () => {
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);

  const backend_API = new backendAPI();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      setToken(paramValue);
    }
  }, []);

  const onFinish = async (data) => {
    try {
      const response = await backend_API.resetPassword(
        data?.newPassword,
        token,
      );
      if (response && response?.newPassword) {
        setErrorMessage(response?.newPassword);
        return;
      }
      setInfoMessage(t("messages.success.passwordReset"));
      navigate("/login");
    } catch (error) {
      setErrorMessage(t("messages.error.updatePassword"));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="auth-form">
      <Flex vertical gap={24} className="form-header">
        <div className="logo">
          <img src={SetPasswordIcon} alt="Logo" />
        </div>
        <Flex vertical gap={6} className="form-heading">
          <h4>Set new password</h4>
          <h5>Must be at least 8 characters.</h5>
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
            label="Enter new password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Password must be at least 8 characters!",
                min: 8,
              },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm your new password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Password must be at least 8 characters!",
                min: 8,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password and Confirm Password must be match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset password
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default SetPasswordForm;
