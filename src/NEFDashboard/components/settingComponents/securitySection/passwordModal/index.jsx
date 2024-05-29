import React, { useState } from "react";
import CommonModal from "../../commonModal";
import ChangePasswordIcon from "../../../../../assets/newDashboardIcons/change-password.svg";
import TickIcon from "../../../../../assets/newDashboardIcons/tick-circle.svg";
import "./passwordModal.css";
import { Button, Flex, Input } from "antd";
import InputField from "../inputField";

const PasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  return (
    <CommonModal open={open} onClose={onClose} width={341}>
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
              />
              <div className="default-text password-modal-forgot cursor-pointer">
                Forgot Password?
              </div>
            </Flex>
            <InputField type={"password"} label={"Enter new password"} />
            <InputField type={"password"} label={"Confirm your new password"} />
          </Flex>
          <Button
            size="large"
            className="change-password-submit-button"
            onClick={() => setStep(step + 1)}
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
            onClick={() => onClose()}
          >
            Done
          </Button>
        </Flex>
      )}
    </CommonModal>
  );
};

export default PasswordModal;
