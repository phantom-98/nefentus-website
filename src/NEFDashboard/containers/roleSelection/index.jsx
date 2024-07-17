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
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M15 15.75C15 14.7033 15 14.18 14.8708 13.7541C14.58 12.7953 13.8297 12.045 12.8709 11.7542C12.445 11.625 11.9217 11.625 10.875 11.625H7.125C6.07833 11.625 5.55499 11.625 5.12914 11.7542C4.17034 12.045 3.42003 12.7953 3.12918 13.7541C3 14.18 3 14.7033 3 15.75M12.375 5.625C12.375 7.48896 10.864 9 9 9C7.13604 9 5.625 7.48896 5.625 5.625C5.625 3.76104 7.13604 2.25 9 2.25C10.864 2.25 12.375 3.76104 12.375 5.625Z"
                stroke="#E9E9E9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg> */}
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
        onClick={() => setRoleSelector(!roleSelector)}
      >
        Create account
      </Button>
    </div>
  );
};

export default RoleSelection;
