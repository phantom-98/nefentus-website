import { useState } from "react";
import Card from "../card/card";

import Clipboard from "../../../assets/icon/clipboard.svg";

import styles from "./profileCard.module.css";

const ProfileCard = ({ type }) => {
  const [firstName] = useState(localStorage.getItem("firstName"));
  const [lastName] = useState(localStorage.getItem("lastName"));
  const [email] = useState(localStorage.getItem("email"));
  const [profileImage] = useState(localStorage.getItem("profile_pic"));

  return (
    <Card className={styles.profileCard}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileImage}>
          <img src={profileImage} alt="" />
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
            <p className={styles.main}>Wallet:</p>
            <p className={styles.subtitle}>0x5A1B3D9fC8bEeD74008</p>
          </div>
          <div>
            <p className={styles.main}>Plan:</p>
            <p className={styles.subtitle}>Enterprise</p>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProfileCard;
