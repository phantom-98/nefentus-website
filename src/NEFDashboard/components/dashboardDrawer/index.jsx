import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Flex,
  Input,
  Row,
  Typography,
  Divider,
} from "antd";
import Cover from "../../../assets/newDashboardIcons/wallet-detail-cover.png";
import TotalBalanceSection from "../totalBalanceSection";
import EthereumLogo from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import RemoveWallet from "../../../assets/newDashboardIcons/removeWallet.svg";
import WalletIcon from "../../../assets/newDashboardIcons/wallet-gray.svg";
import "./dashboardDrawer.css";
import PorfolioCoins from "../portfolioCoins";
import TableData from "../tableData";
import { blockchainToName, currencies } from "../../../constants";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import { MessageContext } from "../../../context/message";
import { useTranslation } from "react-i18next";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import { formatTokenBalance, formatUSDBalance } from "../../../utils";
import backendAPI from "../../../api/backendAPI";
import DeleteModal from "../deleteModal";
import useResponsive from "../../../hooks/useResponsive";
import { useAuth } from "../../../context/auth/authContext";

const COLORS = [
  "#078BB9",
  "#8543DA",
  "#1F7369",
  "#A45A25",
  "#A18729",
  "#A43C3C",
  "#CE34B7",
  "#BF9322",
  "#466FEE",
];

