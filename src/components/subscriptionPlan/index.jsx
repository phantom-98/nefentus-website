import React from "react";
import TickIcon from "../../assets/landing/tick.svg";
import { Button, Flex } from "antd";
import "./subscriptionPlan.css";

const featureList = [
  "Unlimited Invoices",
  "Unlimited Payment Requests",
  "Unlimited Product Creation",
  "Customer E-Mail Notifications",
  "Payment Tracking",
  "Premium Support",
  "Custom Agent",
];
const SubscriptionPlan = () => {
  return (
    <div className="SubscriptionPlan">
      <table className="subscription-plan-table">
        <tr>
          <td>
            <Flex vertical gap={8} className="plan-label">
              <h3>Plans to make your plans happen.</h3>
              <p>Get paid fast and look good doing it</p>
            </Flex>
          </td>
          <td>
            <div className="plan-type">
              <Flex className="plan-card-head" vertical gap={16}>
                <label className="default-text-gray plan-label-text">
                  For Beginners
                </label>
                <div className="plan-card-title">Starter</div>
                <Button className="default-text select-plan-button">
                  Select plan
                </Button>
              </Flex>
            </div>
          </td>
          <td>
            <div className="plan-type">
              <Flex className="plan-card-head" vertical gap={16}>
                <label className="default-text-gray plan-label-text">
                  For Professionals
                </label>
                <div className="plan-card-title">Business</div>
                <Button className="default-text select-plan-button">
                  Select plan
                </Button>
              </Flex>
            </div>
          </td>
          <td>
            <div className="plan-type">
              <Flex className="plan-card-head" vertical gap={16}>
                <label className="default-text-gray plan-label-text">
                  For Cooperations
                </label>
                <div className="plan-card-title">Enterprises</div>
                <Button className="default-text select-plan-button">
                  Select plan
                </Button>
              </Flex>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="plan-label">
              <p>Option to accept online payments </p>
            </div>
          </td>
          <td>
            <div className="plan-type">
              <Flex
                vertical
                gap={4}
                align={"center"}
                justify-content="space-between"
                className="plan-payment"
              >
                <p className="default-text-gray">Starting at</p>
                <h5 className="default-text">2.9%</h5>
                <p className="plan-payment-text-min-height"></p>
              </Flex>
            </div>
          </td>
          <td>
            <div className="plan-type">
              <Flex
                vertical
                gap={4}
                align={"center"}
                justify-content="space-between"
                className="plan-payment"
              >
                <p className="default-text-gray">Starting at</p>
                <h5 className="default-text">2.9%</h5>
                <p className="default-text-gray plan-payment-text-min-height">
                  From 50,000
                  <br /> Monthly Volume
                </p>
              </Flex>
            </div>
          </td>
          <td>
            <div className="plan-type">
              <Flex
                vertical
                gap={4}
                align={"center"}
                justify-content="space-between"
                className="plan-payment"
              >
                <p className="default-text-gray">Starting at</p>
                <h5 className="default-text">2.9%</h5>
                <p className="default-text-gray plan-payment-text-min-height">
                  Custom From
                  <br /> 250,000 Monthly Volume
                </p>
              </Flex>
            </div>
          </td>
        </tr>

        {featureList.map((label, index) => (
          <tr key={index} className="plan-table-border-row">
            <td>
              <div className="plan-label">
                <p>{label}</p>
              </div>
            </td>
            <td>
              <div className="plan-type">
                <div className="plan-tick-icon">
                  <img src={TickIcon} alt="tick icon" />
                </div>
              </div>
            </td>
            <td>
              <div className="plan-type">
                <div className="plan-tick-icon">
                  <img src={TickIcon} alt="tick icon" />
                </div>
              </div>
            </td>
            <td>
              <div className="plan-type">
                <div className="plan-tick-icon">
                  <img src={TickIcon} alt="tick icon" />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default SubscriptionPlan;
