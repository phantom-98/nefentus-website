import React, { useContext, useState } from "react";
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

  // const comparePhrases = () => {
  //   let checked = true;
  //   seedPhrases.forEach((phrase, index) => {
  //     if (checkedSeedPhrases[index] != phrase) checked = false;
  //   });
  //   if (!checked) {
  //     setErrorMessage(t("security.items.seedErrorMessage"));
  //     return;
  //   }
  //   setInfoMessage(t("security.items.seedInfoMessage"));
  //   setCheckedSeedPhrases(emptyArray);
  //   setAddSeedPhrases(false);
  //   clearMessages();
  // };

  const getSeedPhrases = async () => {
    const seed = await backendAPI.getSeedPhrase(password);

    if (seed) {
      console.log(seed.split(" "));
      setSeedPhrases(seed.split(" "));
      clearMessages();
      setStep(step + 1);
    } else {
      setErrorMessage(t("messages.error.passwordCorrect"));
    }
    setPassword("");
  };

  // const handleCloseSeedModal = () => {
  //   setAddSeedPhrases(false);
  //   clearMessages();
  //   setCurrentPassword("");
  //   setCheckedSeedPhrases(emptyArray);
  // };

  // const checkPhrase = (value, index) => {
  //   const copyPhrases = [...checkedSeedPhrases];
  //   copyPhrases[index] = value;
  //   setCheckedSeedPhrases(copyPhrases);
  //   return;
  // };
  const checkPassword = async () => {
    const res = await backendAPI.checkPassword(password);
    if (res) {
      // setInput(false);
      clearMessages();
      // setAddSeedPhrases("step2");
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
