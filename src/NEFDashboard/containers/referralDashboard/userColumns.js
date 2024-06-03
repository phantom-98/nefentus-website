import React from "react";
import { Row, Col, Dropdown } from "antd";
import moment from "moment";
import DeactivateIcon from "../../../assets/newDashboardIcons/deactivate-gray.svg";
import EditIcon from "../../../assets/newDashboardIcons/edit-gray.svg";
import DeleteIcon from "../../../assets/newDashboardIcons/delete-gray.svg";
import MenuIcon from "../../../assets/newDashboardIcons/menu-dots.svg";
import ActiveIcon from "../../../assets/newDashboardIcons/active.svg";
import InactiveIcon from "../../../assets/newDashboardIcons/inactive.svg";
import { ROLE_TO_NAME } from "../../../constants";
import "./referralDashboard.css";
import { formatUSDBalance } from "../../../utils";

const userColumns = (
  t,
  updateStatus,
  deleteUser,
  setSelectedUser,
  currencyRate,
) => [
  {
    title: t("dashboard.tableHeaders.name"),
    dataIndex: "firstName",
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    sortDirections: ["ascend", "descend"],
    fixed: "left",
    render: (_, record) => (
      <Row align={"middle"} gutter={6}>
        <Col>
          <div className="default-text">
            {record?.firstName + " " + record?.lastName}
          </div>
          <div className="default-text-gray">{record?.email}</div>
        </Col>
      </Row>
    ),
  },
  {
    title: t("dashboard.tableHeaders.roles"),
    dataIndex: "roles",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.roles - b.roles,
    render: (roles) => (
      <div className="default-text">{ROLE_TO_NAME[roles[0]]}</div>
    ),
  },
  {
    title: t("dashboard.tableHeaders.status"),
    dataIndex: "activated",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.activated - b.activated,
    render: (activated) => (
      <div className="status-container">
        {activated ? (
          <div className="active">
            <img src={ActiveIcon} alt="active" />
            <div>Active</div>
          </div>
        ) : (
          <div className="inactive">
            <img src={InactiveIcon} alt="inactive" />
            <div>Inactive</div>
          </div>
        )}
      </div>
    ),
  },
  {
    title: t("dashboard.tableHeaders.income"),
    dataIndex: "income",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.income - b.income,
    render: (income) => (
      <div className="user-table-empty-column">
        {currencyRate?.symbol + formatUSDBalance(income * currencyRate?.rate)}
      </div>
    ),
  },
  {
    title: t("dashboard.tableHeaders.agent"),
    dataIndex: "agent",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.agent - b.agent,
    render: (agent) => <div className="user-table-empty-column">{agent}</div>,
  },
  {
    title: t("dashboard.tableHeaders.joinedOn"),
    dataIndex: "createdAt",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.createdAt - b.createdAt,
    render: (createdAt) => (
      <div>
        <div>{moment(createdAt).format("MMM DD YYYY")}</div>
        <div className="default-text-gray">
          {moment(createdAt).format("hh:mm A")}
        </div>
      </div>
    ),
  },
  {
    title: "",
    render: (_, record) => (
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
            {
              key: "2",
              label: (
                <div className="default-text user-table-menu-width">
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
                  {t("referralDashboard.userTableMenu.delete")}
                </div>
              ),
              icon: <img src={DeleteIcon} alt="delete" />,
            },
          ],
        }}
        overlayClassName="user-table-menu"
        trigger={["click"]}
        onOpenChange={() => setSelectedUser(record)}
      >
        <div className="table-menu-icon cursor-pointer">
          <img src={MenuIcon} alt="menu" width={20} height={20} />
        </div>
      </Dropdown>
    ),
  },
];

export default userColumns;
