import BalanceCard from "../components/balanceCard/balanceCard";
import CryptoCard from "../components/cryptoCard/cryptoCard";
import EarningCards from "../components/earningCards/earningCards";
import IncomeCard from "../components/incomeCard/incomeCard";
import ProfileCard from "../components/profileCard/profileCard";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const data = [
  {
    label: "Total Income",
    value: "+$4,678.67",
    percentage: 2.11,
  },
  {
    label: "Total Income",
    value: "+$4,678.67",
    percentage: -2.11,
  },
  {
    label: "Total Income",
    value: "+$4,678.67",
    percentage: 2.11,
  },
];

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];

const chartData = {
  labels,
  datasets: [
    {
      label: "Last 24h",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "#0784B5",
      backgroundColor: "#0784B5",
    },
    {
      label: "Previous 24h",
      data: [12, 18, 9, 5, 3, 15, 20],
      borderColor: "rgba(255, 255, 255,0.2)",
      backgroundColor: "rgba(255, 255, 255,0.2)",
    },
  ],
};

const AffiliateDashboard = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const verifyJwt = async () => await checkJwtToken();
    verifyJwt();
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          Nefentus |{" "}
          {t("navigation.affiliate") + " " + t("navigation.dashboard")}
        </title>
      </Helmet>
      <ProfileCard type="affiliate" />
      <EarningCards data={data} />
      <IncomeCard data={chartData} />
      <SignupByEmail />
    </div>
  );
};

export default AffiliateDashboard;
