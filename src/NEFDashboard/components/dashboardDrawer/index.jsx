import React, { useContext, useEffect, useState } from "react";
import { Drawer, Flex, Input, Row } from "antd";
import Cover from "../../../assets/newDashboardIcons/wallet-detail-cover.png";
import TotalBalanceSection from "../totalBalanceSection";
import EthereumLogo from "../../../assets/newDashboardIcons/ethereum-logo.svg";
import SearchIcon from "../../../assets/newDashboardIcons/search.svg";
import "./dashboardDrawer.css";
import PorfolioCoins from "../portfolioCoins";
import TableData from "../tableData";
import { blockchainToName, currencies } from "../../../constants";
import useBalances from "../../../hooks/balances";
import usePrices from "../../../hooks/prices";
import { MessageContext } from "../../../context/message";
import { useTranslation } from "react-i18next";
import WalletAddressFormatter from "../../../func/walletAddressFormatter";
import { formatUSDBalance } from "../../../utils";

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

const DashboardDrawer = ({ open, onClose, selectedWallet }) => {
  const currencyList = currencies();
  const { fetchBalanceForWallet } = useBalances();
  const { prices } = usePrices();
  const { setSuccessMessage } = useContext(MessageContext);
  const [cryptoList, setCryptoList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loader, setLoader] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(selectedWallet)?.length) fetchWalletDetails();
    else clearData();
  }, [selectedWallet]);

  const clearData = () => {
    setCryptoList([]);
  };

  const fetchWalletDetails = async () => {
    setLoader(true);
    fetchBalanceForWallet(selectedWallet?.address).then((balances) => {
      let totalBalance = balances
        .map((balance, index) => balance * prices[index])
        .reduce((pre, cur) => parseFloat(cur) + parseFloat(pre), 0);
      setTotalAmount(totalBalance || 0);

      if (totalBalance > 0) {
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
          amount_dollar: parseFloat(
            (prices[index] * balances[index]).toFixed(4),
          ),
          percentage: pers[index],
          color: COLORS[index],
          icon:
            initialiseCoinIcons(currency.name?.toLowerCase()) ?? currency?.icon,
        }));
        setCryptoList(data);
      }
    });
    setLoader(false);
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

  return (
    <Drawer
      title={null}
      width={500}
      closable={false}
      onClose={onClose}
      open={open}
      className="drawer-container"
    >
      <Flex vertical gap={24}>
        {/* Section 1 */}
        <div>
          <img
            src={selectedWallet?.internal ? Cover : selectedWallet?.background}
            alt="cover"
            className="drawer-cover-image"
          />
          <div className="drawer-wallet-logo-container">
            <img src={selectedWallet?.icon} className=" drawer-wallet-logo" />
          </div>
        </div>
        {/* Section 2 */}
        <Row align={"middle"} justify={"space-between"}>
          <div className="drawer-wallet-title-subcontainer">
            <div className="drawer-wallet-title default-text-gray">
              {t("personalDashboard.drawer.wallet")}
            </div>
            <div className="default-text drawer-wallet-name">
              {selectedWallet?.name}
            </div>
          </div>
          <div className="drawer-wallet-title-subcontainer">
            <div className="drawer-wallet-title default-text-gray">
              {t("personalDashboard.drawer.addressTitle")}
            </div>
            <div className="drawer-address-field">
              <div className="default-text drawer-wallet-address-container">
                {WalletAddressFormatter(selectedWallet?.address)}
              </div>
              <div className="drawer-copy-button" onClick={onCopyAddress}>
                <div className="default-text">
                  {t("personalDashboard.drawer.copy")}
                </div>
                <div className="copy-icon"></div>
              </div>
            </div>
          </div>
        </Row>
        {/* Section 3 */}
        <div className="drawer-balance-section">
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
            ${formatUSDBalance(selectedWallet?.balance)}
          </div>

          <TotalBalanceSection total={selectedWallet?.balance} />
        </div>

        {/* Section 4 */}
        <Flex vertical gap={10} justify="center">
          <div className="drawer-portfolio-title">
            {" "}
            {t("personalDashboard.drawer.portfolio")}
          </div>
          <div className="line-bar-graph">
            {cryptoList.map((data, index) => (
              <div
                className="line-bar-graph-section"
                style={{
                  width: `${data?.percentage}%`,
                  backgroundColor: data?.color,
                }}
              ></div>
            ))}
          </div>
          <div>
            <PorfolioCoins data={cryptoList} />
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
            />
          </Flex>
          <TableData data={cryptoList} togglebtn={loader} />
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default DashboardDrawer;
