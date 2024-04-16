import styles from "./navigation.module.css";

import Logo from "../../assets/logo/logo.svg";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import LightMode from "../../assets/icon/lightMode2.svg";
import DarkMode from "../../assets/icon/darkMode2.svg";

import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backend_API from "../../api/backendAPI";
import { dashboardLink } from "../../utils";
import UserProfile from "../userProfile/userProfile";
import { useTheme } from "../../context/themeContext/themeContext";
import { QR } from "../../assets/icon/icons";
import { useAuth } from "../../context/auth/authContext";
import Cookie from "js-cookie";

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [profile, setProfile] = useState({});
  const [height, setHeight] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const token = Cookie.get("token");
  const hideOptions = location?.pathname?.includes("/pay");

  const backendAPI = new backend_API();

  const logOut = async () => {
    try {
      const data = await backendAPI.signout();
      navigate("/");
      setProfile({});
    } catch (error) {
      console.error(error);
    }
  };

  async function getProfile() {
    const jwtIsValid = await backendAPI.checkJwt();
    if (jwtIsValid) {
      const link = dashboardLink(user);
      console.log(link);

      const newProfile = {
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        dashboardLink: link,
      };
      setProfile(newProfile);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  function dashboardString(profile) {
    if (profile.firstName || profile.lastName)
      return `${t("dashboard.title")}: ${profile.firstName} ${
        profile.lastName
      }`;
    else return t("dashboard.title");
  }

  function loginAndSignupWeb() {
    if (token?.length) {
      return <UserProfile web logOut={logOut} />;
    } else {
      return (
        <>
          <p className={styles.login}>
            <Link to="/login">
              <p>{t("navigation.login")}</p>
              <p className={styles.fake}>{t("navigation.login")}</p>
            </Link>
          </p>
          <div className={`${styles.button}`}>
            <Link to="/signup">{t("navigation.signUp")}</Link>
          </div>
        </>
      );
    }
  }

  function loginAndSignupTopButtons() {
    if (!token?.length) {
      return (
        <>
          {/* <div className={styles.mobileButtonWrapper}>
            <Button link="/signUp">{t("navigation.signUp")}</Button>
          </div> */}
        </>
      );
    }
  }

  function loginAndSignupMobile() {
    if (token?.length) {
      return (
        <>
          <Button
            link={profile.dashboardLink}
            onClick={() => setOpenMenu(false)}
            style={{ width: "100%" }}
          >
            {dashboardString(profile)}
          </Button>
        </>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
          }}
        >
          <Button
            style={{ width: "100%" }}
            link="/login"
            onClick={() => setOpenMenu(false)}
          >
            {t("navigation.login")}
          </Button>
          <Button
            style={{ width: "100%" }}
            link="/signup"
            color="white"
            onClick={() => setOpenMenu(false)}
          >
            {t("navigation.signUp")}
          </Button>
        </div>
      );
    }
  }

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  return (
    <nav className={`${styles.navigation} load `} style={{ height }}>
      <div className={` ${styles.contentWrapper}`}>
        <div
          className={`container ${styles.content} ${
            (hideOptions && styles.contentAlignForPay) || ""
          }`}
        >
          <div className={styles.left}>
            <Link className={styles.logoWrapper} to="/">
              <img
                className={styles.logo}
                src={hideOptions ? LogoWide : Logo}
                alt="nefentus logo"
              />
            </Link>

            {!hideOptions && (
              <ul className={styles.navList}>
                <li className="standard">
                  <Link to="/">
                    <p>{t("navigation.home")}</p>
                    <p className={styles.fake}>{t("navigation.home")}</p>
                  </Link>
                </li>
                <li className="standard">
                  <Link to="/payment">
                    <p>{t("navigation.solutions")}</p>
                    <p className={styles.fake}>{t("navigation.solutions")}</p>
                  </Link>
                </li>
                <li className="standard">
                  <Link to="/support">
                    <p>{t("navigation.resources")}</p>
                    <p className={styles.fake}>{t("navigation.resources")}</p>
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {!hideOptions && (
            <div className={styles.right}>
              <div className={styles.rightWrapper}>
                <QR />

                <Languages />

                <img
                  onClick={toggleTheme}
                  src={theme === "dark" ? DarkMode : LightMode}
                  className={styles.light}
                  alt=""
                />
              </div>

              {loginAndSignupWeb()}

              {loginAndSignupTopButtons()}

              <div className={styles.mobMenu}>
                <div
                  className={`${styles.line} ${
                    openMenu ? styles.openLine : ""
                  }`}
                ></div>
                <div
                  className={`${styles.line} ${
                    openMenu ? styles.openLine : ""
                  }`}
                ></div>
                <div
                  className={`${styles.line} ${
                    openMenu ? styles.openLine : ""
                  }`}
                ></div>

                <div
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className={styles.lineButton}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.mobileMenu}`}
        style={{
          transform: openMenu ? "translateY(0%)" : "translateY(-120%)",
        }}
      >
        <div>
          <ul>
            <Link to="/" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.home")}</li>
            </Link>
            <Link to="/payment" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.solutions")}</li>
            </Link>

            <Link to="/affiliate" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.affiliate")}</li>
            </Link>
            <Link to="/support" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.resources")}</li>
            </Link>
          </ul>
        </div>

        <div>{loginAndSignupMobile()}</div>
      </div>
    </nav>
  );
};

export default Navigation;
