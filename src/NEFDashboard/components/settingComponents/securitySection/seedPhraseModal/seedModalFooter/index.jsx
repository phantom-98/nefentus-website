import React from "react";
import { Button, Flex } from "antd";
import "./seedModalFooter.css";

const SeedModalFooter = ({ onNext, onClose }) => {
  return (
    <Flex align="center" justify="space-between" className="seed-phrase-footer">
      <Button className="seed-phrase-cancel" onClick={onClose}>
        Cancel
      </Button>
      <Button className="seed-phrase-continue" onClick={onNext}>
        Continue
      </Button>
    </Flex>
  );
};

export default SeedModalFooter;
