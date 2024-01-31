import styles from "../../settings.module.css";
// import { useTheme } from "../../../../context/themeContext/themeContext";

export const Buttons = ({ buttons, functions }) => {
  // const { theme } = useTheme();
  return (
    <div className={styles.buttons}>
      {buttons &&
        buttons.map((button, idx) => {
          return <div onClick={functions[idx]}>{button}</div>;
        })}
    </div>
  );
};
