import React from "react";
import NefentusLogo from "../../../../../../assets/logo/logo_n.png";
import CopyIcon from "../../../../../../assets/newDashboardIcons/copy-gray.svg";
import { Button, Flex } from "antd";
import InputField from "../../inputField";
import "./recoverWalletStep1.css";

const RecoverWalletStep1 = ({ onNext }) => {
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
            0xabcd...1234
          </div>
          <img
            src={CopyIcon}
            alt="icon"
            className="recover-wallet-modal-copy"
          />
        </Flex>
      </Flex>
      <div className="recover-wallet-description">
        To recover your crypto wallet using your seed phrase, please enter your
        password first
      </div>
      <Flex vertical gap={4} className="recover-wallet-password-container">
        <InputField type={"password"} label={"Password"} />
        <div className="default-text password-modal-forgot cursor-pointer">
          Forgot Password?
        </div>
      </Flex>
      <Button className="recover-wallet-continue" onClick={onNext}>
        Continue
      </Button>
    </Flex>
  );
};

export default RecoverWalletStep1;
