import HeadingCenter from "../headingCenter/headingCenter";
import styles from "./cards.module.css";

import Image1 from "../../assets/video/phone.gif";
import Image2 from "../../assets/video/chart.gif";
import Image3 from "../../assets/video/targetLight.gif";
import Image4 from "../../assets/video/targetDark.gif";

import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { separateText } from "../../func/separate";
import { useTheme } from "../../context/themeContext/themeContext";

const list = [
  {
    image: Image1,
  },
  {
    image: Image2,
  },
  {
    image: Image3,
    dark: Image4,
  },
];

const Cards = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const list2 = t("home.cardList", { returnObjects: true });

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = (scrollEvent) => {
      const minValue = window.innerHeight * 0.4;
      const scrollPos =
        window.innerHeight - sectionRef.current.getBoundingClientRect().top;

      if (scrollPos > minValue) {
        sectionRef.current.children[0].style.transform = "scale(1)";
        sectionRef.current.children[0].style.opacity = 1;

        setTimeout(() => {
          sectionRef.current.children[1].style.transform = "scale(1)";
          sectionRef.current.children[1].style.opacity = 1;

          setTimeout(() => {
            sectionRef.current.children[2].style.transform = "scale(1)";
            sectionRef.current.children[2].style.opacity = 1;
          }, 250);
        }, 250);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`container break ${styles.section}`}>
      <HeadingCenter
        subtitle={t("home.cardSubtitle")}
        title={
          <>
            {t("home.cardTitleP1")} <br className={styles.headerSpace} />
            {t("home.cardTitleP2")}
          </>
        }
      />

      <div className={styles.cards} ref={sectionRef}>
        {list.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} card`}
            // onMouseEnter={() => handleEnter(videoRefs[index])}
            // onMouseLeave={() => handleLeave(videoRefs[index])}
          >
            <img
              src={item.dark && theme === "dark" ? item.dark : item.image}
              alt=""
            />

            <p>{separateText(list2[index].title)}</p>
            <p className="standard">{list2[index].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
