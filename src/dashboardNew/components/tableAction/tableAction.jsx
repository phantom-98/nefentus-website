import styles from "./tableAction.module.css";

const TableAction = ({ button, button2, onClick, onClick2 }) => {
  return (
    <div className={styles.buttons}>
      <div onClick={onClick}>{button}</div>
      <div onClick={onClick2}>{button2}</div>
    </div>
  );
};

export default TableAction;
