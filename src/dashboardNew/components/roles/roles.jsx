import { useContext, useState } from "react";
import Button from "../button/button";
import Card from "../card/card";
import styles from "./roles.module.css";
import { MessageContext } from "../../../context/message";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { useTranslation } from "react-i18next";
import UserModal from "../userModal";
import { getRole } from "../../../utils";
import { useAuth } from "../../../context/auth/authContext";

/**
 *
 * @param type Type of the dashboard (admin or partner)
 * @returns
 */
const Roles = ({ data, userCnt, type, setIsReloadData }) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select Role");
  const [agentEmail, setAgentEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const userRole = getRole(user);
  const { t } = useTranslation();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const adminApi = new adminDashboardApi(type);

  const modalAddUser = async () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
    setAgentEmail("");

    setOpenModal(true);
  };

  const clearAddUserFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
    setAgentEmail("");
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
    if (email === "") {
      setErrorMessage(t("messages.error.emailRequired"));
      return;
    }
    if (password === "") {
      setErrorMessage(t("messages.error.passwordRequired"));
      return;
    }
    if (role === "" && userRole !== "affiliate") {
      setErrorMessage(t("messages.error.roleRequired"));
      return;
    }

    setSpinner(true);

    const resp = await adminApi.addUser(
      firstName,
      lastName,
      email,
      password,
      userRole === "affiliate" ? "Vendor" : role,
      agentEmail,
    );
    if (resp) {
      if (resp.ok) {
        setOpenModal(false);
        // fetchAdminData();
        setIsReloadData((prev) => !prev);
        clearAddUserFields();
        setInfoMessage(t("messages.success.addUser"));
      } else if (resp.status === 409) {
        setErrorMessage(t("messages.error.userExist"));
      } else {
        const data = await resp.json();
        if (data["firstName"]) {
          if (
            data["firstName"] ==
            "First name must be between 2 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validFirstName"));
          } else {
            setErrorMessage(t("messages.validation.firstName"));
          }
        } else if (data["lastName"]) {
          if (
            data["lastName"] == "Last name must be between 2 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validLastName"));
          } else {
            setErrorMessage(t("messages.validation.lastName"));
          }
        } else if (data["email"]) {
          if (data["email"] == "Please enter email") {
            setErrorMessage(t("messages.validation.email"));
          } else if (data["email"] == "Please enter valid email") {
            setErrorMessage(t("messages.validation.validEmail"));
          } else {
            setErrorMessage(t("messages.validation.lengthEmail"));
          }
        } else if (data["password"]) {
          if (data["password"] == "Please enter your password") {
            setErrorMessage(t("messages.validation.password"));
          } else if (
            data["password"] == "Password must be between 8 and 70 characters"
          ) {
            setErrorMessage(t("messages.validation.validPassword"));
          } else {
            setErrorMessage(t("messages.validation.securityPassword"));
          }
        } else if (data.message == "agent not found")
          setErrorMessage(t("messages.error.agent"));
        else setErrorMessage(t("messages.error.addUser"));
      }
    } else {
      setErrorMessage(t("messages.error.addUser"));
    }

    setSpinner(false);
  };

  const closeModal = () => {
    clearMessages();
    clearAddUserFields();
    setOpenModal(false);
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
          {openModal && (
            <UserModal
              openModal={openModal}
              userRole={userRole}
              clearFields={closeModal}
              addUser={addUser}
              operationType={"add"}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              role={role}
              setRole={setRole}
              password={password}
              setPassword={setPassword}
              spinner={spinner}
              agentEmail={agentEmail}
              setAgentEmail={setAgentEmail}
            />
          )}
        </div>
      </>
    </>
  );
};

export default Roles;
