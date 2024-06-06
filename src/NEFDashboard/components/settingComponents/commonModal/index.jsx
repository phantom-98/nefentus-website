import React from "react";
import { Modal } from "antd";
import "./commonModal.css";

const CommonModal = ({ open, onClose, children, width = 380 }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      footer={null}
      width={width}
      className="common-modal"
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
