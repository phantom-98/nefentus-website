import { Flex, Button } from "antd";
import React, { useState } from "react";
import "./role-selection.css";
import PersonIcon from "../../../assets/newDashboardIcons/personIcon.svg";
import RoleActive from "../../../assets/newDashboardIcons/roleActive.svg";
import RoleDisactive from "../../../assets/newDashboardIcons/roleDisactive.svg";
import Business from "../../../assets/newDashboardIcons/businessIcon.svg";

const RoleSelection = ({ roleSelector, setRoleSelector, role, setRole }) => {
  return (
    <div className="auth-form">
      <div
        className="back-btn back-btn-role"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <path
            d="M12.4996 6.0875C12.1746 5.7625 11.6496 5.7625 11.3246 6.0875L7.49961 9.9125C7.17461 10.2375 7.17461 10.7625 7.49961 11.0875L11.3246 14.9125C11.6496 15.2375 12.1746 15.2375 12.4996 14.9125C12.8246 14.5875 12.8246 14.0625 12.4996 13.7375L9.26628 10.4958L12.4996 7.2625C12.8246 6.9375 12.8163 6.40417 12.4996 6.0875Z"
            fill="#E9E9E9"
          />
        </svg>
        <span>Back</span>
      </div>
      <Flex vertical gap={24} className="form-header">
        <Flex vertical gap={6} className="form-heading">
          <h4>Create an account for personal use or for business purposes.</h4>
          <div className="signup-text">Sign up to a new Nefentus account</div>
        </Flex>
      </Flex>
      <Flex gap={16} className="account-type-container">
        <Flex
          vertical
          gap={24}
          className={role === "Private" ? "role-card Private" : "role-card"}
          onClick={() => setRole("Private")}
        >
          <Flex justify="space-between">
            <img src={PersonIcon} alt="PersonIcon" />
            <img
              src={role === "Private" ? RoleActive : RoleDisactive}
              alt="RoleActive"
            />
          </Flex>
          <div className="role-card-text">Managing personal crypto assets.</div>
        </Flex>
        <Flex
          vertical
          gap={24}
          className={role === "Business" ? "role-card Business" : "role-card"}
          onClick={() => setRole("Business")}
        >
          <Flex justify="space-between">
            <img src={Business} alt="Business" />
            <img
              src={role === "Business" ? RoleActive : RoleDisactive}
              alt="RoleActive"
            />
          </Flex>
          <div className="role-card-text">
            Writing invoices & accepting payments as a business.
          </div>
        </Flex>
      </Flex>
      <Button
        type="primary"
        htmlType="submit"
        className={role == "" ? "disable-create-account" : ""}
        onClick={() => role != "" && setRoleSelector(!roleSelector)}
      >
        Create account
      </Button>
    </div>
  );
};

export default RoleSelection;
