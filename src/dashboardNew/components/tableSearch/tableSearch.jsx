import Button from "../button/button";
import styles from "./tableSearch.module.css";

import Search from "../../../assets/icon/search.svg";

const TableSearch = ({
  title,
  description,
  findUser,
  setGetDataInput,
  getDataInput,
}) => {
  return (
    <div className={styles.search}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.inputWrapper}>
          <img src={Search} alt="" />

          <input
            type="text"
            onChange={(e) => setGetDataInput(e.target.value)}
            value={getDataInput}
          />
        </div>
        <Button onClick={findUser}>Search</Button>
      </div>
    </div>
  );
};

export default TableSearch;
