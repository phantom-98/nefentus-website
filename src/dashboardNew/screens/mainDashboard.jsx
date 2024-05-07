import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";
import BalanceCard from "../components/balanceCard/balanceCard";
import CryptoCard from "../components/cryptoCard/cryptoCard";
import EarningCards from "../components/earningCards/earningCards";
import IncomeCard from "../components/incomeCard/incomeCard";
import ProfileCard from "../components/profileCard/profileCard";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import moment from "moment";
import backendAPI from "../../api/backendAPI";

import { useTheme } from "../../context/themeContext/themeContext";
import { checkJwtToken, formatUSDBalance } from "../../utils";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/auth/authContext";
import vendorDashboardApi from "../../api/vendorDashboardApi";

const MainDashboard = () => {
  const { t, i18n } = useTranslation();

  const { language } = i18n;
  const { theme } = useTheme();
  const backend_Api = new backendAPI();
  const { user, setUser, currencyRate } = useAuth();
  const [limitedList, setLimitedList] = useState([]);

  const labels = {
    Monday: t("dashboard.charts.days.monday"),
    Tuesday: t("dashboard.charts.days.tuesday"),
    Wednesday: t("dashboard.charts.days.wednesday"),
    Thursday: t("dashboard.charts.days.thursday"),
    Friday: t("dashboard.charts.days.friday"),
    Saturday: t("dashboard.charts.days.saturday"),
    Sunday: t("dashboard.charts.days.sunday"),
  };
  const [chartData, setChartData] = useState();
  const [activeWallet, setActiveWallet] = useState();
  const [cardInfo, setCardInfo] = useState([]);
  const [measure, setMeasure] = useState();
  const dashboardApi = new vendorDashboardApi();

  useEffect(() => {
    fetchData();
  }, [language]);

  const fetchData = async () => {
    const res = await dashboardApi.getTotalIncome();
    if (res) {
      setMeasure(res);
    }
  };

  useEffect(() => {
    if (measure && currencyRate) {
      const cardsContent = [
        {
          title: t("dashboard.earningCards.totalSales"),
          value:
            currencyRate.symbol +
            formatUSDBalance(
              parseFloat(measure.total?.number) * currencyRate.rate,
            ),
          percentage: measure.total?.percentage
            ? parseFloat(measure.total?.percentage).toFixed(2)
            : "0",
          progress: t("dashboard.earningCards.progressLast30d"),
        },
        {
          title: t("dashboard.earningCards.salesOfLast24h"),
          value:
            currencyRate.symbol +
            formatUSDBalance(
              parseFloat(measure.last24Hours?.number) * currencyRate.rate,
            ),
          percentage: measure.last24Hours?.percentage
            ? parseFloat(measure.last24Hours?.percentage).toFixed(2)
            : "0",
          progress: t("dashboard.earningCards.progressLast24h"),
        },
        {
          title: t("dashboard.earningCards.salesOfLast30d"),
          value:
            currencyRate.symbol +
            formatUSDBalance(
              parseFloat(measure.last30Days?.number) * currencyRate.rate,
            ),
          percentage: measure.last30Days?.percentage
            ? parseFloat(measure.last30Days?.percentage).toFixed(2)
            : "0",
          progress: t("dashboard.earningCards.progressLast30d"),
        },
        {
          title: t("dashboard.earningCards.payments"),
          value: parseFloat(measure.numberOfPayments?.number),
          percentage: measure.numberOfPayments?.percentage
            ? parseFloat(measure.numberOfPayments?.percentage).toFixed(2)
            : "0",
          progress: t("dashboard.earningCards.progressLast30d"),
        },
      ];

      setCardInfo(cardsContent);
    }
  }, [measure, currencyRate]);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchGraphData();
  }, [language, theme, activeWallet]);

  const fetchProfile = async () => {
    const response = await backend_Api.getProfile();
    setUser({ ...response });
  };

  const fetchGraphData = async () => {
    await checkJwtToken();
    const response = await backend_Api.getUserBalanceForGraph(user);
    response.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });

    // Object to store aggregated results
    const aggregatedData = {};

    // Iterate through the array
    response.forEach((item) => {
      const { createdAt, amount } = item;

      if (aggregatedData[moment(createdAt).format("DD-MM-YYYY")]) {
        // If the date exists, add the amounts
        aggregatedData[moment(createdAt).format("DD-MM-YYYY")].amount += amount;
      } else {
        // If the date doesn't exist, create a new entry
        aggregatedData[moment(createdAt).format("DD-MM-YYYY")] = {
          createdAt,
          amount,
        };
      }
    });

    // Convert the aggregated data back to an array
    const result = Object.values(aggregatedData);

    // If the length of user balances array is greater than 7 then it should be slice
    const limitedDateList = result?.length > 7 ? result.splice(0, 7) : result;
    setLimitedList(limitedDateList);

    const chartData = {
      labels: limitedDateList?.map((value) => {
        const dateValues = moment(value?.createdAt)
          .format("dddd (DD-MM-YY)")
          .split(" ");
        return `${labels[dateValues[0]]} ${dateValues[1]}`;
      }),
      datasets: [
        {
          label: t("dashboard.charts.lastWeek"),
          data: limitedDateList?.map((obj) => obj?.amount),
          borderColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
          backgroundColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
        },
      ],
    };

    setChartData({ ...chartData });
  };

  useEffect(() => {
    if (chartData && chartData.datasets) {
      const _datasets = [
        {
          label: t("dashboard.charts.lastWeek").concat(
            " (" + currencyRate.symbol + ")",
          ),
          data: limitedList?.map((obj) => obj?.amount * currencyRate.rate),
          borderColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
          backgroundColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
        },
      ];
      let _chart = { ...chartData, datasets: _datasets };
      console.log("chart", _chart);
      setChartData(_chart);
    }
  }, [currencyRate]);

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.dashboard")}</title>
      </Helmet>

      <ProfileCard setActiveWallet={setActiveWallet} wallet={activeWallet} />
      <BalanceCard wallet={activeWallet} />
      <EarningCards cardInfo={cardInfo} />
      <IncomeCard data={chartData ?? []} />
      <CryptoCard wallet={activeWallet} />
      <SignupByEmail />
    </div>
  );
};

export default MainDashboard;
