import React, { useEffect, useState } from "react";
import { Button, Flex, Segmented, Switch } from "antd";
import "./setting.css";
import SecuritySection from "../../components/settingComponents/securitySection";
import ProfileSection from "../../components/settingComponents/profileSection";
import InvoiceSection from "../../components/settingComponents/invoiceSection";
import IdentificationSection from "../../components/settingComponents/identificationSection";
import { useAuth } from "../../../context/auth/authContext";
import { getRole } from "../../../utils";
import { useLocation } from "react-router-dom";

const SettingPage = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const { recommendRecover } = state || false;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get("tab_name");
  const tabs =
    getRole(user) == "private" || (user?.roles && user?.roles[0] == "private")
      ? ["General", "Security"]
      : ["General", "Security", "Identification", "Invoice"];
  const [activeTab, setActiveTab] = useState(
    recommendRecover ? "Security" : "General",
  );

  const renderSection = () => {
    switch (activeTab) {
      case "General":
        return <ProfileSection />;
      case "Security":
        return <SecuritySection recommendRecover={recommendRecover} />;
      case "Identification":
        return <IdentificationSection />;
      case "Invoice":
        return <InvoiceSection segment={activeTab} />;
    }
  };
  useEffect(() => {
    if (tabName) {
      setActiveTab(tabName || "General");
    }
  }, [tabName]);
  return (
    <div className="setting-page">
      <Flex vertical gap={48} className="setting-wrapper">
        <Flex vertical gap={16} className="setting-page-title-wrapper">
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
        <Flex vertical gap={32} className="segment-title-container-wrapper">
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
