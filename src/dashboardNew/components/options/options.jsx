import styles from "./options.module.css";

import dropDown from "../../../assets/icon/dropdown.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Options = ({ value, options = [], setValue }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={`${styles.inputWrapper} ${styles.option}`}>
      <div
        className={`option ${styles.input}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value} <img src={dropDown} alt="dropdown" />
        {open && (
          <div className={`card ${styles.body}`}>
            {options.map((item) => (
              <p key={item} onClick={() => setValue(item)}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Options;
