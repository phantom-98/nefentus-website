import styles from "./input.module.css";

const Input = ({ placeholder, value, setVaue }) => {
  const handleChange = (e) => {
    setVaue(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
