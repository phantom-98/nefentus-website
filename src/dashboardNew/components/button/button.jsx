import { Link } from "react-router-dom";
import styles from "./button.module.css";
import { useTheme } from "../../../context/themeContext/themeContext";

const Button = ({
  children,
  color,
  fontSize = "1.2rem",
  width = "",
  onClick,
  link,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <>
      {link ? (
        <Link to={link}>
          <div
            onClick={onClick}
            className={styles.button}
            style={{
              border:
                color === "gray" ? "1px solid rgba(255, 255, 255, 0.2)" : "",
              width: width,
              ...style,
            }}
          >
            <div
              className={styles.background}
              style={{
                backgroundColor:
                  color === "light"
                    ? "#222836"
                    : color === "gray" && theme === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : color === "gray" && theme !== "dark"
                    ? "rgba(255, 255, 255, 0.8)"
                    : color === "green"
                    ? "#16c172"
                    : "#0784B5",
              }}
            ></div>
            <div
              style={{
                fontSize: fontSize,
              }}
              className={styles.text}
            >
              {children}
            </div>
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={styles.button}
          style={{
            border:
              color === "gray" && theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : color === "gray" && theme !== "dark"
                ? "1px solid rgba(0, 0, 0, 0.2)"
                : "",
            width: width,
            ...style,
          }}
        >
          <div
            className={styles.background}
            style={{
              backgroundColor:
                color === "light"
                  ? "#222836"
                  : color === "gray" && theme === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : color === "gray" && theme !== "dark"
                  ? "rgba(255, 255, 255, 0.8)"
                  : color === "green"
                  ? "#16c172"
                  : "#0784B5",
            }}
          ></div>
          <div
            style={{
              fontSize: fontSize,
            }}
            className={styles.text}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Button;