const DashboardDrawer = ({ open, onClose, selectedWallet, onDeleteWallet }) => {
  let { screenWidth } = useResponsive();
  const currencyList = currencies();
  const { fetchBalanceForWallet } = useBalances();
  const { prices } = usePrices();
  const { setSuccessMessage } = useContext(MessageContext);
  const [cryptoList, setCryptoList] = useState([]);
  const [backupCryptoList, setBackupCryptoList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loader, setLoader] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { t } = useTranslation();
  const { Title, Text, Paragraph } = Typography;
  const backendApi = new backendAPI();
  const { currencyRate } = useAuth();

  useEffect(() => {
    onScreenWidthChange();
  }, [screenWidth]);

  useEffect(() => {
    if (Object.keys(selectedWallet)?.length) fetchWalletDetails();
    else clearData();
  }, [selectedWallet]);

  const onScreenWidthChange = () => {
    if (screenWidth <= 767) setIsMobile(true);
    else setIsMobile(false);
  };

  const clearData = () => {
    setCryptoList([]);
  };

  const columns = [
    {
      title: t("personalDashboard.currencyTable.coin"),
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend", "descend"],
      render: (name, record) => {
        return (
          <Row align={"middle"} gutter={6}>
            <Col>
              <img src={record?.icon} width={24} />
            </Col>
            <Col>
              <div className="default-text">{name}</div>
              <div className="default-text-gray">{record?.blockchain}</div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("personalDashboard.currencyTable.amount"),
      dataIndex: "value",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.value - b.value,
      render: (value, record) => {
        return (
          <Col>
            <div className="default-text">
              {formatTokenBalance(record?.value, 4) ?? 0}
            </div>
            <div className="default-text-gray">
              {currencyRate?.symbol +
                formatUSDBalance(record?.price * value * currencyRate?.rate)}
            </div>
          </Col>
        );
      },
    },
    {
      title: t("personalDashboard.currencyTable.price"),
      dataIndex: "price",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.price - b.price,
      render: (price, record) => {
        return (
          <div>
            {currencyRate?.symbol +
              formatUSDBalance(price * currencyRate?.rate)}
          </div>
        );
      },
    },
  ];

  const fetchWalletDetails = async () => {
    setLoader(true);
    fetchBalanceForWallet(selectedWallet?.address).then((balances) => {
      let totalBalance = balances
        .map((balance, index) => balance * prices[index])
        .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);
      setTotalAmount(totalBalance || 0);

      const pers = balances?.map((balance, index) =>
        parseFloat(
          ((balance * prices[index]) / (totalBalance * 1.0)) * 100,
        ).toFixed(2),
      );
      const data = currencyList.map((currency, index) => ({
        ...currency,
        middleName: blockchainToName(currency.blockchain),
        middleInfo: "Network",
        price: prices[index],
        value: balances[index],
        amount_dollar: parseFloat((prices[index] * balances[index]).toFixed(4)),
        percentage: pers[index] === "NaN" ? 0 : pers[index],
        color: COLORS[index],
        icon:
          initialiseCoinIcons(currency.name?.toLowerCase()) ?? currency?.icon,
      }));
      let updatedArray = data
        .filter((item) => item.amount_dollar > 0)
        .sort((a, b) => b.amount_dollar - a.amount_dollar);
      let otherCoins;
      if (updatedArray?.length > 5) {
        const lastCoins = updatedArray?.slice(5, currencyList?.length);
        otherCoins = lastCoins.reduce((acc, obj) => {
          // Initialize the accumulator with the structure if it's empty
          if (!acc.name) acc.name = "Other";
          if (!acc.blockchain) acc.blockchain = "";
          if (!acc.icon) acc.icon = "";
          if (!acc.abbr) acc.abbr = "Other";
          if (!acc.address) acc.address = null;
          if (!acc.decimals) acc.decimals = 0;
          if (!acc.middleName) acc.middleName = "";
          if (!acc.middleInfo) acc.middleInfo = "";
          if (!acc.price) acc.price = 0;
          if (!acc.value) acc.value = 0;
          if (!acc.amount_dollar) acc.amount_dollar = 0;
          if (!acc.percentage) acc.percentage = "0.00";
          if (!acc.color) acc.color = "#A43C3C";

          // Sum the numerical values
          acc.value += obj.value;
          acc.amount_dollar += obj.amount_dollar;

          // For percentage, we should calculate the weighted average if needed, but here we can sum for simplicity
          acc.percentage = (
            parseFloat(acc.percentage) + parseFloat(obj.percentage)
          ).toFixed(2);

          return acc;
        }, {});
      }

      const finalisedData =
        updatedArray?.length > 5
          ? [...updatedArray?.slice(0, 5), { ...otherCoins }]
          : updatedArray;
      setCryptoList(finalisedData);
      setBackupCryptoList(finalisedData);
    });
    setLoader(false);
  };

  const onSearch = (value) => {
    const updatedList = backupCryptoList?.filter((crypto) =>
      crypto?.name?.toLowerCase()?.includes(value?.toLowerCase()),
    );
    setCryptoList(updatedList);
  };

  const initialiseCoinIcons = (coin) => {
    switch (coin) {
      case "ethereum":
      case "wrapped ethereum":
        return EthereumLogo;
      default:
        return undefined;
    }
  };

  const onCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet?.address);
    setSuccessMessage(t("general.copied"));
  };

  const deleteWallet = async () => {
    const response = await backendApi.deleteWallet(selectedWallet?.address);
    setOpenDeleteModal(!openDeleteModal);
    onDeleteWallet();
  };
  return (
    <Drawer
      title={
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4} style={{ margin: "0" }}>
            {t("personalDashboard.walletCard.detail")}
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
      className="drawer-container"
    >
      <DeleteModal
        icon={<img src={WalletIcon} alt="delete-user" width={32} />}
        description={t("personalDashboard.drawer.deleteWallet")}
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(!openDeleteModal)}
        onDelete={() => deleteWallet()}
      />
      <Flex vertical gap={24}>
        <Flex
          align="center"
          justify="space-between"
          className="wallet-drawer-title"
        >
          <Flex gap={"8px"} align="center">
            <div className="drawer-wallet-logo-container">
              <img src={selectedWallet?.icon} className=" drawer-wallet-logo" />
            </div>
            <div className="drawer-wallet-title-subcontainer">
              <Text className="drawer-wallet-title default-text-gray">
                {t("personalDashboard.drawer.wallet")}
              </Text>
              <Text className="default-text drawer-wallet-name">
                {selectedWallet?.name?.toLowerCase() == "internal"
                  ? "Nefentus"
                  : selectedWallet?.name}
              </Text>
            </div>
          </Flex>
          <div className="drawer-wallet-title-subcontainer">
            <div className="drawer-wallet-title default-text-gray">
              {t("personalDashboard.drawer.addressTitle")}
            </div>
            <div className="drawer-address-field">
              <div className="default-text drawer-wallet-address-container">
                {WalletAddressFormatter(selectedWallet?.address)}
              </div>
              <div className="drawer-copy-button" onClick={onCopyAddress}>
                <div className="copy-icon"></div>
                <div className="default-text">
                  {t("personalDashboard.drawer.copy")}
                </div>
              </div>
            </div>
          </div>
        </Flex>
        <Divider style={{ margin: 0 }} />

        {/* Section 3 */}
        <div className="drawer-balance-section">
          <Flex justify="space-between">
            <Flex vertical>
              <div className="drawer-total-balance-container">
                <div className="default-text-gray total-balance-title">
                  {t("personalDashboard.drawer.balance")}
                </div>
                {/* <div className="drawer-total-balance">
              <div className="default-text percentage-tag">
                <div>+2.11% </div>
                <img src={ArrowUp} alt="arrow-up" />
              </div>
              <div className="default-text-gray">vs last 30 days</div>
            </div> */}
              </div>
              <div className="total-balance-value">
                {currencyRate?.symbol +
                  formatUSDBalance(
                    selectedWallet?.balance * currencyRate?.rate,
                  )}
              </div>
            </Flex>
            {selectedWallet?.type != "internal" && (
              <Button className="remove-wallet-with-balance">
                <Flex
                  gap={"4px"}
                  onClick={() => setOpenDeleteModal(!openDeleteModal)}
                >
                  <img src={RemoveWallet} alt="RemoveWallet" />
                  <Text style={{ color: "#A43C3C" }}>
                    {t("personalDashboard.drawer.removeWallet")}
                  </Text>
                </Flex>
              </Button>
            )}
          </Flex>

          <TotalBalanceSection total={selectedWallet?.balance} />
        </div>

        {/* Section 4 */}
        <Flex vertical gap={10} justify="center">
          <div className="drawer-portfolio-title">
            {" "}
            {t("personalDashboard.drawer.portfolio")}
          </div>
          <div className="line-bar-graph">
            {cryptoList.map((data, index) =>
              parseInt(data?.percentage) > 0 ? (
                <div
                  className="line-bar-graph-section"
                  style={{
                    width: `${data?.percentage}%`,
                    backgroundColor: data?.color,
                  }}
                ></div>
              ) : null,
            )}
          </div>
          <div>
            <PorfolioCoins data={cryptoList} useAbbreviations={isMobile} />
          </div>
        </Flex>
        {/* Section 5 */}
        <Flex vertical gap={8}>
          <Flex align="center" justify="space-between">
            <div className="default-text drawer-table-title">
              {t("personalDashboard.drawer.coinView")}
            </div>
            <Input
              placeholder={t("personalDashboard.searchPlaceholder")}
              prefix={<img src={SearchIcon} />}
              className="drawer-searchbar"
              onKeyUp={(e) => e?.key == "Enter" && onSearch(e?.target?.value)}
            />
          </Flex>
          <TableData data={cryptoList} togglebtn={loader} columns={columns} />
        </Flex>
      </Flex>
      {selectedWallet?.type != "internal" && (
        <Button className="mobile-view-remove-wallet">
          <Flex
            gap={"4px"}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            <img src={RemoveWallet} alt="RemoveWallet" />
            <Text style={{ color: "#A43C3C" }}>
              {t("personalDashboard.drawer.removeWallet")}
            </Text>
          </Flex>
        </Button>
      )}
    </Drawer>
  );
};

export default DashboardDrawer;
