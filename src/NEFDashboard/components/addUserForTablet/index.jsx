import React, { useContext, useState, useEffect } from "react";
import { Button, Flex, Input, Select, Slider } from "antd";
import { useTranslation } from "react-i18next";
import LeftArrow from "../../../assets/newDashboardIcons/left-arrow-gray.svg";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import MailIcon from "../../../assets/newDashboardIcons/mail.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth/authContext";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { getRole } from "../../../utils";
import { MessageContext } from "../../../context/message";
import "./addUserForTablet.css";

const AddUserForTablet = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedUser } = state || {};
  const { user } = useAuth();
  const adminApi = new adminDashboardApi(
    user.roles && getRole(user) == "" ? user?.roles[0] : getRole(user),
  );
  const [roles, setRoles] = useState([
    { value: "Vendor", label: t("dashboard.roles.Vendor") },
    { value: "Broker", label: t("dashboard.roles.Broker") },
    {
      value: "Senior Broker",
      label: t("dashboard.roles.SeniorBroker"),
    },
    { value: "Leader", label: t("dashboard.roles.Leader") },
  ]);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    role: "",
    agent: "",
    service_fee: "1",
  });

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const capitalizeAllWords = (str) => {
    const words = str.split(" ");
    const capitalizedWords = words.map(capitalizeFirstLetter);
    return capitalizedWords.join(" ");
  };

  useEffect(() => {
    if (Object.keys(selectedUser)?.length > 0)
      setUserDetail({
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        email: selectedUser?.email,
        service_fee: "1",
        company: selectedUser?.business,
        role: capitalizeAllWords(selectedUser?.roles[0]),
        agent: selectedUser?.agent,
      });
  }, [selectedUser]);

  const handleUserDetails = (value, key) => {
    setUserDetail({ ...userDetail, [key]: value });
  };

  const handleSubmitUser = async () => {
    const validationData = { ...userDetail };
    delete validationData.agent;
    delete validationData.company;
    if (
      Object.keys(validationData)?.some(
        (key) =>
          userDetail[key] == "" ||
          (Object.keys(selectedUser)?.length > 0 && key == "password"),
      )
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    const payload = {
      ...userDetail,
      roles: [userDetail?.role],
      serviceFee: userDetail?.service_fee?.toString(),
    };

    delete payload.role;
    delete payload.service_fee;

    const resp =
      Object.keys(selectedUser)?.length > 0
        ? await adminApi.updateUser(
            payload?.firstName,
            payload?.lastName,
            payload?.email,
            payload?.email,
            userDetail?.role,
            payload?.agent,
          )
        : await adminApi.createUser(payload);
    if (resp) {
      if (resp.ok) {
        setInfoMessage(
          t(
            Object.keys(selectedUser)?.length > 0
              ? "Updated Successfully"
              : "messages.success.addUser",
          ),
        );
        setUserDetail({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          company: "",
          role: "",
          agent: "",
          service_fee: "1",
        });
      } else if (resp.status === 409) {
        setErrorMessage(t("messages.error.userExist"));
      } else {
        const data = await resp.json();
        if (data["firstName"]) {
          if (
            data["firstName"] ==
            "First name must be between 2 and 70 characters"
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
          } else if (data["email"] == "Please enter a valid email") {
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
        } else if (data.message == "agent not found")
          setErrorMessage(t("messages.error.agent"));
        else setErrorMessage(t("messages.error.addUser"));
      }
    } else {
      setErrorMessage(t("messages.error.addUser"));
    }
  };

  const fetchRoleOptions = () => {
    switch (
      user.roles && getRole(user) == "" ? user?.roles[0] : getRole(user)
    ) {
      case "admin":
        return roles;
      case "leader":
        return roles?.filter(
          (roleData) => roleData?.value?.toLowerCase() != "leader",
        );
      case "seniorbroker":
        return roles
          ?.filter(
            (roleData) => roleData?.value?.toLowerCase() != "senior broker",
          )
          ?.filter((roleData) => roleData?.value?.toLowerCase() != "leader");
      case "broker":
        return roles?.filter(
          (roleData) => roleData?.value?.toLowerCase() == "vendor",
        );
      case "vendor":
        return [];
      default:
        return roles;
    }
  };

  return (
    <>
      <Flex vertical className="user-tablet-view">
        <Flex vertical gap={10} className="user-tablet-head">
          <Flex
            gap={6}
            className="cursor-pointer user-tablet-back"
            align="center"
            onClick={() => navigate(-1)}
          >
            <img src={LeftArrow} alt="icon" />
            <div className="default-text-gray user-tablet-back-button">
              Back
            </div>
          </Flex>
          <div className="default-text user-tablet-title">Add New User</div>
        </Flex>

        <Flex className="user-tablet-detail-field-container" gap={16}>
          <Flex vertical gap={12} className="user-tablet-row">
            <Flex align="center" gap={8}>
              <Flex
                vertical
                gap={4}
                className="user-tablet-name-field-container"
              >
                <div className="default-text-gray">
                  {t("dashboard.modal.firstName").concat("*")}
                </div>{" "}
                <Input
                  placeholder={t("dashboard.modal.firstNamePlaceholder")}
                  size="large"
                  className="user-tablet-input-fields"
                  value={userDetail?.firstName}
                  onChange={(e) =>
                    handleUserDetails(e.target.value, "firstName")
                  }
                />
              </Flex>
              <Flex
                vertical
                gap={4}
                className="user-tablet-name-field-container"
              >
                <div className="default-text-gray">
                  {t("dashboard.modal.lastName").concat("*")}
                </div>{" "}
                <Input
                  placeholder={t("dashboard.modal.lastNamePlaceholder")}
                  size="large"
                  className="user-tablet-input-fields"
                  value={userDetail?.lastName}
                  onChange={(e) =>
                    handleUserDetails(e.target.value, "lastName")
                  }
                />
              </Flex>
            </Flex>
            <Flex vertical gap={6}>
              <div className="default-text-gray">
                {t("dashboard.modal.email").concat("*")}
              </div>
              <Input
                placeholder={t("dashboard.modal.emailPlaceholder")}
                size="large"
                className="user-tablet-input-fields"
                suffix={<img src={MailIcon} />}
                value={userDetail?.email}
                onChange={(e) => handleUserDetails(e.target.value, "email")}
              />
            </Flex>
            <Flex vertical gap={6}>
              <div className="default-text-gray">
                {t("dashboard.modal.password").concat("*")}
              </div>
              <Input.Password
                placeholder={t("dashboard.modal.passwordPlaceholder")}
                size="large"
                className="user-tablet-input-fields"
                value={userDetail?.password}
                onChange={(e) => handleUserDetails(e.target.value, "password")}
                disabled={Object.keys(selectedUser)?.length > 0}
              />
            </Flex>
            <Flex vertical gap={6}>
              <div className="default-text-gray">
                {t("dashboard.modal.company")}
              </div>
              <Input
                placeholder={t("dashboard.modal.companyPlaceholder")}
                size="large"
                className="user-tablet-input-fields"
                value={userDetail?.company}
                onChange={(e) => handleUserDetails(e.target.value, "company")}
              />
            </Flex>
          </Flex>
          <Flex className="user-tablet-row" vertical gap={16}>
            <Flex vertical gap={4} className="user-tablet-role">
              <div className="default-text-gray">
                {t("dashboard.modal.role").concat("*")}
              </div>
              <Select
                placeholder={t("dashboard.modal.role")}
                className="user-tablet-role-select"
                size="large"
                options={fetchRoleOptions()}
                value={userDetail?.role == "" ? null : userDetail?.role}
                onChange={(role) => handleUserDetails(role, "role")}
              />
            </Flex>
            <Flex vertical gap={6}>
              <div className="default-text-gray">
                {t("dashboard.modal.agent")}
              </div>
              <Input
                placeholder={t("dashboard.modal.agentPlaceholder")}
                size="large"
                className="user-tablet-input-fields"
                value={userDetail?.agent}
                onChange={(e) => handleUserDetails(e.target.value, "agent")}
              />
            </Flex>
            <Flex vertical gap={6}>
              <div className="default-text-gray">
                {t("dashboard.modal.service_fee").concat("*")}
              </div>
              <Flex
                className="user-tablet-service-fee-container"
                vertical
                align="center"
                justify="space-between"
              >
                <div className="default-text-gray service-fee-description">
                  {t("dashboard.modal.service_fee_description")}
                </div>
                <div className="default-text user-tablet-service-fee-value">
                  {userDetail?.service_fee}%
                </div>
                <Flex
                  align="center"
                  className="service-fee-slider-container"
                  gap={8}
                >
                  <div className="default-text-gray">1%</div>
                  <Slider
                    step={0.1}
                    min={1}
                    max={3}
                    defaultValue={2.1}
                    className="user-tablet-service-fee-slider"
                    value={userDetail?.service_fee}
                    onChange={(value) =>
                      handleUserDetails(value, "service_fee")
                    }
                  />
                  <div className="default-text-gray">3%</div>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="user-tablet-footer"
      >
        <Button
          className="user-tablet-cancel-button"
          onClick={() => navigate(-1)}
        >
          {t("general.cancel")}
        </Button>
        <Button
          className="user-tablet-submit"
          icon={<img src={AddIcon} />}
          onClick={handleSubmitUser}
        >
          {Object.keys(selectedUser)?.length > 0
            ? t("update")
            : t("dashboard.modal.confirmCreate")}
        </Button>
      </Flex>
    </>
  );
};

export default AddUserForTablet;
