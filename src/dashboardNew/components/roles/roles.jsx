import { useContext, useState } from "react";
import Button from "../button/button";
import Card from "../card/card";
import styles from "./roles.module.css";
import { MessageContext } from "../../../context/message";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { useTranslation } from "react-i18next";
import UserModal from "../userModal";

const Roles = ({ data, userCnt, type, setIsReloadData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select Role");
  const [openModal, setOpenModal] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);
  const userRole = localStorage.getItem("roles");
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
    if (role === "" && userRole !== "ROLE_AFFILIATE") {
      setErrorMessage(t("messages.error.roleRequired"));
      return;
    }

    if (editEmailAddress) {
      // Update
      const resp = await adminApi.updateUser(
        firstName,
        lastName,
        editEmailAddress,
        userRole === "ROLE_AFFILIATE" ? "Vendor" : role,
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
        userRole === "ROLE_AFFILIATE" ? "Vendor" : role,
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
              type={type}
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
            />
          )}
        </div>
      </>
    </>
  );
};

export default Roles;
