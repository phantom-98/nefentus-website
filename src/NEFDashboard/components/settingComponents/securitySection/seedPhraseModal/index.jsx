import React, { useState } from "react";
import { Flex, Modal } from "antd";
import SeedStep1 from "./seedStep1";
import SeedStep2 from "./seedStep2";
import SeedStep3 from "./seedStep3";
import SeedStep4 from "./seedStep4";
import "./seedPhraseModal.css";

const SeedPhraseModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const steps = [
    {
      count: 1,
      title: "Show seed phrase",
      modalWidth: 340,
    },
    {
      count: 2,
      title: "Ensure the security of your seed phrase",
      modalWidth: 382,
    },
    {
      count: 3,
      title: "Your seed phrase",
      modalWidth: 380,
    },
    {
      count: 4,
      title: "Your seed phrase",
      modalWidth: 390,
    },
  ];
  const renderStep = () => {
    switch (step) {
      case 1:
        return <SeedStep1 onNext={() => setStep(step + 1)} />;
      case 2:
        return (
          <SeedStep2
            onNext={() => setStep(step + 1)}
            onClose={() => onClose()}
          />
        );
      case 3:
        return (
          <SeedStep3
            onNext={() => setStep(step + 1)}
            onClose={() => onClose()}
          />
        );
      case 4:
        return <SeedStep4 onNext={() => onClose()} onClose={() => onClose()} />;
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
      className="seed-phrase-modal"
    >
      <Flex gap={16} align="center" vertical>
        {renderStep()}
      </Flex>
    </Modal>
  );
};

export default SeedPhraseModal;
