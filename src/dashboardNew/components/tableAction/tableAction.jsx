import styles from "./tableAction.module.css";
import { useTranslation } from "react-i18next";

const TableAction = ({
  button,
  button2,
  onClick,
  onClick2,
  editUser,
  deleteUser,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.buttons}>
      {button && <div onClick={onClick}>{button}</div>}
      {button2 && <div onClick={onClick2}>{button2}</div>}
      {editUser && <div onClick={editUser}>{t("general.edit")}</div>}
      {deleteUser && (
        <div onClick={deleteUser} style={{ color: "red" }}>
          {t("general.delete")}
        </div>
      )}
    </div>
  );
};

export default TableAction;
