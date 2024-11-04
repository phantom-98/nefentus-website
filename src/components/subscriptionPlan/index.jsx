import React, { useState } from "react";
import TickIcon from "../../assets/landing/tick.svg";
import { Button, Flex, Segmented } from "antd";
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

const options = ["Starter", "Business", "Enterprise"];

const planDeatils = {
  Starter: {
    label: "For Beginners",
    title: "Starter",
    percentage: "2.9",
    subtext: "",
    features: [
      "Unlimited Invoices",
      "Unlimited Payment Requests",
      "Unlimited Product Creation",
      "Customer E-Mail Notifications",
      "Premium Support",
    ],
  },
  Business: {
    label: "For Professionals",
    title: "Business",
    percentage: "1.9",
    subtext: "From 50,000 Monthly Volume",
    features: [
      "Unlimited Invoices",
      "Unlimited Payment Requests",
      "Unlimited Product Creation",
      "Customer E-Mail Notifications",
      "Payment Tracking",
      "Premium Support",
    ],
  },
  Enterprise: {
    label: "For Corporations",
    title: "Enterprise",
    percentage: "1.9",
    subtext: "Custom From\n250,000 Monthly Volume",
    features: [
      "Unlimited Invoices",
      "Unlimited Payment Requests",
      "Unlimited Product Creation",
      "Customer E-Mail Notifications",
      "Payment Tracking",
      "Premium Support",
      "Custom Agent",
    ],
  },
};

const SubscriptionPlan = () => {
  const [selectedOption, setSelectedOption] = useState("Starter");
  return (
    <>
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
                    For Corporations
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
                <p>Accept crypto payments online </p>
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
                  {planDeatils?.Starter?.features?.some(
                    (option) => option == label,
                  ) && (
                    <div className="plan-tick-icon">
                      <img src={TickIcon} alt="tick icon" />
                    </div>
                  )}
                </div>
              </td>
              <td>
                <div className="plan-type">
                  {planDeatils?.Business?.features?.some(
                    (option) => option == label,
                  ) && (
                    <div className="plan-tick-icon">
                      <img src={TickIcon} alt="tick icon" />
                    </div>
                  )}
                </div>
              </td>
              <td>
                <div className="plan-type">
                  {planDeatils?.Enterprise?.features?.some(
                    (option) => option == label,
                  ) && (
                    <div className="plan-tick-icon">
                      <img src={TickIcon} alt="tick icon" />
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <Flex
        gap={24}
        vertical
        align="center"
        className="subscription-plan-mobile"
      >
        <Flex vertical gap={8} className="mobile-plan-label">
          <h3 className="heading-for-tablet">
            Plans to make your plans happen.
          </h3>
          <h3 className="heading-for-mobile">
            Plans to make
            <br /> your plans happen.
          </h3>
          <p className="default-text-gray">
            Get paid fast and look good doing it
          </p>
        </Flex>
        <Flex gap={4} className="subscription-plan-segments">
          {options.map((option, index) => (
            <Flex
              align={"center"}
              justify="center"
              className={`option-container ${
                selectedOption == option ? "active" : ""
              }`}
              key={index}
              onClick={() => setSelectedOption(option)}
            >
              <div>{option}</div>
            </Flex>
          ))}
        </Flex>
        <Flex vertical className="subscription-plan-mobile-card">
          <div className="subscription-mobile-card-container">
            <Flex className="subscription-mobile-card-head" vertical gap={16}>
              <label className="default-text-gray plan-label-text">
                {planDeatils[selectedOption]?.label}
              </label>
              <div className="plan-card-title">
                {planDeatils[selectedOption]?.title}
              </div>
              <Button className="default-text select-plan-button">
                Select plan
              </Button>
            </Flex>
            <Flex vertical className="online-payments-container" gap={16}>
              <div className="default-text-gray">
                Accept crypto payments online{" "}
              </div>
              <div className="default-text">
                Starting at{" "}
                <span>{planDeatils[selectedOption]?.percentage}%</span>
              </div>
              <div className="default-text-gray">
                {planDeatils[selectedOption]?.subtext}
              </div>
            </Flex>
            {featureList?.map((option, index) => (
              <Flex
                align={"center"}
                justify={"space-between"}
                className="features-text-container"
                key={index}
              >
                <div className="default-text-gray fetaures-text">{option}</div>
                {planDeatils[selectedOption]?.features?.some(
                  (plan_option) => plan_option == option,
                ) && (
                  <div className="plan-tick-icon">
                    {<img src={TickIcon} alt="tick icon" />}
                  </div>
                )}
              </Flex>
            ))}
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default SubscriptionPlan;
