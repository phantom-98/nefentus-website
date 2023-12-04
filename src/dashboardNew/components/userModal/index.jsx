import React from "react";
import { useState } from "react";
import Button from "../button/button";
import imputStyles from "../../../components/input/input.module.css";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";
import MessageComponent from "../../../components/message";
import Input, { Options } from "../../../components/input/input";
import styles from "./userModel.module.css";

const UserModal = ({
  type,
  clearFields,
  addUser,
  operationType,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  role,
  setRole,
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);
  const combinedClassNames = `${imputStyles.input} ${imputStyles.dashboardInput}`;

  return (
    <ModalOverlay>
      <div className={styles.modal}>
        <MessageComponent />

        <h4>{operationType !== "add" ? "Edit" : "Create"} User</h4>

        <div className={styles.modalInputs}>
          <Input
            dashboard
            label="First name*"
            placeholder={"Enter first name"}
            value={firstName}
            setState={setFirstName}
          />
          <Input
            dashboard
            label="Last name*"
            placeholder={"Enter last name"}
            value={lastName}
            setState={setLastName}
          />
          <Input
            dashboard
            label="Email*"
            placeholder={"Enter email"}
            value={email}
            setState={setEmail}
            disabled={editEmailAddress !== null}
          />
          {operationType === "add" && (
            <div className={styles.passwordContainer}>
              <p
                className={`${imputStyles.label} ${imputStyles.passwordLabel}`}
              >
                Password*
              </p>

              <div className={styles.passwordWrapper}>
                <input
                  className={combinedClassNames}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Enter password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={styles.iconEye}
                  alt="View password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      style={{ fill: "white" }}
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {type === "admin" && (
            <Options
              label="Role*"
              value={role ? role : "Select Role"}
              options={[
                "Vendor",
                "Affiliate",
                "Broker",
                "Senior Broker",
                "Leader",
              ]}
              dashboard
              setValue={setRole}
            />
          )}
          {type === "leader" && (
            <Options
              label="Role*"
              value={role ? role : "Select Role"}
              options={["Vendor", "Affiliate", "Broker", "Senior Broker"]}
              dashboard
              setValue={setRole}
            />
          )}
          {type === "seniorbroker" && (
            <Options
              label="Role*"
              value={role ? role : "Select Role"}
              options={["Vendor", "Affiliate", "Broker"]}
              dashboard
              setValue={setRole}
            />
          )}
          {type === "broker" && (
            <Options
              label="Role*"
              value={role ? role : "Select Role"}
              options={["Vendor", "Affiliate"]}
              dashboard
              setValue={setRole}
            />
          )}
        </div>
        <div className={styles.modalButtons}>
          <div
            className={styles.cancelButton}
            onClick={() => {
              clearFields();
            }}
          >
            Cancel
          </div>
          <Button onClick={addUser} color="white">
            {operationType !== "add" ? "Edit" : "Create"} User
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default UserModal;
