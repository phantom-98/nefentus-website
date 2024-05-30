import { Card, Col, Flex, Input, Row, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import BalanceGraph from "../../components/balanceGraph";
import { formatUSDBalance } from "../../../utils";

import ProductDetailIcon from "../../../assets/newDashboardIcons/product-detail.svg";
import OpenIcon from "../../../assets/newDashboardIcons/pending.svg";
import ProcessingIcon from "../../../assets/newDashboardIcons/processing.svg";
import PaidIcon from "../../../assets/newDashboardIcons/paid.svg";
import "./salesDashboard.css";
import moment from "moment";
import { useTranslation } from "react-i18next";
import IncomeCard from "../../components/incomeCard";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import TableData from "../../components/tableData";
import TransactionDrawer from "../../components/transactionDrawer";
import InvoiceStatusCard from "../../components/invoiceStatusCard";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import adminDashboardApi from "../../../api/adminDashboardApi";
import { useAuth } from "../../../context/auth/authContext";

const incomeCards = [
  {
    title: "referralDashboard.incomeCards.last30DaysTitle",
    subText: "referralDashboard.incomeCards.last30DaysSubText",
  },
  {
    title: "referralDashboard.incomeCards.last24HoursTitle",
    subText: "referralDashboard.incomeCards.last24HoursSubText",
  },
  {
    title: "referralDashboard.incomeCards.paymentCardTitle",
    subText: "referralDashboard.incomeCards.paymentCardSubText",
  },
];
const SalesDashboard = ({ type }) => {
  const { t } = useTranslation();
  const dashboardApi = new vendorDashboardApi();
  const adminApi = new adminDashboardApi(type);
  const { currencyRate } = useAuth();
  const [activeSegment, setActiveSegment] = useState("product");
  const [products, setProducts] = useState([]);
  const [dataLength, setDataLength] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [search, setSearch] = useState("");
  const [income, setIncome] = useState(0);
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, dataLength]);

  useEffect(() => {
    if (Object.keys(selectedData)?.length) setOpenTransaction(true);
    else setOpenTransaction(false);
  }, [selectedData]);

  useEffect(() => {
    if (currentPage == 1) fetchProducts();
    else setCurrentPage(1);
  }, [activeSegment]);

  const fetchIncomeDetails = async () => {
    const getPromises = [
      adminApi.getTotalRegistrations(),
      adminApi.getTotalIncome(),
    ];

    const [dataReg, dataInc] = await Promise.allSettled(getPromises);

    setIncome(dataInc?.value["total"]?.number);
    setCardDetails(
      incomeCards?.map((card, index) => ({
        ...card,
        ...(index == 0
          ? dataInc?.value["last30Days"]
          : index == 1
          ? dataInc?.value["last24Hours"]
          : dataReg?.value),
      })),
    );
  };

  const fetchProducts = async (
    search = "",
    current = currentPage,
    length = dataLength,
  ) => {
    if (activeSegment == "product") {
      const newProducts = await dashboardApi.getProducts(
        current - 1, // 0
        length, // 1000
        search, // ""
      );
      if (newProducts) {
        const newSignedImagePaths = await Promise.all(
          newProducts?.content.map((product) =>
            dashboardApi.getSignedImagePath(product.link),
          ),
        );

        const productData = newProducts?.content.map((item, index) => ({
          ...item,
          price: item.price,
          image: newSignedImagePaths[index],
          isProduct: true,
        }));
        if (productData?.length) {
          setTotal(newProducts?.totalElements);
          setProducts([...productData]);
        } else setProducts([]);
      }
    } else {
      let newInvoices = await dashboardApi.getInvoices(
        current - 1,
        length,
        search,
      );
      // Reverse the array
      newInvoices = { ...newInvoices, content: newInvoices?.content.reverse() };
      setTotal(newInvoices?.totalElements);
      setInvoices([...newInvoices?.content]);
    }
  };

  const columns = [
    {
      title: t("salesDashboard.productTable.productName"),
      dataIndex: "name",
      fixed: "left",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend", "descend"],
      render: (name, record) => {
        return (
          <Row align={"middle"} gutter={12}>
            <Col>
              <img
                src={record?.image}
                width={32}
                height={32}
                className="sales-product-image"
              />
            </Col>
            <Col>
              <div className="default-text">{name}</div>
              {/* <div className="default-text-gray">{record?.email}</div> */}
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("salesDashboard.productTable.client"),
      dataIndex: "user",
      sorter: (a, b) => a.user?.firstName.length - b.user?.firstName.length,
      sortDirections: ["ascend", "descend"],
      render: (user, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <div className="default-text">
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className="default-text-gray">{record?.user?.email}</div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("salesDashboard.productTable.invoiceId"),
      dataIndex: "link",
      sorter: (a, b) => a.link.length - b.link.length,
      sortDirections: ["ascend", "descend"],
      render: (link, record) => {
        return <div className="default-text invoice-id-column">{link}</div>;
      },
    },
    {
      title: t("salesDashboard.productTable.amount"),
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["ascend", "descend"],
      render: (price, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <div className="default-text">
                {currencyRate?.symbol +
                  formatUSDBalance(+price * currencyRate?.rate)}
              </div>
              {/* <div className="default-text-gray">{record?.email}</div> */}
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("salesDashboard.productTable.date"),
      dataIndex: "updatedAt",
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      sortDirections: ["ascend", "descend"],
      render: (date, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <div className="default-text">
                {moment(date).format("MMM DD YYYY")}
              </div>
              <div className="default-text-gray">
                {moment(date).format("HH:MM")}
              </div>
              {/* <div className="default-text-gray">{record?.email}</div> */}
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("salesDashboard.productTable.action"),
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Flex
            align="center"
            justify="center"
            gap={4}
            className="product-detail-button cursor-pointer"
            onClick={() => setSelectedData(record)}
          >
            <img src={ProductDetailIcon} />

            <div className="default-text">{t("salesDashboard.details")}</div>
          </Flex>
        );
      },
    },
  ];

  const invoiceColumns = [
    {
      title: t("salesDashboard.invoiceTable.billedTo"),
      dataIndex: "company",
      fixed: "left",
      sorter: (a, b) => a.company.length - b.company.length,
      sortDirections: ["ascend", "descend"],
      render: (company, record) => {
        return (
          <div>
            <div className="default-text">{company}</div>
            <div className="default-text-gray">{record?.email}</div>
          </div>
        );
      },
    },
    {
      title: t("salesDashboard.invoiceTable.invoiceId"),
      dataIndex: "invoiceNumber",
      sorter: (a, b) => a.invoiceNumber.length - b.invoiceNumber.length,
      sortDirections: ["ascend", "descend"],
      render: (invoiceNumber, record) => {
        return (
          <div className="default-text invoice-id-column">
            {"NEF" + invoiceNumber}
          </div>
        );
      },
    },
    {
      title: t("salesDashboard.invoiceTable.amount"),
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["ascend", "descend"],
      render: (price, record) => {
        return (
          <div className="default-text">
            {currencyRate?.symbol +
              formatUSDBalance(+price * currencyRate?.rate)}
          </div>
        );
      },
    },
    {
      title: t("salesDashboard.invoiceTable.status"),
      dataIndex: "paidAt",
      sorter: (a, b) => a.paidAt?.length - b.paidAt?.length,
      sortDirections: ["ascend", "descend"],
      render: (paidAt, record) => {
        return (
          <Flex
            align="center"
            justify="center"
            gap={3}
            className="invoice-status-column"
          >
            <div>
              <img src={paidAt ? PaidIcon : OpenIcon} alt="icon" />
            </div>
            <div>{paidAt ? "Paid" : "Open"}</div>
          </Flex>
        );
      },
    },

    {
      title: t("salesDashboard.invoiceTable.date"),
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ["ascend", "descend"],
      render: (date, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <div className="default-text">
                {moment(date).format("MMM DD YYYY")}
              </div>
              <div className="default-text-gray">
                {moment(date).format("HH:MM")}
              </div>
              {/* <div className="default-text-gray">{record?.email}</div> */}
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("salesDashboard.invoiceTable.action"),
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Flex
            align="center"
            justify="center"
            gap={4}
            className="product-detail-button cursor-pointer"
            onClick={() => setSelectedData(record)}
          >
            <img src={ProductDetailIcon} />

            <div className="default-text">{t("salesDashboard.details")}</div>
          </Flex>
        );
      },
    },
  ];

  const onSearch = (value) => {
    fetchProducts(value);
  };

  const handleSegment = (value) => {
    setSearch("");
    setActiveSegment(value);
  };

  return (
    <div className="sales-dashboard">
      {openTransaction && (
        <TransactionDrawer
          open={openTransaction}
          onClose={() => setSelectedData({})}
          selectedData={selectedData}
        />
      )}
      <Flex vertical gap={32}>
        <Flex
          vertical
          justify="center"
          gap={16}
          className="sales-income-container"
        >
          <Flex align="center" justify="space-between" flex={2}>
            <div className="default-text-gray sales-income-title">
              {t("salesDashboard.salesIncomeTitle")}
            </div>
            <div className="default-text sales-income-value">
              {currencyRate?.symbol +
                formatUSDBalance(+income * currencyRate?.rate)}
            </div>
          </Flex>
          <div>
            <BalanceGraph
              graphData={[{ label: moment().format("MMM DD"), amount: 0 }]}
            />
          </div>
        </Flex>
        <Flex gap={12} wrap>
          <InvoiceStatusCard />
          <Flex
            className="sales-income-card-container"
            justify={"space-between"}
          >
            {cardDetails?.map((card, index) => (
              <IncomeCard
                card={card}
                key={index}
                isLast={index === cardDetails?.length - 1}
              />
            ))}
          </Flex>
        </Flex>

        {/** Transaction Table */}

        <div className="user-table-container">
          <Row align={"middle"} justify={"space-between"}>
            <Flex align="center" gap={36}>
              <div className="default-text sales-income-title">
                {t("salesDashboard.transactionTitle")}
              </div>
              <Flex
                align="center"
                justify="center"
                className="transaction-segment-container"
              >
                <div
                  className={`transaction-segment cursor-pointer ${
                    activeSegment === "product"
                      ? "active-transaction-segment"
                      : ""
                  }`}
                  onClick={() => handleSegment("product")}
                >
                  {t("salesDashboard.product")}
                </div>
                <div
                  className={`transaction-segment cursor-pointer ${
                    activeSegment === "invoice"
                      ? "active-transaction-segment"
                      : ""
                  }`}
                  onClick={() => handleSegment("invoice")}
                >
                  {t("salesDashboard.invoice")}
                </div>
              </Flex>
            </Flex>
            <Input
              placeholder={t("personalDashboard.searchPlaceholder")}
              prefix={<img src={SearchIcon} />}
              className="sales-dashboard-table-searchbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => e?.key == "Enter" && onSearch(e?.target?.value)}
            />
          </Row>
          <TableData
            data={activeSegment == "product" ? products : invoices}
            // togglebtn={loader}
            dataLength={dataLength}
            setDataLength={setDataLength}
            setPage={setCurrentPage}
            columns={activeSegment == "product" ? columns : invoiceColumns}
            total={total}
            current={currentPage}
          />
        </div>
      </Flex>
    </div>
  );
};

export default SalesDashboard;
