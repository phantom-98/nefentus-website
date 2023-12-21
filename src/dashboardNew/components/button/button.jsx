import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({
  children,
  color,
  fontSize = "1.2rem",
  width = "",
  onClick,
  link,
  style,
}) => {
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
                    : color === "gray"
                    ? "rgba(255, 255, 255, 0.08)"
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
                  : color === "gray"
                  ? "rgba(255, 255, 255, 0.08)"
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
