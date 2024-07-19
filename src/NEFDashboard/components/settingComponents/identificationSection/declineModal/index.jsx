import React, { useState } from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex, Input } from "antd";
import "./declineModal.css";

const DeclineModal = ({ open, onClose, onDecline, loading = false }) => {
  const [text, setText] = useState("");
  const { TextArea } = Input;
  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Application Rejection</div>}
      onUpload={() => onDecline(text)}
      loading={loading}
      isDecline={true}
    >
      <Flex vertical gap={8} className="decline-modal-container">
        <div className="default-text reject-modal-text-title">
          Describe the reason for refusal
        </div>
        <TextArea
          rows={5}
          className="decline-text-container"
          placeholder="Rejection reason..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Flex>
    </IdentificationCommonModal>
  );
};

export default DeclineModal;
