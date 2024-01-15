import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { BinanceTestnet } from "@thirdweb-dev/chains";
import BalanceCard from "../components/balanceCard/balanceCard";
import CryptoCard from "../components/cryptoCard/cryptoCard";
import EarningCards from "../components/earningCards/earningCards";
import IncomeCard from "../components/incomeCard/incomeCard";
import ProfileCard from "../components/profileCard/profileCard";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { useTheme } from "../../context/themeContext/themeContext";

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];

const MainDashboard = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: t("dashboard.charts.last24h"),
          data: [1, 2, 3, 4, 5, 6, 7],
          borderColor: "#0784B5",
          backgroundColor: "#0784B5",
        },
        {
          label: t("dashboard.charts.previous24h"),
          data: [12, 18, 9, 5, 3, 15, 20],
          borderColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
          backgroundColor:
            theme === "dark" ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.2)",
        },
      ],
    };
  }, [language, theme]);
  return (
    <div>
      <ThirdwebProvider
        activeChain={BinanceTestnet}
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <ProfileCard />
        <BalanceCard />
        <EarningCards />
        <IncomeCard data={chartData} />
        <CryptoCard />
      </ThirdwebProvider>
      <SignupByEmail />
    </div>
  );
};

export default MainDashboard;
