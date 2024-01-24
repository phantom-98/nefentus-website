import React from "react";
import styles from "../settingsTitle.module.css";

const SecurityPopupHeader = ({ title = "", description = "" }) => {
  return (
    <>
      <p className={styles.modalTitle}>{title}</p>
      <p className={styles.description}>{description}</p>
    </>
  );
};

export default SecurityPopupHeader;
