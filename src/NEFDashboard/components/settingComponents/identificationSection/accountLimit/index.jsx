import React, { useState, useEffect } from "react";
import "./accountLimit.css";
import { Flex } from "antd";

const AccountLimit = ({ kycData }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const getCardStatus = (data) => {
    if (data?.isPending) return "pending";
    else if (data?.isRejected) return "rejected";
    else if (data?.isVerified) return "verified";
    else return "";
  };
  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize(window.innerWidth));
  }, []);
  return (
    <div
      className="AccountLimitWrapper"
      style={{ width: screenSize < 768 && screenSize - 40 }}
    >
      <Flex className="AccountLimit">
        <div className="limit-wrapper">
          <div className="limit-title default-text-gray">Limit</div>
          <div className="limit-label-wrapper default-text">
            <div className="limit-label">Sales Volume</div>
            <div className="limit-label">Crypto Withdrawal Limit</div>
            <div className="limit-label">Crypto Deposit Limit</div>
            <div className="limit-label">P2P Transaction Limits</div>
          </div>
        </div>
        <Flex className="level-main-wrapper">
          <div className="level-wrapper">
            <div className={`account-limit-section-title`}>
              <span>Level 0</span>
            </div>
            <div className="level-label-wrapper default-text">
              <div className="level-label">10,000$</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
            </div>
          </div>
          <div className="level-wrapper">
            <div className={`account-limit-section-title`}>
              <span>Level 1</span>
            </div>
            <div className="level-label-wrapper default-text">
              <div className="level-label">100,000$</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
            </div>
          </div>
          <div className="level-wrapper">
            <div className={`account-limit-section-title`}>
              <span>Level 2</span>
            </div>
            <div className="level-label-wrapper default-text">
              <div className="level-label">10,000,000$</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
            </div>
          </div>
          <div className="level-wrapper">
            <div className={`account-limit-section-title`}>
              <span>Level 3</span>
            </div>
            <div className="level-label-wrapper level3-wrapper default-text">
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
              <div className="level-label">Unlimited</div>
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default AccountLimit;
