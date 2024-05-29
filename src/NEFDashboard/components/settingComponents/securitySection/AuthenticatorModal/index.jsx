import React from "react";
import CommonModal from "../../commonModal";
import KeyIcon from "../../../../../assets/newDashboardIcons/key.svg";
import CopyIcon from "../../../../../assets/newDashboardIcons/copy-gray.svg";
import "./authenticatorModal.css";
import { Button, Flex, QRCode } from "antd";

const AuthenticatorModal = ({ open, onClose }) => {
  return (
    <CommonModal open={open} onClose={onClose} width={322}>
      <Flex vertical gap={16} align="center">
        <Flex vertical gap={8} align="center" justify="center">
          <Flex
            align="center"
            justify="center"
            className="authenticator-key-icon"
          >
            <img src={KeyIcon} alt="icon" />
          </Flex>
          <div className="default-text">Set 2-factor authentication app</div>
          <div className="default-text-gray authenticator-description">
            Please use your authentication app to scan this QR Code
          </div>
        </Flex>
        <QRCode
          value={"-"}
          bgColor="#fff"
          color="#000"
          width={206}
          status="active"
        />
        <div className="default-text-gray authenticator-description">
          Or enter this code into your authentication app.
        </div>
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          className="authenticator-copy-container"
        >
          <div>GYKPOOGMIJTDKE7ZC</div>
          <Button
            icon={<img src={CopyIcon} alt="icon" width={16} height={16} />}
            className="authenticator-copy-button"
          >
            Copy
          </Button>
        </Flex>
      </Flex>
    </CommonModal>
  );
};

export default AuthenticatorModal;
