import styles from "./input.module.css";

import dropDown from "../../assets/icon/dropdown.svg";
import AttachmentImage from "../../assets/icon/attachment.svg";
import Delete from "../../assets/icon/delete.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/themeContext/themeContext";
import WalletAddressFormatter from "../../func/walletAddressFormatter";
import CopyAddress from "../../assets/icon/copy.png";
import { MessageContext } from "../../context/message";
import DropDownIcon from "../../assets/icon/dropdown.svg";
import USD from "../../assets/icon/usd.png";
import EUR from "../../assets/icon/eur.png";

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
  showOnTop,
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
        className={`option dateOption ${styles.input} ${
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
          <div
            className={`card ${styles.body} ${showOnTop && styles.reverseOpen}`}
          >
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
  const { theme } = useTheme();

  const { t } = useTranslation();

  const [text, setText] = useState(value ? value : false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "heic"];

  function checkFileExtension(extension) {
    return allowedExtensions.includes(extension.toLowerCase());
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
      <div
        className={styles.attachment}
        style={{
          border: `1px solid ${theme == "dark" ? "#ffffff14" : "#0000001a"}`,
        }}
      >
        <img src={AttachmentImage} alt="Attachment" onClick={handleClick} />
        <p style={{ color: "#c4c4c4" }} onClick={handleClick}>
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
        accept=".jpeg, .jpg, .png, .gif, .heic"
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
  const { theme } = useTheme();
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
        style={{
          border:
            theme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }}
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
          className={`${styles.searchInput}`}
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
        <div>{WalletAddressFormatter(walletAddress)}</div>
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
  const { theme } = useTheme();
  const { setSuccessMessage } = useContext(MessageContext);

  const { t } = useTranslation();

  const handleCopy = (e, value) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setSuccessMessage(t("dashboard.cryptoCard.walletCopied"));
  };

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
          {wallet?.icon && <img src={wallet?.icon} alt="dropdown" width={36} />}
          <div className={styles.walletFieldSubContainer}>
            <div className={styles.walletName}>
              {wallet?.name
                ? wallet?.name
                : t("messages.error.accountDisconnect")}
            </div>
            <div
              className={`${styles.walletAddressSubContainer} ${styles.walletAddressField}`}
            >
              <div className={styles.walletAddress}>
                {WalletAddressFormatter(wallet?.address)}
              </div>
              <img
                src={CopyAddress}
                width={18}
                className={styles.copyAddressIcon}
                onClick={(e) => handleCopy(e, wallet?.address)}
              />
            </div>
          </div>
        </div>
        <img src={dropDown} alt="dropdown" />
        {open && options.length > 1 && (
          <div
            className={`card ${styles.walletDropdownBody}`}
            style={{ opacity: "1" }}
          >
            {options.length > 0 ? (
              options.map((item) =>
                item?.name ? (
                  <p
                    key={item.name}
                    onClick={() => setValue(item)}
                    className={styles.walletOptions}
                  >
                    <img src={item?.icon} alt="dropdown" width={36} />
                    <div>
                      <div className={styles.walletName}>{item.name}</div>
                      <div className={styles.walletAddress}>
                        {item?.address}
                      </div>
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

export const CurrencySelect = ({ selectedIndex, setSelectedIndex }) => {
  const data = [
    { title: "USD $", icon: USD, alt: "" },
    { title: "EUR $", icon: EUR, alt: "" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`${styles.currencySelect}`}
        onClick={() => setOpen((prev) => !prev)}
        // onMouseLeave={() => setOpen(false)}
      >
        <CurrencyOption
          icon={data[selectedIndex]?.icon}
          optionTitle={data[selectedIndex]?.title}
          alt={data[selectedIndex]?.alt}
          dropdown
        />
        {open && (
          <div className={styles.selectBody}>
            {data.map((item, index) => {
              return (
                <div key={index} onClick={() => setSelectedIndex(index)}>
                  <CurrencyOption
                    icon={item.icon}
                    optionTitle={item.title}
                    alt={item.alt}
                    selected={selectedIndex === index}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const CurrencyOption = ({ icon, optionTitle, alt, dropdown, selected }) => {
  return (
    <div
      className={styles.optionLineWrapper}
      style={{
        borderRadius: dropdown ? "8px" : "0",
      }}
    >
      <div className={styles.optionLine}>
        <img src={icon} className={styles.icon} alt={alt} />
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}> {optionTitle} </p>
        </div>
      </div>
      {dropdown && (
        <img src={DropDownIcon} alt="dropdown" width={12} height={12} />
      )}
      {selected && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="check">
            <path
              id="Icon"
              d="M13.3334 4L6.00008 11.3333L2.66675 8"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
