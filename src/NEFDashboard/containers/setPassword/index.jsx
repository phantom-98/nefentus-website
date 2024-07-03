import React from "react";
import "./setPassword.css";
import { Flex, Form, Input, Button, Divider } from "antd";
import SetPasswordIcon from "../../../assets/newDashboardIcons/setPasswordIcon.svg";
import { useNavigate } from "react-router-dom";

const SetPasswordForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
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
                message: "Please input your new Password!",
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
                message: "Please input your confirm Password!",
              },
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
