import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Flex, Row, Typography } from "antd";
import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import "./roles.css";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { ROLE_TO_NAME } from "../../../constants";
import { useTranslation } from "react-i18next";
import AddUser from "../addUser";
import { useAuth } from "../../../context/auth/authContext";
import { getRole } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../context/message";
import CopyIcon from "../../../assets/newDashboardIcons/copyIcon.svg";

const role_colors = {
  leader: "#078BB9",
  seniorbroker: "#1F7369",
  broker: "#C09A15",
  vendor: "#8543DA",
  admin: "#ED9001",
  private: "#4a320f",
};
const role_order = {
  leader: 4,
  seniorbroker: 3,
  broker: 2,
  vendor: 1,
  admin: 5,
};

const Roles = ({ fetchData, selectedUser, update, setUpdate }) => {
  const { Title, Text, Paragraph } = Typography;
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const link = window.location.origin + "?ref=" + user?.affiliateLink;
  const adminApi = new adminDashboardApi(
    user?.roles?.length > 0 && getRole(user) == ""
      ? user.roles[0]
      : getRole(user),
  );
  const { setSuccessMessage } = useContext(MessageContext);
  const [totalRoles, setTotalRoles] = useState(0);
  const [roleList, setRoleList] = useState([]);
  const [open, setOpen] = useState(false);

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    setSuccessMessage(t("general.copied"));
  };

  useEffect(() => {
    if (Object.keys(user)?.length) fetchUserRoles();
  }, [user]);

  useEffect(() => {
    window.innerWidth <= 1024
      ? Object.keys(selectedUser)?.length &&
        navigate("/add-user", { state: { selectedUser: selectedUser } })
      : setOpen(update);
  }, [update, selectedUser]);

  const fetchUserRoles = async () => {
    const response = await adminApi.getRoleReport();
    // Removing affiliate from role list, colors assign to roles and role list has set in state
    if (response?.length) {
      setRoleList(
        response
          ?.filter((roleData) => roleData?.role != "affiliate")
          ?.map((data) => ({
            ...data,
            role: ROLE_TO_NAME[data?.role],
            color: role_colors[data?.role],
            order: role_order[data?.role],
          }))
          .sort((a, b) => b.order - a.order),
      );
      setTotalRoles(
        response
          ?.map((role) => role?.count)
          ?.reduce((prev, cur) => prev + cur, 0),
      );
    }
  };

  const handleSubmit = async () => {
    fetchData();
    fetchUserRoles();
    setOpen(!open);
    setUpdate(false);
  };

  return (
    <>
      {open && (
        <AddUser
          open={open}
          handleSubmit={handleSubmit}
          onClose={() => {
            setUpdate(false);
            setOpen(!open);
          }}
          selectedUser={selectedUser}
        />
      )}
      <Card
        className="roles-card"
        title={
          <div className="default-text-gray common-role-style">
            {t("referralDashboard.rolesTitle")}
          </div>
        }
        extra={
          <Button
            className=" default-text add-role-button"
            icon={<img src={AddIcon} />}
            onClick={() =>
              window.innerWidth <= 1024
                ? navigate("/add-user", {
                    state: { selectedUser: selectedUser },
                  })
                : setOpen(true)
            }
          >
            {t("referralDashboard.addUser")}
          </Button>
        }
      >
        <Flex vertical justify="space-between" className="roles-card-body">
          <Flex vertical justify="center" gap={8}>
            <Flex
              align="center"
              gap={6}
              className="default-text common-role-style"
            >
              <div>{t("dashboard.total")} :</div>
              <div>{totalRoles}</div>
            </Flex>
            <div className="roles-line-bar-graph">
              {roleList.map((data, index) =>
                data?.count ? (
                  <div
                    className="roles-line-bar-graph-section"
                    style={{
                      width: `${data?.percentage}%`,
                      backgroundColor: data?.color,
                    }}
                    key={index}
                  ></div>
                ) : null,
              )}
            </div>
          </Flex>
          <Flex vertical justify="center" gap={16}>
            <Flex
              align="center"
              justify="space-between"
              className="default-text-gray common-role-style"
            >
              <div>{t("referralDashboard.role")}</div>
              <div>{t("referralDashboard.amount")}</div>
              <div>%</div>
            </Flex>
            <Flex vertical gap={12}>
              {roleList?.map((data, index) => (
                <Row
                  align={"middle"}
                  justify={"space-between"}
                  key={index}
                  className="default-text common-role-style"
                >
                  <Col span={10}>
                    <Flex align="center" gap={8}>
                      <div
                        className="network-row-color"
                        style={{ background: data?.color }}
                      ></div>
                      <div>
                        {" "}
                        {t(`dashboard.roles.${data?.role.replaceAll(" ", "")}`)}
                      </div>
                    </Flex>
                  </Col>
                  <Col span={6} align={"middle"}>
                    {data?.count}
                  </Col>
                  <Col span={8} align={"end"}>
                    {data?.percentage}
                  </Col>
                </Row>
              ))}
            </Flex>
          </Flex>
          <div>
            <Text className="default-text-gray transaction-drawer-product-name">
              {t("dashboard.affiliateLink")}
            </Text>
            <Flex align="center" gap={8}>
              <Text
                className="default-text"
                style={{
                  width: "calc(100% - 100px)",
                  overflow: "hidden",
                  background: "#171717",
                  textWrap: "nowrap",
                  padding: "4px 15px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                }}
              >
                {link}
              </Text>
              <Button
                onClick={() => copyToClipboard(link)}
                style={{ background: "#202020", width: "100px" }}
              >
                <Flex gap={3} align="center">
                  <img src={CopyIcon} alt="copy-icon" />
                  <Text className="default-text">
                    {t("transactionDrawer.copy")}
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </div>
        </Flex>
      </Card>
    </>
  );
};

export default Roles;
