import React from "react";
import { Button, Flex, Modal } from "antd";
import "./identificationCommonModal.css";

const IdentificationCommonModal = ({ open, onClose, children, title }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={title}
      footer={null}
      width={514}
      className="identification-common-modal"
    >
      <Flex vertical gap={16}>
        {children}
        <Flex align="center" justify="flex-end" gap={8}>
          <Button className="identification-modal-cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="identification-modal-upload">Upload</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default IdentificationCommonModal;
