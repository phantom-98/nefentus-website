import React from "react";
import { Flex, Input } from "antd";
import "./inputField.css";

const InputField = ({ type, label }) => {
  return (
    <div className="input-field-container">
      <div className="custom-input-field-label default-text-gray">{label}</div>
      {type == "text" ? (
        <Input size="large" className="custom-input-field" />
      ) : (
        <Input.Password size="large" className="custom-input-field" />
      )}
    </div>
  );
};

export default InputField;
