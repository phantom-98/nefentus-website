import styles from "./input.module.css";

const Input = ({ placeholder, value, setVaue, type }) => {
  const handleChange = (e) => {
    if (type === "checkbox") {
      setVaue(e.target.checked);
    } else {
      setVaue(e.target.value);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
