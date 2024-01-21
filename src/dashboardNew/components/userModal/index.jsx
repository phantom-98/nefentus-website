import React from "react";
import { useState } from "react";
import Button from "../button/button";
import imputStyles from "../../../components/input/input.module.css";
import Popup from "../popup/popup";
import MessageComponent from "../../../components/message";
import Input, { Options } from "../../../components/input/input";
import { useTranslation } from "react-i18next";
import styles from "./userModel.module.css";

const UserModal = ({
  openModal,
  userRole,
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
  const { t } = useTranslation();

  return (
    <Popup show={openModal}>
      <div className={styles.modal}>
        <MessageComponent />

        <h4>
          {operationType !== "add"
            ? t("dashboard.modal.edit_user")
            : t("dashboard.modal.create_user")}
        </h4>

        <div className={styles.modalInputs}>
          <Input
            dashboard
            label={t("dashboard.modal.firstName").concat("*")}
            placeholder={t("dashboard.modal.firstNamePlaceholder")}
            value={firstName}
            setState={setFirstName}
          />
          <Input
            dashboard
            label={t("dashboard.modal.lastName").concat("*")}
            placeholder={t("dashboard.modal.lastNamePlaceholder")}
            value={lastName}
            setState={setLastName}
          />
          <Input
            dashboard
            label={t("dashboard.modal.email").concat("*")}
            placeholder={t("dashboard.modal.emailPlaceholder")}
            value={email}
            setState={setEmail}
            disabled={editEmailAddress !== null}
          />
          {operationType === "add" && (
            <div className={styles.passwordContainer}>
              <p
                className={`${imputStyles.label} ${imputStyles.passwordLabel}`}
              >
                {t("dashboard.modal.password").concat("*")}
              </p>

              <div className={styles.passwordWrapper}>
                <input
                  className={combinedClassNames}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("dashboard.modal.passwordPlaceholder")}
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
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
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

          {userRole === "admin" && (
            <Options
              label={t("dashboard.modal.role").concat("*")}
              value={role}
              options={[
                t("dashboard.roles.Vendor"),
                t("dashboard.roles.Affiliate"),
                t("dashboard.roles.Broker"),
                t("dashboard.roles.SeniorBroker"),
                t("dashboard.roles.Leader"),
              ]}
              dashboard
              setValue={setRole}
            />
          )}
          {userRole === "leader" && (
            <Options
              label={t("dashboard.modal.role").concat("*")}
              value={role}
              options={[
                t("dashboard.roles.Vendor"),
                t("dashboard.roles.Affiliate"),
                t("dashboard.roles.Broker"),
                t("dashboard.roles.SeniorBroker"),
              ]}
              dashboard
              setValue={setRole}
            />
          )}
          {userRole === "seniorbroker" && (
            <Options
              label={t("dashboard.modal.role").concat("*")}
              value={role}
              options={[
                t("dashboard.roles.Vendor"),
                t("dashboard.roles.Affiliate"),
                t("dashboard.roles.Broker"),
              ]}
              dashboard
              setValue={setRole}
            />
          )}
          {userRole === "broker" && (
            <Options
              label={t("dashboard.modal.role").concat("*")}
              value={role}
              options={[
                t("dashboard.roles.Vendor"),
                t("dashboard.roles.Affiliate"),
              ]}
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
            {t("general.cancel")}
          </div>
          <Button onClick={addUser} color="white" width="10rem">
            {t("general.confirm")}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default UserModal;
