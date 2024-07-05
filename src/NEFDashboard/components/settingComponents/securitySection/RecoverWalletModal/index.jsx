import React, { useState } from "react";
import { Flex, Modal } from "antd";
import "./recover-wallet-modal.css";
import RecoverWalletStep1 from "./RecoverWalletStep1";
import RecoverWalletStep2 from "./RecoverWalletStep2";

const RecoverWalletModal = ({ open, onClose, recommendRecover }) => {
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const steps = [
    {
      count: 1,
      title: "Recover Wallet",
      modalWidth: 342,
    },
    {
      count: 2,
      title: "Your seed phrase",
      modalWidth: 390,
    },
  ];
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RecoverWalletStep1
            onNext={() => setStep(step + 1)}
            password={password}
            setPassword={setPassword}
            recommendRecover={recommendRecover}
          />
        );
      case 2:
        return (
          <RecoverWalletStep2 onClose={() => onClose()} password={password} />
        );
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={steps?.find((option) => option?.count == step)?.title}
      centered
      footer={null}
      width={steps?.find((option) => option?.count == step)?.modalWidth}
      className="recover-wallet-modal"
    >
      <Flex gap={step == 1 ? 16 : 20} align="center" vertical>
        {renderStep()}
      </Flex>
    </Modal>
  );
};

export default RecoverWalletModal;
