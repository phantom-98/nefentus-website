import Button from "../button/button";
import styles from "./tableSearch.module.css";

import Search from "../../../assets/icon/search.svg";
import { useTranslation } from "react-i18next";

const TableSearch = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.search}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.inputWrapper}>
          <img src={Search} alt="" />

          <input type="text" />
        </div>
        <Button>{t("general.search")}</Button>
      </div>
    </div>
  );
};

export default TableSearch;
