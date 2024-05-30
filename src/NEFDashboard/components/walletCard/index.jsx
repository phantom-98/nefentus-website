import React, { useContext } from "react";
import { Card, Col, Flex, Row, Typography } from "antd";
import ArrowRight from "../../../assets/newDashboardIcons/arrow-right-gray.svg";
import CopyIcon from "../../../assets/newDashboardIcons/copy-blue.svg";
import "./walletCard.css";
import { formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import { MessageContext } from "../../../context/message";
import { useAuth } from "../../../context/auth/authContext";

const WalletCard = ({ wallet, key, handleWalletDetail }) => {
  const { t } = useTranslation();
  const { currencyRate } = useAuth();
  const { setSuccessMessage } = useContext(MessageContext);
  const { Text } = Typography;
  const onCopyAddress = () => {
    navigator.clipboard.writeText(wallet?.address);
    setSuccessMessage(t("general.copied"));
  };
  return (
    <Card className="wallet-card" key={key}>
      <Row>
        <Col span={9}>
          <div
            style={{
              backgroundImage: `url(${wallet?.background})`,
            }}
            className="wallet-card-right"
          >
            <div className="wallet-logo-container">
              <img src={wallet?.logo} className="wallet-logo" />
            </div>
            <div className="wallet-card-name">
              {wallet?.name?.toLowerCase() == "internal"
                ? "Nefentus"
                : wallet?.name}
            </div>
          </div>
        </Col>
        <Col span={15} className="wallet-card-right">
          <Col>
            <div className="wallet-card-right-container">
              <div className="wallet-card-title-container">
                <div>
                  <div className="default-text-gray">
                    {t("personalDashboard.walletCard.addressTitle")}
                  </div>
                  <Flex align="center" gap={4}>
                    <Text className="default-text wallet-card-address">
                      {WalletAddressFormatter(wallet?.address)}
                    </Text>

                    <img
                      src={CopyIcon}
                      onClick={onCopyAddress}
                      className="wallet-card-copy-address cursor-pointer"
                    />
                  </Flex>
                </div>
                <div>
                  <div className="default-text-gray">
                    {t("personalDashboard.walletCard.balance")}
                  </div>
                  <div className="wallet-card-balance">
                    {currencyRate?.symbol +
                      formatUSDBalance(wallet?.balance * currencyRate?.rate)}
                  </div>
                </div>
              </div>
              <Row
                className="cursor-pointer"
                onClick={() => handleWalletDetail(wallet)}
              >
                <div className="default-text-gray">
                  {t("personalDashboard.walletCard.detail")}
                </div>
                <img src={ArrowRight} alt="arrow-right" width={16} />
              </Row>
            </div>
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

export default WalletCard;
