import USA from "../../../assets/icon/flags/usa.svg";
import DE from "../../../assets/icon/flags/de.svg";
import UK from "../../../assets/icon/flags/uk.svg";

import styles from "./language.module.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Globe } from "../../../assets/icon/icons";

const LanguageBox = () => {
  const { pathname } = useLocation();

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const list = useMemo(() => {
    return [
      {
        label: t("languages.english"),
        flag: USA,
        code: "en",
      },
      {
        label: t("languages.deutsch"),
        flag: DE,
        code: "de",
      },
      {
        label: t("languages.ukrainian"),
        flag: UK,
        code: "uk",
      },
    ];
  }, [language]);

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
    pathname.includes("dashboard/admin") && window.location.reload();
  };

  return (
    <div className={styles.languages}>
      <div className={styles.menu}>
        <Globe />
      </div>
      <div className={`${styles.dropdown}`}>
        <div className={`${styles.body} card`}>
          {list.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              onClick={() => handleTrans(item.code)}
            >
              <img src={item.flag} alt="language flag" />
              <span className={styles.label}>
                <p className="standard">{item.label}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageBox;
