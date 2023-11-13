import styles from "./topInfo.module.css";
import Button from "./../../components/button/button";

const TopInfo = ({ title, description, children }) => {
  return (
    <div className={styles.top}>
      <div>
        <p style={{ fontSize: 21, color: "white" }}>{title}</p>

        <p style={{ fontSize: 13 }}>{description}</p>
      </div>

      {children}
    </div>
  );
};

export default TopInfo;
