import { Button, Drawer, Flex, Typography, Divider } from "antd";
import React, { useState } from "react";
import EthereumIcon from "../../../assets/icon/crypto/ethereum.svg";
import LocalGasStationFill from "../../../assets/newDashboardIcons/local_gas_station_filled.svg";
import CompanyIcon from "../../../assets/newDashboardIcons/company.svg";
import OpenIcon from "../../../assets/newDashboardIcons/pending.svg";
import ProcessingIcon from "../../../assets/newDashboardIcons/processing.svg";
import PaidIcon from "../../../assets/newDashboardIcons/paid.svg";
import FilesIcon from "../../../assets/newDashboardIcons/filesIcon.svg";
import QRicon from "../../../assets/newDashboardIcons/qrIcon.svg";
import CopyIcon from "../../../assets/newDashboardIcons/copyIcon.svg";
import CloseIcon from "../../../assets/icon/close.svg";
import WatchImg from "../../../assets/newDashboardIcons/watchImg.png";

import TableData from "../tableData";

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
  return (
    <Drawer
      title={
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4} style={{ margin: "0" }}>
            Transaction Details
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
      width={500}
      closable={false}
      onClose={onClose}
      open={open}
      className="transaction-drawer-container"
    >
      <Flex vertical gap={"16px"}>
        {selectedData?.isProduct && (
          <>
            <Flex gap={"12px"}>
              <img src={WatchImg} alt="WatchImg" />
              <Flex vertical>
                <Text
                  className="default-text-gray"
                  style={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Product
                </Text>
                <Text
                  className="default=text "
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Edox SKYDIVER Neptunian 80120 3NM VDN
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
                Invoice amount
              </Text>
              <Title style={{ margin: "0" }}>$30.900,00</Title>
              <Text className="default-text-gray">
                The VAT of 19% (900$) is included in this amount
              </Text>
            </Flex>
            <Flex vertical gap={"4px"}>
              <Text
                className="default-text-gray"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                In crypto
              </Text>
              <Flex align="center" gap={"16px"}>
                <Title level={4} style={{ margin: "0" }}>
                  0.076311321
                </Title>
                <Flex align="center" gap={"4px"}>
                  <img src={EthereumIcon} alt="Ethereum-icon" />
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    In crypto
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
                Invoice items
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
                    <Text className="default-text-gray">Gas price</Text>
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
                    <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                      Total due
                    </Text>
                  </Flex>
                  <Flex align="center" gap={"5px"}>
                    <Text style={{ fontSize: "16px", fontWeight: 500 }}>
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
            className="default-text-gray"
            style={{ fontSize: "16px", fontWeight: 500 }}
          >
            Invoice Info
          </Text>
          <Flex gap={"16px"}>
            <Flex vertical gap={"12px"} flex={1}>
              <Text className="default-text-gray">Invoice From</Text>
              <Flex gap={"8px"}>
                <Divider
                  type="vertical"
                  style={{ height: "100%", margin: 0 }}
                />
                <Flex vertical gap={"8px"}>
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    My watch shop
                  </Text>
                  <Flex vertical gap={"4px"}>
                    <Text className="default-text-gray">
                      +38(066) 111-59-20
                    </Text>
                    <Text className="default-text-gray">mymail@gmail.com</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex vertical gap={"12px"} flex={1}>
              <Text className="default-text-gray">Invoice To</Text>
              <Flex gap={"8px"}>
                <Divider
                  type="vertical"
                  style={{ height: "100%", margin: 0 }}
                />
                <Flex vertical gap={"8px"}>
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    Mykola Kisl
                  </Text>
                  <Flex vertical gap={"4px"}>
                    <Text className="default-text-gray">mymail@gmail.com</Text>
                    <Flex align="center" gap={"4px"}>
                      <img src={CompanyIcon} alt="company-icon" />
                      <Text className="default-text-gray">Google</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={"8px"}>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">Status</Text>
              <Flex gap={"5px"}>
                <img
                  src={selectedData?.paidAt == null ? OpenIcon : PaidIcon}
                  alt="active-icon"
                />
                <Text>{selectedData?.paidAt == null ? "Open" : "Paid"}</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">Created on</Text>
              <Flex gap={"5px"}>
                <Text>Jan 22 2023</Text>
                <Text>17:42</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">Completed on</Text>
              <Flex gap={"5px"}>
                <Text>Jan 22 2023</Text>
                <Text>12:12</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">Invoice ID</Text>
              <Text>DA11425</Text>
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
                  style={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Checkout page link:
                </Text>
                <Flex vertical gap={"8px"}>
                  <Text>https://nefentus.com/pay/L6yaeBWrvX8jEOK2eUJID6dq</Text>
                  <Paragraph style={{ margin: 0 }}>
                    <Button>
                      <Flex gap={"3px"} align="center">
                        <Text>Copy</Text>
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
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>Note:</Text>
          <Paragraph className="default-text-gray" style={{ margin: 0 }}>
            "Thank you for your business! We appreciate your prompt payment. If
            you have any questions or concerns regarding this invoice, please
            don't hesitate to contact us. We look forward to serving you again
            in the future."
          </Paragraph>
        </Flex>
        <Flex gap={"6px"} justify="flex-end">
          <Button>
            <Flex gap={"4px"}>
              <Text>Save as PDF</Text>
              <img src={FilesIcon} alt="FilesIcon" />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default TransactionDrawer;
