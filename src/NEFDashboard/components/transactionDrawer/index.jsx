import {
  Button,
  Drawer,
  Flex,
  Typography,
  Divider,
  Anchor,
  Skeleton,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
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
import usePrices from "../../../hooks/prices";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import { MessageContext } from "../../../context/message";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { currencies } from "../../../constants";

const TransactionDrawer = ({ open, onClose, selectedData }) => {
  const { Title, Text, Paragraph } = Typography;
  const { Link } = Anchor;
  const vendorApi = new vendorDashboardApi();
  let { screenWidth } = useResponsive();
  const [isMobile, setIsMobile] = useState(false);
  const { user, currencyRate } = useAuth();
  const { t } = useTranslation();
  const { prices } = usePrices();
  const { setSuccessMessage } = useContext(MessageContext);
  const [gasDetail, setGasDetail] = useState({});
  const columns = [
    {
      title: t("transactionDrawer.items.description"),
      dataIndex: "name",
      render: (name) => <div>{name}</div>,
    },
    {
      title: t("transactionDrawer.items.price"),
      dataIndex: "price",
      render: (price) => <div>{price}</div>,
    },
    {
      title: t("transactionDrawer.items.qty"),
      dataIndex: "quantity",
      render: (quantity) => <div>{quantity}</div>,
    },
    {
      title: t("transactionDrawer.items.total"),
      dataIndex: "total",
      render: (total) => <div>{total}</div>,
    },
  ];

  useEffect(() => {
    if (
      selectedData?.paidAt &&
      selectedData?.isProduct == undefined &&
      prices.every((price) => price != undefined)
    )
      fetchInvoiceGasPrice();
  }, [selectedData, prices]);
  useEffect(() => {
    onScreenWidthChange();
  }, [screenWidth]);
  const onScreenWidthChange = () => {
    if (screenWidth <= 767) setIsMobile(true);
    else setIsMobile(false);
  };

  const fetchInvoiceGasPrice = async () => {
    const response = await vendorApi.getInvoiceGasPrice(selectedData?.link);
    if (response) {
      const currency = currencies()?.find(
        (currency) => currency?.abbr == response?.blockchain,
      );
      const currencyIndex = currencies()?.findIndex(
        (currency) => currency?.abbr == response?.blockchain,
      );
      console.log(response);
      setGasDetail({
        currency: response?.currency,
        blockchain: response?.blockchain,
        value:
          (+response?.value * +response?.gasUsed) / 10 ** currency?.decimals,
        amount_dollar:
          (prices[currencyIndex] * (+response?.value * +response?.gasUsed)) /
          10 ** currency?.decimals,
        icon: currency?.icon,
        price: prices[currencyIndex],
      });
    }
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    setSuccessMessage(t("general.copied"));
  };

  const requestDownload = async (label) => {
    const res = await vendorApi.downloadInvoice(label, selectedData?.link);

    if (res) {
      const element = document.createElement("a");
      if (!res) return;
      element.href = URL.createObjectURL(res);
      element.download = label + ".pdf";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  return (
    <Drawer
      title={
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4} className="transaction-drawer-margin-zero">
            {t("transactionDrawer.title")}
          </Title>
          <Button type="text" onClick={() => onClose()}>
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
      <Flex vertical gap={16}>
        {selectedData?.isProduct && (
          <>
            <Flex gap={12}>
              <img
                src={selectedData?.image}
                alt="WatchImg"
                width={58}
                height={58}
              />
              <Flex vertical>
                <Text className="default-text-gray transaction-drawer-product-name">
                  {selectedData?.product?.name}
                </Text>
                <Text className="default=text transaction-drawer-product-name">
                  {selectedData?.product?.description?.length > 0
                    ? selectedData?.product?.description?.substring(0, 350) +
                      "..."
                    : selectedData?.product?.description}
                </Text>
              </Flex>
            </Flex>
            <Divider className="transaction-drawer-margin-zero" />
          </>
        )}

        <Flex vertical gap={16}>
          <Flex vertical gap={12}>
            <Flex vertical gap={8}>
              <Text className="default-text-gray transaction-drawer-product-name">
                {t("transactionDrawer.invoiceAmount")}
              </Text>
              <Title className="transaction-drawer-margin-zero">
                {currencyRate?.symbol}
                {formatUSDBalance(
                  (selectedData?.price *
                    currencyRate?.rate *
                    (100 + (selectedData?.vatPercent ?? 0))) /
                    100,
                )}
              </Title>
              {selectedData?.reverseCharge ? (
                <Text className="default-text-gray">
                  {t("invoicePreview.vatDescription")}
                </Text>
              ) : (
                <Text className="default-text-gray">
                  {t("transactionDrawer.taxText1")}
                  {selectedData?.vatPercent}% (
                  {formatTokenBalance(
                    (selectedData?.vatPercent *
                      (selectedData?.price * currencyRate?.rate)) /
                      100,
                  ) + currencyRate?.symbol}
                  ){t("transactionDrawer.taxText2")}
                </Text>
              )}
            </Flex>
            {selectedData?.paidAt && (
              <Flex vertical gap={4}>
                <Text className="default-text transaction-drawer-product-name">
                  {t("transactionDrawer.crypto")}
                </Text>
                <Flex align="center" gap={16}>
                  <Title
                    level={4}
                    className="default-text transaction-drawer-crypto-price"
                  >
                    {prices[0] != undefined ? (
                      formatTokenBalance(
                        selectedData?.price / gasDetail?.price,
                        6,
                      )
                    ) : (
                      <Skeleton.Input active style={{ height: "28px" }} />
                    )}
                  </Title>
                  <Flex align="center" gap={4}>
                    {Object.keys(gasDetail)?.length > 0 ? (
                      <img
                        src={gasDetail?.icon}
                        alt="Ethereum-icon"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Skeleton.Avatar active width={24} height={24} />
                    )}
                    <Text className="transaction-drawer-crypto">
                      {gasDetail?.blockchain}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>
          {selectedData?.isProduct ? null : (
            <Flex vertical gap={12}>
              <Text className="default-text-gray transaction-drawer-product-name">
                {t("transactionDrawer.invoiceItems")}
              </Text>
              <TableData
                columns={columns}
                data={selectedData?.items}
                hidePagination={true}
              />
              <Flex vertical>
                {selectedData?.paidAt &&
                  selectedData?.isProduct == undefined && (
                    <Flex
                      align="center"
                      justify="space-between"
                      style={{ padding: "8px 0" }}
                    >
                      <Flex align="center" gap={"5px"}>
                        <img src={LocalGasStationFill} alt="Ethereum-icon" />
                        <Text className="default-text-gray">
                          {t("transactionDrawer.transactionFees")}
                        </Text>
                      </Flex>
                      {prices[4] != undefined &&
                      Object.keys(gasDetail)?.length > 0 ? (
                        <Flex align="center" gap={"5px"}>
                          <Text className="default-text-gray">
                            {gasDetail?.value + " " + gasDetail?.blockchain}
                          </Text>
                          <Text className="default-text">
                            {formatUSDBalance(gasDetail?.amount_dollar)}$
                          </Text>
                        </Flex>
                      ) : (
                        <Skeleton.Input active />
                      )}
                    </Flex>
                  )}
                <Flex
                  align="center"
                  justify="space-between"
                  className="transaction-drawer-total-main"
                >
                  <Flex align="center" gap={5}>
                    <Text className="default-text transaction-drawer-product-name">
                      {t("transactionDrawer.total")}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={5}>
                    <Text className="default-text transaction-drawer-product-name">
                      {currencyRate?.symbol}
                      {Object.keys(gasDetail)?.length > 0
                        ? formatUSDBalance(
                            ((selectedData?.price * currencyRate?.rate +
                              gasDetail?.amount_dollar) *
                              (100 + (selectedData?.vatPercent ?? 0))) /
                              100,
                          )
                        : formatUSDBalance(
                            (selectedData?.price *
                              currencyRate?.rate *
                              (100 + (selectedData?.vatPercent ?? 0))) /
                              100,
                          )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Divider className="transaction-drawer-margin-zero" />
        <Flex vertical gap={16}>
          <Text className="default-text transaction-drawer-product-name">
            {t("transactionDrawer.invoiceInfo")}
          </Text>
          <Flex gap={16}>
            <Flex vertical gap={12} flex={1}>
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceFrom")}
              </Text>
              <Flex gap={8}>
                <Divider
                  type="vertical"
                  className="transaction-drawer-divider-height"
                />
                <Flex vertical gap={8}>
                  <Text className="default-text transaction-drawer-crypto-price">
                    {user?.business}
                  </Text>
                  <Flex vertical gap={4}>
                    <Text className="default-text-gray">
                      {user?.phoneNumber}
                    </Text>
                    <Text className="default-text-gray">{user?.email}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex vertical gap={12} flex={1}>
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceTo")}
              </Text>
              <Flex gap={8}>
                <Divider
                  type="vertical"
                  className="transaction-drawer-divider-height"
                />
                <Flex vertical gap={8}>
                  <Text className="default-text" style={{ fontWeight: 500 }}>
                    {selectedData?.name}
                  </Text>
                  <Flex vertical gap={4}>
                    <Text className="default-text-gray">
                      {selectedData?.email}
                    </Text>
                    {selectedData?.company && (
                      <Flex align="center" gap={4}>
                        <img src={CompanyIcon} alt="company-icon" />
                        <Text className="default-text-gray">
                          {selectedData?.company}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={8}>
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.status")}
              </Text>
              <Flex gap={5}>
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
              <Flex gap={5}>
                <Text className="default-text">
                  {moment(selectedData?.createdAt)?.format("MMM DD YY")}
                </Text>
                <Text className="default-text">
                  {moment(selectedData?.createdAt)?.format("hh:mm")}
                </Text>
              </Flex>
            </Flex>
            {selectedData?.paidAt && (
              <Flex align="center" justify="space-between">
                <Text className="default-text-gray">
                  {t("transactionDrawer.completed")}
                </Text>
                <Flex gap={5}>
                  <Text className="default-text">
                    {moment(selectedData?.paidAt)?.format("MMM DD YY")}
                  </Text>
                  <Text className="default-text">
                    {moment(selectedData?.paidAt)?.format("HH:mm")}
                  </Text>
                </Flex>
              </Flex>
            )}
            {selectedData?.paidAt ? (
              <Flex align="center" justify="space-between">
                <Text className="default-text-gray">
                  {t("transactionDrawer.currency")}
                </Text>
                {Object.keys(gasDetail)?.length > 0 ? (
                  <Text className="default-text">{gasDetail?.currency}</Text>
                ) : (
                  <Skeleton.Input style={{ width: 60 }} active />
                )}
              </Flex>
            ) : null}
            <Flex align="center" justify="space-between">
              <Text className="default-text-gray">
                {t("transactionDrawer.invoiceId")}
              </Text>
              <Text className="default-text">
                NEF{selectedData?.invoiceNumber}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {(selectedData?.paidAt === null || selectedData?.isProduct) && (
          <>
            <Divider className="transaction-drawer-margin-zero" />
            <Flex gap={12}>
              <img src={QRicon} alt="QRicon" />
              <Flex vertical gap={12}>
                <Text className="default-text-gray transaction-drawer-product-name">
                  {t("transactionDrawer.checkoutPage")}:
                </Text>
                <Flex vertical gap={8}>
                  <Link
                    href={window.origin + "/pay/" + selectedData?.link}
                    title={
                      window.origin +
                      "/pay/" +
                      selectedData?.link?.substring(0, 15) +
                      "..."
                    }
                    className="invoice-link-container"
                  />

                  <Paragraph className="transaction-drawer-margin-zero">
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          window.origin + "/pay/" + selectedData?.link,
                        )
                      }
                    >
                      <Flex gap={3} align="center">
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

        <Divider className="transaction-drawer-margin-zero" />
        {selectedData?.note && (
          <Flex vertical gap={6}>
            <Text className="default-text transaction-drawer-product-name">
              {t("transactionDrawer.note")}:
            </Text>
            <Paragraph className="default-text-gray transaction-drawer-margin-zero">
              {selectedData?.note}
            </Paragraph>
          </Flex>
        )}
        <Flex gap={6} justify="flex-end">
          {selectedData?.paidAt ? (
            <>
              <Button onClick={() => requestDownload("Invoice", selectedData)}>
                <Flex gap={4}>
                  <Text className="default-text">
                    {t("transactionDrawer.saveInvoice")}
                  </Text>
                  <img src={FilesIcon} alt="FilesIcon" />
                </Flex>
              </Button>
              <Button onClick={() => requestDownload("Receipt", selectedData)}>
                <Flex gap={4}>
                  <Text className="default-text">
                    {t("transactionDrawer.saveReceipt")}
                  </Text>
                  <img src={SaveReceiptIcon} alt="FilesIcon" />
                </Flex>
              </Button>
            </>
          ) : (
            <Button onClick={() => requestDownload("Invoice", selectedData)}>
              <Flex gap={4}>
                <Text className="default-text">
                  {t("transactionDrawer.saveInvoice")}
                </Text>
                <img src={FilesIcon} alt="FilesIcon" />
              </Flex>
            </Button>
          )}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default TransactionDrawer;
