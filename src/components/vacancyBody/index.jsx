import { useTranslation } from "react-i18next";
import styles from "./vacancyBody.module.css";

const VacancyBody = () => {
  const { t } = useTranslation();
  return (
    <div className={`container ${styles.vacancyBody}`}>
      <div className={styles.heading}>
        <p>{t("vacancy.hero1")}</p>
        <p>
          {t("vacancy.hero2")}{" "}
          <span className="gradient">{t("vacancy.hero3")}</span>
        </p>
      </div>
      <div className={styles.jobs}>
        <p>{t("vacancy.open")}</p>
        <div className={styles.cards}>
          <JobCard
            head={`Sales Manager DACH`}
            text={`xxx`}
            link={window.origin + "/jobs?key=sales_manager"}
          />
          <JobCard
            head={`Country Manager`}
            text={`xxx`}
            link={window.origin + "/jobs?key=country_manager"}
          />
        </div>
      </div>
    </div>
  );
};
export default VacancyBody;

const JobCard = ({ head, text, link }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      <div>
        <p>{head}</p>
        <p>{text}</p>
      </div>
      <a target="_blank" href={link}>
        {t("vacancy.seeDetail").concat(" >")}
      </a>
    </div>
  );
};
