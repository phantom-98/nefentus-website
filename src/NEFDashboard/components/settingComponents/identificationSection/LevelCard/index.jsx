import React from "react";
import { Card } from "antd";
import "./levelCard.css";

const LevelCard = ({ card, keyIndex, handleModalOpen }) => {
  return (
    <Card
      key={keyIndex}
      title={
        <div className="level-title">
          <span>Level {card?.level}:</span>
          <span>{card?.status}</span>
        </div>
      }
      className={card?.status}
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
      <div className="card-btn" onClick={() => handleModalOpen(card)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
        >
          <path
            d="M14 9.75H10.25V13.5C10.25 13.9125 9.9125 14.25 9.5 14.25C9.0875 14.25 8.75 13.9125 8.75 13.5V9.75H5C4.5875 9.75 4.25 9.4125 4.25 9C4.25 8.5875 4.5875 8.25 5 8.25H8.75V4.5C8.75 4.0875 9.0875 3.75 9.5 3.75C9.9125 3.75 10.25 4.0875 10.25 4.5V8.25H14C14.4125 8.25 14.75 8.5875 14.75 9C14.75 9.4125 14.4125 9.75 14 9.75Z"
            fill="#E9E9E9"
          />
        </svg>
        <span>{card?.status}</span>
      </div>
    </Card>
  );
};

export default LevelCard;
