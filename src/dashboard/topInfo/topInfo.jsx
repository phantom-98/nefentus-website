import styles from "./topInfo.module.css";
import Button from "./../../components/button/button";

const TopInfo = ({ title, description, children }) => {
  return (
    <div className={styles.top}>
      <div>
        <p>{title}</p>

        <p>{description}</p>
      </div>

      {children}
    </div>
  );
};

export default TopInfo;
