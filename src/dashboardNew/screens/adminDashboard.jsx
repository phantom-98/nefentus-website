import { useContext, useEffect, useState } from "react";
import AdminBody from "../components/adminBody/adminBody";
import EarningCards from "../components/earningCards/earningCards";
import Table from "../components/table/table";
import TableAction from "../components/tableAction/tableAction";
import TableSearch from "../components/tableSearch/tableSearch";
import TableStatus from "../components/tableStatus/tableStatus";
import adminDashboardApi from "../../api/adminDashboardApi";
import { checkJwtToken, formatUSDBalance } from "../../utils";
import moment from "moment";
import UserModal from "../../dashboardNew/components/userModal";
import { MessageContext } from "../../context/message";
import { useNavigate } from "react-router-dom";
import { ROLE_TO_NAME } from "../../constants";
import { useTranslation } from "react-i18next";
import MessageComponent from "../../components/message";
import Input, { Options } from "../../components/input/input";
import styles from "./admin.module.css";
import TablePagination from "../../components/tablePagination";
import Popup from "../components/popup/popup";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { getRole } from "../../utils";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/auth/authContext";
import Pagination from "../../components/pagination";
import userEvent from "@testing-library/user-event";

const colSizes = [2, 1, 2, 2, 1, 1, 2, 1, 2];

const roleColors = {
  vendor: "#107CDF",
  affiliate: "#F5B51B",
  broker: "#23C215",
  seniorbroker: "#AF26E7",
  leader: "#1595c2",
  admin: "#808080",
};

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];
/**
 *
 * @param type Type of the dashboard (admin or partner)
 * @returns
 */
