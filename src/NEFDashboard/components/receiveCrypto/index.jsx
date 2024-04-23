import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Drawer, Flex, Modal, Skeleton, Typography } from "antd";
import "./receiveCrypto.css";
import ArrowDown from "../../../assets/newDashboardIcons/arrow-down.svg";
import qrCode from "../../../assets/newDashboardIcons/qr-code.svg";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import usePrices from "../../../hooks/prices";
import backendAPI from "../../../api/backendAPI";
import { getWalleBackground } from "../../../utils";
import QRCode from "react-qr-code";
import { LinkOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { MessageContext } from "../../../context/message";
const ReceiveCrypto = ({ openReceiveModal, onCloseModal }) => {
  const { Text } = Typography;
  const [selectedWallet, setSelectedWallet] = useState({});
  const [wallets, setWallets] = useState([]);
  const { prices } = usePrices();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setSuccessMessage } = useContext(MessageContext);
  const [loader, setLoader] = useState(true);
  const backend_API = new backendAPI();

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (prices.every((amount) => amount != undefined)) fetchWallets();
  }, [prices]);

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();
    const modifiedList = list.map((wallet, index) => ({
      ...wallet,
      name: wallet?.type,
      ...getWalleBackground(wallet?.type),
    }));
    setSelectedWallet(modifiedList[1]);
    setWallets(modifiedList);
    setLoader(false);
  };

  const copyToClipboard = (e, walletAddress) => {
    e.stopPropagation();
    navigator.clipboard.writeText(walletAddress);
    setSuccessMessage(t("dashboard.cryptoCard.walletCopied"));
  };

  const handleActiveWallet = async (wlt) => {
    setSelectedWallet({
      ...wlt,
    });
    onCloseDrawer();
  };

  return (
    <Modal
      open={openReceiveModal}
      onCancel={onCloseModal}
      centered
      footer={null}
      className="receive-modal"
    >
      <div className="main-container">
        <Flex vertical justify="center" align="center" gap={16}>
          <Flex gap={8} vertical align="center">
            <div className="qr-code-section">
              <img src={qrCode} alt="qr-code" width={20} height={20} />
            </div>
            <Flex vertical align="center" justify="center">
              <Text strong className="heading">
                {t("personalDashboard.receiveCrypto.heading")}
              </Text>
              <p type="secondary" className="paragraph">
                {t("personalDashboard.receiveCrypto.description")}
              </p>
            </Flex>
          </Flex>
          <div>
            {loader ? (
              <Skeleton.Input active className="wallet-skeleton" />
            ) : (
              <Flex
                className="send-crypto-wallet-container send-crypto-full-width"
                align="center"
                justify="space-between"
                onClick={() => showDrawer()}
              >
                <Flex align="center" gap={6}>
                  <div className="send-crypto-logo-container">
                    <img
                      src={selectedWallet?.logo}
                      className="send-crypto-logo"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <div className="default-text send-modal-wallet-title">
                      {selectedWallet?.name}
                    </div>
                    <div className="default-text-gray">
                      {WalletAddressFormatter(selectedWallet?.address)}
                    </div>
                  </div>
                  <img />
                  <Col>
                    <img src={ArrowDown} />
                  </Col>
                </Flex>
              </Flex>
            )}
          </div>
          {loader ? (
            <Skeleton.Button
              shape="square"
              className="receive-qr-skeleton"
              active
            />
          ) : (
            <div className="qr-code">
              <QRCode size={160} value={selectedWallet?.address || "-"} />
            </div>
          )}
          <Flex align="center">
            {loader ? (
              <Skeleton.Button active />
            ) : (
              <Button
                className="copy-btn"
                icon={<LinkOutlined />}
                onClick={(e) => copyToClipboard(e, selectedWallet?.address)}
              >
                {t("personalDashboard.drawer.copy")}
              </Button>
            )}
          </Flex>
        </Flex>
      </div>
      <Drawer
        title={null}
        placement="bottom"
        closable={false}
        onClose={onCloseDrawer}
        open={openDrawer}
        getContainer={false}
        height={300}
      >
        <Flex vertical gap={8} justify="center">
          <div className="send-crypto-drawer-bar"></div>

          {openDrawer && (
            <>
              <Flex vertical>
                {wallets?.map((wallet, index) => (
                  <Flex
                    align="center"
                    gap={6}
                    className={
                      selectedWallet?.address === wallet?.address
                        ? "send-crypto-selected-wallet send-crypto-drawer-wallet"
                        : "send-crypto-drawer-wallet"
                    }
                    onClick={() => handleActiveWallet(wallet)}
                    key={index}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className="send-crypto-drawer-wallet-logo"
                    >
                      <img src={wallet?.logo} width={24} height={24} />
                    </Flex>
                    <div>
                      <div className="default-text send-modal-wallet-title">
                        {wallet?.name}
                      </div>
                      <div className="default-text-gray">
                        {WalletAddressFormatter(wallet?.address)}
                      </div>
                    </div>
                  </Flex>
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Drawer>
    </Modal>
  );
};

export default ReceiveCrypto;
