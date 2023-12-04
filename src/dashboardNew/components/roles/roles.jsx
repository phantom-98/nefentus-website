import { useContext, useState } from "react";
import Button from "../button/button";
import Card from "../card/card";
import styles from "./roles.module.css";
import { MessageContext } from "../../../context/message";
import adminDashboardApi from "../../../api/adminDashboardApi";
import UserModal from "../userModal";

const Roles = ({ data, userCnt, type, setIsReloadData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select Role");
  const [openModal, setOpenModal] = useState(false);
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

  const closeModal = () => {
    clearMessages();
    clearAddUserFields();
    setOpenModal(false);
  };

  return (
    <>
      <Card>
        <div className={styles.title}>Registrations Roles</div>

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
            <p>Total</p>
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
            <UserModal
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
