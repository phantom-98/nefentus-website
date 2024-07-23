import React, { useContext, useState, useEffect } from "react";
import {
  Select,
  Row,
  Col,
  Flex,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
} from "antd";
import Logo from "../../../assets/logo/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import backend_API from "../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { updatedCountries } from "../../../constants";
import { getCountryList, getFlagLink } from "../../../countries";
import "./signUp.css";
import { MessageContext } from "../../../context/message";
import RoleSelection from "../roleSelection";
import BusinessPage from "../../../assets/newDashboardIcons/business-page.png";
import PersonalAccountPage from "../../../assets/newDashboardIcons/login.png";
import MessageIcon from "../../../assets/newDashboardIcons/mail.svg";
import MailLogo from "../../../assets/newDashboardIcons/mailIcon.svg";
import SearchLogo from "../../../assets/newDashboardIcons/search-country.svg";

const SignForm = () => {
  const [verification, setVerification] = useState(false);
  const [roleSelector, setRoleSelector] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const backendAPI = new backend_API();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const [countries, setCountries] = useState(getCountryList());
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (processing) return;
    setProcessing(true);
    const payload = {
      email: values.email,
      password: values.password,
      roles: ["Vendor"],
      firstName: values?.firstname,
      lastName: values?.lastname,
      telNr: values?.phoneNumber?.length > 6 ? values?.phoneNumber : "",
      affiliateLink: localStorage.getItem("affiliate")
        ? localStorage.getItem("affiliate")
        : "",
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
      setVerification(!verification);
    }
    setProcessing(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPhoneChange = (value) => {
    if (value?.length <= 6 && value?.charAt(0) == "+") {
      const selectedCountry = getCountryList()?.find((country) =>
        value?.includes(country?.code),
      );
      let updatedValues;
      if (selectedCountry != undefined) {
        updatedValues = {
          ...form.getFieldsValue(),
          countryFlag: selectedCountry?.value,
        };
      } else
        updatedValues = {
          ...form.getFieldsValue(),
          countryFlag: "",
        };
      form.setFieldsValue({ ...updatedValues });
    }
  };

  const onFlagChange = (value) => {
    const selectedCountry = getCountryList()?.find(
      (country) => value == country?.value,
    );
    const updatedValues = {
      ...form.getFieldsValue(),
      phoneNumber: selectedCountry?.code,
    };
    form.setFieldsValue({ ...updatedValues });
    setSearch("");
    setCountries(getCountryList());
  };

  const onSearch = (value) => {
    setCountries(
      getCountryList()?.filter((country) =>
        country?.display?.toLowerCase()?.includes(value?.toLowerCase()),
      ),
    );
    setSearch(value);
  };

  return (
    <>
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

        <Row align="middle" className={verification && "auth-row"}>
          {verification ? (
            <Col span={24} lg={12}>
              <div className="auth-form">
                <div
                  className="back-btn back-btn-role"
                  onClick={() => setVerification(!verification)}
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
                    <img src={MailLogo} alt="Logo" />
                  </div>
                  <Flex vertical gap={6} className="form-heading">
                    <h4>Please check your email for a verification message.</h4>
                    <h5>
                      We send a confirmation link to <span>{email}</span>
                    </h5>
                  </Flex>
                </Flex>
                <div className="signup-text">
                  Don’t get an email?{" "}
                  <span className="cursor-pointer">Click to resend.</span>
                </div>
              </div>
            </Col>
          ) : (
            <>
              <Col span={24} lg={12}>
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
                      {/* <div className="logo">
                    <img src={Logo} alt="Logo" />
                  </div> */}
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
                          countryFlag: "Afghanistan",
                          countryRegion: null,
                          email: "",
                          firstname: "",
                          lastname: "",
                          password: "",
                          phoneNumber: "+93",
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Flex gap={12}>
                          <Col style={{ flex: 1 }}>
                            <Form.Item
                              label="First Name*"
                              name="firstname"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your first name!",
                                },
                              ]}
                            >
                              <Input placeholder="John" />
                            </Form.Item>
                          </Col>
                          <Col style={{ flex: 1 }}>
                            <Form.Item
                              label="Last Name*"
                              name="lastname"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your last name!",
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
                              message: "Please input your email!",
                            },
                          ]}
                        >
                          <div className="email-field-container">
                            <Input
                              placeholder="yourmail@mail.com"
                              className="email-field-input"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <img
                              src={MessageIcon}
                              alt="icon"
                              className="email-field-icon"
                            />
                          </div>
                        </Form.Item>

                        <Flex gap={12}>
                          <Col style={{ flex: 1 }}>
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
                              <Input.Password placeholder="Password" />
                            </Form.Item>
                          </Col>
                          <Col style={{ flex: 1 }}>
                            <Form.Item
                              label="Confirm Password*"
                              name="confirmpassword"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your confirm password!",
                                },
                              ]}
                            >
                              <Input.Password placeholder="Repeat Password" />
                            </Form.Item>
                          </Col>
                        </Flex>
                        {role === "Business" && (
                          <>
                            <Form.Item label="Phone number">
                              <Flex gap={8} className="phoneNumber">
                                <Form.Item
                                  name="countryFlag"
                                  rules={[
                                    {
                                      required: false,
                                    },
                                  ]}
                                  className="country-flag-container"
                                >
                                  <Select
                                    placeholder="Choose"
                                    virtual={false}
                                    style={{ width: "50px" }}
                                    className="telephone-flag"
                                    popupClassName="telephone-flag-dropdown"
                                    optionLabelProp="label"
                                    onChange={(e) => {
                                      onFlagChange(e);
                                    }}
                                    popupMatchSelectWidth={false}
                                    dropdownRender={(menu) => {
                                      return (
                                        <div>
                                          <Input
                                            prefix={
                                              <img
                                                src={SearchLogo}
                                                className="telephone-flag-search-icon"
                                              />
                                            }
                                            value={search}
                                            placeholder="Search For Countries"
                                            className="telephone-flag-search"
                                            onChange={(e) =>
                                              onSearch(e.target.value)
                                            }
                                          />
                                          {menu}
                                        </div>
                                      );
                                    }}
                                  >
                                    {countries?.map((country, index) => {
                                      return (
                                        <Option
                                          value={country?.value}
                                          key={index}
                                          label={
                                            <img
                                              src={getFlagLink(country?.symbol)}
                                              alt="country"
                                              width="22"
                                            />
                                          }
                                        >
                                          <Flex gap={8}>
                                            <img
                                              src={getFlagLink(country?.symbol)}
                                              alt="country"
                                              width="22"
                                            />
                                            <div>{t(country?.display)}</div>
                                            <div>({country?.code})</div>
                                          </Flex>
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="phoneNumber"
                                  rules={[
                                    {
                                      required: false,
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="+38 000 - 000 - 00 - 00"
                                    className="telephone-number"
                                    onChange={(e) =>
                                      onPhoneChange(e.target.value)
                                    }
                                  />
                                </Form.Item>
                              </Flex>
                            </Form.Item>

                            <Form.Item
                              name="countryRegion"
                              label={"Country*"}
                              rules={[
                                {
                                  required: role === "Business",
                                  message: "Please input your Country",
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
                                      <Flex gap={8}>
                                        <img
                                          src={getFlagLink(country?.symbol)}
                                          alt="country"
                                          width="22"
                                        />
                                        <div>{t(country?.display)}</div>
                                      </Flex>
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </>
                        )}
                        <Form.Item
                          name={"privacy"}
                          rules={[
                            {
                              required: true,
                              message: "Please read and agree Privacy Policy",
                            },
                          ]}
                        >
                          <Checkbox className="privacy-policy-checkbox">
                            <div className="default-text-gray privacy-policy-text">
                              <span>I have read and agree to the </span>
                              <a
                                href="http://localhost:5173/login"
                                className="privay-policy"
                              >
                                Privacy Policy
                              </a>
                            </div>
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={processing}
                            className="signup-submit-button"
                          >
                            <span className="signup-button-text">Submit</span>
                          </Button>
                        </Form.Item>
                      </Form>
                    </Flex>
                    <div className="signup-text back-to-login-text">
                      Already have an account?{" "}
                      <span
                        onClick={() => navigate("/login")}
                        className="cursor-pointer"
                      >
                        Log in
                      </span>
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
              </Col>
              <Col span={24} lg={12}>
                <div
                  className="authLayout-img-container"
                  style={{
                    backgroundImage: `url(${
                      role == "Business" && roleSelector
                        ? BusinessPage
                        : PersonalAccountPage
                    })`,
                  }}
                ></div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default SignForm;
