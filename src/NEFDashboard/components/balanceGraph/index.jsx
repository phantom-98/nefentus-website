import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tooltip as AntToolTip, Row, Col } from "antd";
import "./balanceGraph.css";
import { formatUSDBalance } from "../../../utils";

const data = [
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  // { name: "Page D" },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

const BalanceGraph = ({ graphData }) => {
  const CustomToolTip = ({ payload }) => {
    console.log(payload);
    if (!payload?.length) return;
    const data = payload[0];
    return (
      <AntToolTip title={data?.label}>
        <div className="tooltip-container">
          <Row align={"middle"} justify={"space-between"} gutter={12}>
            <Col>
              <Row align={"middle"}>
                <Col className="balance-graph-tooltip-bar"></Col>
                <Col className="default-text">{data?.payload?.label}</Col>
              </Row>
            </Col>
            {/* <Col className="default-text">{data?.payload?.percentage}%</Col> */}
          </Row>
          <div className="tooltip-balance">
            ${formatUSDBalance(data?.value)}
          </div>
        </div>
      </AntToolTip>
    );
  };

  return (
    <ResponsiveContainer
      height={280}
      minWidth={"100%"}
      className={"balance-graph-container"}
    >
      <LineChart
        width={500}
        height={200}
        data={graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="7 7" opacity={0.1} strokeWidth={2} />
        <XAxis dataKey="label" />
        <YAxis
          axisLine={false}
          dataKey={`amount`}
          tickFormatter={(value) => "$" + value}
        />
        <Tooltip
          content={<CustomToolTip />}
          cursor={{ stroke: "#078BB9", strokeDasharray: 7, strokeWidth: 2 }}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="amount"
          stroke="#078BB9"
          fill="#078BB9"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceGraph;
