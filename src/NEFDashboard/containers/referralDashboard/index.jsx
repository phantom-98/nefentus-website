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
  getRole,
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
import "./referralDashboard.css";
import userColumns from "./userColumns";
import { graphDataToList } from "../../../utils";

const ReferralDashboard = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { theme } = useTheme();
  const backend_Api = new backendAPI();
  const { user, setUser, currencyRate } = useAuth();

  const adminApi = new adminDashboardApi(
    user?.roles?.length > 0 && getRole(user) == ""
      ? user.roles[0]
      : getRole(user),
  );
  const [users, setUsers] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [dataLength, setDataLength] = useState(6);
  const [page, setPage] = useState(1);
  const [graphData, setGraphData] = useState();
  const [search, setSearch] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [update, setUpdate] = useState(false);

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
    if (user.roles) fetchIncomeDetails();
  }, [user]);

  useEffect(() => {
    if (!update) setSelectedUser({});
  }, [update]);

  useEffect(() => {
    if (user.roles) fetchUsers();
  }, [user, dataLength, page]);

  useEffect(() => {
    if (user.roles) fetchGraphData();
  }, [user, language, theme, currencyRate]);

  const fetchGraphData = async () => {
    await checkJwtToken();
    const data = await adminApi.getTotalIncomesPerDay();
    setGraphData(graphDataToList(data));
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
      adminApi.getTotalRegistrations(),
      adminApi.getTotalIncome(),
    ];

    const [dataReg, dataInc] = await Promise.allSettled(getPromises);

    setIncome(dataInc?.value["total"]?.number);
    setCardDetails(
      incomeCards?.map((card, index) => ({
        ...card,
        ...(index == 0
          ? dataInc?.value["last30Days"]
          : index == 1
          ? dataInc?.value["last24Hours"]
          : index == 2
          ? dataInc?.value["numberOfPayments"]
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

  const updateUser = () => setUpdate(true);

  const columns = userColumns(
    t,
    updateStatus,
    deleteUser,
    setSelectedUser,
    currencyRate,
    updateUser,
  );

  const fetchData = () => {
    fetchUsers("", 1);
  };

  return (
    <Flex vertical gap={32} className="referral-dashboard">
      <Flex gap={20}>
        <Flex
          vertical
          justify="center"
          gap={16}
          className="referral-income-container"
        >
          <Flex
            align="center"
            justify="space-between"
            flex={2}
            className="referral-dashboard-income-title"
          >
            <div className="referral-income-title">
              {t("referralDashboard.graphTitle")}
            </div>
            <div className="referral-income-value">
              {currencyRate?.symbol +
                formatUSDBalance(+income * currencyRate?.rate)}
            </div>
          </Flex>
          {/* <div> */}
          <BalanceGraph
            graphData={
              graphData?.length > 0
                ? graphData
                : [{ label: moment().format("MMM DD"), amount: 0 }]
            }
          />
          {/* </div> */}
        </Flex>
        <div className="roles-card-container">
          {user?.roles?.length > 0 && (
            <Roles
              fetchData={fetchData}
              selectedUser={selectedUser}
              update={update}
              setUpdate={setUpdate}
            />
          )}
        </div>
      </Flex>
      {/** Income container that is viewed only for tab and mobile view */}
      <Flex gap={20} className="tab-view-income-container">
        <div className="tabview-roles-card">
          <Roles
            fetchData={fetchData}
            selectedUser={selectedUser}
            update={update}
            setUpdate={setUpdate}
          />
        </div>
        <div>
          {Array.from({ length: Math.ceil(cardDetails?.length / 2) }).map(
            (_, rowIndex) => (
              <Row
                key={rowIndex}
                gutter={[16, 16]}
                className="tabview-income-card-container"
              >
                {cardDetails
                  ?.slice(rowIndex * 2, (rowIndex + 1) * 2)
                  .map((record, index) => (
                    <Col key={`cell-${index}`} span={12}>
                      <IncomeCard
                        card={record}
                        key={index}
                        isLast={rowIndex == 1}
                      />
                    </Col>
                  ))}
              </Row>
            ),
          )}
        </div>
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
            <IncomeCard
              card={card}
              key={index}
              isLast={
                index === cardDetails?.length - 1 ||
                index === cardDetails?.length - 2
              }
            />
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
