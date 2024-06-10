import React from "react";
import "./login.css";
import { Flex, Form, Input, Button, Divider } from "antd";
import Logo from "../../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
          <img src={Logo} alt="Logo" />
        </div>
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
            label="Password"
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Flex gap={16} align="center" className="continue-text-wrapper">
        <Divider />
        <div className="continue-text">Or continue with</div>
        <Divider />
      </Flex>
      <div className="signup-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/sign-up")}>Sign up</span>
      </div>
    </div>
  );
};

export default LoginForm;
