import React from "react";
import { Button, Flex, Input } from "antd";
import PasswordLight from "../../../../../../assets/newDashboardIcons/change-password-light.svg";
import "./recoverWalletStep2.css";

const RecoverWalletStep2 = ({ onNext, onClose }) => {
  const seeds = [
    "World",
    "Horizon",
    "Kaleidoscope",
    "Ripple",
    "Quicksilver",
    "Ember",
    "Zenith",
    "Whisper",
    "Labyrinth",
    "Serendipity",
    "Eclipse",
    "Cascade",
  ];
  return (
    <>
      <Flex vertical gap={16} className="seed-modal-padding">
        <Flex
          gap={8}
          align="stretch"
          className="recover-wallet-step2-description"
        >
          <div className="recover-wallet-step2-list-icon">
            <img src={PasswordLight} alt="icon" />
          </div>
          <div className="default-text">
            To restore your wallet, enter your seed phrase.
          </div>
        </Flex>
        <Flex gap={8} wrap>
          {seeds?.map((seed, index) => (
            <Flex
              gap={6}
              align="center"
              className="recover-wallet-step2-value-container"
            >
              <div>{index + 1}</div>
              <Input />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="recover-wallet-step2-footer"
      >
        <Button className="recover-wallet-step2-cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button className="recover-wallet-step2-continue" onClick={onNext}>
          Continue
        </Button>
      </Flex>
    </>
  );
};

export default RecoverWalletStep2;
