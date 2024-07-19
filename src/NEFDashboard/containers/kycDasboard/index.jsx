import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import "./kycDashboard.css";
import TableData from "../../components/tableData";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { useAuth } from "../../../context/auth/authContext";
import { getRole } from "../../../utils";
import moment from "moment";
import ModalLevel1 from "../../components/settingComponents/identificationSection/modalLevel1";
import ModalLevel2 from "../../components/settingComponents/identificationSection/modalLevel2";
import ModalLevel3 from "../../components/settingComponents/identificationSection/modalLevel3";

const KycDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const adminApi = new adminDashboardApi(
    user.roles && getRole(user) == "" ? user?.roles[0] : getRole(user),
  );
  const [kycRequests, setKycRequests] = useState();
  const [selectedKyc, setSelectedKyc] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (Object.keys(user)) fetchKycRequests();
  }, [user]);

  const fetchKycRequests = async () => {
    setLoader(true);
    const response = await adminApi.getKycs();
    if (response) setKycRequests(response);
    setLoader(false);
  };

  const acceptKYC = async (user) => {
    try {
      await adminApi.acceptKYC(user?.email);
      setSelectedKyc({});
      fetchKycRequests();
    } catch {}
  };

  const declineKYC = async (user, rejectReason) => {
    if (rejectReason != "") {
      try {
        await adminApi.declineKYC(user?.email, rejectReason);
        setSelectedKyc({});
        fetchKycRequests();
      } catch {}
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "userDetail",
      sorter: (a, b) =>
        a.userDetail.firstName.length - b.userDetail.firstName.length,
      fixed: "left",
      sortDirections: ["ascend", "descend"],
      render: (user, record) => {
        console.log(user, record);
        return (
          <Col className="kyc-empty-text-field">
            <div className="default-text">
              {user?.firstName + " " + user?.lastName}
            </div>
            <div className="default-text-gray">{user?.email}</div>
          </Col>
        );
      },
    },
    {
      title: "Submitted For",
      dataIndex: "level",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.level - b.level,
      render: (level, record) => {
        return (
          <div className="default-text kyc-empty-text-field">
            {"Lvl " + (+level + 1)}
          </div>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "userDetail",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.userDetail.tel - b.userDetail.tel,
      render: (userDetail, record) => {
        return (
          <div className="default-text kyc-empty-text-field">
            {userDetail?.tel}
          </div>
        );
      },
    },
    {
      title: "Business",
      dataIndex: "userDetail",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.userDetail.business - b.userDetail.business,
      render: (userDetail, record) => {
        return (
          <div className="default-text kyc-empty-text-field">
            {userDetail?.business}
          </div>
        );
      },
    },
    {
      title: "Joined On",
      dataIndex: "userDetail",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.userDetail.createdAt - b.userDetail.createdAt,
      render: (userDetail, record) => {
        return (
          <div className="kyc-empty-text-field">
            <div className="default-text">
              {moment(userDetail?.createdAt).format("MMM DD YYYY")}
            </div>
            <div className="default-text-gray">
              {moment(userDetail?.createdAt).format("HH:MM")}
            </div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      sortDirections: ["ascend", "descend"],
      render: (_, record) => {
        return (
          <div className="kyc-action-container">
            <Button
              className="kyc-action-button"
              onClick={() => {
                console.log(record?.userDetail?.email);
                setSelectedKyc({
                  email: record?.userDetail?.email,
                  level: record?.level,
                  data: [...record?.userTextUrls, ...record?.userImageUrls],
                });
              }}
            >
              Check
            </Button>
          </div>
        );
      },
    },
  ];
  const onClose = () => {
    setSelectedKyc({});
  };
  return (
    <>
      {selectedKyc?.level == 0 && (
        <ModalLevel1
          open={selectedKyc?.level == 0}
          onClose={onClose}
          kycData={selectedKyc}
          verification={true}
          acceptKYC={acceptKYC}
          declineKYC={declineKYC}
        />
      )}
      {selectedKyc?.level == 1 && (
        <ModalLevel2
          open={selectedKyc?.level == 1}
          onClose={onClose}
          kycData={selectedKyc}
          verification={true}
          acceptKYC={acceptKYC}
          declineKYC={declineKYC}
        />
      )}
      {selectedKyc?.level == 2 && (
        <ModalLevel3
          open={selectedKyc?.level == 2}
          onClose={onClose}
          kycData={selectedKyc}
          verification={true}
          acceptKYC={acceptKYC}
          declineKYC={declineKYC}
        />
      )}
      <Flex vertical className="kyc-dashboard" gap={12}>
        <Row
          align={"middle"}
          justify={"space-between"}
          className="currencies-table-title-container"
        >
          <div className="portfolio-title">Application List</div>
          <Input
            placeholder={t("personalDashboard.searchPlaceholder")}
            prefix={<img src={SearchIcon} />}
            className="searchbar"
            //   onKeyUp={(e) =>
            //     e?.key == "Enter" && onSearch(e?.target?.value)
            //   }
          />
        </Row>
        <TableData data={kycRequests} togglebtn={loader} columns={columns} />
      </Flex>
    </>
  );
};

export default KycDashboard;
