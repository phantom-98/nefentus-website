import Logo from "../../../assets/logo/logo.svg";
import LightMode from "../../../assets/icon/lightMode.svg";
import DarkMode from "../../../assets/icon/darkMode.svg";

import styles from "./topNavigation.module.css";
import { useEffect, useState } from "react";
import SideNavigation from "../sideNavigation/sideNavigation";
import LanguageBox from "../../components/language/language";
import { Link, useNavigate } from "react-router-dom";

import backend_API from "../../../api/backendAPI";
import UserProfile from "../../../components/userProfile/userProfile";
import { useTheme } from "../../../context/themeContext/themeContext";
import { NefentusLogo } from "../../../assets/icon/logos/logos";
import { Notification } from "../../../assets/icon/icons";

const TopNavigation = () => {
  const { theme, toggleTheme } = useTheme();

  const [profileImage, setProfileImage] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const [kyc, setKyc] = useState(false);

  const [height, setHeight] = useState(0);
  const backendAPI = new backend_API();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  const logOut = async () => {
    try {
      const data = await backendAPI.signout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    backendAPI
      .isRequiredKYC()
      .then((res) => res.json())
      .then((data) => setKyc(data));
  }, []);

  return (
    <>
      <div
        className={`${theme === "dark" ? "" : styles.lightContainer} ${
          styles.container
        }`}
      >
        <img className={styles.logo} src={Logo} alt="" />
        <div className={styles.logo2}>
          <NefentusLogo />
        </div>
        <div className={styles.rightSide}>
          <UserProfile logOut={logOut} requireKYC={kyc} />

          <div className={styles.iconButton}>
            <Notification />
          </div>
          <div className={styles.iconButton}>
            <LanguageBox />
          </div>
          <div>
            <img
              onClick={toggleTheme}
              src={theme === "dark" ? DarkMode : LightMode}
              className={styles.light}
              alt=""
            />
          </div>

          <div
            className={`${styles.mobMenu} ${
              theme !== "dark" ? styles.lightMobMenu : ""
            }`}
          >
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>
            <div
              className={`${styles.line} ${openMenu ? styles.openLine : ""}`}
            ></div>

            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className={styles.lineButton}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={styles.sideWrapper}
        style={{ top: !openMenu ? "-100%" : "46px", height: height - 46 }}
      >
        <SideNavigation />
      </div>
    </>
  );
};

export default TopNavigation;
