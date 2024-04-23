import USA from "../../../assets/icon/flags/usa.svg";
import DE from "../../../assets/icon/flags/de.svg";
// import ES from "../../../assets/icon/flags/es.svg";
// import AR from "../../../assets/icon/flags/ar.svg";
import UK from "../../../assets/icon/flags/uk.svg";
// import FR from "../../../assets/icon/flags/fr.svg";

import styles from "./languages.module.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import Globe from "../../../assets/icon/globe.svg";

const Languages = () => {
  const query = useLocation();

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

  const [langList, setLangList] = useState(list);

  const handleTrans = (code) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    setLangList(list);
  }, [language]);

  useEffect(() => {
    if (query.pathname === "/support") {
      // setLangList(list.slice(0, 2));
      // handleTrans("en");
    } else if (query.pathname === "/privacy" || query.pathname === "/imprint") {
      setLangList(list.slice(0, 1));

      handleTrans("en");
    } else {
      setLangList(list);
    }
  }, []);

  return (
    <div className={styles.languages}>
      <div className={styles.menu}>
        <img src={Globe} alt="globe" />
      </div>
      <div className={`${styles.dropdown}`}>
        <div className={`${styles.body} card`}>
          {langList.map((item, index) => (
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

export default Languages;
