import Button from "../button/button";
import Card from "../card/card";

import styles from "./roles.module.css";

const Roles = ({ data, type }) => {
  return (
    <Card>
      <div className={styles.title}>Registrations Roles</div>

      <div className={styles.lineGroup}>
        <div className={styles.lineWrapper}>
          {data.map((item) => (
            <div
              className={styles.line}
              style={{
                backgroundColor: item.color,
                width: item.percentage + "%",
              }}
            ></div>
          ))}
        </div>

        <div className={styles.label}>
          <p>0%</p>
          <p>100%</p>
        </div>

        <div className={styles.total}>
          <p>Total</p>
          <p>982</p>
        </div>

        <div className={styles.legendBody}>
          {data.map((item) => (
            <div className={styles.legend}>
              <div className={styles.left}>
                <div
                  className={styles.circle}
                  style={{ backgroundColor: item.color }}
                ></div>

                <p>{item.legend}</p>
              </div>

              <div className={styles.right}>
                <p>{item.num}</p>
                <p>{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>

        <Button>Add User</Button>

        {type !== "partner" && (
          <div style={{ marginTop: "1.5rem" }}>
            <Button color="light">KYC Requests</Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Roles;
