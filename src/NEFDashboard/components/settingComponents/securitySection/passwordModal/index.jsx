import React, { useContext, useState } from "react";
import CommonModal from "../../commonModal";
import ChangePasswordIcon from "../../../../../assets/newDashboardIcons/change-password.svg";
import TickIcon from "../../../../../assets/newDashboardIcons/tick-circle.svg";
import "./passwordModal.css";
import { Button, Flex, Input } from "antd";
import InputField from "../inputField";
import { MessageContext } from "../../../../../context/message";
import { useNavigate } from "react-router-dom";
import backend_API from "../../../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { onNavigateToForgot } from "../../../../../utils";

const PasswordModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const backendAPI = new backend_API();
  const [step, setStep] = useState(1);
  const { setErrorMessage, setInfoMessage, clearMessages } =
    useContext(MessageContext);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onPasswordUpdate = async () => {
    if (!passwordFields?.newPassword || !passwordFields?.currentPassword) {
      setErrorMessage(t("messages.error.passwordRequired"));
      return;
    }
    if (!passwordFields?.confirmPassword) {
      setErrorMessage(t("messages.error.confirmPasswordRequired"));
      return;
    }
    if (passwordFields?.newPassword !== passwordFields?.confirmPassword) {
      setErrorMessage(t("messages.error.passwordEqual"));
      return;
    }

    const response = await backendAPI.changePasswordWithOldOne(
      passwordFields?.newPassword,
      passwordFields?.currentPassword,
    );
    if (response == null) {
      setErrorMessage(t("messages.error.passwordCorrect"));
      return;
    }
    setStep(step + 1);
  };

  const handlePasswordSuccess = async () => {
    setInfoMessage(t("messages.success.passwordChange"));
    await backendAPI.signout();
    setTimeout(() => {
      // setShow(false);
      clearMessages();
      onClose();
      navigate("/login");
    }, 1000);
  };

  return (
    <CommonModal open={open} onClose={step == 2 ? null : onClose} width={341}>
      {step == 1 ? (
        <>
          <Flex
            align="center"
            justify="center"
            vertical
            gap={16}
            className="password-modal-container"
          >
            <img src={ChangePasswordIcon} alt="icon" width={32} height={32} />
            <div className="default-text change-password-modal-title">
              Change Password
            </div>
            <div className="change-password-modal-subtitle default-text-gray">
              The password must contain at least 8 characters
            </div>
          </Flex>
          <Flex vertical gap={16} className="change-password-field-container">
            <Flex vertical gap={8}>
              <InputField
                type={"password"}
                label={"Enter your Current Password"}
                value={passwordFields?.currentPassword}
                setValue={(value) =>
                  setPasswordFields({
                    ...passwordFields,
                    currentPassword: value,
                  })
                }
              />
              <div
                className="default-text password-modal-forgot cursor-pointer"
                onClick={() => onNavigateToForgot(navigate)}
              >
                Forgot Password?
              </div>
            </Flex>
            <InputField
              type={"password"}
              label={"Enter new password"}
              value={passwordFields?.newPassword}
              setValue={(value) =>
                setPasswordFields({
                  ...passwordFields,
                  newPassword: value,
                })
              }
            />
            <InputField
              type={"password"}
              label={"Confirm your new password"}
              value={passwordFields?.confirmPassword}
              setValue={(value) =>
                setPasswordFields({
                  ...passwordFields,
                  confirmPassword: value,
                })
              }
            />
          </Flex>
          <Button
            size="large"
            className="change-password-submit-button"
            onClick={() => onPasswordUpdate()}
          >
            Change Password
          </Button>
        </>
      ) : (
        <Flex
          align="center"
          justify="center"
          vertical
          gap={16}
          className="password-modal-step2"
        >
          <img src={TickIcon} alt="icon" />
          <div className="password-modal-success default-text">
            Your password has been successfully changed
          </div>
          <Button
            className="password-modal-done-button"
            onClick={() => handlePasswordSuccess()}
          >
            Done
          </Button>
        </Flex>
      )}
    </CommonModal>
  );
};

export default PasswordModal;
