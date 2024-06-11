import { Button, Drawer, Flex, Typography, Divider, Anchor } from "antd";
import React, { useEffect, useState } from "react";
import "./transactionDrawer.css";
import EthereumIcon from "../../../assets/icon/crypto/ethereum.svg";
import LocalGasStationFill from "../../../assets/newDashboardIcons/local_gas_station_filled.svg";
import CompanyIcon from "../../../assets/newDashboardIcons/company.svg";
import OpenIcon from "../../../assets/newDashboardIcons/pending.svg";
import ProcessingIcon from "../../../assets/newDashboardIcons/processing.svg";
import PaidIcon from "../../../assets/newDashboardIcons/paid.svg";
import FilesIcon from "../../../assets/newDashboardIcons/filesIcon.svg";
import QRicon from "../../../assets/newDashboardIcons/qrIcon.svg";
import SaveReceiptIcon from "../../../assets/newDashboardIcons/save-receipt.svg";
import CopyIcon from "../../../assets/newDashboardIcons/copyIcon.svg";
import WatchImg from "../../../assets/newDashboardIcons/watchImg.png";

import TableData from "../tableData";
import useResponsive from "../../../hooks/useResponsive";
import { useAuth } from "../../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import moment from "moment";

const columns = [
  {
    title: "Description",
    dataIndex: "name",
    render: (nameee, record) => <div>{nameee}</div>,
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price, record) => <div>{price}</div>,
  },
  {
    title: "Qty",
    dataIndex: "Qty",
    render: (_, record) => <div>{record?.qty}</div>,
  },
  {
    title: "Total price",
    dataIndex: "Total price",
    render: (_, record) => <div>{record?.totalPrice}</div>,
  },
];

const data = [
  {
    name: "Rolex Watches",
    price: 100,
    qty: 1,
    totalPrice: 100,
  },
  {
    name: "Iphone 12",
    price: 100,
    qty: 1,
    totalPrice: 100,
  },
];

