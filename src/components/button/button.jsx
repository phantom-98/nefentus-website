import { Link } from "react-router-dom";
import styles from "./button.module.css";
import { useTheme } from "../../context/themeContext/themeContext";
import { useRef } from "react";

const Button = ({
  children,
  type = "button",
  className,
  color,
  link,
  onClick,
  style,
  disabled,
  spinner,
}) => {
  const { theme } = useTheme();
  const ref = useRef();
  return (
    <button
      className={`${styles.button} ${className}`}
      onMouseOver={(e) => {
        if (theme == "light") {
          e.target.style.color = "#111111";
        }
      }}
      onMouseOut={(e) => {
        if ((spinner || disabled || color == "white") && theme == "light") {
          e.target.style.color = "#111111";
          if (ref.current) {
            ref.current.style.color = "#111111";
          }
        } else {
          e.target.style.color = "#f6f9fc";
          if (ref.current) {
            ref.current.style.color = "#f6f9fc";
          }
        }
      }}
      onClick={() => {
        if (spinner) return;
        if (onClick && typeof onClick === "function") {
          onClick();
        }
      }}
      type={type}
      style={{
        ...style,
        border:
          spinner || disabled
            ? `1px solid ${theme == "dark" ? "#313131" : "#bababa"}`
            : color === "white"
            ? theme == "dark"
              ? "1px solid rgb(38, 38, 38)"
              : "1px solid rgb(200, 200, 200)"
            : "1px solid #0784B5",
        backgroundColor: theme == "dark" ? "" : "#dadada",
      }}
    >
      <div
        className={styles.background}
        style={{
          background:
            spinner || disabled
              ? theme == "dark"
                ? "#313131"
                : "#ffffffd0"
              : color === "white"
              ? theme == "dark"
                ? "rgb(38, 38, 38)"
                : "#e9e9e9"
              : "#0784B5",
        }}
      ></div>
      {link ? (
        <Link to={link}>
          <div
            className={`${styles.buttonText} unselectable`}
            style={{
              color:
                theme == "dark"
                  ? ""
                  : color == "white" || spinner || disabled
                  ? "#111111"
                  : "#f6f9fc",
            }}
            ref={ref}
          >
            {children}
          </div>
        </Link>
      ) : (
        <div
          className={`${styles.buttonText} unselectable`}
          style={{
            color:
              theme == "dark"
                ? ""
                : color == "white" || spinner || disabled
                ? "#111111"
                : "#f6f9fc",
          }}
          ref={ref}
        >
          <div
            style={{ display: spinner ? "inline-block" : "none" }}
            className={styles.spinner}
          ></div>
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
