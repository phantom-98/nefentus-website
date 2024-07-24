import React from "react";
import { Button, Flex, Modal } from "antd";
import "./identificationCommonModal.css";

const IdentificationCommonModal = ({
  open,
  onClose,
  children,
  title,
  onUpload,
  loading,
  verification,
  acceptKYC,
  declineRequest,
  isDecline,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={title}
      footer={null}
      width={514}
      className={`identification-common-modal ${
        isDecline ? "decline-container" : ""
      }`}
    >
      <Flex vertical gap={16}>
        {children}
        {verification ? (
          <Flex align="center" justify="space-between" gap={8}>
            <Button
              className="default-text verfication-common-button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Flex gap={8}>
              <Button
                className="verfication-decline-button default-text verfication-common-button"
                onClick={declineRequest}
              >
                Decline
              </Button>
              <Button
                className="verfication-accept-button"
                onClick={() => !loading && acceptKYC()}
                loading={loading}
              >
                Accept
              </Button>
            </Flex>
          </Flex>
        ) : isDecline ? (
          <Flex
            align="center"
            justify="space-between"
            gap={8}
            className="decline-modal-footer"
          >
            <Button className="identification-modal-cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="identification-modal-upload"
              onClick={() => !loading && onUpload()}
              loading={loading}
            >
              Send
            </Button>
          </Flex>
        ) : (
          <Flex align="center" justify="flex-end" gap={8}>
            <Button className="identification-modal-cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="identification-modal-upload"
              onClick={() => !loading && onUpload()}
              loading={loading}
            >
              Upload
            </Button>
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};

export default IdentificationCommonModal;
