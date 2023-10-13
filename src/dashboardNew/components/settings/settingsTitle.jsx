import styles from "./settingsTitle.module.css";

const SettingsTitle = ({ title, description, identification }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      {identification && <div className={styles.level}>Level: X</div>}
    </div>
  );
};

export default SettingsTitle;
