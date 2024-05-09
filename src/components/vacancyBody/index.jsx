import { useTranslation } from "react-i18next";
import styles from "./vacancyBody.module.css";

const VacancyBody = () => {
  const { t } = useTranslation();
  return (
    <div className={`container ${styles.vacancyBody}`}>
      <div className={styles.heading}>
        <p>Become a part</p>
        <p>
          of our <span className="gradient">team</span>
        </p>
      </div>
      <div className={styles.jobs}>
        <p>Open roles:</p>
        <div className={styles.cards}>
          <JobCard
            head={`Salesman`}
            text={`Ukrain, Kiev`}
            link={window.origin + "/jobs"}
          />
          <JobCard
            head={`SMM manager`}
            text={`Ukrain, Kiev`}
            link={window.origin + "/jobs"}
          />
          <JobCard
            head={`Full stack developer`}
            text={`Ukrain, Kiev`}
            link={window.origin + "/jobs"}
          />
          <JobCard
            head={`Business development manager`}
            text={`Ukrain, Kiev`}
            link={window.origin + "/jobs"}
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
