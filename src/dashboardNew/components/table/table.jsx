import { useTheme } from "../../../context/themeContext/themeContext";
import styles from "./table.module.css";

const Table = ({ grid, label, data }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${styles.section}  ${theme !== "dark" ? styles.light : ""}`}
    >
      <div className={`${styles.tableWrapper} `}>
        <div className={`${styles.table} `}>
          <TableRow data={label} grid={grid} label />

          {data?.map((item, index) => (
            <TableRow key={index} data={item} grid={grid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;

const TableRow = ({ data, grid, label }) => {
  return (
    <div className={`${styles.tableRow}`} style={{ gridTemplateColumns: grid }}>
      {data?.map((item, index) => (
        <div key={index} className={label ? styles.label : styles.dataItem}>
          {item}
        </div>
      ))}
    </div>
  );
};
