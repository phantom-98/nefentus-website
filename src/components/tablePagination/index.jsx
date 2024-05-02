import Table from "../table";
import Pagination from "../pagination";
import { useState, useEffect } from "react";

const TablePagination = ({
  className,
  setDataPage,
  setDataSize,
  dataPage,
  dataSize,
  dataLength,
}) => {
  return (
    <>
      <Pagination
        setDataPage={setDataPage}
        setDataSize={setDataSize}
        dataLength={dataLength}
        dataPage={dataPage}
        dataSize={dataSize}
      />
    </>
  );
};

export default TablePagination;
