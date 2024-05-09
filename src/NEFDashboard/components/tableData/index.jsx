import React from "react";
import { Button, Col, Flex, Row, Skeleton, Table } from "antd";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";
import "./table.css";

const TableData = ({
  data,
  togglebtn = false,
  columns,
  setDataLength,
  total,
  dataLength,
  setPage,
  current,
  hidePagination,
}) => {
  const onChange = (pagination, filters, sorter, extra) => {
    setDataLength(pagination?.pageSize);
    setPage(pagination?.current);
  };

  let locale = {
    emptyText: (
      <Flex vertical gap={10} style={{ width: "100%" }}>
        <Skeleton.Input active className="table-skeleton" />
        <Skeleton.Input active className="table-skeleton" />
        <Skeleton.Input active className="table-skeleton" />
        <Skeleton.Input active className="table-skeleton" />
        <Skeleton.Input active className="table-skeleton" />
      </Flex>
    ),
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={false}
      pagination={
        hidePagination
          ? false
          : {
              pageSize: dataLength ?? 5,
              total: total,
              className: "custom-pagination",
              current: current,
            }
      }
      locale={togglebtn && locale}
      className="custom-table"
    />
  );
};
export default TableData;
