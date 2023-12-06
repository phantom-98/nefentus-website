import { useState } from "react";
import { VerifyPopup } from "../../components/popup/popup";
import SideNavigation from "../sideNavigation/sideNavigation";
import TopNavigation from "../topNavigation/topNavigation";

import styles from "./screenLayout.module.css";

const ScreenLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={styles.layout}>
        <TopNavigation />

        <div className={styles.body}>
          <div className={styles.side}>
            <SideNavigation />
          </div>

          <div className={styles.children}>{children}</div>
        </div>
      </div>

      <VerifyPopup show={show} setShow={setShow} />
    </>
  );
};

export default ScreenLayout;
