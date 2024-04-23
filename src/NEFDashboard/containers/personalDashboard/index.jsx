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
import { UserOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import EuropeFlag from "../../../assets/newDashboardIcons/europe-flag.svg";
import USAFlag from "../../../assets/newDashboardIcons/usa-flag.svg";
import DownArrow from "../../../assets/newDashboardIcons/down-arrow.svg";
import UpArrow from "../../../assets/newDashboardIcons/arrow-up.svg";
import WalletIcon from "../../../assets/newDashboardIcons/wallets-gray.svg";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import SettingIcon from "../../../assets/newDashboardIcons/settings.svg";
import SupportIcon from "../../../assets/newDashboardIcons/support.svg";
import ThemeModeIcon from "../../../assets/newDashboardIcons/theme-mode.svg";
import LogoutIcon from "../../../assets/newDashboardIcons/logout.svg";
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
  formatUSDBalance,
  getRole,
  getWalleBackground,
  getWalletIcon,
} from "../../../utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/auth/authContext";
import Languages from "../../../components/navigation/languages.jsx/languages";
import "./personalDashboard.css";

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
  const { toggleTheme } = useTheme();
  const currencyList = currencies();
  const backend_API = new backendAPI();
  const { user, setUser } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const { balances, fetchBalances, fetchBalanceForWallet } = useBalances();
  const { prices, fetchPrices } = usePrices();
  const [walletOptions, setWalletOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("europe");
  const [loader, setLoader] = useState(true);
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

  const options = [
    {
      value: "usa",
      label: (
        <Row className="currency-option">
          <img src={USAFlag} alt="usa-flag" /> <div>USD $</div>
          {/* {selectedLanguage === "usa" && (
            <div>
              <img src={Check} alt="check" />
            </div>
          )} */}
        </Row>
      ),
    },
    {
      value: "europe",
      label: (
        <Row className="currency-option">
          <img src={EuropeFlag} alt="europe-flag" /> <div>EUR €</div>
          {/* {selectedLanguage === "europe" && (
            <div>
              <img src={Check} alt="check" />
            </div>
          )} */}
        </Row>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div className="profile-dropdown-width">
          {t("personalDashboard.profileDropdown.setting")}
        </div>
      ),
      icon: <img src={SettingIcon} alt="setting" />,
    },
    {
      key: "2",
      label: <div>{t("personalDashboard.profileDropdown.support")}</div>,
      icon: <img src={SupportIcon} alt="support" />,
    },
    {
      key: "3",
      label: (
        <Flex justify="space-between" align="center">
          <div>{t("personalDashboard.profileDropdown.darkMode")}</div>
          <Switch defaultChecked onChange={(e) => toggleTheme()} />
        </Flex>
      ),
      icon: <img src={ThemeModeIcon} alt="theme-mode" />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div>{t("personalDashboard.profileDropdown.logout")}</div>,
      icon: <img src={LogoutIcon} alt="logout" />,
    },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 2090,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
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
          infinite: true,
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
        }
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        // One or more promises rejected, error contains the rejection reason
        console.error("One or more promises rejected:", error);
      });
  };

  const handleCloseDrawer = () => {
    setSelectedWallet({});
    setOpenDrawer(false);
  };

  const handleDropDown = (e) => {
    setDropDownToggle(e);
  };

  const handleLanguage = (lng) => {
    setSelectedLanguage(lng);
  };

  return (
    <>
      <DashboardDrawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        selectedWallet={selectedWallet}
      />
      <div className="personal-dashboard-container">
        <div className="page-title-container">
          <div className="pageTitle">{t("personalDashboard.title")}</div>
          <Flex align="center" gap={24}>
            <Select
              defaultValue={"europe"}
              options={options}
              onChange={handleLanguage}
              className="currency-dropdown"
            />
            <div className="language-container">
              <div className="localisation-container">
                <Languages />
              </div>
            </div>

            <Divider type="vertical" className="verticalDivider" />
            <Dropdown
              menu={{
                items,
              }}
              className="profile-dropdown"
              onOpenChange={handleDropDown}
            >
              <Row className="user-block">
                <Avatar shape="square" size={35} icon={<UserOutlined />} />
                <Col>
                  <div className="username-text">
                    {user?.firstName + " " + user?.lastName}
                  </div>
                  <div className="user-role-text">{getRole(user)}</div>
                </Col>
                <img
                  src={dropDownToggle ? UpArrow : DownArrow}
                  className={
                    dropDownToggle
                      ? `user-block-arrow`
                      : `user-block-arrow-down`
                  }
                />
              </Row>
            </Dropdown>
          </Flex>
        </div>
        <Divider className="divider-without-margin" />
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
                    <img src={WalletIcon} />
                    <div className="default-text-gray">
                      {t("personalDashboard.wallets")}
                    </div>
                  </Row>
                  <div>
                    <Button
                      className="add-wallet-button"
                      icon={<PlusOutlined />}
                      onClick={() => walletRef?.current?.click()}
                    >
                      {t("personalDashboard.addWallet")}
                    </Button>
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
                  />
                </Row>
                <TableData data={cryptoList} togglebtn={loader} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PersonalDashboard;
