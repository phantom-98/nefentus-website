import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Tooltip as AntToolTip, Col, Flex, Row, Skeleton } from "antd";
import PorfolioCoins from "../portfolioCoins";
import "./currency-chart.css";
import { useAuth } from "../../../context/auth/authContext";
import { formatUSDBalance } from "../../../utils";

const COLORS = [
  "#078BB9",
  "#8543DA",
  "#1F7369",
  "#A45A25",
  "#A18729",
  "#A43C3C",
  "#CE34B7",
  "#BF9322",
  "#466FEE",
];

const checkBalances = (balances) => {
  for (let i = 0; i < balances.length; i++)
    if (balances[i] === undefined) return false;
  return true;
};

const checkPrices = (priceList) => {
  return priceList?.length && priceList.every((price) => price != undefined);
};

const CurrencyChart = ({ balances, prices, data, colors, togglebtn }) => {
  const [percentages, setPercentages] = useState([0, 0, 0, 0, 0]);
  const { currencyRate } = useAuth();
  useEffect(() => {
    if (checkBalances(balances) && checkPrices(prices)) {
      let totalBalance = balances
        .map((balance, index) => balance * prices[index])
        .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);
      setTotal(totalBalance || 0);

      if (totalBalance > 0) {
        const pers = balances.map((balance, index) =>
          parseFloat(
            ((balance * prices[index]) / (totalBalance * 1.0)) * 100,
          ).toFixed(2),
        );
        setPercentages(pers);
      }
    }
  }, [balances, prices]);

  const CustomToolTip = ({ payload }) => {
    if (!payload?.length) return;
    const data = payload[0];
    return (
      <AntToolTip title={data?.name}>
        <div className="tooltip-container">
          <Row align={"middle"} justify={"space-between"} gutter={12}>
            <Col>
              <Row align={"middle"} gutter={6}>
                <Col
                  className="network-row-color"
                  style={{ background: data?.payload?.color }}
                ></Col>
                <Col className="default-text">{data?.name}</Col>
              </Row>
            </Col>
            <Col className="default-text">{data?.payload?.percentage}%</Col>
          </Row>
          <div className="tooltip-balance">
            {currencyRate?.symbol +
              formatUSDBalance(data?.value * currencyRate?.rate)}
          </div>
        </div>
      </AntToolTip>
    );
  };

  return (
    <Row gutter={[0, 24]} className="currency-chart">
      {togglebtn ? (
        <Flex align="center" justify="center">
          <Skeleton.Avatar active className="portfolio-image-skeleton" />
        </Flex>
      ) : (
        <PieChart
          width={300}
          height={145}
          className="pie-chart-container"
          defaultShowTooltip={false}
        >
          <Pie
            data={data}
            cx={140}
            cy={"50%"}
            innerRadius={55}
            outerRadius={65}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="amount_dollar"
          >
            {data.map((entry, index) => {
              console.log(entry, index % COLORS.length);
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry?.color}
                  className="test-cell"
                  cornerRadius={100}
                  style={{ outline: "none" }}
                  stroke="0"
                />
              );
            })}
            {/* <LabelList /> */}
          </Pie>
          <Tooltip content={<CustomToolTip />} />
        </PieChart>
      )}

      <div className="network-rows-container">
        {togglebtn ? (
          <Flex align="center" justify="center" gap={10} wrap="wrap">
            {[...Array(8)].map((e, i) => (
              <Skeleton.Input active />
            ))}
          </Flex>
        ) : (
          <PorfolioCoins data={data} useAbbreviations />
        )}
      </div>
    </Row>
  );
};

export default CurrencyChart;
