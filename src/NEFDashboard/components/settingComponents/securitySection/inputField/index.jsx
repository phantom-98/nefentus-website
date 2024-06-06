import React from "react";
import { Flex, Input } from "antd";
import "./inputField.css";

const InputField = ({ type, label, value = "", setValue = () => {} }) => {
  return (
    <div className="input-field-container">
      <div className="custom-input-field-label default-text-gray">{label}</div>
      {type == "text" ? (
        <Input
          size="large"
          className="custom-input-field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Input.Password
          size="large"
          className="custom-input-field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputField;
