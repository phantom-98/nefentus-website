import React from "react";
import { Flex, Modal, Typography } from "antd";
import "./deleteModal.css";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ open, onClose, icon, description, onDelete }) => {
  const { Text } = Typography;
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      onCancel={onClose}
      closable={false}
      title={
        <div className="delete-modal-title" onClick={() => onClose()}>
          X
        </div>
      }
      centered
      footer={null}
      className="delete-modal"
      width={342}
    >
      <Flex vertical className="delete-modal-container" gap={16}>
        <div className="delete-modal-icon">{icon}</div>

        <Text className="delete-modal-description">{description}</Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        gap={8}
        className="delete-modal-buttons"
      >
        <Text
          className="delete-modal-cancel cursor-pointer"
          onClick={() => onClose()}
        >
          {t("general.cancel")}
        </Text>
        <Text
          className="delete-modal-submit cursor-pointer"
          onClick={() => onDelete()}
        >
          {t("personalDashboard.drawer.remove")}
        </Text>
      </Flex>
    </Modal>
  );
};

export default DeleteModal;
