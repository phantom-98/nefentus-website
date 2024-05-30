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

const InvoicePreview = ({ invoice }) => {
  const [euroValue, setEuroValue] = useState(0);
  const backend_API = new backendAPI();
  const { user } = useAuth();
  const { Text } = Typography;
  const { t } = useTranslation();
  const currencyFetch = async () => {
    const euroCurrency = await backend_API.getCurrencyRate();
    setEuroValue(euroCurrency);
  };
  useEffect(() => {
    currencyFetch();
  }, []);

  const columns = [
    {
      title: "Description",
      dataIndex: "name",
      render: (name, record) => <div>{name}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price, record) => <div>{price}</div>,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      render: (_, record) => <div>{record?.quantity}</div>,
    },
    {
      title: "Total price",
      dataIndex: "total",
      render: (_, record) => <div>{record?.total}</div>,
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
              <Text className="default-text">{invoice.invoiceNo}</Text>
            </Flex>
          </Flex>
        }
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
                  <Text className="default-text-gray">
                    {t("invoicePreview.vatTitle")} {user?.vatNumber}
                  </Text>
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
                  {/* <Text className="default-text-gray">XXXX-XXX-XX</Text> */}
                  <Text className="default-text-gray">{invoice.email}</Text>
                  <Text className="default-text-gray">
                    {t("invoicePreview.vatTitle")} {invoice.taxNumber}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical gap={"16px"}>
          <Text
            className="default-text-gray"
            style={{ fontSize: "16px", fontWeight: 500 }}
          >
            {t("invoicePreview.invoiceItems")}
          </Text>
          <TableData
            columns={columns}
            data={invoice.items}
            hidePagination={true}
          />
          <Flex align="center" justify="space-between">
            <Text className="default-text-gray">
              {t("invoicePreview.vat")} ({invoice.taxPercent}%)
            </Text>
            <Text className="default-text">
              {getCurrencySymbol()[invoice?.currency]}
              {formatUSDBalance(
                (+invoice?.amount * +invoice?.taxPercent) / 100,
              )}{" "}
              (€
              {formatUSDBalance(
                (euroValue?.rate * (+invoice?.amount * +invoice?.taxPercent)) /
                  100,
              )}
              )
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />
          <Flex align="center" justify="space-between">
            <Text
              className="default-text-gray"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              {t("invoicePreview.invoiceAmount")}
            </Text>
            <Text
              className="default-text"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              {getCurrencySymbol()[invoice?.currency]}
              {invoice?.amount} (€
              {formatUSDBalance(euroValue?.rate * invoice?.amount)})
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />
          <Flex vertical gap={"8px"}>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("invoicePreview.swapCost")}
              </Text>
              <Text className="default-text">
                ${formatUSDBalance(invoice?.swapCost)} (€
                {formatUSDBalance(euroValue?.rate * invoice?.swapCost)})
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("invoicePreview.transactionCost")}{" "}
              </Text>
              <Text className="default-text-gray">
                ({invoice?.transactionCost?.cryptoValue} BNB)
              </Text>
              <Text className="default-text">
                ${formatUSDBalance(invoice?.transactionCost?.amount_dollar)} (€
                {formatUSDBalance(
                  euroValue?.rate * invoice?.transactionCost?.amount_dollar,
                )}
                )
              </Text>
            </Flex>
            <Divider style={{ margin: 0 }} />
          </Flex>
          <Flex align="center" justify="space-between">
            <Text
              className="default-text"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              {t("invoicePreview.totalDue")}
            </Text>
            <Text
              className="default-text"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              ${formatUSDBalance(invoice?.totalDue)}
              (€
              {formatUSDBalance(euroValue?.rate * invoice?.totalDue)})
            </Text>
          </Flex>
          <Divider style={{ margin: 0 }} />
        </Flex>
        <Flex vertical gap={"8px"}>
          <Text className="default-text-gray">
            {t("invoicePreview.currencyConversionText1")}
            {moment(euroValue?.data)?.format("DD.MM.YYYY") +
              " " +
              euroValue?.rate?.toFixed(2)}
            € {t("invoicePreview.currencyConversionText2")} (1USD)
          </Text>
          <Text className="default-text-gray">
            {t("invoicePreview.vatDescription")}
          </Text>
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
