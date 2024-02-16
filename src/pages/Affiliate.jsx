import Layout from "./../components/layout/layout";

import Image from "../assets/image/affiliate.svg";
import ImageLight from "../assets/image/affiliateLight.svg";
import Image2 from "../assets/image/affiliate2.png";
import Image2Light from "../assets/image/affiliate2Light.png";
import Why from "./../components/why/why";
import Compare from "../components/compare/compare";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import HeroAff from "../components/heroAff/heroAff";
import Cookie from "js-cookie";
import { useTheme } from "../context/themeContext/themeContext";

const Affiliate = () => {
  const { theme } = useTheme();

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const token = Cookie.getItem("token");

    if (!token) {
      // Der Benutzer ist nicht angemeldet
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("http://localhost:8080/api/test/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { t } = useTranslation();

  const content = t("affiliate.whyContent", { returnObjects: true });

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.affiliate")}</title>
      </Helmet>
      <HeroAff />

      <Layout
        subtitle={t("affiliate.heroSubtitle")}
        title={t("affiliate.heroHeading")}
        description={t("affiliate.heroDescription")}
        image={theme === "dark" ? Image : ImageLight}
        list
        load
      />

      <Why
        title={
          <>
            {t("affiliate.whyTitleP1")}
            <br />
            {t("affiliate.whyTitleP2")}
          </>
        }
        button={t("affiliate.whyButton")}
        content={content}
        image={theme === "dark" ? Image2 : Image2Light}
      />

      <Compare />
    </div>
  );
};

export default Affiliate;
