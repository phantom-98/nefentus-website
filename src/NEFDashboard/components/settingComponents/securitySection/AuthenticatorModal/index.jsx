import React, { useContext, useEffect, useState } from "react";
import CommonModal from "../../commonModal";
import KeyIcon from "../../../../../assets/newDashboardIcons/key.svg";
import CopyIcon from "../../../../../assets/newDashboardIcons/copy-gray.svg";
import "./authenticatorModal.css";
import { Button, Flex, QRCode } from "antd";
import backend_API from "../../../../../api/backendAPI";
import { MessageContext } from "../../../../../context/message";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../../context/auth/authContext";

const AuthenticatorModal = ({
  open,
  onClose,
  onSuccess,
  secretToken,
  handleTotp,
}) => {
  const backendAPI = new backend_API();
  const { setInfoMessage } = useContext(MessageContext);
  const { t } = useTranslation();
  const { user } = useAuth();

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
        {secretToken?.length > 0 && (
          <QRCode
            value={`otpauth://totp/Nefentus?secret=${secretToken}&issuer=${user?.email}`}
            bgColor="#fff"
            color="#000"
            width={206}
            status="active"
          />
        )}
        <div className="default-text-gray authenticator-description">
          Or enter this code into your authentication app.
        </div>
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          className="authenticator-copy-container"
        >
          <div className="authenticator-secret-code">{secretToken}</div>
          <Button
            icon={<img src={CopyIcon} alt="icon" width={16} height={16} />}
            className="authenticator-copy-button"
            onClick={() => {
              navigator.clipboard.writeText(secretToken);
              setInfoMessage(t("general.copied"));
            }}
          >
            Copy
          </Button>
        </Flex>
      </Flex>
    </CommonModal>
  );
};

export default AuthenticatorModal;
