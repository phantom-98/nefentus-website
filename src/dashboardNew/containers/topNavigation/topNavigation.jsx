import Logo from "../../../assets/logo/logo.svg";
import Logo2 from "../../../assets/logo/logo2.svg";
import User from "../../../assets/icon/user.svg";
import User2 from "../../../assets/icon/user2.svg";
import Security from "../../../assets/icon/security.svg";
import Identification from "../../../assets/icon/identification.svg";
import Logout from "../../../assets/icon/logout.svg";
import Notification from "../../../assets/icon/notification.svg";
import LightMode from "../../../assets/icon/lightMode.svg";
import DarkMode from "../../../assets/icon/darkMode.svg";
import InvoiceIcon from "../../../assets/icon/invoice.svg";
import Wallet from "../../../assets/icon/wallet.svg";

import styles from "./topNavigation.module.css";
import { useEffect, useState } from "react";
import SideNavigation from "../sideNavigation/sideNavigation";
import LanguageBox from "../../components/language/language";
import { Link, useNavigate } from "react-router-dom";

import backend_API from "../../../api/backendAPI";

const TopNavigation = () => {
  const [lightMode, setLightMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [openLanguage, setOpenLanguage] = useState(false);

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

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={Logo} alt="" />
        <img className={styles.logo2} src={Logo2} alt="" />
        <div className={styles.rightSide}>
          <div className={styles.profileWrapper}>
            <div className={styles.profileImage}>
              <img src={profileImage ? profileImage : User} alt="Profile" />
            </div>
            <div className={`${styles.profileDropdown}`}>
              <div className={`${styles.profileBody} card`}>
                <Link to="/dashboardNew/profile" className={styles.profileItem}>
                  <img src={User2} alt="" />
                  <p>Profile</p>
                </Link>
                <Link
                  to="/dashboardNew/security"
                  className={styles.profileItem}
                >
                  <img src={Security} alt="" />
                  <p>Security</p>
                </Link>
                <Link
                  to="/dashboardNew/invoices"
                  className={styles.profileItem}
                >
                  <img src={InvoiceIcon} alt="" />
                  <p>Invoice</p>
                </Link>
                <Link
                  to="/dashboardNew/choiceWallets"
                  className={styles.profileItem}
                >
                  <img src={Wallet} alt="" />
                  <p>Wallets</p>
                </Link>
                <Link
                  to="/dashboardNew/identification"
                  className={styles.profileItem}
                >
                  <img src={Identification} alt="" />
                  <p>Identification</p>
                </Link>
                <div className={styles.profileItem} onClick={() => logOut()}>
                  <img src={Logout} alt="" />
                  <p>Log Out</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img src={Notification} alt="" />
          </div>
          <div>
            <LanguageBox />
          </div>
          <div onClick={() => setLightMode((prev) => !prev)}>
            {lightMode ? (
              <img src={DarkMode} alt="" />
            ) : (
              <img src={LightMode} alt="" />
            )}
          </div>

          <div className={styles.mobMenu}>
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
