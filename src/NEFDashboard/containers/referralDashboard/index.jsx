import React, { useEffect, useState } from "react";
import { Card, Col, Dropdown, Flex, Input, Row } from "antd";
import BalanceGraph from "../../components/balanceGraph";
import Roles from "../../components/roles";
import IncomeCard from "../../components/incomeCard";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import {
  checkJwtToken,
  formatTokenBalance,
  formatUSDBalance,
} from "../../../utils";
import DeactivateIcon from "../../../assets/newDashboardIcons/deactivate-gray.svg";
import EditIcon from "../../../assets/newDashboardIcons/edit-gray.svg";
import DeleteIcon from "../../../assets/newDashboardIcons/delete-gray.svg";
import MenuIcon from "../../../assets/newDashboardIcons/menu-dots.svg";
import ActiveIcon from "../../../assets/newDashboardIcons/active.svg";
import InactiveIcon from "../../../assets/newDashboardIcons/inactive.svg";
import TableData from "../../components/tableData";
import backendAPI from "../../../api/backendAPI";
import moment from "moment";
import { useTheme } from "../../../context/themeContext/themeContext";
import { useAuth } from "../../../context/auth/authContext";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { ROLE_TO_NAME } from "../../../constants";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import "./referralDashboard.css";

const ReferralDashboard = ({ type }) => {
  const { t, i18n } = useTranslation();

  const { language } = i18n;
  const { theme } = useTheme();
  const backend_Api = new backendAPI();
  const adminApi = new adminDashboardApi(type);
  const dashboardApi = new vendorDashboardApi();
  const { user, setUser, currencyRate } = useAuth();
  const [users, setUsers] = useState([]);
  const [limitedList, setLimitedList] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [dataLength, setDataLength] = useState(6);
  const [page, setPage] = useState(1);
  const [graphData, setGraphData] = useState();
  const [search, setSearch] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const labels = {
    Monday: t("dashboard.charts.days.monday"),
    Tuesday: t("dashboard.charts.days.tuesday"),
    Wednesday: t("dashboard.charts.days.wednesday"),
    Thursday: t("dashboard.charts.days.thursday"),
    Friday: t("dashboard.charts.days.friday"),
    Saturday: t("dashboard.charts.days.saturday"),
    Sunday: t("dashboard.charts.days.sunday"),
  };

  const incomeCards = [
    {
      title: "referralDashboard.incomeCards.last30DaysTitle",
      subText: "referralDashboard.incomeCards.last30DaysSubText",
    },
    {
      title: "referralDashboard.incomeCards.last24HoursTitle",
      subText: "referralDashboard.incomeCards.last24HoursSubText",
    },
    {
      title: "referralDashboard.incomeCards.paymentCardTitle",
      subText: "referralDashboard.incomeCards.paymentCardSubText",
    },
    {
      title: "referralDashboard.incomeCards.registrationCardTitle",
      subText: "referralDashboard.incomeCards.registrationCardSubText",
    },
  ];

  useEffect(() => {
    fetchProfile();
    fetchIncomeDetails();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [dataLength, page]);

  useEffect(() => {
    fetchGraphData();
  }, [language, theme, user]);

  const fetchProfile = async () => {
    const response = await backend_Api.getProfile();
    setUser({ ...response });
  };

  const fetchGraphData = async () => {
    await checkJwtToken();
    const response = await backend_Api.getUserWalletsBalanceForGraph();
    response.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });

    // Object to store aggregated results
    const aggregatedData = {};

    // Iterate through the array
    response.forEach((item) => {
      const { createdAt, amount } = item;

      if (aggregatedData[moment(createdAt).format("DD-MM-YYYY")]) {
        // If the date exists, add the amounts
        aggregatedData[moment(createdAt).format("DD-MM-YYYY")].amount += amount;
      } else {
        // If the date doesn't exist, create a new entry
        aggregatedData[moment(createdAt).format("DD-MM-YYYY")] = {
          createdAt,
          amount,
        };
      }
    });

    // Convert the aggregated data back to an array
    const result = Object.values(aggregatedData);

    // If the length of user balances array is greater than 7 then it should be slice
    const limitedDateList = result?.length > 7 ? result.splice(0, 7) : result;

    setGraphData(
      limitedDateList?.map((value) => ({
        ...value,
        label: moment(value?.createdAt).format("MMM DD"),
      })),
    );
  };

  const fetchUsers = async (keyword = search, current = page) => {
    const res = await adminApi.getUsers(
      (current - 1) * dataLength,
      dataLength,
      keyword?.trim()?.toLowerCase(),
    );
    setTotalUsers(parseInt(res.count));
    setUsers(res.users);
  };

  const fetchIncomeDetails = async () => {
    const getPromises = [
      dashboardApi.getTotalIncome(),
      adminApi.getTotalIncome(),
      adminApi.getNumOrders(),
      adminApi.getTotalRegistrations(),
    ];

    const [totalIncomes, dataInc, dataOrders, dataReg] =
      await Promise.allSettled(getPromises);
    setIncome(totalIncomes?.value["total"]?.number);
    setCardDetails(
      incomeCards?.map((card, index) => ({
        ...card,
        ...(index == 0
          ? totalIncomes?.value["last30Days"]
          : index == 1
          ? totalIncomes?.value["last24Hours"]
          : index == 2
          ? dataOrders?.value
          : dataReg?.value),
      })),
    );
  };

  const updateStatus = async () => {
    let resp;
    if (selectedUser?.activated)
      resp = await adminApi.deactivateUser(selectedUser?.email);
    else resp = await adminApi.patchStatus(selectedUser?.email);
    if (resp) fetchUsers();
  };

  const deleteUser = async () => {
    const resp = await adminApi.deleteUser(selectedUser?.email);
    if (resp) {
      fetchUsers();
    }
  };

  const items = [
    {
      key: "2",
      label: (
        <div className="default-text user-table-menu-width">
          {" "}
          {t("referralDashboard.userTableMenu.edit")}
        </div>
      ),
      icon: <img src={EditIcon} alt="edit" />,
    },
    {
      key: "3",
      label: (
        <div
          className="default-text user-table-menu-width"
          onClick={deleteUser}
        >
          {" "}
          {t("referralDashboard.userTableMenu.delete")}
        </div>
      ),
      icon: <img src={DeleteIcon} alt="delete" />,
    },
  ];

  const columns = [
    {
      title: t("dashboard.tableHeaders.name"),
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["ascend", "descend"],
      render: (_, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <div className="default-text">
                {record?.firstName + " " + record?.lastName}
              </div>
              <div className="default-text-gray">{record?.email}</div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("dashboard.tableHeaders.roles"),
      dataIndex: "roles",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.roles - b.roles,
      render: (roles, record) => {
        return <div className="default-text">{ROLE_TO_NAME[roles[0]]}</div>;
      },
    },
    {
      title: t("dashboard.tableHeaders.status"),
      dataIndex: "activated",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.activated - b.activated,
      render: (activated, record) => {
        return activated ? (
          <Flex align="center" gap={3} className="status-container">
            <img src={ActiveIcon} />
            <div>Active</div>
          </Flex>
        ) : (
          <Flex align="center" gap={3} className="status-container">
            <img src={InactiveIcon} />
            <div>Inactive</div>
          </Flex>
        );
      },
    },
    {
      title: t("dashboard.tableHeaders.income"),
      dataIndex: "income",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.income - b.income,
      render: (income, record) => {
        return <div>${income}</div>;
      },
    },
    {
      title: t("dashboard.tableHeaders.agent"),
      dataIndex: "agent",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.agent - b.agent,
      render: (agent, record) => {
        return <div>{agent}</div>;
      },
    },
    {
      title: t("dashboard.tableHeaders.joinedOn"),
      dataIndex: "createdAt",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (createdAt, record) => {
        return (
          <div>
            <div>{moment(createdAt).format("MMM DD YYYY")}</div>
            <div className="default-text-gray">
              {moment(createdAt).format("hh:mm A")}
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      render: (_, record) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div
                      className="default-text user-table-menu-width"
                      onClick={updateStatus}
                    >
                      {t(
                        `referralDashboard.userTableMenu.${
                          record?.activated ? "deactivate" : "activate"
                        }`,
                      )}
                    </div>
                  ),
                  icon: <img src={DeactivateIcon} alt="deactivate" />,
                },
                ...items,
              ],
            }}
            overlayClassName="user-table-menu"
            trigger={["click"]}
            onOpenChange={(e) => setSelectedUser(record)}
          >
            <div className="table-menu-icon cursor-pointer">
              <img src={MenuIcon} alt="menu" width={20} height={20} />
            </div>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={32} className="referral-dashboard">
      <Flex gap={20}>
        <Flex
          vertical
          justify="center"
          gap={16}
          className="referral-income-container"
        >
          <Flex align="center" justify="space-between" flex={2}>
            <div className="referral-income-title">
              {t("referralDashboard.graphTitle")}
            </div>
            <div className="referral-income-value">
              ${formatUSDBalance(income)}
            </div>
          </Flex>
          {/* <div> */}
          <BalanceGraph graphData={graphData} />
          {/* </div> */}
        </Flex>

        <Roles type={type} fetchUsers={fetchUsers} />
      </Flex>
      {/* Income Component*/}
      <Flex
        align="center"
        justify="space-between"
        gap={16}
        className="income-card-container"
      >
        {cardDetails?.length > 0 &&
          cardDetails?.map((card, index) => (
            <IncomeCard card={card} key={index} />
          ))}
      </Flex>

      {/* User Management Table*/}
      <div className="user-table-container">
        <Row align={"middle"} justify={"space-between"}>
          <div className="user-table-title">
            {t("referralDashboard.userManagement")}
          </div>
          <Input
            placeholder={t("personalDashboard.searchPlaceholder")}
            prefix={<img src={SearchIcon} />}
            className="user-table-searchbar"
            onKeyUp={(e) => e?.key == "Enter" && fetchUsers(e.target.value)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Row>
        <TableData
          data={users}
          // togglebtn={loader}
          dataLength={dataLength}
          setDataLength={setDataLength}
          setPage={setPage}
          columns={columns}
          total={totalUsers}
          current={page}
        />
      </div>
    </Flex>
  );
};

export default ReferralDashboard;
