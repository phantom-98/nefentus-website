import React from "react";
import { Button, Flex, Input, Modal } from "antd";
import AntiPhishingCover from "../../../../../assets/newDashboardIcons/anti-phishing-cover.svg";
import ListLockIcon from "../../../../../assets/newDashboardIcons/list-lock.svg";
import "./antiPhishingModal.css";

const AntiPhishingModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={"Set an Anti-Phishing Code"}
      centered
      footer={null}
      width={391}
      className="antiphishing-code-modal"
    >
      <Flex vertical align="center" gap={16}>
        <div className="anti-phishing-cover">
          <img src={AntiPhishingCover} alt="image" />
        </div>
        <Flex align="center" gap={8}>
          <div className="anti-phishing-list-lock">
            <img src={ListLockIcon} width={24} height={24} />
          </div>
          <div className="default-text-gray anti-phishing-modal-desc">
            An anti-phishing code can be embedded in every Nefentus email to
            verify the authenticity of the email
          </div>
        </Flex>
      </Flex>
      <Flex vertical gap={4} className="anti-phishing-input-container">
        <div className="default-text-gray">Enter your Anti-Phishing Code </div>
        <Input
          size="large"
          placeholder="Marcus Aurelius"
          className="anti-phishing-input"
        />
      </Flex>
      <Button className="anti-phishing-save" onClick={onClose}>
        Save
      </Button>
    </Modal>
  );
};

export default AntiPhishingModal;
