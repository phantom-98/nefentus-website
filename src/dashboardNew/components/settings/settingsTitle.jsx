import Button from "../button/button";
import styles from "./settingsTitle.module.css";
import { useTranslation } from "react-i18next";
import backend_API from "../../../api/backendAPI";
import { useEffect, useState } from "react";

const SettingsTitle = ({
  title,
  description,
  identification,
  product,
  onCreate,
}) => {
  const { t } = useTranslation();
  const [level, setLevel] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getLevel = async () => {
      const BackendAPI = new backend_API();
      const { data } = await BackendAPI.getKYCLevel(userId);
      if (data) {
        setLevel(data.kycLevel);
      }
    };

    getLevel();
  }, [userId]);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      {identification && (
        <div className={styles.level}>
          {t("identification.level")}: {level}
        </div>
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
