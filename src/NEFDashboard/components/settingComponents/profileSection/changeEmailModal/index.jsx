import React from "react";
import CommonModal from "../../commonModal";
import { Button, Flex } from "antd";
import InputField from "../../securitySection/inputField";
import EmailIcon from "../../../../../assets/newDashboardIcons/email.svg";
import "./changeEmailModal.css";

const ChangeEmailModal = ({ open, onClose }) => {
  return (
    <CommonModal open={open} onClose={onClose} width={340}>
      <Flex vertical gap={16}>
        <Flex
          align="center"
          justify="center"
          vertical
          gap={16}
          className="email-modal-container"
        >
          <img src={EmailIcon} alt="icon" width={32} height={32} />
          <Flex vertical align="center" gap={4}>
            <div className="default-text change-email-modal-title">
              Change Email
            </div>
            <div className="change-email-modal-subtitle default-text-gray">
              Enter new email address
            </div>
          </Flex>
        </Flex>
        <div className="email-input-field">
          <InputField type={"text"} label={"New Email"} />
        </div>

        <Button
          size="large"
          className="change-email-submit-button"
          onClick={() => onClose()}
        >
          Change
        </Button>
      </Flex>
    </CommonModal>
  );
};

export default ChangeEmailModal;
