import React from "react";
import NefentusLogo from "../../../../../../assets/logo/logo_n.png";
import CopyIcon from "../../../../../../assets/newDashboardIcons/copy-gray.svg";
import { Button, Flex } from "antd";
import "./seedStep1.css";
import InputField from "../../inputField";

const SeedStep1 = ({ onNext }) => {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className="seed-step1-container seed-modal-padding"
      gap={16}
    >
      <Flex vertical gap={6} align="center">
        <img src={NefentusLogo} alt="icon" className="seed-phrase-nefentus" />
        <div className="default-text">Nefentus</div>
        <Flex align="center" gap={4}>
          <div className="default-text-gray seed-phrase-address">
            0xabcd...1234
          </div>
          <img src={CopyIcon} alt="icon" className="seed-phrase-modal-copy" />
        </Flex>
      </Flex>
      <div className="seed-step1-description">
        To see your seed phrase, please enter your password first
      </div>
      <Flex vertical gap={4}>
        <InputField type={"password"} label={"Password"} />
        <div className="default-text password-modal-forgot cursor-pointer">
          Forgot Password?
        </div>
      </Flex>
      <Button className="seed-step1-continue" onClick={onNext}>
        Continue
      </Button>
    </Flex>
  );
};

export default SeedStep1;
