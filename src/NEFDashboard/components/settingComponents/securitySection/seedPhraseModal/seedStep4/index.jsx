import React, { useContext, useState } from "react";
import { Flex, Input } from "antd";
import SeedModalFooter from "../seedModalFooter";
import ShieldIcon from "../../../../../../assets/newDashboardIcons/shield.svg";
import "./seedStep4.css";
import { MessageContext } from "../../../../../../context/message";
import { useTranslation } from "react-i18next";

const SeedStep4 = ({ onClose, seeds }) => {
  const { setErrorMessage, setInfoMessage, clearMessages } =
    useContext(MessageContext);
  const { t } = useTranslation();
  const [seedInputs, setSeedInputs] = useState(
    Array(12).fill({ value: "", status: "" }),
  );
  const compareSeedPhrases = () => {
    if (seedInputs?.some((seed) => seed?.status == "error")) {
      setErrorMessage(t("security.items.seedErrorMessage"));
      return;
    }
    setInfoMessage(t("security.items.seedInfoMessage"));
    clearMessages();
    onClose();
  };

  const checkPhrase = () => {
    setSeedInputs(
      seedInputs?.map((seedData, index) => {
        if (seedData?.value !== seeds[index] && seedData?.value != "")
          return { ...seedData, status: "error" };
        else return { ...seedData, status: "" };
      }),
    );
  };

  const updateSeeds = (value, index) => {
    let updatedSeed = [...seedInputs];
    updatedSeed[index] = { ...seedInputs[index], value: value };
    setSeedInputs([...updatedSeed]);
  };

  return (
    <>
      <Flex vertical gap={16} className="seed-modal-padding">
        <Flex gap={8} align="stretch" className="seed-step4-description">
          <div className="seed-step4-list-icon">
            <img src={ShieldIcon} alt="icon" />
          </div>
          <div className="default-text">
            Enter seed phrase to verify that you have saved it. You should store
            the seed phrase safe
          </div>
        </Flex>
        <Flex gap={8} wrap>
          {seedInputs?.map((seed, index) => (
            <Flex
              gap={6}
              align="center"
              className={`${
                seed?.status == "error" ? "seed-error-container" : ""
              } seed-step4-value-container`}
            >
              <div>{index + 1}</div>
              <Input
                value={seed?.value}
                onChange={(e) => updateSeeds(e.target.value, index)}
                onBlur={checkPhrase}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <SeedModalFooter onNext={compareSeedPhrases} onClose={onClose} />
    </>
  );
};

export default SeedStep4;
