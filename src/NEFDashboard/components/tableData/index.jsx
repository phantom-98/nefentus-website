import React from "react";
import { Button, Col, Flex, Row, Skeleton, Table } from "antd";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";
import "./table.css";

const onChange = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra);
};
const TableData = ({ data, togglebtn = false }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("personalDashboard.currencyTable.coin"),
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend", "descend"],
      render: (name, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <img src={record?.icon} width={24} />
            </Col>
            <Col>
              <div className="default-text">{name}</div>
              <div className="default-text-gray">{record?.blockchain}</div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("personalDashboard.currencyTable.amount"),
      dataIndex: "value",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.value - b.value,
      render: (value, record) => {
        return (
          <Col>
            <div className="default-text">
              {formatTokenBalance(record?.value, 4) ?? 0}
            </div>
            <div className="default-text-gray">
              $
              {formatUSDBalance(
                record?.price * value || (record?.price * value)?.toString(),
              )}
            </div>
          </Col>
        );
      },
    },
    {
      title: t("personalDashboard.currencyTable.price"),
      dataIndex: "price",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.price - b.price,
      render: (price, record) => {
        return <div>{price?.toFixed(2)}</div>;
      },
    },
  ];

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
      pagination={{
        pageSize: 5,
      }}
      locale={togglebtn && locale}
      className="custom-table"
    />
  );
};
export default TableData;
