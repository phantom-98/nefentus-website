import React, { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import IdentificationStepper from "./identificationStepper";
import PersonalInfoIcon from "../../../../assets/newDashboardIcons/personal-info.svg";
import GovernmentIdIcon from "../../../../assets/newDashboardIcons/government-id.svg";
import FaceIcon from "../../../../assets/newDashboardIcons/face-recognition.svg";
import LocationIcon from "../../../../assets/newDashboardIcons/location.svg";
import CompanyIcon from "../../../../assets/newDashboardIcons/company.svg";
import DeligenceIcon from "../../../../assets/newDashboardIcons/deligence.svg";
import LevelCard from "./LevelCard";
import AccountLimit from "./accountLimit";
import ModalLevel1 from "./modalLevel1";
import ModalLevel2 from "./modalLevel2";
import ModalLevel3 from "./modalLevel3";
import backendAPI from "../../../../api/backendAPI";
import "./identificationSection.css";

const level1 = {
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME",
  address: "ADRESS",
  city: "CITY",
  zip: "ZIP_CODE",
  country: "COUNTRY",
  GOVERNMENT_ISSUES_ID: "GOVERNMENT_ISSUES_ID",
  PICTURE_WIDTH_ID_IN_HAND: "PICTURE_WIDTH_ID_IN_HAND",
};

const level2 = {
  PROOF_OF_ADRESS: "PROOF_OF_ADRESS",
  PROOF_OF_COMPANY: "PROOF_OF_COMPANY",
};

const level3 = {
  ENHANCED_DILIGENCE: "ENHANCED_DILIGENCE",
};

const IdentificationSection = () => {
  const BackendAPI = new backendAPI();
  const [openModal, setOpenModal] = useState("");
  const [level, setLevel] = useState(null);
  const [kycData, setKycData] = useState([]);
  const [contentHeight, setContentHeight] = useState([]);
  useEffect(() => {
    fetchLevel();
  }, []);

  useEffect(() => {
    if (level != null) fetchUserKYC();
  }, [level]);

  const fetchLevel = async () => {
    const { data } = await BackendAPI.getKYCLevel();
    if (data) {
      setLevel(data.kycLevel);
    }
  };

  const levelCard = [
    {
      level: 1,
      status: "verified",
      content: [
        {
          icon: PersonalInfoIcon,
          label: "Personal Information",
        },
        {
          icon: GovernmentIdIcon,
          label: "Government Issued ID",
        },
        {
          icon: FaceIcon,
          label: "Facial Recognition",
        },
      ],
    },
    {
      level: 2,
      status: "pending",
      content: [
        {
          icon: LocationIcon,
          label: "Proof of Address",
        },
        {
          icon: CompanyIcon,
          label: "Proof of Company",
        },
      ],
    },
    {
      level: 3,
      status: "unverified",
      content: [
        {
          icon: DeligenceIcon,
          label: " Enhanced Diligence",
        },
      ],
    },
  ];

  const fetchUserKYC = async () => {
    const level1Data = await Promise.all(
      Object.values(level1).map((type) =>
        type == "GOVERNMENT_ISSUES_ID" || type == "PICTURE_WIDTH_ID_IN_HAND"
          ? BackendAPI.getByKYC(type)
          : BackendAPI.getByKYCText(type),
      ),
    );
    const level2Data = await Promise.all(
      Object.values(level2).map((type) => BackendAPI.getByKYC(type)),
    );
    const level3Data = await Promise.all(
      Object.values(level3).map((type) => BackendAPI.getByKYC(type)),
    );
    const level1Finalised = {
      list: level1Data?.map((kyc) => ({
        data: kyc[Object.keys(kyc)[0]]?.data,
        type: Object.keys(kyc)[0],
      })),
      isPending: level1Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason == null && !detail?.verify && detail?.url != null
        );
      }),
      isRejected: level1Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason != null && !detail?.verify && detail?.url != null
        );
      }),
      reject_message: level1Data[0][level1?.firstName]?.data?.rejectReason,
      isVerified: level1Data?.every(
        (kyc) => kyc[Object.keys(kyc)[0]]?.data?.verify,
      ),
    };

    const level2Finalised = {
      list: level2Data?.map((kyc) => ({
        data: kyc[Object.keys(kyc)[0]]?.data,
        type: Object.keys(kyc)[0],
      })),
      isPending: level2Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason == null && !detail?.verify && detail?.url != null
        );
      }),
      isRejected: level2Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason != null && !detail?.verify && detail?.url != null
        );
      }),
      reject_message:
        level2Data[0][level2?.PROOF_OF_ADRESS]?.data?.rejectReason,
      isVerified: level2Data?.every(
        (kyc) => kyc[Object.keys(kyc)[0]]?.data?.verify,
      ),
    };

    const level3Finalised = {
      list: level3Data?.map((kyc) => ({
        data: kyc[Object.keys(kyc)[0]]?.data,
        type: Object.keys(kyc)[0],
      })),
      isPending: level3Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason == null && !detail?.verify && detail?.url != null
        );
      }),
      reject_message:
        level3Data[0][level3?.ENHANCED_DILIGENCE]?.data?.rejectReason,
      isRejected: level3Data?.some((kyc) => {
        const detail = kyc[Object.keys(kyc)[0]]?.data;
        return (
          detail?.rejectReason != null && !detail?.verify && detail?.url != null
        );
      }),
      isVerified: level3Data?.every(
        (kyc) => kyc[Object.keys(kyc)[0]]?.data?.verify,
      ),
    };

    setKycData({
      level1: { ...level1Finalised, ...levelCard[0] },
      level2: { ...level2Finalised, ...levelCard[1] },
      level3: { ...level3Finalised, ...levelCard[2] },
    });
  };

  const handleModalOpen = (data) => {
    switch (data?.level) {
      case 1:
        setOpenModal("level1");
        break;
      case 2:
        setOpenModal("level2");
        break;
      case 3:
        setOpenModal("level3");
        break;
      default:
        setOpenModal("");
    }
  };

  return (
    <>
      {openModal == "level1" && (
        <ModalLevel1
          open={openModal === "level1"}
          onClose={() => setOpenModal("")}
          kycData={kycData?.level1}
          onRefresh={() => {
            fetchUserKYC();
            setOpenModal("");
          }}
        />
      )}
      {openModal == "level2" && (
        <ModalLevel2
          open={openModal === "level2"}
          onClose={() => setOpenModal("")}
          kycData={kycData?.level2}
          onRefresh={() => {
            fetchUserKYC();
            setOpenModal("");
          }}
        />
      )}
      {openModal == "level3" && (
        <ModalLevel3
          open={openModal === "level3"}
          onClose={() => setOpenModal("")}
          kycData={kycData?.level3}
          onRefresh={() => {
            fetchUserKYC();
            setOpenModal("");
          }}
        />
      )}
      <div className="IdentificationSection">
        <IdentificationStepper
          kycData={kycData}
          contentHeight={contentHeight}
        />
        <div className="identification-card-wrapper">
          {Object.keys(kycData)?.length > 0 &&
            Object.keys(kycData)?.map((title, index) => {
              return (
                <LevelCard
                  setContentHeight={setContentHeight}
                  level={level}
                  card={kycData[title]}
                  keyIndex={index}
                  handleModalOpen={handleModalOpen}
                />
              );
            })}
        </div>
        <Flex vertical gap={8}>
          <div className="account-limit-title">Account Limit</div>
          <AccountLimit kycData={kycData} />
        </Flex>
      </div>
    </>
  );
};
export default IdentificationSection;
