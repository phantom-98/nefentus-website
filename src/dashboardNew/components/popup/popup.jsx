import Button from "../button/button";
import Card from "../card/card";

import styles from "./popup.module.css";
import ReactDOM from "react-dom";

const Popup = ({
  show,
  setShow,
  children,
  onClick = () => {},
  title = "Change Value",
}) => {
  const dashboardElement = document.getElementById("dashboard");

  const handleConfirmClick = () => {
    onClick();
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div
      className={styles.popup}
      style={{ display: show ? "initial" : "none" }}
    >
      <Card className={styles.popupBox}>
        <div className={styles.title}>{title}</div>
        {children}
        <div className={styles.buttons}>
          <Button color="light" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmClick}>Confirm</Button>
        </div>
      </Card>
    </div>,
    dashboardElement,
  );
};

export default Popup;
