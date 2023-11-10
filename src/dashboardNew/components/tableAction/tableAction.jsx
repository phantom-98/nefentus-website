import styles from "./tableAction.module.css";

const TableAction = ({
  button,
  button2,
  onClick,
  onClick2,
  editUser,
  deleteUser,
}) => {
  return (
    <div className={styles.buttons}>
      <div onClick={onClick}>{button}</div>
      <div onClick={onClick2}>{button2}</div>
      <div onClick={editUser}>Edit</div>
      <div onClick={deleteUser} style={{ color: "red" }}>
        Delete
      </div>
    </div>
  );
};

export default TableAction;
