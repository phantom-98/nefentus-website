import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Row,
  Select,
  Switch,
  Dropdown,
  Skeleton,
} from "antd";

import AddIcon from "../../../assets/newDashboardIcons/add.svg";
import WalletIcon from "../../../assets/newDashboardIcons/wallets-gray.svg";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import EthereumLogo from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import Slider from "react-slick";
import CurrencyChart from "../../components/currencyChart";
import TableData from "../../components/tableData";
import TotalBalanceSection from "../../components/totalBalanceSection";
import DashboardDrawer from "../../components/dashboardDrawer";
import WalletCard from "../../components/walletCard";
import { useTheme } from "../../../context/themeContext/themeContext";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import { blockchainToName, currencies } from "../../../constants";
import Check from "../../../assets/icon/check.svg";
import backendAPI from "../../../api/backendAPI";
import {
  formatTokenBalance,
  formatUSDBalance,
  getRole,
  getWalleBackground,
  getWalletIcon,
} from "../../../utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/auth/authContext";
import Languages from "../../../components/navigation/languages.jsx/languages";
import "./personalDashboard.css";
import { ConnectWallet, useDisconnect } from "@thirdweb-dev/react";

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

const PersonalDashboard = () => {
  const { t } = useTranslation();
  const walletRef = useRef(null);
  const currencyList = currencies();
  const backend_API = new backendAPI();
  const { user, setUser } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [backupCryptoList, setBackupCryptoList] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const { balances, fetchBalances, fetchBalanceForWallet } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const [walletOptions, setWalletOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("europe");
  const [loader, setLoader] = useState(true);
  const disconnect = useDisconnect();
  useEffect(() => {
    updateInfo();
  }, []);

  useEffect(() => {
    if (prices.every((price) => price != undefined)) fetchWallets();
  }, [prices]);

  useEffect(() => {
    if (Object.keys(selectedWallet)?.length) setOpenDrawer(!openDrawer);
  }, [selectedWallet]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const response = await backend_API.getProfile();
    if (response) setUser({ ...response });
  };

  const updateInfo = () => {
    fetchBalances();
    fetchPrices();
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
              $
              {formatUSDBalance(
                record?.price * value || (record?.price * value)?.toString(),
              )}
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
        return <div>${price?.toFixed(2)}</div>;
      },
    },
  ];

  const settings = {
    className: "center",
    centerMode: walletOptions?.length > 2,
    infinite: walletOptions?.length > 2,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 2090,
        settings: {
          className: "center",
          centerMode: true,
          infinite: walletOptions?.length > 1,
          centerPadding: "60px",
          slidesToShow: 2,
          speed: 500,
        },
      },
      {
        breakpoint: 1530,
        settings: {
          className: "center",
          centerMode: true,
          infinite: walletOptions?.length > 1,
          centerPadding: "60px",
          slidesToShow: 1,
          speed: 500,
        },
      },
    ],
  };

  const fetchWallets = async () => {
    setLoader(true);
    const list = await backend_API.getWalletAddresses();

    const getwalletBalances = await list.map(async (wallet) => {
      return await fetchBalanceForWallet(wallet?.address);
    });

    Promise.all(getwalletBalances)
      .then((results) => {
        setWalletOptions(
          list.map((wallet, index) => ({
            ...wallet,
            name: wallet?.type,
            icon: getWalletIcon(wallet?.type),
            balance: results[index]
              .map((balance, index) => balance * prices[index])
              .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0),
            ...getWalleBackground(wallet?.type),
          })),
        );
        const balanceSum = results?.reduce((updatedbalance, currentResult) => {
          currentResult.forEach((value, index) => {
            updatedbalance[index] = (updatedbalance[index] || 0) + value;
          });

          return updatedbalance;
        }, []);
        let totalBalance = balanceSum
          .map((balance, index) => balance * prices[index])
          .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);
        setTotal(totalBalance || 0);

        if (totalBalance > 0) {
          const pers = balanceSum?.map((balance, index) =>
            parseFloat(
              ((balance * prices[index]) / (totalBalance * 1.0)) * 100,
            ).toFixed(2),
          );
          const data = currencyList.map((currency, index) => ({
            ...currency,
            middleName: blockchainToName(currency.blockchain),
            middleInfo: "Network",
            price: prices[index],
            value: balanceSum[index],
            amount_dollar: parseFloat(
              (prices[index] * balanceSum[index]).toFixed(4),
            ),
            percentage: pers[index],
            color: COLORS[index],
            icon:
              initialiseCoinIcons(currency.name?.toLowerCase()) ??
              currency?.icon,
          }));
          setCryptoList(data);
          setBackupCryptoList(data);
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // One or more promises rejected, error contains the rejection reason
        console.error("One or more promises rejected:", error);
      });
  };

  const registerWallet = async (wallet) => {
    const address = await wallet.getAddress();
    const result = await backend_API.registerWalletAddress({
      address: address,
      name: wallet?.walletId,
    });
    if (result) fetchWallets();
  };

  const onSearch = (value) => {
    const updatedList = backupCryptoList?.filter((crypto) =>
      crypto?.name?.toLowerCase()?.includes(value?.toLowerCase()),
    );
    setCryptoList(updatedList);
  };

  const handleCloseDrawer = () => {
    setSelectedWallet({});
    setOpenDrawer(false);
  };

  return (
    <>
      <DashboardDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        selectedWallet={selectedWallet}
      />

      <div className="personal-dashboard-body">
        <Row>
          <Col span={8}>
            <div className="total-balance-container">
              <div className="total-balance-sub-container">
                <div className="total-balance-text">
                  {t("personalDashboard.balanceTitle")}
                </div>
                <div>
                  {loader ? (
                    <div className="skeleton-title">
                      <Skeleton.Input active className="balance-skeleton" />
                    </div>
                  ) : (
                    <div className="total-balance-value">{`$${formatUSDBalance(
                      total,
                    )}`}</div>
                  )}
                </div>
                <TotalBalanceSection total={total} />
              </div>
            </div>
          </Col>
          <Divider
            type="vertical"
            className="dashboard-second-section-divider"
          />
          <Col span={15}>
            <div className="block-right">
              <Row className="wallets-title-container">
                <Row className="wallets-title">
                  <div className="default-text-gray personal-dashboard-wallet-title">
                    {t("personalDashboard.wallets")}
                  </div>
                </Row>
                <div>
                  {/* <Button
                    className="add-wallet-button default-text"
                    icon={<PlusOutlined />}
                    onClick={() => walletRef?.current?.click()}
                  >
                    {t("personalDashboard.addWallet")}
                  </Button> */}
                  <ConnectWallet
                    // theme={"dark"}
                    modalSize={"wide"}
                    btnTitle={
                      <Flex align="center" gap={4}>
                        <img src={AddIcon} />
                        <div>Add Wallet</div>
                      </Flex>
                    }
                    onConnect={(wlt) => {
                      registerWallet(wlt);
                      disconnect(wlt);
                    }}
                    className={"personal-dashboard-add-wallet"}
                  />
                </div>
              </Row>
              <div className="slider-container">
                {loader ? (
                  <Flex gap={10} align="center" justify="center">
                    <Skeleton.Button active className="slider-skeleton" />
                    <Skeleton.Button active className="slider-skeleton" />
                    <Skeleton.Button active className="slider-skeleton" />
                  </Flex>
                ) : (
                  <div>
                    <Slider {...settings}>
                      {walletOptions?.length > 0 &&
                        walletOptions.map((wallet, index) => (
                          <WalletCard
                            wallet={wallet}
                            openDrawer={openDrawer}
                            setOpenDrawer={setOpenDrawer}
                            key={index}
                            handleWalletDetail={(wlt) => {
                              setSelectedWallet(wlt);
                            }}
                          />
                        ))}
                    </Slider>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Divider className="divider-without-margin third-divider" />
        <Row gutter={32}>
          <Col span={8}>
            <div className="portfolio-container">
              <div className="portfolio-title">
                {t("personalDashboard.portfolio")}
              </div>
              <div className="currency-chart-container">
                <CurrencyChart
                  balances={balances}
                  prices={prices}
                  data={cryptoList}
                  colors={COLORS}
                  togglebtn={loader}
                />
              </div>
            </div>
          </Col>
          <Col span={16}>
            <div className="portfolio-container">
              <Row align={"middle"} justify={"space-between"}>
                <div className="portfolio-title">
                  {t("personalDashboard.currencies")}
                </div>
                <Input
                  placeholder={t("personalDashboard.searchPlaceholder")}
                  prefix={<img src={SearchIcon} />}
                  className="searchbar"
                  onKeyUp={(e) =>
                    e?.key == "Enter" && onSearch(e?.target?.value)
                  }
                />
              </Row>
              <TableData
                data={cryptoList}
                togglebtn={loader}
                columns={columns}
              />
            </div>
          </Col>
        </Row>
      </div>
      {/* </div> */}
    </>
  );
};

export default PersonalDashboard;
