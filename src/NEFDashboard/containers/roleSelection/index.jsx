import { Flex, Button } from "antd";
import React, { useState } from "react";
import "./role-selection.css";

const RoleSelection = ({ roleSelector, setRoleSelector, role, setRole }) => {
  return (
    <div className="auth-form">
      <Flex vertical gap={24} className="form-header">
        <Flex vertical gap={6} className="form-heading">
          <h4>Create an account for personal use or for business purposes.</h4>
          <div className="signup-text">Sign up to a new Nefentus account</div>
        </Flex>
      </Flex>
      <Flex gap={16}>
        <Flex
          vertical
          gap={24}
          className={role === "Private" ? "role-card Private" : "role-card"}
          onClick={() => setRole("Private")}
        >
          <Flex justify="space-between">
            <svg
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
            </svg>
            {role === "Private" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
              >
                <circle
                  cx="6.5"
                  cy="7"
                  r="5.5"
                  fill="url(#paint0_linear_4764_13382)"
                  stroke="url(#paint1_linear_4764_13382)"
                  stroke-width="2"
                />
                <circle
                  cx="6.5"
                  cy="7"
                  r="5"
                  fill="url(#paint2_linear_4764_13382)"
                  stroke="#202020"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4764_13382"
                    x1="18.7777"
                    y1="-41.5333"
                    x2="-20.0928"
                    y2="-36.1122"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4764_13382"
                    x1="18.7777"
                    y1="-41.5333"
                    x2="-20.0928"
                    y2="-36.1122"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_4764_13382"
                    x1="16.8888"
                    y1="-34.0667"
                    x2="-16.0016"
                    y2="-29.4796"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="8" cy="8" r="7.5" stroke="#202020" fill="none" />
              </svg>
            )}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M12 5.25C12 4.55252 12 4.20378 11.9233 3.91766C11.7153 3.1412 11.1088 2.53472 10.3323 2.32667C10.0462 2.25 9.69748 2.25 9 2.25C8.30252 2.25 7.95378 2.25 7.66766 2.32667C6.8912 2.53472 6.28472 3.1412 6.07667 3.91766C6 4.20378 6 4.55252 6 5.25M3.9 15.75H14.1C14.9401 15.75 15.3601 15.75 15.681 15.5865C15.9632 15.4427 16.1927 15.2132 16.3365 14.931C16.5 14.6101 16.5 14.1901 16.5 13.35V7.65C16.5 6.80992 16.5 6.38988 16.3365 6.06901C16.1927 5.78677 15.9632 5.5573 15.681 5.41349C15.3601 5.25 14.9401 5.25 14.1 5.25H3.9C3.05992 5.25 2.63988 5.25 2.31901 5.41349C2.03677 5.5573 1.8073 5.78677 1.66349 6.06901C1.5 6.38988 1.5 6.80992 1.5 7.65V13.35C1.5 14.1901 1.5 14.6101 1.66349 14.931C1.8073 15.2132 2.03677 15.4427 2.31901 15.5865C2.63988 15.75 3.05992 15.75 3.9 15.75Z"
                stroke="#E9E9E9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            {role === "Business" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
              >
                <circle
                  cx="6.5"
                  cy="7"
                  r="5.5"
                  fill="url(#paint0_linear_4764_13382)"
                  stroke="url(#paint1_linear_4764_13382)"
                  stroke-width="2"
                />
                <circle
                  cx="6.5"
                  cy="7"
                  r="5"
                  fill="url(#paint2_linear_4764_13382)"
                  stroke="#202020"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4764_13382"
                    x1="18.7777"
                    y1="-41.5333"
                    x2="-20.0928"
                    y2="-36.1122"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4764_13382"
                    x1="18.7777"
                    y1="-41.5333"
                    x2="-20.0928"
                    y2="-36.1122"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_4764_13382"
                    x1="16.8888"
                    y1="-34.0667"
                    x2="-16.0016"
                    y2="-29.4796"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#009BD2" />
                    <stop offset="1" stop-color="#3B6B7C" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="8" cy="8" r="7.5" stroke="#202020" fill="none" />
              </svg>
            )}
          </Flex>
          <div className="role-card-text">Managing personal crypto assets.</div>
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
