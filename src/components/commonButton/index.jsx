import React from "react";
import { Button } from "antd";
import "./commonButton.css";

const CommonButton = ({ text, className, type, onClick = () => {} }) => {
  return (
    <Button
      className={`${
        type == "primary" ? "header-signup default-text" : "header-login"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
