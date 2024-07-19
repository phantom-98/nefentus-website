import React, { useRef, useEffect, useState } from "react";
import { Card, Flex } from "antd";
import RejectMessageIcon from "../../../../../assets/newDashboardIcons/reject-message.svg";
import PendingIcon from "../../../../../assets/newDashboardIcons/pending-icon.svg";
import ApprovedIcon from "../../../../../assets/newDashboardIcons/approved-icon.svg";

import "./levelCard.css";

const LevelCard = ({
  level,
  card,
  keyIndex,
  handleModalOpen,
  setContentHeight,
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const getCardStatus = () => {
    if (card?.isPending) return "pending";
    else if (card?.isVerified) return "verified";
    else if (level == card?.level - 1) return "verify";
    else return "";
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.offsetHeight);
      setContentHeight((prev) => [...prev, contentRef.current.offsetHeight]);
    }
  }, []);
  return (
    <Card
      ref={contentRef}
      key={keyIndex}
      title={
        <div className="level-title">
          <span>Level {card?.level}</span>
          {/* <span>{getCardStatus() == "" ? "unverified" : getCardStatus()}</span> */}
        </div>
      }
      className={`${
        card?.isPending || card?.isVerified || level != card?.level - 1
          ? ""
          : "active"
      } ${getCardStatus()} ${card?.isRejected ? "rejected" : ""}`}
    >
      <div className="card-content">
        <div className="content-title">Required:</div>
        {card?.content?.map((data, contentIndex) => (
          <div className="content-label" key={contentIndex}>
            <div>
              <img src={data?.icon} alt="icon" />
            </div>
            <span>{data?.label}</span>
          </div>
        ))}
      </div>
      {card?.isRejected && (
        <Flex gap={8} className="reject-message-container">
          <div>
            <img src={RejectMessageIcon} className="reject-message-icon" />
          </div>
          <div>
            <div className="default-text reject-message-title">
              Verification was denied
            </div>
            <div className="reject-message default-text-gray">
              {card?.reject_message}
            </div>
          </div>
        </Flex>
      )}
      <div
        className="card-btn cursor-pointer"
        onClick={() =>
          card?.isPending || card?.isVerified || level != card?.level - 1
            ? null
            : handleModalOpen(card)
        }
      >
        <span>{getCardStatus() == "" ? "unverified" : getCardStatus()}</span>
        {getCardStatus() == "pending" ? (
          <img src={PendingIcon} />
        ) : getCardStatus() == "verified" ? (
          <img src={ApprovedIcon} />
        ) : null}
      </div>
    </Card>
  );
};

export default LevelCard;