const AdminDashboard = ({ type }) => {
  const [cardInfo, setCardInfo] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [barContent, setBarContent] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isReloadData, setIsReloadData] = useState(false);
  const [totalRegUserCnt, setTotalRegUserCnt] = useState(0);
  const { t, i18n } = useTranslation();
  const { user, currencyRate } = useAuth();

  const label = [
    t("dashboard.tableHeaders.name"),
    t("dashboard.tableHeaders.roles"),
    t("dashboard.tableHeaders.email"),
    t("dashboard.tableHeaders.status"),
    t("dashboard.tableHeaders.income").concat("(" + currencyRate.symbol + ")"),
    t("dashboard.tableHeaders.joinedOn"),
    // t("dashboard.tableHeaders.earnings"),
    t("dashboard.tableHeaders.agent"),
    t("dashboard.tableHeaders.activate"),
    t("general.edit"),
    t("general.delete"),
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);
  const [role, setRole] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [users, setUsers] = useState();
  const [getDataInput, setGetDataInput] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const [dataPage, setDataPage] = useState(0);
  const [dataSize, setDataSize] = useState(10);
  const [spinner, setSpinner] = useState(false);
  const [graph, setGraph] = useState();

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const navigate = useNavigate();
  const adminApi = new adminDashboardApi(type);
  const userRole = getRole(user);
  const affiliate = type === "affiliate";

  useEffect(() => {
    fetchAdminData();
    fetchAdminUsersData();

    clearMessages();
  }, [isReloadData]);

  const fetchAdminData = async () => {
    await checkJwtToken();
    const result = await adminApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const getPromises = [
        adminApi.getTotalRegistrations(),
        adminApi.getTotalClicks(),
        adminApi.getNumOrders(),
        adminApi.getTotalIncome(),
        adminApi.getRoleReport(),
        adminApi.getTotalIncomesPerDay(),
      ];

      const [
        dataReg,
        dataClick,
        dataOrders,
        dataInc,
        reportResp,
        totalPricePerDate,
      ] = await Promise.allSettled(getPromises);

      const cardsContent = [
        {
          title: t("dashboard.admin.cardsContent.totalIncome"),
          amount: `${parseFloat(dataInc?.value?.number).toFixed(2)}$`,
          percentage: dataInc?.value?.percentage,
          isMonetary: true,
        },
        {
          title: t("dashboard.admin.cardsContent.clicks"),
          amount: dataClick?.value?.number,
          percentage: dataClick?.value?.percentage,
          isMonetary: false,
        },
        {
          title: t("dashboard.admin.cardsContent.registrations"),
          amount: dataReg?.value?.number,
          percentage: dataReg?.value?.percentage,
          isMonetary: false,
        },
      ];
      if (
        userRole === "admin" ||
        userRole === "leader" ||
        userRole === "seniorbroker" ||
        userRole === "broker"
      ) {
        cardsContent[1] = {
          title: t("dashboard.admin.cardsContent.orders"),
          amount: dataOrders?.value?.number,
          percentage: dataOrders?.value?.percentage,
          isMonetary: false,
        };
      }

      let total = 0;
      const regRoleGraphData = reportResp.value
        ?.filter((report) => report.role !== "affiliate")
        ?.map((item) => {
          total = total + item.count;

          return {
            color: roleColors[item.role],
            legend: ROLE_TO_NAME[item.role],
            num: item.count,
            percentage: item.percentage,
          };
        });

      setTotalRegUserCnt(total);

      setCardInfo(cardsContent);

      setBarContent(regRoleGraphData);
      setGraph(totalPricePerDate.value);
      let _graph = {};
      Object.keys(totalPricePerDate.value).forEach((key) => {
        _graph[key] = totalPricePerDate.value[key];
      });
      setGraphData(_graph);
    }
  };

  useEffect(() => {
    if (graph) {
      let _graph = {};
      Object.keys(graph).forEach((key) => {
        _graph[key] = graph[key] * currencyRate.rate;
      });
      setGraphData(_graph);
    }
    if (tableData) {
      const _table = tableData.map((item, index) => {
        const _item = item;
        _item[4] = formatUSDBalance(users[index].income * currencyRate.rate);
        return _item;
      });
      setTableData(_table);
    }
  }, [currencyRate]);

  const fetchAdminUsersData = async (clear) => {
    const result = await adminApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const res = await adminApi.getUsers(
        dataPage * dataSize,
        dataSize,
        clear ? "" : getDataInput.trim().toLowerCase(),
      );
      setDataLength(parseInt(res.count));
      setUsers(res.users);
      updateUsers(res.users);
      return res.users;
    }
  };

  const updateStatusUser = async (userEmail, activated, dataUsers) => {
    let resp;
    if (activated) resp = await adminApi.deactivateUser(userEmail);
    else resp = await adminApi.patchStatus(userEmail);
    if (resp) {
      updateUsersTable(dataUsers);
    }
  };

  const deleteUser = async (userEmail, dataUsers) => {
    const resp = await adminApi.deleteUser(userEmail);
    if (resp) {
      updateUsersTable(dataUsers);
    }
  };

  const updateUsersTable = async (dataUsers) => {
    const newUserData = await fetchAdminUsersData();

    if (dataUsers) {
      const filteredData = newUserData.filter((item) => {
        return dataUsers.some((user) => item.email === user.email);
      });

      updateUsers(filteredData);
    } else {
      updateUsers(newUserData);
    }
  };

  const editUser = async (user) => {
    setEditEmailAddress(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    // Only one role!
    setRole(ROLE_TO_NAME[user.roles[0]]);
    setAgentEmail(user.agent);

    setOpenModal(true);
  };

  const changeUser = async () => {
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
    if (role === "") {
      setErrorMessage(t("messages.error.roleRequired"));
      return;
    }

    if (agentEmail.toLowerCase() === user.email.toLowerCase()) {
      setErrorMessage(t("messages.error.agentYourself"));
      return;
    }

    setSpinner(true);

    if (editEmailAddress) {
      // Update
      const resp = await adminApi.updateUser(
        firstName,
        lastName,
        editEmailAddress,
        email,
        role,
        agentEmail,
      );
      if (resp) {
        if (resp.ok) {
          fetchAdminUsersData();
          setInfoMessage(t("messages.success.updateUser"));
          clearAddUserFields();
          closeModal();
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
              data["lastName"] ==
              "Last name must be between 2 and 70 characters"
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
          } else if (data["editEmail"]) {
            if (data["editEmail"] == "Please enter email") {
              setErrorMessage(t("messages.validation.email"));
            } else if (data["editEmail"] == "Please enter valid email") {
              setErrorMessage(t("messages.validation.validEmail"));
            } else {
              setErrorMessage(t("messages.validation.lengthEmail"));
            }
          } else if (data.message == "agent not found")
            setErrorMessage(t("messages.error.agent"));
          else if (data.message == "You are not allowed to update this user")
            setErrorMessage(t("messages.error.updatePermission"));
          else setErrorMessage(t("messages.error.updateUser"));
        }
      } else {
        setErrorMessage(t("messages.error.updateUser"));
      }
    } else {
      // Add
      const resp = await adminApi.addUser(
        firstName,
        lastName,
        email,
        role,
        agentEmail,
      );
      if (resp) {
        if (resp.ok) {
          setOpenModal(false);
          fetchAdminData();
          clearAddUserFields();
          setInfoMessage(t("messages.success.addUser"));
        } else if (resp.status === 409) {
          setErrorMessage(t("messages.error.userExist"));
        } else {
          const data = await resp.json();
          if (data.message == "agent not found")
            setErrorMessage(t("messages.error.agent"));
          else setErrorMessage(t("messages.error.addUser"));
        }
      } else {
        setErrorMessage(t("messages.error.addUser"));
      }
    }

    setSpinner(false);
  };

  function updateUsers(dataUsers) {
    if (dataUsers) {
      const newDataUsers = dataUsers?.map((user) => [
        `${user.firstName} ${user.lastName}`,
        user.roles
          .map((role) =>
            t(
              `dashboard.roles.${ROLE_TO_NAME[role.replace(" ", "")].replaceAll(
                " ",
                "",
              )}`,
            ),
          )
          .join(", "),
        user.email,
        user.activated ? (
          <TableStatus color="green">{t("general.active")}</TableStatus>
        ) : (
          <TableStatus color="red">{t("general.notActive")}</TableStatus>
        ),
        formatUSDBalance(user.income * currencyRate.rate),
        moment(user.createdAt).format("MMM D YYYY, HH:mm:ss"),
        // `$${user.income}`,
        user.agent,
        <div
          onClick={() => updateStatusUser(user.email, user.activated)}
          style={{ color: "#0784b5" }}
          className={styles.actionButton}
        >
          {user.activated ? t("general.deactivate") : t("general.activate")}
        </div>,
        <div onClick={() => editUser(user)} className={styles.actionButton}>
          {t("general.edit")}
        </div>,
        <div
          onClick={() => deleteUser(user.email)}
          style={{ color: "red" }}
          className={styles.actionButton}
        >
          {t("general.delete")}
        </div>,
      ]);
      setTableData(newDataUsers);
    }
  }

  const clearAddUserFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setEditEmailAddress(null);
  };

  const findUser = async (clear) => {
    dataPage == 0 ? fetchAdminUsersData(clear) : setDataPage(0);
  };

  useEffect(() => {
    findUser();
  }, [dataSize]);

  useEffect(() => {
    fetchAdminUsersData();
  }, [dataPage]);

  const closeModal = () => {
    clearMessages();
    clearAddUserFields();
    setOpenModal(false);
    updateUsers(users);
  };

  return (
    <div>
      <Helmet>
        <title>
          Nefentus | {t(`navigation.${type}`) + " " + t("navigation.dashboard")}
        </title>
      </Helmet>
      <EarningCards data={cardInfo} />
      <AdminBody
        data={barContent}
        chartData={graphData}
        userCnt={totalRegUserCnt}
        type={type}
        setIsReloadData={setIsReloadData}
      />
      <div>
        <div>
          <TableSearch
            title={t("dashboard.userManagement")}
            setGetDataInput={setGetDataInput}
            findUser={findUser}
            getDataInput={getDataInput}
          />
          <Table
            grid={`1.2fr 0.9fr 1.8fr 1fr 0.9fr 1.5fr 1.8fr ${
              i18n?.language == "en"
                ? "0.5fr 0.3fr 0.5fr"
                : i18n?.language == "de"
                ? "0.8fr 0.8fr 0.8fr"
                : "1fr 0.8fr 0.8fr"
            }`}
            label={label}
            data={tableData}
          />

          <>
            <Pagination
              dataLength={dataLength}
              dataSize={dataSize}
              setDataPage={setDataPage}
              setDataSize={setDataSize}
              dataPage={dataPage}
            />
          </>
        </div>
      </div>
      <>
        <div className={styles.modalWrapper}>
          {openModal && (
            <UserModal
              openModal={openModal}
              userRole={userRole}
              clearFields={closeModal}
              addUser={changeUser}
              operationType={"update"}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              role={role}
              setRole={setRole}
              spinner={spinner}
              editEmailAddress={editEmailAddress}
              agentEmail={agentEmail}
              setAgentEmail={setAgentEmail}
            />
          )}
        </div>
      </>
      <SignupByEmail />
    </div>
  );
};

export default AdminDashboard;
