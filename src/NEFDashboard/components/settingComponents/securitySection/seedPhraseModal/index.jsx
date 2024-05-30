import React, { useContext, useEffect, useState } from "react";
import { Flex, Modal } from "antd";
import SeedStep1 from "./seedStep1";
import SeedStep2 from "./seedStep2";
import SeedStep3 from "./seedStep3";
import SeedStep4 from "./seedStep4";
import { MessageContext } from "../../../../../context/message";
import backend_API from "../../../../../api/backendAPI";
import "./seedPhraseModal.css";
import { useTranslation } from "react-i18next";

const SeedPhraseModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { setErrorMessage, clearMessages } = useContext(MessageContext);
  const backendAPI = new backend_API();
  const [step, setStep] = useState(1);
  const [seedPhrases, setSeedPhrases] = useState([]);
  const [password, setPassword] = useState("");
  const [internalWallet, setInternalWallet] = useState({});

  useEffect(() => {
    fetchInternalWallet();
  }, []);

  const fetchInternalWallet = async () => {
    const response = await backendAPI.getWalletAddresses();
    if (response?.length)
      setInternalWallet(response?.find((wallet) => wallet?.internal));
  };

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

  const getSeedPhrases = async () => {
    const seed = await backendAPI.getSeedPhrase(password);

    if (seed) {
      setSeedPhrases(seed.split(" "));
      clearMessages();
      setStep(step + 1);
    } else {
      setErrorMessage(t("messages.error.passwordCorrect"));
    }
    setPassword("");
  };

  const checkPassword = async () => {
    const res = await backendAPI.checkPassword(password);
    if (res) {
      clearMessages();
      setStep(step + 1);
    } else {
      setErrorMessage(t("messages.error.passwordCorrect"));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SeedStep1
            onNext={() => checkPassword()}
            password={password}
            setPassword={setPassword}
            wallet={internalWallet}
          />
        );
      case 2:
        return (
          <SeedStep2
            onNext={() => getSeedPhrases()}
            onClose={() => onClose()}
          />
        );
      case 3:
        return (
          <SeedStep3
            onNext={() => setStep(step + 1)}
            onClose={() => onClose()}
            seeds={seedPhrases}
          />
        );
      case 4:
        return <SeedStep4 onClose={() => onClose()} seeds={seedPhrases} />;
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