const TransactionDrawer = ({ open, onClose, selectedData }) => {
  const { Title, Text, Paragraph } = Typography;
  const { Link } = Anchor;
  let { screenWidth } = useResponsive();
  const [isMobile, setIsMobile] = useState(false);
  const { user, currencyRate } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    onScreenWidthChange();
  }, [screenWidth]);

  const onScreenWidthChange = () => {
    if (screenWidth <= 767) setIsMobile(true);
    else setIsMobile(false);
  };
  return (
    <Drawer
      title={
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4} style={{ margin: "0" }}>
            {t("transactionDrawer.title")}
          </Title>
          <Button type="text" onClick={() => onClose()}>
            {/* <img src={CloseIcon} alt="CloseIcon" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.2501 4.75843C14.9251 4.43343 14.4001 4.43343 14.0751 4.75843L10.0001 8.8251L5.9251 4.7501C5.6001 4.4251 5.0751 4.4251 4.7501 4.7501C4.4251 5.0751 4.4251 5.6001 4.7501 5.9251L8.8251 10.0001L4.7501 14.0751C4.4251 14.4001 4.4251 14.9251 4.7501 15.2501C5.0751 15.5751 5.6001 15.5751 5.9251 15.2501L10.0001 11.1751L14.0751 15.2501C14.4001 15.5751 14.9251 15.5751 15.2501 15.2501C15.5751 14.9251 15.5751 14.4001 15.2501 14.0751L11.1751 10.0001L15.2501 5.9251C15.5668 5.60843 15.5668 5.0751 15.2501 4.75843Z"
                fill="#B1B1B1"
              />
            </svg>
          </Button>
        </Flex>
      }
      width={isMobile ? 390 : 500}
      closable={false}
      onClose={onClose}
      open={open}
      className="transaction-drawer-container"
    >
      <Flex vertical gap={"16px"}>
        {selectedData?.isProduct && (
          <>
            <Flex gap={"12px"}>
              <img src={WatchImg} alt="WatchImg" width={58} height={58} />
              <Flex vertical>
                <Text
                  className="default-text-gray"
                  style={{ fontSize: "16px", fontWeight: 500 }}
                >
                  {t("transactionDrawer.product")}
                </Text>
                <Text
                  className="default=text "
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {selectedData?.description}
                </Text>
              </Flex>
            </Flex>
            <Divider style={{ margin: 0 }} />
          </>
        )}

        <Flex vertical gap={"16px"}>
          <Flex vertical gap={"12px"}>
            <Flex vertical gap={"8px"}>
              <Text
                className="default-text-gray"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {t("transactionDrawer.invoiceAmount")}
              </Text>
              <Title style={{ margin: "0" }}>$30.900,00</Title>
              <Text className="default-text-gray">
                {t("transactionDrawer.taxText1")}19% (900$)
                {t("transactionDrawer.taxText2")}
              </Text>
            </Flex>
            <Flex vertical gap={"4px"}>
              <Text
                className="default-text"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {t("transactionDrawer.crypto")}
              </Text>
              <Flex align="center" gap={"16px"}>
                <Title
                  level={4}
                  className="default-text"
                  style={{ marginBottom: 0, fontWeight: "500" }}
                >
                  0.076311321
                </Title>
                <Flex align="center" gap={"4px"}>
                  <img
                    src={EthereumIcon}
                    alt="Ethereum-icon"
                    width={24}
                    height={24}
                  />
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--White2, #F6F6F6)",
                    }}
                  >
                    {t("transactionDrawer.crypto")}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {selectedData?.isProduct ? null : (
            <Flex vertical gap={"12px"}>
              <Text
                className="default-text-gray"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {t("transactionDrawer.invoiceItems")}
              </Text>
              <TableData columns={columns} data={data} hidePagination={true} />
              <Flex vertical>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ padding: "8px 0" }}
                >
                  <Flex align="center" gap={"5px"}>
                    <img src={LocalGasStationFill} alt="Ethereum-icon" />
                    <Text className="default-text-gray">
                      {t("transactionDrawer.gasPrice")}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={"5px"}>
                    <Text className="default-text-gray">0.0005112 BNB</Text>
                    <Text className="default-text">67$</Text>
                  </Flex>
                </Flex>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ padding: "8px 0" }}
                >
                  <Flex align="center" gap={"5px"}>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: " var(--light-grey, #E9E9E9)",
                      }}
                    >
                      {t("transactionDrawer.total")}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={"5px"}>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: " var(--light-grey, #E9E9E9)",
                      }}
                    >
                      $30.967,00
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Divider style={{ margin: 0 }} />
        <Flex vertical gap={"16px"}>
          <Text
            className="default-text"
            style={{ fontSize: "16px", fontWeight: 500 }}
          >
            {t("transactionDrawer.invoiceInfo")}
          </Text>
          <Flex gap={"16px"}>
            <Flex vertical gap={"12px"} flex={1}>
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceFrom")}
              </Text>
              <Flex gap={"8px"}>
                <Divider
                  type="vertical"
                  style={{ height: "100%", margin: 0 }}
                />
                <Flex vertical gap={"8px"}>
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    {user?.business}
                  </Text>
                  <Flex vertical gap={"4px"}>
                    <Text className="default-text-gray">
                      {user?.phoneNumber}
                    </Text>
                    <Text className="default-text-gray">{user?.email}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex vertical gap={"12px"} flex={1}>
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceTo")}
              </Text>
              <Flex gap={"8px"}>
                <Divider
                  type="vertical"
                  style={{ height: "100%", margin: 0 }}
                />
                <Flex vertical gap={"8px"}>
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    {selectedData?.name || "Mykola Kisl"}
                  </Text>
                  <Flex vertical gap={"4px"}>
                    <Text className="default-text-gray">
                      {selectedData?.email || "mymail@gmail.com"}
                    </Text>
                    <Flex align="center" gap={"4px"}>
                      <img src={CompanyIcon} alt="company-icon" />
                      <Text className="default-text-gray">
                        {selectedData?.company || "Google"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={"8px"}>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.status")}
              </Text>
              <Flex gap={"5px"}>
                <img
                  src={selectedData?.paidAt == null ? OpenIcon : PaidIcon}
                  alt="active-icon"
                />
                <Text className="default-text">
                  {selectedData?.paidAt == null ? "Open" : "Paid"}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.created")}
              </Text>
              <Flex gap={"5px"}>
                <Text className="default-text">
                  {selectedData?.createdAt
                    ? moment(selectedData?.createdAt)?.format("MMM DD YY")
                    : "Jan 22 2023"}
                </Text>
                <Text className="default-text">
                  {selectedData?.createdAt
                    ? moment(selectedData?.createdAt)?.format("hh:mm")
                    : "17:42"}
                </Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.completed")}
              </Text>
              <Flex gap={"5px"}>
                <Text className="default-text">Jan 22 2023</Text>
                <Text className="default-text">12:12</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceId")}
              </Text>
              <Text className="default-text">DA11425</Text>
            </Flex>
          </Flex>
        </Flex>
        {(selectedData?.paidAt === null || selectedData?.isProduct) && (
          <>
            <Divider style={{ margin: 0 }} />
            <Flex gap={"12px"}>
              <img src={QRicon} alt="QRicon" />
              <Flex vertical gap={"12px"}>
                <Text
                  className="default-text-gray"
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {t("transactionDrawer.checkoutPage")}:
                </Text>
                <Flex vertical gap={"8px"}>
                  <Link
                    href={`https://nefentus.com/pay/${selectedData?.link}`}
                    title={`https://nefentus.com/pay/${selectedData?.link?.substring(
                      0,
                      15,
                    )}...`}
                    className="invoice-link-container"
                  />

                  <Paragraph style={{ margin: 0 }}>
                    <Button>
                      <Flex gap={"3px"} align="center">
                        <Text className="default-text">
                          {t("transactionDrawer.copy")}
                        </Text>
                        <img src={CopyIcon} alt="copy-icon" />
                      </Flex>
                    </Button>
                  </Paragraph>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}

        <Divider style={{ margin: 0 }} />
        <Flex vertical gap={"6px"}>
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--light-grey, #E9E9E9)",
            }}
          >
            {t("transactionDrawer.note")}:
          </Text>
          <Paragraph className="default-text-gray" style={{ margin: 0 }}>
            {t("transactionDrawer.drawerDescription")}
          </Paragraph>
        </Flex>
        <Flex gap={"6px"} justify="flex-end">
          <Button>
            <Flex gap={"4px"}>
              <Text className="default-text">
                {t("transactionDrawer.saveInvoice")}
              </Text>
              <img src={FilesIcon} alt="FilesIcon" />
            </Flex>
          </Button>
          <Button>
            <Flex gap={"4px"}>
              <Text className="default-text">
                {t("transactionDrawer.saveReceipt")}
              </Text>
              <img src={SaveReceiptIcon} alt="FilesIcon" />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default TransactionDrawer;
