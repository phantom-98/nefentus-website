import React from "react";
import "./accountLimit.css";
import { Flex } from "antd";

const AccountLimit = () => {
  const titles = [
    "Level 1: Verified",
    "Level 2: Pending",
    "Level 1: Unverified",
  ];
  return (
    <Flex className="AccountLimit">
      <div className="limit-wrapper">
        <div className="limit-title default-text-gray">Limit</div>
        <div className="limit-label-wrapper default-text">
          <div className="limit-label">Fiat Deposit & Withdrawal Limits</div>
          <div className="limit-label">Fiat Deposit & Withdrawal Limits</div>
          <div className="limit-label">Fiat Deposit & Withdrawal Limits</div>
          <div className="limit-label">Fiat Deposit & Withdrawal Limits</div>
        </div>
      </div>
      <Flex className="level-main-wrapper">
        <div className="level-wrapper">
          <div className="account-limit-section-title verified">
            <span>Level 1:</span>
            <span>Verified</span>
          </div>
          <div className="level-label-wrapper default-text">
            <div className="level-label">10 000$</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
          </div>
        </div>
        <div className="level-wrapper">
          <div className="account-limit-section-title pending">
            <span>Level 2:</span>
            <span>Pending</span>
          </div>
          <div className="level-label-wrapper default-text-gray">
            <div className="level-label">10 000$</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
          </div>
        </div>
        <div className="level-wrapper">
          <div className="account-limit-section-title">
            <span>Level 3:</span>
            <span>Unverified</span>
          </div>
          <div className="level-label-wrapper level3-wrapper default-text-gray">
            <div className="level-label">10 000$</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
            <div className="level-label">Unlimited</div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default AccountLimit;
