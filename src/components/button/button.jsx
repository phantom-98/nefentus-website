import { Link } from "react-router-dom";
import styles from "./button.module.css";
import { useTheme } from "../../context/themeContext/themeContext";

const Button = ({
  children,
  type = "button",
  className,
  color,
  link,
  onClick,
  style,
  disabled,
}) => {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
      style={{
        ...style,
        border: disabled
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
          background: disabled
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
            style={{ color: theme == "dark" ? "" : "#111111" }}
          >
            {children}
          </div>
        </Link>
      ) : (
        <div
          className={`${styles.buttonText} unselectable`}
          style={{ color: theme == "dark" ? "" : "#111111" }}
        >
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
