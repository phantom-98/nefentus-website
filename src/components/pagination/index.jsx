import styles from "./pagination.module.css";
import classNames from "classnames";
import { Options } from "../input/input";
import { useTranslation } from "react-i18next";

const Pagination = ({
  dataLength,
  dataPage,
  setDataPage,
  dataSize,
  setDataSize,
}) => {
  const { t } = useTranslation();

  const numPages = Math.ceil(dataLength / dataSize);

  function updatePage(page) {
    setDataPage(page);
  }

  function updatePageSize(newPageSize) {
    setDataSize(newPageSize);
    setDataPage(0);
  }

  return (
    <div className={styles.paginationWrapper}>
      <nav aria-label="pagination" className={styles.nav}>
        <ul className={styles.pagination}>
          <li
            onClick={() => updatePage(0)}
            className={classNames({ [styles.hide]: dataPage === 0 })}
          >
            «
          </li>
          <li
            onClick={() => dataPage > 0 && updatePage(dataPage - 1)}
            className={classNames({ [styles.hide]: dataPage === 0 })}
          >
            ‹
          </li>
          <li>
            <PageInput value={dataPage + 1} updatePage={updatePage} />{" "}
            {t("general.of")} {numPages}
          </li>
          <li
            onClick={() => dataPage + 1 < numPages && updatePage(dataPage + 1)}
            className={classNames({
              [styles.hide]: dataPage + 1 === numPages,
            })}
          >
            ›
          </li>
          <li
            onClick={() => updatePage(numPages - 1)}
            className={classNames({
              [styles.hide]: dataPage + 1 === numPages,
            })}
          >
            »
          </li>
        </ul>
      </nav>
      <Options
        options={[10, 20, 50, 100]}
        value={dataSize}
        setValue={updatePageSize}
        showOnTop
      />
    </div>
  );
};

const PageInput = ({ value, updatePageSize }) => {
  return (
    <input
      className={styles.pageInput}
      value={value}
      onChange={(e) => updatePageSize(e.target.value - 1)}
      type="text"
    />
  );
};

export default Pagination;
