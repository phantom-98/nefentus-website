import React, { useState } from "react";
import CommonModal from "../../commonModal";
import { Button, Flex } from "antd";
import InputField from "../../securitySection/inputField";
import InvoiceIcon from "../../../../../assets/newDashboardIcons/wallet-gray.svg";
import "./vatNumberModal.css";

const VatNumberModal = ({ open, onClose, onSubmit, autoFilledValue }) => {
  const [value, setValue] = useState(autoFilledValue);
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
          <img src={InvoiceIcon} alt="icon" width={32} height={32} />
          <Flex vertical align="center" gap={4}>
            <div className="default-text change-email-modal-title">VAT</div>
            <div className="change-email-modal-subtitle default-text-gray">
              Enter your VAT Number
            </div>
          </Flex>
        </Flex>
        <div className="email-input-field">
          <InputField
            type={"text"}
            label={"VAT Number"}
            value={value}
            setValue={setValue}
          />
        </div>

        <Button
          size="large"
          className="change-email-submit-button"
          onClick={() =>
            autoFilledValue === value ? onClose() : onSubmit(value, "vatNumber")
          }
        >
          Change
        </Button>
      </Flex>
    </CommonModal>
  );
};

export default VatNumberModal;
