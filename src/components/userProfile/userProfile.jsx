import styles from "./userProfile.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Identification,
  Invoice,
  Logout,
  Security,
  User2,
} from "../../assets/icon/icons";
import { useAuth } from "../../context/auth/authContext";
import backend_API from "../../api/backendAPI";

const UserProfile = ({ web, logOut, requireKYC }) => {
  const { user, setUser, avatarUrl, setAvatarUrl } = useAuth();
  const backendAPI = new backend_API();
  const fetchProfile = async () => {
    const data = await backendAPI.getProfile();
    setUser({ ...data });
    if (data["profileImage"]) setAvatarUrl(data["profileImage"]);
    else setAvatarUrl(null);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const { t } = useTranslation();
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileImage}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" />
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
            <path d="M22.9179 22.3861C22.8639 22.4796 22.7862 22.5573 22.6926 22.6113C22.599 22.6654 22.4929 22.6938 22.3848 22.6938H7.61479C7.50681 22.6937 7.40077 22.6651 7.3073 22.6111C7.21383 22.557 7.13623 22.4793 7.08229 22.3858C7.02835 22.2922 6.99997 22.1862 7 22.0782C7.00003 21.9702 7.02846 21.8641 7.08245 21.7706C8.25405 19.7451 10.0595 18.2928 12.1666 17.6043C11.1243 16.9838 10.3146 16.0384 9.86167 14.9132C9.40875 13.788 9.33772 12.5452 9.65947 11.3757C9.98122 10.2062 10.678 9.17471 11.6427 8.43954C12.6075 7.70437 13.7869 7.30621 14.9998 7.30621C16.2127 7.30621 17.3921 7.70437 18.3569 8.43954C19.3216 9.17471 20.0184 10.2062 20.3401 11.3757C20.6619 12.5452 20.5909 13.788 20.1379 14.9132C19.685 16.0384 18.8753 16.9838 17.833 17.6043C19.9401 18.2928 21.7456 19.7451 22.9172 21.7706C22.9713 21.8641 22.9999 21.9702 23 22.0782C23.0001 22.1863 22.9718 22.2924 22.9179 22.3861Z" />
          </svg>
        )}
      </div>
      <div className={`${styles.profileDropdown}`}>
        <div className={`${styles.profileBody} card`}>
          <Link to="/dashboard/profile" className={styles.profileItem}>
            <User2 />
            <p>{t("navigation.profile")}</p>
          </Link>
          <Link to="/dashboard/invoices" className={styles.profileItem}>
            <Invoice />
            <p>{t("navigation.invoice")}</p>
          </Link>
          {web && (
            <Link to="/dashboard/" className={styles.profileItem}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.77273 3.95455V8.31818C9.77273 8.70395 9.61948 9.07392 9.3467 9.3467C9.07392 9.61948 8.70395 9.77273 8.31818 9.77273H3.95455C3.56878 9.77273 3.19881 9.61948 2.92603 9.3467C2.65325 9.07392 2.5 8.70395 2.5 8.31818V3.95455C2.5 3.56878 2.65325 3.19881 2.92603 2.92603C3.19881 2.65325 3.56878 2.5 3.95455 2.5H8.31818C8.70395 2.5 9.07392 2.65325 9.3467 2.92603C9.61948 3.19881 9.77273 3.56878 9.77273 3.95455ZM17.0455 2.5H12.6818C12.296 2.5 11.9261 2.65325 11.6533 2.92603C11.3805 3.19881 11.2273 3.56878 11.2273 3.95455V8.31818C11.2273 8.70395 11.3805 9.07392 11.6533 9.3467C11.9261 9.61948 12.296 9.77273 12.6818 9.77273H17.0455C17.4312 9.77273 17.8012 9.61948 18.074 9.3467C18.3468 9.07392 18.5 8.70395 18.5 8.31818V3.95455C18.5 3.56878 18.3468 3.19881 18.074 2.92603C17.8012 2.65325 17.4312 2.5 17.0455 2.5ZM8.31818 11.2273H3.95455C3.56878 11.2273 3.19881 11.3805 2.92603 11.6533C2.65325 11.9261 2.5 12.296 2.5 12.6818V17.0455C2.5 17.4312 2.65325 17.8012 2.92603 18.074C3.19881 18.3468 3.56878 18.5 3.95455 18.5H8.31818C8.70395 18.5 9.07392 18.3468 9.3467 18.074C9.61948 17.8012 9.77273 17.4312 9.77273 17.0455V12.6818C9.77273 12.296 9.61948 11.9261 9.3467 11.6533C9.07392 11.3805 8.70395 11.2273 8.31818 11.2273ZM17.0455 11.2273H12.6818C12.296 11.2273 11.9261 11.3805 11.6533 11.6533C11.3805 11.9261 11.2273 12.296 11.2273 12.6818V17.0455C11.2273 17.4312 11.3805 17.8012 11.6533 18.074C11.9261 18.3468 12.296 18.5 12.6818 18.5H17.0455C17.4312 18.5 17.8012 18.3468 18.074 18.074C18.3468 17.8012 18.5 17.4312 18.5 17.0455V12.6818C18.5 12.296 18.3468 11.9261 18.074 11.6533C17.8012 11.3805 17.4312 11.2273 17.0455 11.2273Z" />
              </svg>
              <p>{t("navigation.dashboard")}</p>
            </Link>
          )}
          <Link to="/dashboard/security" className={styles.profileItem}>
            <Security />
            <p>{t("navigation.security")}</p>
          </Link>
          {user?.isRequireKyc && (
            <Link to="/dashboard/identification" className={styles.profileItem}>
              <Identification />
              <p>{t("navigation.identification")}</p>
            </Link>
          )}
          <Link onClick={logOut} className={styles.profileItem}>
            <Logout />
            <p>{t("navigation.logOut")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
