import React from "react";
import { Col, Row } from "antd";
import "./porfolioCoins.css";

const PorfolioCoins = ({ data, useAbbreviations = false }) => {
  return Array.from({ length: Math.ceil(data.length / 2) }).map(
    (_, rowIndex) => (
      <Row key={rowIndex} gutter={[16, 16]}>
        {data.slice(rowIndex * 2, (rowIndex + 1) * 2).map((record, index) => (
          <Col key={`cell-${index}`} span={12}>
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
