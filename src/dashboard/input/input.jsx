import styles from "./input.module.css";
import Delete from "../../assets/icon/delete.svg";

import AttachmentImage from "../../assets/icon/attachment.svg";
import React, { useEffect, useRef, useState } from "react";

const Input = ({
  label,
  placeholder,
  type = "text",
  setState,
  value,
  disabled,
  options,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.input}>
      <p>{label}</p>

      {type === "radio" ? (
        <div className={styles["radio-group"]}>
          {options.map((option) => (
            <div key={option.value} className={styles["radio"]}>
              <input
                type="radio"
                id={`${label} - ${option.name}`}
                name={label}
                value={option.value}
                onChange={handleChange}
                checked={value === option.value}
              />
              <label htmlFor={`${label} - ${option.name}`}>{option.name}</label>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <input
          type={type}
          name=""
          id=""
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled === true}
        />
      )}
    </div>
  );
};

export default Input;

export const RawInput = ({
  placeholder,
  type = "text",
  setState,
  value,
  disabled,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={`${styles.input} ${styles.inputRaw}`}>
      <input
        type={type}
        name=""
        id=""
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled === true}
      />
    </div>
  );
};

export const Attachment = ({ label, onUpload, onDelete, value }) => {
  const inputRef = useRef(null);

  const [text, setText] = useState(false);

  useEffect(() => {
    if (value) setText(value);
  }, [value]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const allowedExtensions = ["jpg", "jpeg", "png", "JPG", "PNG", "JPEG"];

  function checkFileExtension(extension) {
    return allowedExtensions.includes(extension);
  }

  const handleChange = () => {
    const file = inputRef.current.files[0];
    const fileName = inputRef.current.value.split("\\").pop();
    var extension = fileName.split(".").pop();
    console.log(extension);
    if (checkFileExtension(extension)) {
      setText(fileName);
      onUpload(file);
    } else {
      //todo throw new Error maybe with toast!
    }
  };

  return (
    <>
      <div className={styles.input}>
        <p>{label}</p>
        <div className={styles.attachment}>
          <div className={styles.left} onClick={handleClick}>
            <img src={AttachmentImage} alt="" />
            <p style={{ color: text ? "#fff" : "#c4c4c4" }}>
              {text ? text : "Add attachment"}
            </p>
          </div>
          <img
            src={Delete}
            alt="Delete attachment"
            onClick={() => {
              onDelete();
              setText(null);
            }}
            className={styles.deleteLogo}
          />
        </div>
      </div>
      <input
        ref={inputRef}
        className={styles.hideInput}
        type="file"
        onChange={handleChange}
      />
    </>
  );
};

export const Switcher = ({ title, checked, setChecked }) => {
  return (
    <div className={`${styles.input} ${styles.inputAuthentificator} `}>
      <p>{title}</p>
      <div className={styles.inputSwitcher}>
        <label className={styles.switch}>
          <input
            checked={checked}
            onChange={() => setChecked(!checked)}
            type="checkbox"
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </div>
  );
};

export const OneTimeCodeInput = ({ setOTPCode, resetCodeFlag, request }) => {
  const inputRefs = Array(6)
    .fill()
    .map(() => useRef(null));
  const [code, setCode] = useState(Array(6).fill(""));

  useEffect(() => {
    if (resetCodeFlag) {
      setCode(Array(6).fill(""));
      inputRefs[0].current.focus();
    }
  }, [resetCodeFlag]);

  const handleCodeChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 6 - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    if (value === "" && index > 0) {
      inputRefs[index].current.focus();
    }

    if (newCode[index + 1] && newCode[index - 1] && value === "") {
      inputRefs[index].current.focus();
    }

    if (index === 0 && value.length === 6) {
      setCode(value.split(""));
      newCode = value.split("");
    }

    if (!newCode.includes("")) {
      setOTPCode(newCode.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      request();
    }
  };

  return (
    <div className={styles.OTPInputWrap}>
      {code.map((value, index) =>
        index === 0 ? (
          <input
            className={styles.OTPInput}
            key={index}
            type="text"
            value={value}
            ref={inputRefs[index]}
            onChange={(e) => handleCodeChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onKeyPress={handleEnterKeyPress}
          />
        ) : (
          <input
            className={styles.OTPInput}
            key={index}
            type="text"
            value={value}
            ref={inputRefs[index]}
            onChange={(e) => handleCodeChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            onKeyPress={handleEnterKeyPress}
          />
        ),
      )}
    </div>
  );
};
