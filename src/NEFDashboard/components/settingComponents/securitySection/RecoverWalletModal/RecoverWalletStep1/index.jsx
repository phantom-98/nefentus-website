import React, { useContext, useEffect, useState } from "react";
import NefentusLogo from "../../../../../../assets/logo/logo_n.png";
import CopyIcon from "../../../../../../assets/newDashboardIcons/copy-gray.svg";
import { Button, Flex } from "antd";
import InputField from "../../inputField";
import "./recoverWalletStep1.css";
import backend_API from "../../../../../../api/backendAPI";
import WalletAddressFormatter from "../../../../../../func/walletAddressFormatter";
import { MessageContext } from "../../../../../../context/message";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { onNavigateToForgot } from "../../../../../../utils";

const RecoverWalletStep1 = ({
  onNext,
  password,
  setPassword,
  recommendRecover,
}) => {
  const backendAPI = new backend_API();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setErrorMessage, setSuccessMessage, clearMessages } =
    useContext(MessageContext);
  const [internalWallet, setInternalWallet] = useState({});

  useEffect(() => {
    fetchInternalWallet();
  }, []);

  const fetchInternalWallet = async () => {
    const response = await backendAPI.getWalletAddresses();
    if (response?.length)
      setInternalWallet(response?.find((wallet) => wallet?.internal));
  };

  const checkPassword = async () => {
    const res = await backendAPI.checkPassword(password);
    if (res) {
      clearMessages();
      onNext();
    } else {
      setErrorMessage(t("messages.error.passwordCorrect"));
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(internalWallet?.address);
    setSuccessMessage(t("general.copied"));
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className="recover-wallet-container seed-modal-padding"
      gap={16}
    >
      <Flex vertical gap={6} align="center">
        <img
          src={NefentusLogo}
          alt="icon"
          className="recover-wallet-nefentus"
        />
        <div className="default-text">Nefentus</div>
        <Flex align="center" gap={4}>
          <div className="default-text-gray recover-wallet-address">
            {WalletAddressFormatter(internalWallet?.address)}
          </div>
          <img
            src={CopyIcon}
            alt="icon"
            className="recover-wallet-modal-copy cursor-pointer"
            onClick={onCopy}
          />
        </Flex>
      </Flex>
      <div className="recover-wallet-description">
        {recommendRecover
          ? t("security.recommendRecoverModal.subtitle")
          : "To recover your crypto wallet using your seed phrase, please enter your password first"}
      </div>
      <Flex vertical gap={4} className="recover-wallet-password-container">
        <InputField
          type={"password"}
          label={"Password"}
          value={password}
          setValue={setPassword}
        />
        <div>
          <div
            className="default-text password-modal-forgot cursor-pointer"
            onClick={() => onNavigateToForgot(navigate)}
          >
            Forgot Password?
          </div>
        </div>
      </Flex>
      <Button className="recover-wallet-continue" onClick={checkPassword}>
        Continue
      </Button>
    </Flex>
  );
};

export default RecoverWalletStep1;
