import React, { useEffect, useState } from "react";
import CommonModal from "../../commonModal";
import { Button, Flex } from "antd";
import InputField from "../../securitySection/inputField";
import EmailIcon from "../../../../../assets/newDashboardIcons/email.svg";
import ProfileImg from "../../../../../assets/icon/user.svg";
import "./changeFieldModal.css";

const changeFields = [
  {
    text: "Change First Name",
    description: "Enter your new first name",
    label: "First Name",
    key: "firstName",
    icon: ProfileImg,
  },
  {
    text: "Change Last Name",
    description: "Enter your new last name",
    label: "Last Name",
    key: "lastName",
    icon: ProfileImg,
  },

  {
    text: "Change Email",
    description: "Enter new email address",
    label: "New Email",
    key: "email",
    icon: EmailIcon,
  },
  {
    text: "Change Phone",
    description: "Enter your new phone number",
    label: "Phone Number",
    key: "phoneNumber",
    icon: ProfileImg,
  },
];

const ChangeFieldModal = ({ open, onClose, keyField, onSubmit }) => {
  const [value, setValue] = useState("");
  const [activeField, setActiveField] = useState(
    changeFields?.find((field) => field?.key == keyField),
  );

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
          <img src={activeField?.icon} alt="icon" width={32} height={32} />
          <Flex vertical align="center" gap={4}>
            <div className="default-text change-email-modal-title">
              {activeField?.text}
            </div>
            <div className="change-email-modal-subtitle default-text-gray">
              {activeField?.description}
            </div>
          </Flex>
        </Flex>
        <div className="email-input-field">
          <InputField
            type={"text"}
            label={activeField?.label}
            value={value}
            setValue={setValue}
          />
        </div>

        <Button
          size="large"
          className="change-email-submit-button"
          onClick={() => onSubmit(value)}
        >
          Change
        </Button>
      </Flex>
    </CommonModal>
  );
};

export default ChangeFieldModal;
