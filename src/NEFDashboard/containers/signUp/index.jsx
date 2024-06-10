import React from "react";
import "./signUp.css";
import { Select, Col, Flex, Form, Input, Button, Divider } from "antd";
import Logo from "../../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
// import { UserOutlined } from "@ant-design/icons";

const SignForm = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };

  return (
    <div className="auth-form">
      <Flex vertical gap={24} className="form-header">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Flex vertical gap={6} className="form-heading">
          <h4>Create an account</h4>
          <h5>Sign up to a new Nefentus account</h5>
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
          <Flex gap={12}>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="First name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Last name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Flex>

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

          <Flex gap={12}>
            <Col style={{ flex: 1 }}>
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
                <Input.Password />
              </Form.Item>
            </Col>
            <Col style={{ flex: 1 }}>
              <Form.Item
                label="Confirm password"
                name="confirmpassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirmpassword!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Flex>

          <Form.Item label="Phone number">
            <Flex gap={8} className="phoneNumber">
              <Form.Item
                name="countryFlag"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Choose"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="+38 000 - 000 - 00 - 00" />
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item
            name="countryRegion"
            label="Country region"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Choose your country"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
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
      <div className="signup-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Log in</span>
      </div>
    </div>
  );
};

export default SignForm;
