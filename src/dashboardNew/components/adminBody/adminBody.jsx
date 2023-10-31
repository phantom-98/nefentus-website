import styles from "./adminBody.module.css";

import IncomeCard from "../../components/incomeCard/incomeCard";
import Roles from "../roles/roles";

const AdminBody = ({ chartData, data, userCnt, type, setIsReloadData }) => {
  return (
    <div className={styles.body}>
      <IncomeCard data={chartData} />
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
