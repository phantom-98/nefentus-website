import React from "react";
import { Card, Flex, Row } from "antd";
import ArrowUp from "../../../assets/newDashboardIcons/arrow-up-green.svg";
import InfoMark from "../../../assets/newDashboardIcons/info-circle.svg";
import "./incomeCard.css";
import { formatTokenBalance } from "../../../utils";
import { useTranslation } from "react-i18next";

const IncomeCard = ({ card, key }) => {
  const { t } = useTranslation();
  return (
    <Card
      title={
        <Flex align="center" gap={6}>
          <div className="default-text-gray income-card-title">
            {t(card?.title)}
          </div>
          <img src={InfoMark} alt="info" width={20} height={20} />
        </Flex>
      }
      className="income-card"
      key={key}
    >
      <Flex vertical gap={6}>
        <div className="default-text income-amount">
          {formatTokenBalance(card?.number, 2)}
        </div>
        <Flex align={"center"} gap={8}>
          <Row align={"middle"} className="income-profit">
            <div className="default-text">
              +
              {card?.percentage == null
                ? formatTokenBalance(0, 2)
                : formatTokenBalance(card?.percentage)}
            </div>
            <img src={ArrowUp} alt="arrow" width={14} height={14} />
          </Row>
          <div className="default-text-gray">{t(card?.subText)}</div>
        </Flex>
      </Flex>
    </Card>
  );
};

export default IncomeCard;
