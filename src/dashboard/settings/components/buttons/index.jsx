import styles from "../../settings.module.css";
import { useTheme } from "../../../../context/themeContext/themeContext";

export const Buttons = ({ buttons, functions }) => {
  const { theme } = useTheme();
  return (
    <div className={styles.buttons}>
      <div
        onClick={functions[0]}
        className={styles.button1}
        style={{ color: `${theme == "dark" ? "lightgrey" : "gray"}` }}
      >
        {buttons[0]}
      </div>
      <div
        onClick={functions[1]}
        className={styles.button2}
        style={{
          color: `${theme == "dark" ? "gray" : "lightgrey"}`,
          backgroundColor: `${theme == "dark" ? "lightgrey" : "gray"}`,
        }}
      >
        {buttons[1]}
      </div>
    </div>
  );
};
