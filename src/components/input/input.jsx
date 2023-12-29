import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import AttachmentImage from "../../assets/icon/attachment.svg";
import Delete from "../../assets/icon/delete.svg";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Input = ({
  label,
  placeholder,
  value,
  setState,
  secure,
  disabled,
  dashboard,
  number,
  date,
  register,
  name,
  style,
  onKeyDown,
}) => {
  const handleChange = (e) => {
    if (setState) {
      setState(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const isRegistered = register !== undefined && name !== undefined;

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label}
        </p>
      )}

      <input
        className={`${styles.input} ${dashboard ? styles.dashboardInput : ""}`}
        type={secure ? "password" : number ? "number" : date ? "date" : "text"}
        placeholder={placeholder}
        {...(isRegistered ? register(name) : null)}
        value={value}
        style={style}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;

export const Options = ({
  value,
  options = [],
  setValue,
  label = "",
  dashboard,
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      {label && label.length > 0 && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label.length > 0 ? label : t("signUp.optionLabel")}
        </p>
      )}

      <div
        className={`option ${styles.input} ${
          dashboard ? styles.dashboardInput : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {
          <div
            style={{
              position: "relative",
              bottom: 0,
            }}
          >
            {value ? value : t("signUp.selectLabel")}
          </div>
        }{" "}
        <img src={dropDown} alt="dropdown" />
        {open && (
          <div className={`card ${styles.body}`}>
            {options.length > 0 ? (
              options.map((item) =>
                item.value ? (
                  <p key={item.value} onClick={() => setValue(item.value)}>
                    {item.display}
                  </p>
                ) : (
                  <p key={item} onClick={() => setValue(item)}>
                    {item}
                  </p>
                ),
              )
            ) : (
              <>
                <p key={"vendor"} onClick={() => setValue("Vendor")}>
                  {t("signUp.option1")}
                </p>
                <p key={"affiliate"} onClick={() => setValue("Affiliate")}>
                  {t("signUp.option2")}
                </p>
                <p
                  key={"vendoraffiliate"}
                  onClick={() => setValue("Vendor / Affiliate")}
                >
                  {t("signUp.option1")} / {t("signUp.option2")}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const Textarea = ({
  label,
  placeholder,
  value,
  setState,
  disabled,
  dashboard,
  rows = 5,
}) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className={styles.textareaWrapper}>
      {label && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label}
        </p>
      )}

      <textarea
        className={`${styles.textarea} ${
          dashboard ? styles.dashboardTextarea : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
};

export const Attachment = ({ label, onUpload, onDelete, value, dashboard }) => {
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const [text, setText] = useState(value ? value : false);

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
    let extension = fileName.split(".").pop();
    console.log(extension);
    if (checkFileExtension(extension)) {
      setText(fileName);
      onUpload(file);
    } else {
      //todo throw new Error maybe with toast!
    }
  };

  return (
    <div className={styles.attachmentWrapper}>
      {label && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label}
        </p>
      )}
      <div className={styles.attachment}>
        <img src={AttachmentImage} alt="Attachment" onClick={handleClick} />
        <p style={{ color: text ? "#fff" : "#c4c4c4" }} onClick={handleClick}>
          {text ? text : t("products.createProductModal.attach")}
        </p>
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
      <input
        ref={inputRef}
        className={styles.hideInput}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export const SearchOptions = ({
  value,
  options = [],
  setValue,
  label = "",
  dashboard,
  placeholder = "",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  const { t } = useTranslation();

  const filteredOptions = options.filter((item) =>
    item.display.toLowerCase().includes(selected.toLowerCase()),
  );

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      {label.length > 0 && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label.length > 0 ? label : t("signUp.optionLabel")}
        </p>
      )}

      <div
        className={`option ${styles.input} ${
          dashboard ? styles.dashboardInput : styles.select
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder={placeholder}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setValue(e.target.value);
          }}
          className={`option ${styles.searchInput}`}
        />{" "}
        <img src={dropDown} alt="" />
        {open && (
          <div className={`card ${styles.body} ${styles.select}`}>
            {filteredOptions.map((item) => (
              <p
                onClick={() => {
                  setSelected(item.value);
                  setValue(item.value);
                }}
                key={item.value}
              >
                {item.display}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const WalletField = ({
  value,
  icon,
  label = "",
  walletAddress,
  dashboard,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      {label && label.length > 0 && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label.length > 0 ? label : t("signUp.optionLabel")}
        </p>
      )}

      <div
        className={`option ${styles.input} ${
          dashboard ? styles.dashboardInput : ""
        } ${styles.walleField}`}
      >
        {icon && <img src={icon} alt="dropdown" width={24} />}

        <div
          style={{
            position: "relative",
            bottom: 0,
            lineHeight: "25px",
          }}
        >
          {value ? value : t("messages.error.accountDisconnect")}
        </div>
        <div>
          {walletAddress?.length
            ? `${walletAddress.slice(0, 6)} .... ${walletAddress.slice(-4)}`
            : ""}
        </div>
      </div>
    </div>
  );
};

export const OptionsWithImage = ({
  options = [],
  setValue,
  label = "",
  dashboard,
  wallet,
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      {label && label.length > 0 && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          }`}
        >
          {label.length > 0 ? label : t("signUp.optionLabel")}
        </p>
      )}

      <div
        className={`option ${styles.input} ${
          dashboard ? styles.dashboardInput : ""
        } ${styles.walleField} ${
          options.length <= 1 ? styles.dropdownDisable : ""
        }`}
        // style={{cursor: options.length <= 1 && "not-allowed"}}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={`${styles.walleField}`}>
          {wallet?.icon && <img src={wallet?.icon} alt="dropdown" width={24} />}

          <div
            style={{
              position: "relative",
              bottom: 0,
              lineHeight: "25px",
            }}
          >
            {wallet?.name
              ? wallet?.name
              : t("messages.error.accountDisconnect")}
          </div>
          <div>
            {wallet?.address?.length
              ? `${wallet?.address?.slice(0, 6)} .... ${wallet?.address?.slice(
                  -4,
                )}`
              : ""}
          </div>
        </div>
        <img src={dropDown} alt="dropdown" />
        {open && options.length > 1 && (
          <div className={`card ${styles.body}`}>
            {options.length > 0 ? (
              options.map((item) =>
                item?.name ? (
                  <p
                    key={item.name}
                    onClick={() => setValue(item)}
                    className={styles.walletOptions}
                  >
                    <img src={item?.icon} alt="dropdown" width={24} />
                    <div
                      style={{
                        position: "relative",
                        bottom: 0,
                        lineHeight: "25px",
                      }}
                    >
                      {item.name}
                    </div>
                    <div>
                      {item?.address?.length
                        ? `${item?.address?.slice(
                            0,
                            6,
                          )} .... ${item?.address?.slice(-4)}`
                        : ""}
                    </div>
                  </p>
                ) : (
                  <p key={item} onClick={() => setValue(item)}>
                    {item}
                  </p>
                ),
              )
            ) : (
              <>
                <p key={"vendor"} onClick={() => setValue("Vendor")}>
                  {t("signUp.option1")}
                </p>
                <p key={"affiliate"} onClick={() => setValue("Affiliate")}>
                  {t("signUp.option2")}
                </p>
                <p
                  key={"vendoraffiliate"}
                  onClick={() => setValue("Vendor / Affiliate")}
                >
                  {t("signUp.option1")} / {t("signUp.option2")}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
