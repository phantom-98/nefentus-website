import React from "react";
import { Button, Flex } from "antd";
import CommentIcon from "../../../../../../assets/newDashboardIcons/comment.svg";
import "./seedStep2.css";
import SeedModalFooter from "../seedModalFooter";

const SeedStep2 = ({ onNext, onClose }) => {
  return (
    <>
      <div className="seed-modal-padding">
        Your seed phrase provides full access to your wallet and funds.
      </div>
      <div className="seed-modal-padding">
        <Flex gap={8} className="seed-step2-subcontainer">
          <div className="seed-step2-comment-icon">
            <img src={CommentIcon} alt="icon" />
          </div>
          <div>
            Do not share it with anyone. Nefentus support will never ask for it,
            but phishing attackers might.
          </div>
        </Flex>
      </div>
      <SeedModalFooter onNext={onNext} onClose={onClose} />
    </>
  );
};

export default SeedStep2;
