import React, { useState } from "react";
import { Button, Col, Divider, Flex, Row } from "antd";
import ArrowDownRightIcon from "../../../assets/newDashboardIcons/arrow-down-right-blue.svg";
import ArrowUpLeftIcon from "../../../assets/newDashboardIcons/arrow-up-left-blue.svg";
import ConverterIcon from "../../../assets/newDashboardIcons/converter-blue.svg";
import "./totalBalanceSection.css";
import SendCrypto from "../sendCrypto";
import Converter from "../converter";
import { useTranslation } from "react-i18next";
import ReceiveCrypto from "../receiveCrypto";
import { useAuth } from "../../../context/auth/authContext";

const TotalBalanceSection = ({ total }) => {
  const { t } = useTranslation();
  const { setIsWalletConnected } = useAuth();
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openConvertModal, setOpenConvertModal] = useState(false);
  const [openReceiveModal, setOpenReceiveModal] = useState(false);
  const handleSubmitCrypto = () => {
    setOpenSendModal(!openSendModal);
  };

  const handleConvertCrypto = () => {
    setOpenConvertModal(!openConvertModal);
  };

  const handleReceiveCrypto = () => {
    setOpenReceiveModal(!openReceiveModal);
  };
  return (
    <>
      {openSendModal && (
        <SendCrypto
          openSendModal={openSendModal}
          handleSubmitCrypto={handleSubmitCrypto}
          onCloseModal={() => {
            setIsWalletConnected(false);
            setOpenSendModal(false);
          }}
          onWalletSuccess={(toggle) => {
            setIsWalletConnected(toggle);
          }}
        />
      )}
      {openReceiveModal && (
        <ReceiveCrypto
          openReceiveModal={openReceiveModal}
          handleReceiveCrypto={handleReceiveCrypto}
          onCloseModal={() => setOpenReceiveModal(false)}
        />
      )}
      <Converter
        openConvertModal={openConvertModal}
        onCloseModal={() => setOpenConvertModal(!openConvertModal)}
        handleConvertCrypto={handleConvertCrypto}
        onWalletSuccess={(toggle) => {
          setIsWalletConnected(toggle);
        }}
      />

      {/* <div className="total-balance-value-container"></div> */}
      <Flex justify="space-between" className="balance-button-container">
        <Button
          size="large"
          className="balance-buttons balance-buttons-first"
          type="text"
          icon={<img src={ArrowUpLeftIcon} />}
          onClick={() => setOpenSendModal(!openSendModal)}
        >
          {t("personalDashboard.send")}
        </Button>
        <Button
          size="large"
          type="text"
          icon={<img src={ArrowDownRightIcon} />}
          onClick={() => setOpenReceiveModal(!openReceiveModal)}
          className="balance-buttons balance-buttons-middle"
        >
          {t("personalDashboard.receive")}
        </Button>

        <Button
          size="large"
          type="text"
          icon={<img src={ConverterIcon} />}
          onClick={() => setOpenConvertModal(!openConvertModal)}
          className="balance-buttons balance-buttons-last"
        >
          {t("personalDashboard.convert")}
        </Button>
      </Flex>
    </>
  );
};

export default TotalBalanceSection;
