import styles from "./layout.module.css";
import Button from "./../button/button";

import Google from "../../assets/icon/google.svg";
import Apple from "../../assets/icon/apple2.svg";
import Chevron from "../../assets/icon/chevron.svg";

import Mega from "../../assets/icon/mega.svg";

import QR from "../../assets/icon/qrcode.svg";

import Dummy from "../../assets/image/dummy.webp";

import Checkmark from "../../assets/icon/singleCheckmark.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState, useContext } from "react";
import MessageComponent from "../message";
import { MessageContext } from "../../context/message";
import backendAPI from "../../api/backendAPI";
import Error from "../error/error";
import Input from "../input/input";

const Layout = ({
  heading,
  home,
  title,
  load = false,
  description,
  button,
  button2,
  image = Dummy,
  store,
  subtitle,
  reverse,
  video,
  list,
  full,
  children,
}) => {
  const { t } = useTranslation();
  const backend_API = new backendAPI();
  const navigate = useNavigate();
  // const [errorMessage, setErrorMessage] = useState(null);

  const content = t("affiliate.affiliateList", { returnObjects: true });
  const { setErrorMessage } = useContext(MessageContext);
  const videoRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleLoad = (event) => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Reprodukcija počinje
          })
          .catch((error) => {
            console.log("Playback prevented by browser");
          });
      }
    }
  };

  const handleEnterEmail = async () => {
    if (email) {
      const result = await backend_API.registerByEmail(email);
      if (result) {
        navigate("/dashboard");
      } else {
        setErrorMessage("Email already exists");
      }
    } else {
      setErrorMessage("Please enter a valid email address");
    }
  };

  return (
    <div
      className={`container ${styles.layout} ${heading ? styles.hero : ""} ${
        heading || load ? "load hero" : ""
      }`}
    >
      <div
        className={heading || load ? "" : "scroll"}
        style={{ order: reverse ? 2 : 1 }}
      >
        {subtitle && (
          <p className={`${styles.subtitle} subtitle`}>{subtitle}</p>
        )}
        {heading && <h1>{heading}</h1>}
        {title && <h3>{title}</h3>}

        {description && (
          <div className={styles.descriptionWrapper}>
            {home && <img src={Mega} alt="" />}
            <p
              style={{ fontSize: home ? "1.2rem" : "" }}
              className={`standard ${styles.description}`}
            >
              {description}
            </p>
          </div>
        )}

        {home && (
          <>
            <MessageComponent />
            <div className={styles.inputHero}>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Email"
                  value={email}
                  setState={(newEmail) => setEmail(newEmail)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEnterEmail();
                  }}
                />
              </div>
              {button && (
                <Button onClick={() => handleEnterEmail()}>{button}</Button>
              )}
            </div>
            <div className={styles.connectWrapper}>
              <div className={styles.connect}>
                <p>{t("home.connectWith")}</p>

                <div className={styles.iconWrapper}>
                  <div className={styles.iconBox}>
                    <img src={Google} alt="" />
                  </div>
                  <div className={styles.iconBox}>
                    <img src={Apple} alt="" />
                  </div>
                </div>
              </div>

              <div className={`${styles.connect} ${styles.connect2}`}>
                <p>{t("home.appDownload")}</p>

                <div className={styles.iconWrapper}>
                  <div className={styles.iconBox}>
                    <img src={QR} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {list && (
          <div className={styles.list}>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[0]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[1]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[2]}</p>
            </div>
            <div>
              <img src={Checkmark} alt="Checkmark" />
              <p>{content[3]}</p>
            </div>
          </div>
        )}

        {!home && button && (
          <div className={styles.buttonWrapper}>
            <Button link="/signup">{button}</Button>
          </div>
        )}
      </div>
      {!video && !children && (
        <img
          className={`${
            heading || load ? "" : reverse ? "slide-right" : "slide-left"
          } ${full ? styles.full : ""}`}
          src={image}
          alt="nefentus graphics"
          style={{ order: reverse ? 1 : 2 }}
        />
      )}

      {video && !children && (
        <video
          onLoadedData={handleLoad}
          ref={videoRef}
          style={{ order: reverse ? 1 : 2 }}
          className={heading ? "" : ""}
          controls={false}
          autoPlay
          playsInline
          muted
          loop
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {children && (
        <div
          className={`${
            heading || load
              ? "load hero"
              : reverse
              ? "slide-right"
              : "slide-left"
          } ${full ? styles.full : ""}`}
          style={{ order: reverse ? 1 : 2 }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
