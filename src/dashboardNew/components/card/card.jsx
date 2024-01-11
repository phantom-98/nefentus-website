import { useTheme } from "../../../context/themeContext/themeContext";
import styles from "./card.module.css";

const Card = ({ children, className }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme === "dark" ? "" : styles.lightCard} ${
        styles.card
      }  ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
