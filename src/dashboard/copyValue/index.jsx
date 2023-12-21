import styles from "./copyValue.module.css";
import copyClipboard from "../../assets/icon/copyClipboard.svg";
import inputStyles from "../../components/input/input.module.css";
import Button from "../../dashboardNew/components/button/button";

const CopyValue = ({ value, onCopy, inputStyle, link, buttonStyle }) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(value);
    onCopy();
  };

  return (
    <div className={styles.copyValueWrapper}>
      <div
        className={`${inputStyles.input} ${inputStyles.dashboardInput}`}
        type="text"
        disabled={true}
        style={{ width: "max-content", ...inputStyle }}
      >
        {link ? (
          <a href={`${value}`} target="_blank">
            {value}
          </a>
        ) : (
          <p style={{ overflowWrap: "anywhere" }}>{value}</p>
        )}
      </div>
      <Button
        color="light"
        onClick={handleClipboard}
        style={{ padding: "0.5rem 1rem", width: "max-content" }}
      >
        <img
          src={copyClipboard}
          className={styles.copyClipboard}
          alt="Copy to clipboard"
        />
      </Button>
    </div>
  );
};

export default CopyValue;
