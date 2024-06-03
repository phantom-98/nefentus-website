import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./porfolioCoins.css";
import useResponsive from "../../../hooks/useResponsive";

const PorfolioCoins = ({ data, useAbbreviations = false, isDashboard }) => {
  let { columns } = useResponsive(isDashboard);

  return Array.from({ length: Math.ceil(data.length / columns) }).map(
    (_, rowIndex) => (
      <Row key={rowIndex} gutter={[16, 16]}>
        {data
          .slice(rowIndex * columns, (rowIndex + 1) * columns)
          .map((record, index) => (
            <Col key={`cell-${index}`} span={24 / columns}>
              <div className="network-row-wrapper">
                <div className="network-row">
                  <div
                    className="network-row-color"
                    style={{ background: record.color }}
                  ></div>
                  {record?.icon && (
                    <div>
                      <img src={record?.icon} width={24} />
                    </div>
                  )}
                  <div className="default-text">
                    {useAbbreviations ? record?.abbr : record?.name}
                  </div>
                </div>
                <div className="default-text">{record?.percentage}%</div>
              </div>
            </Col>
          ))}
      </Row>
    ),
  );
};

export default PorfolioCoins;
