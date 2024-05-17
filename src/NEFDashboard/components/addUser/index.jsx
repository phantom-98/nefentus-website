import React, { useContext, useEffect, useState } from "react";
import { Flex, Input, Modal, Select, Slider } from "antd";
import AddUserIcon from "../../../assets/newDashboardIcons/add-user-gray.svg";
import MailIcon from "../../../assets/newDashboardIcons/mail.svg";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { ROLE_TO_NAME } from "../../../constants";
import { MessageContext } from "../../../context/message";
import { useAuth } from "../../../context/auth/authContext";
import { getRole } from "../../../utils";
import { useTranslation } from "react-i18next";
import "./addUser.css";

const AddUser = ({ open, handleSubmit, onClose, type }) => {
  const adminApi = new adminDashboardApi(type);
  const { t } = useTranslation();
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
  const { user } = useAuth();
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    role: "",
    service_fee: "1",
  });

  const handleUserDetails = (value, key) => {
    setUserDetail({ ...userDetail, [key]: value });
  };

  const handleSubmitUser = async () => {
    if (Object.keys(userDetail)?.some((key) => userDetail[key] == "")) {
      setErrorMessage("All fields are required");
      return;
    }

    const resp = await adminApi.createUser({
      ...userDetail,
      roles: [userDetail?.role],
      serviceFee: userDetail?.service_fee?.toString(),
    });
    if (resp) {
      if (resp.ok) {
        setInfoMessage(t("messages.success.addUser"));
        handleSubmit();
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

  return (
    <Modal
      title={
        <Flex align="center" gap={4} className="add-modal-title-container">
          <img src={AddUserIcon} alt="add_user" />
          <div className="default-text-gray add-user_modal_title">
            Add New User
          </div>
        </Flex>
      }
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      width={680}
      className="add-user-modal"
      footer={null}
    >
      <Flex>
        <Flex vertical gap={12} className="add-user-left-row">
          <Flex align="center" gap={8}>
            <Flex vertical gap={4}>
              <div className="default-text-gray">
                {t("dashboard.modal.firstName").concat("*")}
              </div>{" "}
              <Input
                placeholder={t("dashboard.modal.firstNamePlaceholder")}
                size="large"
                className="add-user-input-fields"
                value={userDetail?.firstName}
                onChange={(e) => handleUserDetails(e.target.value, "firstName")}
              />
            </Flex>
            <Flex vertical gap={4}>
              <div className="default-text-gray">
                {t("dashboard.modal.lastName").concat("*")}
              </div>{" "}
              <Input
                placeholder={t("dashboard.modal.lastNamePlaceholder")}
                size="large"
                className="add-user-input-fields"
                value={userDetail?.lastName}
                onChange={(e) => handleUserDetails(e.target.value, "lastName")}
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
              className="add-user-input-fields"
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
              className="add-user-input-fields"
              value={userDetail?.password}
              onChange={(e) => handleUserDetails(e.target.value, "password")}
            />
          </Flex>
          <Flex vertical gap={6}>
            <div className="default-text-gray">
              {t("dashboard.modal.company").concat("*")}
            </div>
            <Input
              placeholder={t("dashboard.modal.companyPlaceholder")}
              size="large"
              className="add-user-input-fields"
              value={userDetail?.company}
              onChange={(e) => handleUserDetails(e.target.value, "company")}
            />
          </Flex>
        </Flex>
        <Flex className="add-user-right-row" vertical gap={16}>
          <Flex vertical gap={4} className="add-user-role">
            <div className="default-text-gray">
              {t("dashboard.modal.role").concat("*")}
            </div>
            <Select
              placeholder={t("dashboard.modal.role")}
              className="add-user-role-select"
              size="large"
              options={
                getRole(user) == "admin"
                  ? roles
                  : getRole(user) == "leader"
                  ? roles?.filter(
                      (roleData) =>
                        roleData?.value?.toLowerCase() != getRole(user),
                    )
                  : getRole(user) == "seniorbroker"
                  ? roles
                      ?.filter(
                        (roleData) =>
                          roleData?.value?.toLowerCase() != "senior broker",
                      )
                      ?.filter(
                        (roleData) =>
                          roleData?.value?.toLowerCase() != "leader",
                      )
                  : getRole(user) == "broker"
                  ? roles?.filter(
                      (roleData) => roleData?.value?.toLowerCase() == "vendor",
                    )
                  : roles
              }
              value={userDetail?.role == "" ? null : userDetail?.role}
              onChange={(role) => handleUserDetails(role, "role")}
            />
          </Flex>
          <Flex vertical>
            <div className="default-text-gray">
              {t("dashboard.modal.service_fee").concat("*")}
            </div>
            <Flex
              className="add-user-service-fee-container"
              vertical
              align="center"
              justify="space-between"
            >
              <div className="default-text-gray service-fee-description">
                {t("dashboard.modal.service_fee_description")}
              </div>
              <div className="default-text add-user-service-fee-value">
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
                  className="service-fee-slider"
                  value={userDetail?.service_fee}
                  onChange={(value) => handleUserDetails(value, "service_fee")}
                />
                <div className="default-text-gray">3%</div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="add-user-footer-button"
      >
        <div className="default-text add-user-cancel-button cursor-pointer">
          {t("general.cancel")}
        </div>
        <div
          className="default-text add-user-submit cursor-pointer"
          onClick={handleSubmitUser}
        >
          {t("dashboard.modal.titleCreate")}
        </div>
      </Flex>
    </Modal>
  );
};

export default AddUser;
