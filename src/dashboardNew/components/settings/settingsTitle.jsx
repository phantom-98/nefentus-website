import Button from "../button/button";
import styles from "./settingsTitle.module.css";
import { useTranslation } from "react-i18next";

const SettingsTitle = ({
  title,
  description,
  identification,
  product,
  onCreate,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      {identification && (
        <div className={styles.level}>{t("identification.level")}: X</div>
      )}
      {product && (
        <div>
          <Button onClick={onCreate}>{t("products.createNewProduct")}</Button>
        </div>
      )}
    </div>
  );
};

export default SettingsTitle;
