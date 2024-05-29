import React from "react";
import { Button, Flex } from "antd";
import SeedModalFooter from "../seedModalFooter";
import ListLockIcon from "../../../../../../assets/newDashboardIcons/list-lock.svg";
import CopyIcon from "../../../../../../assets/newDashboardIcons/copy-gray.svg";
import "./seedStep3.css";

const SeedStep3 = ({ onNext, onClose }) => {
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
        <Flex gap={8} align="stretch" className="seed-step3-description">
          <div className="seed-list-icon">
            <img src={ListLockIcon} alt="icon" />
          </div>
          <div className="default-text">
            Write down or copy these words in the right order and save them
            somewhere safe
          </div>
        </Flex>
        <Flex gap={8} wrap>
          {seeds?.map((seed, index) => (
            <Flex gap={6} align="center" className="seed-value-container">
              <div>{index + 1}</div>
              <div>{seed}</div>
            </Flex>
          ))}
        </Flex>
        <Flex
          gap={4}
          align="center"
          justify="center"
          className="default-text seed-step3-copy"
        >
          <div>Copy to Clipboard</div>
          <div>
            <img src={CopyIcon} alt="icon" />
          </div>
        </Flex>
      </Flex>
      <SeedModalFooter onNext={onNext} onClose={onClose} />
    </>
  );
};

export default SeedStep3;
