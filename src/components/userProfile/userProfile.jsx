import styles from "./userProfile.module.css";

import Dashboard from "../../assets/icon/dashboard.svg";
import User2 from "../../assets/icon/user2.svg";
import Security from "../../assets/icon/security.svg";
import Identification from "../../assets/icon/identification.svg";
import Logout from "../../assets/icon/logout.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserProfile = ({ web, logOut, requireKYC }) => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profile_pic"),
  );
  const { t } = useTranslation();
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileImage}>
        {profileImage !== "null" ? (
          <img src={profileImage} alt="Profile" />
        ) : (
          <svg
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="30"
              height="30"
              rx="15"
              fill="white"
              fill-opacity={web ? 0 : 0.08}
            />
            <path
              d="M22.9179 22.3861C22.8639 22.4796 22.7862 22.5573 22.6926 22.6113C22.599 22.6654 22.4929 22.6938 22.3848 22.6938H7.61479C7.50681 22.6937 7.40077 22.6651 7.3073 22.6111C7.21383 22.557 7.13623 22.4793 7.08229 22.3858C7.02835 22.2922 6.99997 22.1862 7 22.0782C7.00003 21.9702 7.02846 21.8641 7.08245 21.7706C8.25405 19.7451 10.0595 18.2928 12.1666 17.6043C11.1243 16.9838 10.3146 16.0384 9.86167 14.9132C9.40875 13.788 9.33772 12.5452 9.65947 11.3757C9.98122 10.2062 10.678 9.17471 11.6427 8.43954C12.6075 7.70437 13.7869 7.30621 14.9998 7.30621C16.2127 7.30621 17.3921 7.70437 18.3569 8.43954C19.3216 9.17471 20.0184 10.2062 20.3401 11.3757C20.6619 12.5452 20.5909 13.788 20.1379 14.9132C19.685 16.0384 18.8753 16.9838 17.833 17.6043C19.9401 18.2928 21.7456 19.7451 22.9172 21.7706C22.9713 21.8641 22.9999 21.9702 23 22.0782C23.0001 22.1863 22.9718 22.2924 22.9179 22.3861Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div className={`${styles.profileDropdown}`}>
        <div className={`${styles.profileBody} card`}>
          <Link to="/dashboard/profile" className={styles.profileItem}>
            <img src={User2} alt="" />
            <p>{t("navigation.profile")}</p>
          </Link>
          {web && (
            <Link to="/dashboard/" className={styles.profileItem}>
              <img src={Dashboard} alt="" />
              <p>{t("navigation.dashboard")}</p>
            </Link>
          )}
          <Link to="/dashboard/security" className={styles.profileItem}>
            <img src={Security} alt="" />
            <p>{t("navigation.security")}</p>
          </Link>
          <Link to="/dashboard/identification" className={styles.profileItem}>
            <img src={Identification} alt="" />
            <p>{t("navigation.identification")}</p>
          </Link>
          <Link onClick={logOut} to="/" className={styles.profileItem}>
            <img src={Logout} alt="" />
            <p>{t("navigation.logOut")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
