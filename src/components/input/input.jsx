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
import ImageplusDark from "../../assets/icon/dark/image-plus.svg";
import imageDropIcon from "../../assets/icon/light/imageDropIcon.svg";
import ImageplusLight from "../../assets/icon/light/image-plus.svg";
import CheckedIcon from "../../assets/icon/checked.svg";
import USD from "../../assets/icon/usd.png";
import EUR from "../../assets/icon/eur.png";
import { symbol } from "zod";
import { getCountryList, getFlagLink } from "../../countries";

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
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (value) {
      const d = options.find((item) => item.value && value === item.value);
      d && setDisplay(d.display);
    }
  }, [value]);

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
            {display ? display : value ? value : t("signUp.selectLabel")}
          </div>
        }{" "}
        <img src={dropDown} alt="dropdown" />
        {open && (
          <div
            className={`card ${styles.body} ${showOnTop && styles.reverseOpen}`}
          >
            {options?.length > 0 &&
              options.map((item) =>
                item.value ? (
                  <p
                    key={item.value}
                    onClick={() => {
                      setValue(item.value);
                      setDisplay && setDisplay(item.display);
                    }}
                  >
                    {item.display}
                  </p>
                ) : (
                  <p key={item} onClick={() => setValue(item)}>
                    {item}
                  </p>
                ),
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
  createInvoice,
}) => {
  const handleChange = (e) => {
    e.target.value.length <= 5000 && setState(e.target.value);
  };

  return (
    <div className={styles.textareaWrapper}>
      {label && (
        <p
          className={`${styles.label} ${
            dashboard ? styles.dashboardLabel : ""
          } default-text`}
        >
          {label}
        </p>
      )}

      <textarea
        className={`${styles.textarea} ${
          dashboard ? styles.dashboardTextarea : ""
        }`}
        style={{
          resize: "vertical",
          background: createInvoice ? "var(--BG2, #171717)" : "",
        }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
      />
      <div>{value.length}/5000</div>
    </div>
  );
};

export const Attachment = ({ label, onUpload, onDelete, value, dashboard }) => {
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const [base64, setBase64] = useState();
  useEffect(() => {
    if (!value) {
      setBase64(null);
    } else if (typeof value === "string") {
      setBase64(value);
    } else if (value instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setBase64(reader.result);
      });
      reader.readAsDataURL(value);
    }
  }, [value]);

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
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setBase64(reader.result);
    });
    reader.readAsDataURL(file);
    let extension = fileName.split(".").pop();
    // console.log(extension);
    if (checkFileExtension(extension)) {
      // setText(fileName);
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
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          border: base64 ? "none" : "2px dashed  var(--Dark, #202020)",
          background: "var(--BG2, #171717)",
          borderRadius: "6px",
          overflow: "hidden",
          height: "167px",
          cursor: "pointer",
        }}
        className={styles.dragDropImage}
      >
        {base64 ? (
          <img
            src={base64}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "6px",
                border: "1px solid var(--Dark, #202020)",
                background: "var(--Dark, #202020)",
                boxShadow:
                  " 0px 191px 53px 0px rgba(0, 0, 0, 0.00), 0px 122px 49px 0px rgba(0, 0, 0, 0.01), 0px 69px 41px 0px rgba(0, 0, 0, 0.02), 0px 30px 30px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <img src={imageDropIcon} alt="Attachment" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <p style={{ color: "#E9E9E9" }}>
                {t("products.createProductModal.attach")}
                <span
                  style={{
                    color: "var(--Blue, var(--light-grey, #078BB9))",
                  }}
                >
                  {t("products.createProductModal.browseLink")}
                </span>
              </p>
              <p style={{ color: "#b1b1b1" }}>
                {t("products.createProductModal.imageType")}
              </p>
            </div>
            {/* <img
              src={Delete}
              alt="Delete attachment"
              onClick={() => {
                onDelete();
                setText(null);
              }}
              className={styles.deleteLogo}
            /> */}
          </div>
        )}
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
    item?.display?.toLowerCase()?.includes(selected.toLowerCase()),
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
            {options?.length > 0 &&
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
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CurrencySelectWithLabel = ({ label, value, setValue }) => {
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
      <CurrencySelect value={value} setValue={setValue} dashboard={true} />
    </div>
  );
};

