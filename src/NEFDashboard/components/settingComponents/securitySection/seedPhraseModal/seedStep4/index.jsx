import React, { useState } from "react";
import { Flex, Input } from "antd";
import SeedModalFooter from "../seedModalFooter";
import ShieldIcon from "../../../../../../assets/newDashboardIcons/shield.svg";
import "./seedStep4.css";

const SeedStep4 = ({ onNext, onClose, seeds }) => {
  const [seedInputs, setSeedInputs] = useState(Array(12).fill(""));
  console.log(seedInputs);
  // const checkPhrase = (value, index) => {
  //   const copyPhrases = [...checkedSeedPhrases];
  //   copyPhrases[index] = value;
  //   setCheckedSeedPhrases(copyPhrases);
  //   return;
  // };
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
            <Flex gap={6} align="center" className="seed-step4-value-container">
              <div>{index + 1}</div>
              <Input
                value={seed}
                onChange={(e) => {
                  let updatedSeed = seedInputs;
                  updatedSeed[index] = e.target.value;
                  setSeedInputs([...updatedSeed]);
                }}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
      <SeedModalFooter onNext={onNext} onClose={onClose} />
    </>
  );
};

export default SeedStep4;
