import styles from "./input.module.css";
import { useEffect, useState } from "react";
import DropDownIcon from "../../assets/icon/dropdown.svg";
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
        <p className={`${styles.textArea}  ${dashboard ? "default-text" : ""}`}>
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

export const CountrySelect = ({
  setChanged,
  label,
  placeholder,
  options,
  value,
  setValue,
  style,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState();
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState(options);
  useEffect(() => {
    const country = getCountryList().find((item) => item.value === value);
    if (country) {
      setIcon(getFlagLink(country.symbol));
      setKeyword(country.value);
    } else {
      setIcon(null);
      setKeyword("");
    }
  }, [value]);
  return (
    <div>
      {label && <p className={styles.label}>{label}</p>}
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
            padding: "1rem",
            gap: "1rem",
            border: "1px solid var(--border-color)",
            borderRadius: "0.6rem",
            background: "var(--bg2-color)",
            cursor: "pointer",
            ...style,
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
              alt="icon"
            />
          )}
          <input
            className="custom"
            style={{
              fontSize: style.fontSize ?? "1.2rem",
              width: `calc(100% - ${value ? "6" : "2"}rem)`,
              outline: "0",
              background: "transparent",
              // fontFamily: "Axiforma, sans-serif",
              // height: "2rem",
            }}
            placeholder={value ? "" : placeholder ?? "Choose your country"}
            value={keyword}
            onChange={(e) => {
              !open && setOpen(true);
              setKeyword(e.target.value);
              setFiltered(
                options.filter((item) =>
                  item.value
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
          />
          <img src={DropDownIcon} alt="icon" />
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
              ...style,
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
                      : setKeyword(item.value);
                  }}
                  style={{
                    padding: "0.4rem",
                  }}
                >
                  <SearchSelectOption
                    icon={`${getFlagLink(item.symbol)}`}
                    text={item.value}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
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
          alt="icon"
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
