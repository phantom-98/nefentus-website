import { useContext, useEffect, useState } from "react";
import AdminBody from "../components/adminBody/adminBody";
import EarningCards from "../components/earningCards/earningCards";
import Table from "../components/table/table";
import TableAction from "../components/tableAction/tableAction";
import TableSearch from "../components/tableSearch/tableSearch";
import TableStatus from "../components/tableStatus/tableStatus";
import adminDashboardApi from "../../api/adminDashboardApi";
import { formatUSDBalance } from "../../utils";
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

const colSizes = [2, 1, 2, 1, 1, 2, 1, 2];

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
  const { t } = useTranslation();

  const label = [
    t("dashboard.tableHeaders.name"),
    t("dashboard.tableHeaders.roles"),
    t("dashboard.tableHeaders.email"),
    t("dashboard.tableHeaders.status"),
    t("dashboard.tableHeaders.income"),
    t("dashboard.tableHeaders.joinedOn"),
    t("dashboard.tableHeaders.earnings"),
    t("dashboard.tableHeaders.actions"),
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(null);
  const [role, setRole] = useState("");
  const [users, setUsers] = useState();
  const [getDataInput, setGetDataInput] = useState("");
  const [dataPage, setDataPage] = useState(1);
  const [dataSize, setDataSize] = useState(10);
  const [getFilteredUser, setGetFilteredUser] = useState();
  const [searchTrigger, setSearchTrigger] = useState(false);

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  const navigate = useNavigate();
  const adminApi = new adminDashboardApi(type);
  const userRole = getRole(localStorage);
  console.log("adminDash: " + userRole);
  const affiliate = type === "affiliate";

  useEffect(() => {
    fetchAdminData();
    fetchAdminUsersData();

    clearMessages();
  }, [isReloadData]);

  const fetchAdminData = async () => {
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

      // console.log(
      //   dataReg,
      //   dataClick,
      //   dataOrders,
      //   dataInc,
      //   dataUsers,
      //   reportResp,
      //   totalPricePerDate,
      // );

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
      const regRoleGraphData = reportResp.value.map((item) => {
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

      setGraphData(totalPricePerDate.value);
    }
  };

  const fetchAdminUsersData = async () => {
    const result = await adminApi.checkPermission();
    if (result !== true) {
      navigate("/login");
    } else {
      const dataUsers = await adminApi.getUsers();

      dataUsers.reverse();
      setUsers(dataUsers);
      updateUsers(dataUsers);
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
    const newUserData = await adminApi.getUsers();
    newUserData.reverse();

    if (dataUsers) {
      const filteredData = newUserData.filter((item) => {
        return dataUsers.some((user) => item.id === user.id);
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
        updateUsersTable(dataUsers);
      } else {
        setErrorMessage(t("messages.error.updateUser"));
      }
    } else {
      // Add
      const resp = await adminApi.addUser(firstName, lastName, email, role);
      if (resp) {
        if (resp.ok) {
          setOpenModal(false);
          fetchAdminData();
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
        formatUSDBalance(user.income),
        moment(user.createdAt).format("MMM D YYYY, HH:mm:ss"),
        `$${user.income}`,
        <TableAction
          button={
            user.activated ? t("general.deactivate") : t("general.activate")
          }
          onClick={() => updateStatusUser(user.email, user.activated)}
          editUser={() => editUser(user)}
          deleteUser={() => deleteUser(user.email)}
        />,
      ]);
      setTableData(newDataUsers);
      setSearchTrigger(false);
    }
  }

  const clearAddUserFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
  };

  useEffect(() => {
    if (searchTrigger)
      updateUsers(getFilteredUser?.length > 0 ? getFilteredUser : users);
  }, [searchTrigger]);

  const findUser = () => {
    const filteredData = users?.filter((item) => {
      return (
        item?.email
          ?.toLowerCase()
          .includes(getDataInput.trim().toLowerCase()) ||
        item?.firstName
          ?.toLowerCase()
          .includes(getDataInput.trim().toLowerCase()) ||
        item?.lastName
          ?.toLowerCase()
          .includes(getDataInput.trim().toLowerCase()) ||
        String(item?.createdAt)?.toLowerCase().includes(getDataInput.trim()) ||
        String(item?.income)
          ?.toLowerCase()
          .includes(getDataInput.trim().toLowerCase()) ||
        item?.roles[0]
          ?.toLowerCase()
          .includes(getDataInput.trim().toLowerCase())
      );
    });
    setGetFilteredUser(filteredData);
    setDataPage(0);
    setSearchTrigger(true);
  };

  const paginatedData = tableData.filter((item, index) => {
    if (index >= dataPage * dataSize && index < dataPage * dataSize + dataSize)
      return true;
    return false;
  });

  const closeModal = () => {
    clearMessages();
    clearAddUserFields();
    setOpenModal(false);
    updateUsersTable(getFilteredUser);
  };

  return (
    <div>
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
            users={tableData}
            setFiltered={tableData}
            setGetDataInput={setGetDataInput}
            findUser={findUser}
            getDataInput={getDataInput}
          />
          <Table
            grid="1.2fr 0.9fr 1.5fr 1fr 0.9fr 1fr 0.6fr 1.2fr"
            label={label}
            data={paginatedData}
          />

          <>
            <TablePagination
              data={tableData}
              setDataPage={setDataPage}
              setDataSize={setDataSize}
              colSizes={colSizes}
              searchTrigger={searchTrigger}
              dataPage={dataPage}
              striped
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
            />
          )}
        </div>
      </>
      <SignupByEmail />
    </div>
  );
};

export default AdminDashboard;
