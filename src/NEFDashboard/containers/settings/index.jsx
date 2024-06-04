import React, { useState } from "react";
import { Button, Flex, Segmented, Switch } from "antd";
import "./setting.css";
import SecuritySection from "../../components/settingComponents/securitySection";
import ProfileSection from "../../components/settingComponents/profileSection";
import InvoiceSection from "../../components/settingComponents/invoiceSection";
import IdentificationSection from "../../components/settingComponents/identificationSection";

const SettingPage = () => {
  const tabs = ["General", "Security", "Identification", "Invoice"];
  const [activeTab, setActiveTab] = useState("Security");

  const renderSection = () => {
    switch (activeTab) {
      case "General":
        return <ProfileSection />;
      case "Security":
        return <SecuritySection />;
      case "Identification":
        return <IdentificationSection />;
      case "Invoice":
        return <InvoiceSection segment={activeTab} />;
    }
  };
  return (
    <div className="setting-page">
      <Flex vertical gap={48}>
        <Flex vertical gap={16}>
          <div className="default-text setting-page-title">Settings</div>

          <Segmented
            size="large"
            options={tabs}
            value={activeTab}
            className="setting-tabs"
            onChange={(value) => {
              setActiveTab(value);
            }}
          />
        </Flex>
        <Flex vertical gap={32}>
          <div className="segment-title-container">
            <div className="default-text segment-title">{activeTab}</div>
            {activeTab === "Invoice" && (
              <div className="default-text-gray">
                Enter settings that are related to payments on Nefentus.
              </div>
            )}
          </div>
          {renderSection()}
        </Flex>
      </Flex>
    </div>
  );
};

export default SettingPage;
