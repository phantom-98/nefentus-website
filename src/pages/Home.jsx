import Layout from "../components/layout/layout";

import Logos from "../components/logos/logos";
import Cards from "../components/cards/cards";
import About from "../components/about/about";
import backendAPI from "../api/backendAPI";

import { Helmet } from "react-helmet";

import Image1 from "../assets/image/paymentHome.webp";
import Image1Light from "../assets/image/paymentHomeLight.webp";
import Main from "../assets/image/main.svg";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import PaymentCards from "../components/paymentCards/paymentCards";
import Prices from "../components/prices/prices";
import Reward from "../components/reward/reward";
import { useTheme } from "../context/themeContext/themeContext";
import { useAuth } from "../context/auth/authContext";

const Home = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const api = new backendAPI();
  const { user, setUser } = useAuth();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("ref")) {
      const paramValue = urlParams.get("ref");
      setUser({ ...user, affiliateJoined: paramValue });
      api.countAffiliate(paramValue);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Nefentus | {t("navigation.home")}</title>
      </Helmet>
      <Layout
        heading={
          <>
            {t("home.heroTitle")}
            <div className="gradient"> {t("home.heroTitleGradient")}</div>
          </>
        }
        description={<>{t("home.heroDescription")}</>}
        button={<>{t("home.heroButton")}</>}
        home
        // button2={t("home.heroButton2")}
        image={Main}
        full
        // video={HomeHeroVideo}
        store
        children={<Prices />}
      />

      <Logos />
      <Cards />

      <Layout
        subtitle={t("home.simplifySubtitle")}
        title={t("home.simplifyTitle")}
        description={t("home.simplifyDescription")}
        button={t("home.layoutButton")}
        image={theme === "dark" ? Image1 : Image1Light}
      />

      <About />

      {/* <Reviews /> */}

      {/* <Help /> */}

      {/* <PaymentCards /> */}
    </>
  );
};

export default Home;
