import styles from "./profileBox.module.css";

import Arrow from "../../assets/icon/dropdownWhite.svg";
import BlobPicture from "../../components/blobPicture/blobPicture";
import { useAuth } from "../../context/auth/authContext";
const ProfileBox = () => {
  const { user } = useAuth();
  return (
    <div className={styles.profileBox}>
      <div className={styles.avatar}>
        <BlobPicture />
      </div>
      <div className={styles.info}>
        <div className={styles.nameBox}>
          <p className={styles.name}>
            {user?.firstName + " " + user?.lastName}
          </p>
          <img src={Arrow} alt="arrow" />
        </div>
        <p className={styles.email}>{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileBox;
