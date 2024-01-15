import styles from "./logos.module.css";

import Line from "../../assets/image/line.svg";
import { useEffect, useRef } from "react";
import {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
} from "../../assets/icon/logos/logos";
import { useTheme } from "../../context/themeContext/themeContext";

const list = [<Logo1 />, <Logo2 />, <Logo3 />, <Logo4 />, <Logo5 />, <Logo6 />];

const Logos = () => {
  const { theme } = useTheme();
  useEffect(() => {
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");

    setTimeout(() => {
      line1.classList.add("move1");
      line2.classList.add("move2");
    }, 1000);
  }, []);

  return (
    <div className={` ${styles.logos}`}>
      <div className={styles.line}>
        <img
          src={Line}
          alt="line"
          style={{ filter: theme === "light" ? "invert()" : "" }}
        />
      </div>
      <div className={styles.logoImage}>
        <div className={`${styles.line1} line1`}>
          {list.map((logo, index) => (
            <>{logo}</>
          ))}
        </div>
        <div className={`${styles.line2} line2`}>
          {list.map((logo, index) => (
            <>{logo}</>
          ))}
        </div>
      </div>
      <div className={styles.line}>
        <img
          src={Line}
          alt="line"
          style={{ filter: theme === "light" ? "invert()" : "" }}
        />
      </div>
    </div>
  );
};

export default Logos;
