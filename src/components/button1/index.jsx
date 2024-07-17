import styles from "./settings.module.css";

export const Buttons = ({ buttons, functions }) => {
  return (
    <div className={styles.buttons}>
      {buttons &&
        buttons.map((button, idx) => {
          return <div onClick={functions[idx]}>{button}</div>;
        })}
    </div>
  );
};
