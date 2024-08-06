import styles from "./vacancyBody.module.css";

const VacancyBody = () => {
  return (
    <div className={`container ${styles.vacancyBody}`}>
      <div className={styles.heading}>
        <p>Become a part</p>
        <p>
          of our <span className="gradient">team</span>
        </p>
      </div>
      <div className={styles.jobs}>
        <p>Open roles</p>
        <div className={styles.cards}>
          <JobCard
            head={`Sales Manager`}
            text={`DACH`}
            link={window.origin + "/jobs?key=sales_manager_DACH"}
          />
          <JobCard
            head={`Sales Manager`}
            text={`Ukraine`}
            link={window.origin + "/jobs?key=sales_manager_ukraine"}
          />
          <JobCard
            head={`Country Manager`}
            text={`Ukraine`}
            link={window.origin + "/jobs?key=country_manager_ukraine"}
          />
          <JobCard
            head={`Sales Manager`}
            text={`Poland`}
            link={window.origin + "/jobs?key=sales_manager_poland"}
          />
          <JobCard
            head={`Country Manager`}
            text={`Poland`}
            link={window.origin + "/jobs?key=country_manager_poland"}
          />
        </div>
      </div>
    </div>
  );
};
export default VacancyBody;

const JobCard = ({ head, text, link }) => {
  return (
    <div className={styles.card}>
      <div>
        <p>{head}</p>
        <p>{text}</p>
      </div>
      <a target="_blank" href={link}>
        See details{" >"}
      </a>
    </div>
  );
};
