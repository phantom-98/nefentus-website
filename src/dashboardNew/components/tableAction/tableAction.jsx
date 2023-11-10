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
      {button && <div onClick={onClick}>{button}</div>}
      {button2 && <div onClick={onClick2}>{button2}</div>}
      {editUser && <div onClick={editUser}>Edit</div>}
      {deleteUser && (
        <div onClick={deleteUser} style={{ color: "red" }}>
          Delete
        </div>
      )}
    </div>
  );
};

export default TableAction;
