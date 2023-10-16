import styles from "./input.module.css";

const Input = ({ placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
