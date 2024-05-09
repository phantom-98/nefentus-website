import { useTranslation } from "react-i18next";
import styles from "./jobBody.module.css";
import Input, { Textarea } from "../input/input";

const JobBody = () => {
  const { t } = useTranslation();
  return (
    <div className={`container ${styles.jobBody}`}>
      <div className={styles.heading}>
        <h1>Business development manager</h1>
        <button>Apply for this job</button>
      </div>
      <div className={styles.body}>
        <div className={styles.feature}>
          <p>Location</p>
          <p>Ukraine, Kiev</p>
          {/* <hr 
                        size="1"
                        color="#b1b1b1"
                     /> */}
          <p>Type</p>
          <p>Full time</p>
        </div>
        <div className={styles.description}>
          <p>
            Crusoe Energy is on a mission to unlock value in stranded energy
            resources through the power of computation.  We aim to align the
            long term interests of the climate with the future of global
            computing infrastructure. As data centers consume an exponentially
            growing power footprint to deliver technology to all connected
            devices, we are inspired by making sure that the energy meeting 5+
            years of experience in business development, sales, or a similar
            role, preferably within the cloud computing or tech industry. Proven
            track record of identifying and closing business deals. Strong
            analytical and strategic thinking skills. Ability to translate
            complex technical concepts for a business audience. Excellent
            communication, negotiation, presentation and written skills.
            Demonstrated ability to proactively engage and manage relationships
            with the C-suite at enterprises and well funded startups. Ability to
            work autonomously and in a team environment. Familiarity with CRM
            software and Google Workspace. Familiarity with cloud technologies
            and their applications within the energy industry. Compensation
            Range: Compensation will be paid in the range of $140,000 - $180,000
            plus commission. Restricted Stock Units are included in all offers.
            Compensation to be determined by the applicant’s education,
            experience, knowledge, skills, and abilities, as well as internal
            equity and alignment with market data. Crusoe Energy is an Equal
            Opportunity Employer. Employment decisions are made without regard
            to race, color, religion, disability, genetic information,
            pregnancy, citizenship, marital status, sex/gender, sexual
            preference/ orientation, gender identity, age, veteran status,
            national origin, or any other status protected by law or regulation.
          </p>
        </div>
        <div></div>
        <div className={styles.contact}>
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            Apply for this job
          </p>
          <div className={styles.row}>
            <Input
              label={`First name`}
              value={``}
              placeholder={`John`}
              dashboard
            />
            <Input
              label={`Last name`}
              value={``}
              placeholder={`Doe`}
              dashboard
            />
          </div>
          <Input
            label={`Email*`}
            value={``}
            placeholder={`yourmail@mail.com`}
            dashboard
          />
          <Input
            label={`Your Linkedin link (Optional)`}
            value={``}
            placeholder={`https://linkedin/xyz`}
            dashboard
          />
          <Textarea
            label={`Comment`}
            value={``}
            placeholder={`Write your comment`}
            dashboard
          />
          <button>Apply for this job</button>
        </div>
      </div>
    </div>
  );
};
export default JobBody;
