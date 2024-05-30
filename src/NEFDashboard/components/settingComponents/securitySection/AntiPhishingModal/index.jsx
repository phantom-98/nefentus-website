import React, { useContext, useState } from "react";
import { Button, Flex, Input, Modal } from "antd";
import AntiPhishingCover from "../../../../../assets/newDashboardIcons/anti-phishing-cover.svg";
import ListLockIcon from "../../../../../assets/newDashboardIcons/list-lock.svg";
import "./antiPhishingModal.css";
import backend_API from "../../../../../api/backendAPI";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../../../context/message";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../../context/auth/authContext";

const AntiPhishingModal = ({ open, onClose }) => {
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setInfoMessage, clearMessages } = useContext(MessageContext);
  const [code, setCode] = useState(user?.antiPhishingCode);
  const onChangeAntiPhishing = async () => {
    if (code == "") return;
    const requestData = {
      code,
    };
    const response2 = await backendAPI.setPhishingCode(requestData);

    if (response2 == null) {
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setCode("");
    } else {
      setInfoMessage(t("messages.success.updateSettings"));
      onClose();
      clearMessages();
    }
  };
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
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Flex>
      <Button className="anti-phishing-save" onClick={onChangeAntiPhishing}>
        Save
      </Button>
    </Modal>
  );
};

export default AntiPhishingModal;
