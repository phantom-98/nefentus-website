import styles from "./adminBody.module.css";

import IncomeCard from "../../components/incomeCard/incomeCard";
import Roles from "../roles/roles";

const AdminBody = ({ chartData, data, type }) => {
  return (
    <div className={styles.body}>
      <IncomeCard data={chartData} />
      <Roles data={data} type={type} />
    </div>
  );
};

export default AdminBody;
