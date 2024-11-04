import React from "react";
import { Button } from "antd";
import "./commonButton.css";

const CommonButton = ({
  key = "",
  text,
  className,
  type,
  onClick = () => {},
}) => {
  return (
    <Button
      key={key}
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
