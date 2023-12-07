import { useState, useEffect } from "react";
import Button from "../button/button";
import styles from "./tableSearch.module.css";
import Close from "../../../assets/icon/close.svg";
import Search from "../../../assets/icon/search.svg";
import { useTranslation } from "react-i18next";

const TableSearch = ({
  title,
  description,
  findUser,
  setGetDataInput,
  getDataInput,
}) => {
  const { t } = useTranslation();
  const [trigger, setTrigger] = useState(false);

  const handleRemoveSearch = () => {
    setGetDataInput("");
    setTrigger(true);
  };

  useEffect(() => {
    if (trigger) {
      findUser(); // Execute findUser after the state has been updated
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <div className={styles.search}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.inputWrapper}>
          <img className={styles.inputWrapperSearch} src={Search} alt="" />
          <input
            type="text"
            onChange={(e) => setGetDataInput(e.target.value)}
            value={getDataInput}
            onKeyUp={(e) => {
              if (e.key === "Enter") findUser();
            }}
          />
          <div
            className={styles.inputCloseWrapper}
            onClick={handleRemoveSearch}
          >
            <img className={styles.inputClose} src={Close} alt="" />
          </div>
        </div>
        <Button onClick={findUser}>{t("general.search")}</Button>
      </div>
    </div>
  );
};

export default TableSearch;