export const CurrencySelect = ({ value, setValue, dashboard }) => {
  const data = [
    { title: "USD $", icon: "US", symbol: "USD", alt: "" },
    { title: "EUR €", icon: "EU", symbol: "EUR", alt: "" },
    { title: "AED د.إ", icon: "AE", symbol: "AED", alt: "" },
    { title: "UAH ₴", icon: "UA", symbol: "UAH", alt: "" },
    { title: "CHF", icon: "CH", symbol: "CHF", alt: "" },
  ];
  const [selectedIndex, setSelectedIndex] = useState();
  useEffect(() => {
    setSelectedIndex(data.findIndex((item) => item.symbol === value) ?? 0);
  }, [value]);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`${styles.currencySelect}`}
        style={{
          borderRadius: dashboard ? "6px" : "",
          width: dashboard ? "100%" : "",
          height: dashboard ? "40px" : "",
        }}
        onClick={() => setOpen((prev) => !prev)}
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
      >
        <CurrencyOption
          icon={data[selectedIndex]?.icon}
          optionTitle={data[selectedIndex]?.title}
          alt={data[selectedIndex]?.alt}
          dashboard={dashboard}
          dropdown
        />
        {open && (
          <div
            className={`${styles.selectBody}`}
            style={{
              borderRadius: dashboard ? "1rem" : "",
              width: dashboard ? "100%" : "",
            }}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    setValue && setValue(data[index].symbol);
                  }}
                  style={{
                    background: dashboard ? "var(--bg2-color)" : "",
                  }}
                >
                  <CurrencyOption
                    icon={item.icon}
                    optionTitle={item.title}
                    alt={item.alt}
                    selected={selectedIndex === index}
                    dashboard={dashboard}
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

const CurrencyOption = ({
  icon,
  optionTitle,
  alt,
  dropdown,
  selected,
  dashboard,
}) => {
  return (
    <div
      className={styles.optionLineWrapper}
      style={{
        borderRadius: dropDown ? (dashboard ? "6px" : "3px") : "0",
        padding: dashboard ? "8px 6px 8px 12px" : "",
        backgroundColor: dashboard ? "#171717" : "",
      }}
    >
      <div className={styles.optionLine}>
        <img
          src={getFlagLink(icon)}
          className={styles.icon}
          alt={alt}
          style={{
            // width: dashboard ? "2.3rem" : "",
            width: "22px",
            height: "16px!important",
            objectFit: "cover",
            borderRadius: "2px",
          }}
        />
        <p
          className={styles.optionTitle}
          style={{
            fontSize: dashboard ? "1.2rem" : "",
            lineHeight: dashboard ? "1.5rem" : "",
            marginTop: dashboard ? "0" : "",
            paddingTop: dashboard ? "0" : "",
          }}
        >
          {" "}
          {optionTitle}{" "}
        </p>
      </div>
      {dropdown && (
        <img
          src={DropDownIcon}
          alt="dropdown"
          width={dashboard ? 16 : 8}
          height={dashboard ? 8 : 4}
        />
      )}
      {selected && (
        <img
          className={styles.icon}
          src={CheckedIcon}
          alt="checked"
          width={16}
          height={11}
        />
      )}
    </div>
  );
};

export const RadioOption = ({
  label,
  icon,
  content,
  value,
  onClick,
  horizon,
  style,
  createInvoice,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        border: `1px solid ${value ? "#28C8F0" : "var(--Dark, #202020)"}`,
        borderRadius: "6px",
        padding: "8px",
        background: "var(--BG2, #171717)",
        cursor: "pointer",
        alignItems: horizon ? "center" : "start",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: "14px",
          display: "flex",
          flexDirection: horizon ? "row" : "column",
          alignItems: horizon ? "center" : "start",
          gap: "1rem",
          color: value ? "var(--text-color)" : "var(--text2-color)",
        }}
      >
        {icon && <img src={icon} style={{ width: "2.25rem" }} />}
        {label && <p>{label}</p>}
        <p style={{ fontSize: "14px" }}>{content}</p>
      </div>
      <div
        style={{
          width: "1.4rem",
          height: "1.4rem",
          padding: "1px",
          border: `1px solid ${value ? "#28C8F0" : "var(--Dark)"}`,
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            background: `${value ? "#28C8F0" : "none"}`,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    </div>
  );
};

