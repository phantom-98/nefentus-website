import React, { useContext, useState } from "react";
import { Select, Col, Flex, Form, Input, Button, Divider } from "antd";
import Logo from "../../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import backend_API from "../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { updatedCountries } from "../../../constants";
import { getCountryList, getFlagLink } from "../../../countries";
import "./signUp.css";
import { MessageContext } from "../../../context/message";
import RoleSelection from "../roleSelection";

const SignForm = () => {
  const [roleSelector, setRoleSelector] = useState(false);
  const [role, setRole] = useState("Private");
  const backendAPI = new backend_API();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      roles: ["Vendor"],
      firstName: values?.firstname,
      lastName: values?.lastname,
      telNr: values?.phoneNumber,
      affiliateLink: "",
      country: values?.countryRegion,
      accountRole: role,
    };

    const response = await backendAPI.register(payload);
    if (response == null) {
      setErrorMessage(t("messages.error.register"));
    } else if (response.status == 409) {
      setErrorMessage(t("messages.error.exist"));
    } else if (response.status == 400) {
      const data = await response.json();
      if (data["firstName"]) {
        if (
          data["firstName"] == "First name must be between 2 and 70 characters"
        ) {
          setErrorMessage(t("messages.validation.validFirstName"));
        } else {
          setErrorMessage(t("messages.validation.firstName"));
        }
      } else if (data["lastName"]) {
        if (
          data["lastName"] == "Last name must be between 2 and 70 characters"
        ) {
          setErrorMessage(t("messages.validation.validLastName"));
        } else {
          setErrorMessage(t("messages.validation.lastName"));
        }
      } else if (data["email"]) {
        if (data["email"] == "Please enter email") {
          setErrorMessage(t("messages.validation.email"));
        } else if (data["email"] == "Please enter valid email") {
          setErrorMessage(t("messages.validation.validEmail"));
        } else {
          setErrorMessage(t("messages.validation.lengthEmail"));
        }
      } else if (data["password"]) {
        if (data["password"] == "Please enter your password") {
          setErrorMessage(t("messages.validation.password"));
        } else if (
          data["password"] == "Password must be between 8 and 70 characters"
        ) {
          setErrorMessage(t("messages.validation.validPassword"));
        } else {
          setErrorMessage(t("messages.validation.securityPassword"));
        }
      } else if (data["country"]) {
        setErrorMessage(t("messages.error.country"));
      } else setErrorMessage(t("messages.error.register"));
    } else {
      setInfoMessage(t("messages.error.confirmEmail"));
      form.resetFields();
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPhoneChange = (value) => {
    const selectedCountry = updatedCountries?.find((country) =>
      value?.includes(country?.countryCode),
    );
    if (selectedCountry != undefined) {
      const updatedValues = {
        ...form.getFieldsValue(),
        countryFlag: selectedCountry?.value,
      };
      form.setFieldsValue({ ...updatedValues });
    }
  };

  return (
    <>
      {roleSelector ? (
        <div className="auth-form">
          <div
            className="back-btn back-btn-role"
            onClick={() => setRoleSelector(!roleSelector)}
          >
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
            <span>Back</span>
          </div>
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
              form={form}
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                confirmpassword: "",
                countryFlag: "Austria",
                countryRegion: "",
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                phoneNumber: "+43",
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
                        message: "Please input your confirm password!",
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
                        required: false,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Choose"
                      virtual={false}
                      style={{ width: "60px" }}
                      className="telephone-flag"
                    >
                      {updatedCountries?.map((country, index) => {
                        return (
                          <Option value={country?.value} key={index}>
                            <img
                              src={getFlagLink(country?.symbol)}
                              alt="country"
                              width="22"
                            />
                          </Option>
                        );
                      })}
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
                    <Input
                      placeholder="+38 000 - 000 - 00 - 00"
                      className="telephone-number"
                      onChange={(e) => onPhoneChange(e.target.value)}
                    />
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
                  allowClear
                  virtual={false}
                >
                  {updatedCountries?.map((country, index) => {
                    return (
                      <Option value={country?.value} key={index}>
                        {t(country?.display)}
                      </Option>
                    );
                  })}
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
      ) : (
        <RoleSelection
          setRoleSelector={setRoleSelector}
          roleSelector={roleSelector}
          role={role}
          setRole={setRole}
        />
      )}
    </>
  );
};

export default SignForm;
