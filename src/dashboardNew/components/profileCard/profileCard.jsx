import { useState } from "react";
import Card from "../card/card";

import Clipboard from "../../../assets/icon/clipboard.svg";

import styles from "./profileCard.module.css";
import useInternalWallet from "../../../hooks/internalWallet";
import { useTranslation } from "react-i18next";

import ProfileImg from "../../../assets/icon/user.svg";
import { useTheme } from "../../../context/themeContext/themeContext";

const ProfileCard = ({ type }) => {
  const [firstName] = useState(localStorage.getItem("firstName"));
  const [lastName] = useState(localStorage.getItem("lastName"));
  const [email] = useState(localStorage.getItem("email"));
  const [profileImage] = useState(localStorage.getItem("profile_pic"));
  let internalWalletAddress = useInternalWallet();

  const { t } = useTranslation();

  const { theme } = useTheme();

  return (
    <Card
      className={`${styles.profileCard}  ${
        theme === "dark" ? "" : styles.light
      }`}
    >
      <div className={` ${styles.profileWrapper}`}>
        <div className={styles.profileImage}>
          <img
            src={profileImage !== "null" ? profileImage : ProfileImg}
            alt=""
          />
        </div>
        <div>
          <p className={styles.main}>{`${firstName} ${lastName}`}</p>
          <p className={styles.subtitle}>{email}</p>
        </div>
      </div>

      {type === "affiliate" ? (
        <>
          <div>
            <p className={styles.main}>Affiliate link:</p>
            <div className={styles.link}>
              <img src={Clipboard} alt="" />
              <p className={styles.subtitle}>
                https://nefentus.com/affiliate=ccc738232
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className={styles.main}>{t("dashboard.wallet")}:</p>
            <p className={styles.subtitle}>{internalWalletAddress}</p>
          </div>
          <div>
            <p className={styles.main}>{t("dashboard.plan")}:</p>
            <p className={styles.subtitle}>{t("dashboard.enterprise")}</p>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