export const Spinner = ({
  label,
  value,
  setValue,
  disabled,
  dashboard,
  isDrawer,
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        className={styles.spinner}
        style={{
          padding:
            dashboard && isDrawer ? "10.2px 12px;" : dashboard ? "0.8rem" : "",
          background: dashboard && !disabled ? "var(--BG2, #171717)" : "",
          width: dashboard ? "100%" : "",
          opacity: disabled ? "50%" : "100%",
          justifyContent: dashboard ? "space-between" : "flex-start",
          border: dashboard ? "1px solid var(--Dark, #202020)" : "",
          borderRadius: "6px",
        }}
      >
        <div
          onClick={() => {
            const updatedValue = value ? parseInt(value) - 1 : 0;
            !disabled && value > 1 && setValue(updatedValue);
          }}
        >
          -
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const updatedValue = e.target.value
              ? parseInt(e.target.value) + 1
              : 0;
            !disabled && setValue(updatedValue);
          }}
        />
        <div
          onClick={() => {
            const updatedValue = value ? parseInt(value) + 1 : 1;
            !disabled && setValue(updatedValue);
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export const RadioSelect = ({
  label,
  value,
  setValue,
  options,
  createInvoice,
}) => {
  return (
    <div className={styles.inputWrapper} style={{ width: "100%" }}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        style={{
          display: "flex",
          gap: "6px",
        }}
      >
        {options.map((option, index) => {
          return (
            <RadioOption
              createInvoice={createInvoice ? true : false}
              label={option.label}
              content={option.content}
              value={value == option.value}
              onClick={() => setValue(option.value)}
              style={{
                width: `${100 / options.length}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const CombinedInput = ({
  country,
  setCountry,
  value,
  setValue,
  setChanged,
  dashboard,
  createInvoice,
}) => {
  const { t } = useTranslation();
  const handleChange = () => {
    if (setChanged) {
      setChanged(true);
    }
  };

  return (
    <div className={styles.inputWrapper} style={{ width: "100%" }}>
      <p className={styles.label}>{t("payments.address").concat("*")}</p>

      <div
        style={{
          padding: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          borderRadius: "0.6rem",
          background: dashboard
            ? "var(--bg2-color)"
            : createInvoice
            ? "var(--BG2, #171717)"
            : "var(--card-color)",
        }}
      >
        <CountrySelect
          // setChanged={setChanged}
          value={country}
          setValue={setCountry}
          options={getCountryList()}
          styles={{
            borderBottom: "none",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            background: dashboard
              ? "var(--bg2-color)"
              : createInvoice
              ? "var(--BG2, #171717)"
              : "var(--card-color)",
          }}
        />
        <input
          className={`${styles.input} ${
            dashboard ? styles.dashboardInput : styles.checkoutInput
          }`}
          style={{
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            backgroundColor: createInvoice ? "var(--BG2, #171717)" : "",
          }}
          placeholder={t("payments.addressHint")}
          value={value}
          onChange={(e) => {
            if (setValue) {
              setValue(e.target.value);
            }
          }}
          onBlur={(e) => {
            handleChange();
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleChange();
            }
          }}
        />
      </div>
    </div>
  );
};

export const CountrySelect = ({
  setChanged,
  options,
  value,
  setValue,
  styles,
  className,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState();
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState(options);
  useEffect(() => {
    const country = getCountryList().find((item) => item.value === value);
    if (country) {
      setIcon(getFlagLink(country.symbol));
      setKeyword(t(country.display));
    } else {
      setIcon(null);
      setKeyword("");
    }
  }, [value]);
  return (
    <>
      <div
        style={{
          padding: "0",
          width: "100%",
          position: "relative",
        }}
        onClick={() => setOpen(!open)}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 1rem",
            gap: "1rem",
            border: "1px solid var(--border-color)",
            borderRadius: "0.6rem",
            background: "var(--bg2-color)",
            cursor: "pointer",
            ...styles,
          }}
          className={`${className}`}
        >
          {value && icon && (
            <img
              src={icon}
              style={{
                borderRadius: "0.3rem",
                width: "3rem",
                height: "2rem",
              }}
            />
          )}
          <input
            className="custom"
            style={{
              fontSize: "1.2rem",
              width: `calc(100% - ${value ? "6" : "2"}rem)`,
              outline: "0",
              background: "transparent",
              height: "2rem",
            }}
            placeholder={value ? "" : t("countries.choose")}
            value={keyword}
            onChange={(e) => {
              !open && setOpen(true);
              setKeyword(e.target.value);
              setFiltered(
                options.filter((item) =>
                  t(item.display)
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
          />
          <img src={DropDownIcon} />
        </div>
        {open && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              maxHeight: "30rem",
              overflow: "auto",
              background: "var(--bg2-color)",
              border: "1px solid var(--border-color)",
              zIndex: "10",
              ...styles,
            }}
          >
            {filtered.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setValue(item.value);
                    item.value !== value
                      ? setChanged && setChanged(true)
                      : setKeyword(t(item.display));
                  }}
                  style={{
                    padding: "0.4rem",
                  }}
                >
                  <SearchSelectOption
                    icon={`${getFlagLink(item.symbol)}`}
                    text={t(item.display)}
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

const SearchSelectOption = ({ icon, text, styles, className }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0.2rem 1rem",
        gap: "1.4rem",
        cursor: "pointer",
        ...styles,
      }}
      className={className}
    >
      {icon && (
        <img
          src={icon}
          style={{
            borderRadius: "0.3rem",
            width: "3rem",
            height: "2rem",
          }}
        />
      )}
      {text && (
        <p
          style={{
            marginTop: "0.4rem",
            fontSize: "1.2rem",
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
};
