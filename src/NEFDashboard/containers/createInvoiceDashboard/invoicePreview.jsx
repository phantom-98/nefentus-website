import { Card, Flex, Typography, Divider, Button } from "antd";
import React, { useEffect, useState } from "react";
import TableData from "../../components/tableData";
import MessageIcon from "../../../assets/newDashboardIcons/messageIcon.svg";
import { useAuth } from "../../../context/auth/authContext";
import { formatUSDBalance } from "../../../utils";
import { getCurrencySymbol } from "../../../countries";
import backendAPI from "../../../api/backendAPI";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "./createInvoice.css";

const InvoicePreview = ({ invoice }) => {
  const [rateList, setRateList] = useState([]);
  const [rate, setRate] = useState({});
  const backend_API = new backendAPI();
  const { user } = useAuth();
  const { Text } = Typography;
  const { t } = useTranslation();
  const currencyFetch = async () => {
    const res = await backend_API.getRateList("USD");
    setRateList(res);
    console.log("rate", res);
  };
  useEffect(() => {
    currencyFetch();
  }, []);

  useEffect(() => {
    if (invoice?.currency) {
      setRate(
        rateList.find((r) => r.to === invoice?.currency) ?? {
          rate: 1,
          date: Date.now(),
        },
      );
    }
  }, [invoice?.currency]);

  const columns = [
    {
      title: t("invoicePreview.description"),
      dataIndex: "name",
      render: (name, record) => <div>{name}</div>,
    },
    {
      title: t("invoicePreview.price"),
      dataIndex: "price",
      render: (price, record) => (
        <div>
          ${formatUSDBalance(price / rate?.rate)} (
          {getCurrencySymbol()[invoice?.currency]}
          {price})
        </div>
      ),
    },
    {
      title: t("invoicePreview.qty"),
      dataIndex: "quantity",
      render: (_, record) => <div>{record?.quantity}</div>,
    },
    {
      title: t("invoicePreview.totalPrice"),
      dataIndex: "total",
      render: (_, record) => (
        <div>
          ${formatUSDBalance(record?.total / rate?.rate)} (
          {getCurrencySymbol()[invoice?.currency]}
          {record?.total})
        </div>
      ),
    },
  ];

  return (
    <div className="invoicePreview">
      <div className="preview-heading">
        <h3>{t("invoicePreview.title")}</h3>
      </div>

      <Card
        title={
          <img
            src="https://s3.eu-central-1.amazonaws.com/assets.nefentus.com/NefentusLogo.png"
            alt="nefentus"
            width="150"
          />
        }
        extra={
          <Flex className="date-invoice-number" gap={"38px"}>
            <Flex className="date-content" gap={"8px"}>
              <Text className="default-text-gray">
                {t("invoicePreview.date")}:
              </Text>
              <Text className="default-text">
                {moment().format("DD MMM YYYY")}
              </Text>
            </Flex>
            <Flex className="date-content" gap={"8px"}>
              <Text className="default-text-gray">
                {t("invoicePreview.invoice")}:
              </Text>
              <Text className="default-text">#{invoice.invoiceNo}</Text>
            </Flex>
          </Flex>
        }
        className="invoice-preview-card"
      >
        <Flex gap={"16px"}>
          <Flex vertical gap={"12px"} flex={1}>
            <Text className="default-text-gray">
              {t("invoicePreview.invoiceFrom")}
            </Text>
            <Flex gap={"8px"}>
              <Divider type="vertical" style={{ height: "100%", margin: 0 }} />
              <Flex vertical gap={"8px"}>
                <Text className="default-text" style={{ fontWeight: 500 }}>
                  {user.firstName} {user.lastName}
                </Text>
                <Flex vertical gap={"4px"}>
                  <Text className="default-text-gray">{user?.phoneNumber}</Text>
                  <Text className="default-text-gray">{user?.email}</Text>
                  {/* <Text className="default-text-gray">
                    {t("invoicePreview.vatTitle")} {user?.vatNumber}
                  </Text> */}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={"12px"} flex={1}>
            <Text className="default-text-gray">
              {t("invoicePreview.invoiceTo")}
            </Text>
            <Flex gap={"8px"}>
              <Divider type="vertical" style={{ height: "100%", margin: 0 }} />
              <Flex vertical gap={"8px"}>
                <Text className="default-text" style={{ fontWeight: 500 }}>
                  {invoice.name}
                </Text>
                <Flex vertical gap={"4px"}>
                  <Text className="default-text-gray">{invoice.email}</Text>
                  {!invoice.isPerson && (
                    <Text className="default-text-gray">
                      {t("invoicePreview.vatTitle")} {invoice.taxNumber}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical gap={"16px"}>
          <Text
            className="default-text-gray"
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: " var(--White, #FAFAFA)",
            }}
          >
            {t("invoicePreview.invoiceItems")}
          </Text>
          <TableData
            columns={columns}
            data={invoice.items}
            hidePagination={true}
          />
          <Flex align="center" justify="space-between">
            <Text className="default-text">
              {t("invoicePreview.vat")} ({invoice.taxPercent}%)
            </Text>
            <Text
              style={{
                color: " var(--White, #FAFAFA) ",
              }}
            >
              $
              {formatUSDBalance(
                (+invoice?.amount * +invoice?.taxPercent) / rate?.rate / 100,
              )}
              {invoice?.currency !== "USD" &&
                `(${getCurrencySymbol()[invoice?.currency]}
                ${formatUSDBalance(
                  (+invoice?.amount * +invoice?.taxPercent) / 100,
                )})`}
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />
          <Flex align="center" justify="space-between">
            <Text
              className="default-text"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              {t("invoicePreview.invoiceAmount")}
            </Text>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: " var(--White, #FAFAFA) ",
              }}
            >
              ${formatUSDBalance(invoice?.amount / rate?.rate)}
              {invoice?.currency !== "USD" &&
                ` (${getCurrencySymbol()[invoice?.currency]}
                ${formatUSDBalance(invoice?.amount)})`}
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />

          <Flex align="center" justify="space-between">
            <Text
              className="default-text"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              {t("invoicePreview.totalDue")}
            </Text>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: " var(--White, #FAFAFA) ",
              }}
            >
              $
              {formatUSDBalance(
                (+invoice?.amount * (+invoice?.taxPercent + 100)) /
                  rate?.rate /
                  100,
              )}
              {invoice?.currency !== "USD" &&
                ` (${getCurrencySymbol()[invoice?.currency]}
                ${formatUSDBalance(
                  (+invoice?.amount * (+invoice?.taxPercent + 100)) / 100,
                )})`}
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />
        </Flex>
        <Flex vertical gap={"8px"}>
          {invoice?.currency !== "USD" && (
            <Text className="default-text-gray">
              {t("invoicePreview.rateDescription1")}
              {invoice?.currency}
              {t("invoicePreview.rateDescription2")}
              {moment(rate?.date)?.format("YYYY.MM.DD") +
                " " +
                rate?.rate?.toFixed(2)}
              {invoice?.currency}
              {t("invoicePreview.rateDescription3")}
            </Text>
          )}
          {invoice?.reverseCharge && (
            <Text className="default-text-gray">
              {t("invoicePreview.vatDescription")}
            </Text>
          )}
        </Flex>
        <Card>
          <Flex gap={"10px"} align="flex-start">
            <img src={MessageIcon} alt="MessageIcon" />
            <Flex vertical gap={"4px"}>
              <Text className="preview-invoice-height default-text">
                {invoice?.note}
              </Text>
              <Text>
                <Text
                  className="default-text-gray"
                  style={{ display: "block" }}
                >
                  {user?.firstName + " " + user?.lastName}
                </Text>
                <Text
                  className="default-text-gray"
                  style={{ display: "block" }}
                >
                  {user?.business}
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Button className="preview-btn">
          {t("invoicePreview.payInvoice")}
        </Button>
      </Card>
    </div>
  );
};

export default InvoicePreview;
