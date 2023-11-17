import { useContext, useState } from "react";
import Button from "../button/button";
import Card from "../card/card";

import styles from "./roles.module.css";
import imputStyles from "../../../components/input/input.module.css";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";
import MessageComponent from "../../../components/message";
import Input, { Options } from "../../../components/input/input";
import { MessageContext } from "../../../context/message";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { useTranslation } from "react-i18next";
import Popup from "../popup/popup";

const Roles = ({ data, userCnt, type, setIsReloadData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);
  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const adminApi = new adminDashboardApi(type);

  const modalAddUser = async () => {
    setEditEmailAddress(null);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");

    setOpenModal(true);
  };

  const clearAddUserFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const addUser = async () => {
    if (firstName === "") {
      setErrorMessage(t("messages.error.firstNameRequired"));
      return;
    }
    if (lastName === "") {
      setErrorMessage(t("messages.error.lastNameRequired"));
      return;
    }
    if (email === "" && editEmailAddress === null) {
      setErrorMessage(t("messages.error.emailRequired"));
      return;
    }
    if (password === "" && editEmailAddress === null) {
      setErrorMessage(t("messages.error.passwordRequired"));
      return;
    }
    if (role === "") {
      setErrorMessage(t("messages.error.roleRequired"));
      return;
    }

    if (editEmailAddress) {
      // Update
      const resp = await adminApi.updateUser(
        firstName,
        lastName,
        editEmailAddress,
        role,
      );
      if (resp) {
        setInfoMessage(t("messages.success.updateUser"));
      } else {
        setErrorMessage(t("messages.error.updateUser"));
      }
    } else {
      // Add
      const resp = await adminApi.addUser(
        firstName,
        lastName,
        email,
        password,
        role,
      );
      if (resp) {
        if (resp.ok) {
          setOpenModal(false);
          // fetchAdminData();
          setIsReloadData((prev) => !prev);
          clearAddUserFields();
          setInfoMessage(t("messages.success.addUser"));
          return;
        } else if (resp.status === 409) {
          setErrorMessage(t("messages.error.userExist"));
          return;
        }
      }

      setErrorMessage(t("messages.error.addUser"));
    }
  };

  return (
    <>
      <Card>
        <div className={styles.title}>{t("dashboard.registrationsRoles")}</div>

        <div className={styles.lineGroup}>
          <div className={styles.lineWrapper}>
            {data.map((item, index) => (
              <div
                key={index}
                className={styles.line}
                style={{
                  backgroundColor: item.color,
                  width: item.percentage + "%",
                }}
              ></div>
            ))}
          </div>

          <div className={styles.label}>
            <p>0%</p>
            <p>100%</p>
          </div>

          <div className={styles.total}>
            <p>{t("dashboard.total")}</p>
            <p>{userCnt}</p>
          </div>

          <div className={styles.legendBody}>
            {data.map((item, index) => (
              <div key={index} className={styles.legend}>
                <div className={styles.left}>
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: item.color }}
                  ></div>

                  <p>
                    {t(`dashboard.roles.${item.legend.replaceAll(" ", "")}`)}
                  </p>
                </div>

                <div className={styles.right}>
                  <p>{item.num}</p>
                  <p>{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={modalAddUser}>{t("dashboard.addUser")}</Button>

          {type !== "partner" && (
            <div style={{ marginTop: "1.5rem" }}>
              <Button color="light" link={"/dashboard/kyc"}>
                {t("dashboard.KYCRequests")}
              </Button>
            </div>
          )}
        </div>
      </Card>

      <>
        <div className={styles.modalWrapper}>
          <Popup
            show={openModal}
            onClose={() => {
              clearMessages();
              clearAddUserFields();
              setOpenModal(false);
            }}
            onConfirm={addUser}
            title={
              editEmailAddress
                ? t("dashboard.modal.titleEdit")
                : t("dashboard.modal.titleNewUser")
            }
            cancelTitle={t("general.cancel")}
            confirmTitle={
              editEmailAddress
                ? t("dashboard.modal.titleEdit")
                : t("dashboard.modal.titleNewUser")
            }
          >
            <div className={styles.modal}>
              <MessageComponent />

              <h4>
                {editEmailAddress
                  ? t("dashboard.modal.titleEdit")
                  : t("dashboard.modal.titleNewUser")}{" "}
                User
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
                  label={t("dashboard.roles.modal.email").concat("*")}
                  placeholder={t("dashboard.modal.emailPlaceholder")}
                  value={email}
                  setState={setEmail}
                  disabled={editEmailAddress !== null}
                />
                {editEmailAddress === null && (
                  <div className={imputStyles.inputWrapper}>
                    <p
                      className={`${imputStyles.label} ${imputStyles.dashboardLabel}`}
                    >
                      Password*
                    </p>

                    <div className={styles.passwordWrapper}>
                      <input
                        className={`${imputStyles.input} ${imputStyles.dashboardInput}`}
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
                    label={t("dashboard.modal.role").concat("*")}
                    value={role}
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
                    label={t("dashboard.modal.role").concat("*")}
                    value={role}
                    options={["Vendor", "Affiliate", "Broker", "Senior Broker"]}
                    dashboard
                    setValue={setRole}
                  />
                )}
                {type === "seniorbroker" && (
                  <Options
                    label={t("dashboard.modal.role").concat("*")}
                    value={role}
                    options={["Vendor", "Affiliate", "Broker"]}
                    dashboard
                    setValue={setRole}
                  />
                )}
                {type === "broker" && (
                  <Options
                    label={t("dashboard.modal.role").concat("*")}
                    value={role}
                    options={["Vendor", "Affiliate"]}
                    dashboard
                    setValue={setRole}
                  />
                )}
              </div>
            </div>
          </Popup>
        </div>
      </>
    </>
  );
};

export default Roles;
