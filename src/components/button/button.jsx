import { Link } from "react-router-dom";
import styles from "./button.module.css";
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
  const ref = useRef();
  return (
    <button
      className={`${styles.button} ${className}`}
      onMouseOut={(e) => {
        e.target.style.color = "#f6f9fc";
        if (ref.current) {
          ref.current.style.color = "#f6f9fc";
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
            ? `1px solid #313131`
            : color === "white"
            ? "1px solid rgb(38, 38, 38)"
            : "1px solid #0784B5",
      }}
    >
      <div
        className={styles.background}
        style={{
          background:
            spinner || disabled
              ? "#313131"
              : color === "white"
              ? "rgb(38, 38, 38)"
              : "#0784B5",
        }}
      ></div>
      {link ? (
        <Link to={link}>
          <div className={`${styles.buttonText} unselectable`} ref={ref}>
            {children}
          </div>
        </Link>
      ) : (
        <div className={`${styles.buttonText} unselectable`} ref={ref}>
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
