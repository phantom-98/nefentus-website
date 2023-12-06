import styles from "./tableStatus.module.css";

const TableStatus = ({ children, color }) => {
  return (
    <div
      className={styles.box}
      style={{
        color:
          color === "blue"
            ? "#0784B5"
            : color === "green"
            ? "#16C172"
            : color === "red"
            ? "#F24236"
            : "",
        backgroundColor:
          color === "blue"
            ? "rgba(140, 209, 234, 0.10)"
            : color === "green"
            ? "rgba(22, 193, 114, 0.10)"
            : color === "red"
            ? "rgba(242, 66, 54, 0.10)"
            : "",
      }}
    >
      {children}
    </div>
  );
};

export default TableStatus;
