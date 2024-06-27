import styles from "./navigation.module.css";
import LogoWide from "../../assets/logo/logo_wide2.svg";
import Button from "../button/button";
import Languages from "./languages.jsx/languages";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logOut } from "../../utils";
import UserProfile from "../userProfile/userProfile";
import { useTheme } from "../../context/themeContext/themeContext";
import Cookie from "js-cookie";

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookie.get("token");
  const hideOptions = location?.pathname?.includes("/pay");

  function loginAndSignupWeb() {
    if (token?.length) {
      return <UserProfile web logOut={() => logOut(navigate)} />;
    } else {
      return (
        <>
          <a className={styles.login} href="/login">
            Log in
          </a>
          <a className={`${styles.button}`} href="/signup">
            Sign up
          </a>
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
          <Link to={"/new-settings"} onClick={() => setOpenMenu(false)}>
            <li className="standard">Settings</li>
          </Link>
          <Link to={"/personal-dashboard"} onClick={() => setOpenMenu(false)}>
            <li className="standard">Dashboard</li>
          </Link>
          <Link onClick={() => logOut(navigate)}>
            <li className="standard">Log out</li>
          </Link>
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
            Log in
          </Button>
          <Button
            style={{ width: "100%" }}
            link="/signup"
            color="white"
            onClick={() => setOpenMenu(false)}
          >
            Sign up
          </Button>
        </div>
      );
    }
  }

  useEffect(() => {
    if (window.innerHeight >= 900) return;

    const changeHeight = () => {
      // setHeight(window.innerHeight);
    };

    changeHeight();

    window.addEventListener("resize", changeHeight);

    return () => window.removeEventListener("resize", changeHeight);
  });

  return (
    <nav className={`${styles.navigation} load `}>
      <div className={` ${styles.contentWrapper}`}>
        <div
          className={`container ${styles.content} ${
            (hideOptions && styles.contentAlignForPay) || ""
          }`}
        >
          <div className={styles.left}>
            <Link className={styles.logoWrapper} to="/">
              <img className={styles.logo} src={LogoWide} alt="nefentus logo" />
            </Link>

            {!hideOptions && (
              <ul className={styles.navList}>
                <li className="standard">
                  <Link to="/b2c">
                    <p>Personal</p>
                    <p className={styles.fake}>Personal</p>
                  </Link>
                </li>
                <li className="standard">
                  <Link to="/b2b">
                    <p>Business Solutions</p>
                    <p className={styles.fake}>Business Solutions</p>
                  </Link>
                </li>
                <li className="standard">
                  <Link to="/resources">
                    <p>Resources</p>
                    <p className={styles.fake}>Resources</p>
                  </Link>
                </li>
                <li className="standard">
                  <Link to="/vacancy">
                    <p>Career</p>
                    <p className={styles.fake}>Career</p>
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {!hideOptions && (
            <div className={styles.right}>
              <div className={styles.rightWrapper}>
                {/* <QR /> */}

                {/* <Languages /> */}

                {/* <img
                  onClick={toggleTheme}
                  src={theme === "dark" ? DarkMode : LightMode}
                  className={styles.light}
                  alt=""
                /> */}
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
            <Link to="/b2c" onClick={() => setOpenMenu(false)}>
              <li className="standard">Personal</li>
            </Link>
            <Link to="/b2b" onClick={() => setOpenMenu(false)}>
              <li className="standard">Business Solutions</li>
            </Link>

            {/* <Link to="/affiliate" onClick={() => setOpenMenu(false)}>
              <li className="standard">{t("navigation.affiliate")}</li>
            </Link> */}
            <Link to="/resources" onClick={() => setOpenMenu(false)}>
              <li className="standard">Resources</li>
            </Link>
            <Link to="/vacancy" onClick={() => setOpenMenu(false)}>
              <li className="standard">Career</li>
            </Link>
            {loginAndSignupMobile()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
