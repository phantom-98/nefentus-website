import styles from "./adminBody.module.css";

import Roles from "../roles/roles";
import IncomeCardAdmin from "../incomeCardAdmin/incomeCardAdmin";

/**
 *
 * @param type Type of the dashboard (admin or partner)
 * @returns
 */
const AdminBody = ({ chartData, data, userCnt, type, setIsReloadData }) => {
  return (
    <div className={styles.body}>
      <IncomeCardAdmin data={chartData} />
      <Roles
        data={data}
        userCnt={userCnt}
        type={type}
        setIsReloadData={setIsReloadData}
      />
    </div>
  );
};

export default AdminBody;
