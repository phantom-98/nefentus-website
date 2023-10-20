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

const Roles = ({ data, userCnt, type, setIsReloadData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);

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
      setErrorMessage("First name is required");
      return;
    }
    if (lastName === "") {
      setErrorMessage("Last name is required");
      return;
    }
    if (email === "" && editEmailAddress === null) {
      setErrorMessage("Email is required");
      return;
    }
    if (password === "" && editEmailAddress === null) {
      setErrorMessage("Password is required");
      return;
    }
    if (role === "") {
      setErrorMessage("Role is required");
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
        setInfoMessage("User updated successfully!");
      } else {
        setErrorMessage("Could not update user!");
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
          setInfoMessage("User added successfully!");
          return;
        } else if (resp.status === 409) {
          setErrorMessage("User already exists!");
          return;
        }
      }

      setErrorMessage("Could not add user!");
    }
  };

  return (
    <>
      <Card>
        <div className={styles.title}>Registrations Roles</div>

        <div className={styles.lineGroup}>
          <div className={styles.lineWrapper}>
            {data.map((item) => (
              <div
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
            <p>Total</p>
            <p>{userCnt}</p>
          </div>

          <div className={styles.legendBody}>
            {data.map((item) => (
              <div className={styles.legend}>
                <div className={styles.left}>
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: item.color }}
                  ></div>

                  <p>{item.legend}</p>
                </div>

                <div className={styles.right}>
                  <p>{item.num}</p>
                  <p>{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={modalAddUser}>Add User</Button>

          {type !== "partner" && (
            <div style={{ marginTop: "1.5rem" }}>
              <Button color="light" link={"/dashboard/kyc"}>
                KYC Requests
              </Button>
            </div>
          )}
        </div>
      </Card>

      <>
        <div className={styles.modalWrapper}>
          {openModal && (
            <ModalOverlay>
              <div className={styles.modal}>
                <MessageComponent />

                <h4>{editEmailAddress ? "Edit" : "Create"} User</h4>

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
                      label="Role*"
                      value={role}
                      options={[
                        "Vendor",
                        "Affiliate",
                        "Broker",
                        "Senior Broker",
                      ]}
                      dashboard
                      setValue={setRole}
                    />
                  )}
                  {type === "seniorbroker" && (
                    <Options
                      label="Role*"
                      value={role}
                      options={["Vendor", "Affiliate", "Broker"]}
                      dashboard
                      setValue={setRole}
                    />
                  )}
                  {type === "broker" && (
                    <Options
                      label="Role*"
                      value={role}
                      options={["Vendor", "Affiliate"]}
                      dashboard
                      setValue={setRole}
                    />
                  )}
                </div>
                <div className={styles.modalButtons}>
                  <div
                    className={styles.button}
                    onClick={() => {
                      clearMessages();
                      clearAddUserFields();
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </div>
                  <Button onClick={addUser} color="white">
                    {editEmailAddress ? "Edit" : "Create"} User
                  </Button>
                </div>
              </div>
            </ModalOverlay>
          )}
        </div>
      </>
    </>
  );
};

export default Roles;
