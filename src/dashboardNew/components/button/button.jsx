import styles from "./button.module.css";

const Button = ({ children, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={styles.button}
      style={{
        width: color === "gray" ? "7rem" : "",
        border: color === "gray" ? "1px solid rgba(255, 255, 255, 0.2)" : "",
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
              : "#3E61E7",
        }}
      ></div>
      <div
        style={{
          fontSize: color === "gray" ? "1rem" : "",
        }}
        className={styles.text}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
