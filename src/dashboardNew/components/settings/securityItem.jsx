import React, { useEffect, useRef, useState } from "react";
import styles from "./settingsTitle.module.css";
import { EnableType } from "./settingsItem";
import Button from "../button/button";
import backend_API from "../../../api/backendAPI";
import QRCode from "react-qr-code";
import UrlLink from "../../../assets/icon/copyClipboardWhite.svg";
import MessageComponent from "../../../components/message";
import { OneTimeCodeInput } from "../../../dashboard/input/input";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";

const SecurityItem = ({ data }) => {
  const [isTotp, setIsTotp] = useState(
    localStorage.getItem("hasTotp") === "true",
  );
  const [isOtp, setIsOtp] = useState(data.value);
  const [status, setStatus] = useState(data.value);
  const email = useRef(localStorage.getItem("email"));
  const [reset, setReset] = useState(false);

  const [copied, setCopied] = useState(false);
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");

  const [open, setOpen] = useState(false);

  const [secretToken, setSecretToken] = useState("");

  const backendAPI = new backend_API();

  useEffect(() => {
    if (data.flow === "otp") {
      setStatus(isOtp);
    }
    if (data.flow === "totp") {
      setStatus(isTotp);
    }
  }, [isOtp, isTotp]);

  const handleOtp = async () => {
    const response = await backendAPI.setupOtp({ active: !isOtp });

    setIsOtp(!isOtp);

    if (response.status === 200) {
      console.log(response.status, "status");
      console.log(isOtp, "statusOtp");
      localStorage.setItem("hasOtp", data.toString());
    }
  };

  const handleTotpSecretKey = async () => {
    setIsTotp(!isTotp);
    if (!isTotp) {
      setOpen(true);
      const response = await backendAPI.getTotpToken();
      setSecretToken(response);
    } else {
      await backendAPI.setupTotp({
        active: false,
      });
    }
  };
  const handleTotpVerify = async (email, token, rememberMe) => {
    const response = await backendAPI.verifyTotpToken(email, token, rememberMe);
    console.log(response, "response");
    if (response?.status === 200) {
      const response2 = await backendAPI.setupTotp({
        active: true,
      });

      if (response2 == null) {
      } else {
        localStorage.setItem("hasTotp", true.toString());
        setOpen(false);
        setVerify(false);
      }
    }
    if (response.status === 400) {
      setReset(true);
      setTimeout(() => {
        setReset(false);
      });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.itemWrapper}>
          <div className={styles.left}>
            <div className={styles.label}>{data.label}</div>
            <div className={styles.description}>{data.description}</div>
          </div>
          <div className={styles.right}>
            {data.type === "button" ? (
              <EnableType value={status} />
            ) : (
              <PasswordIcon />
            )}
          </div>

          <Button
            color="gray"
            onClick={
              data.flow === "otp"
                ? handleOtp
                : data.flow === "totp"
                ? handleTotpSecretKey
                : null
            }
          >
            {data.type === "button" ? (status ? "Disable" : "Enable") : "Edit"}
          </Button>
        </div>
      </div>

      {open && secretToken && (
        <ModalOverlay>
          <div className={styles.modalTitle}>TOTP Authentication</div>

          {!verify ? (
            <div>
              <div className={styles.modalSubtitle}>
                {" "}
                Scan QR-code or paste code
              </div>
              <div className={styles.QRCode}>
                <QRCode
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                    borderRadius: "2rem",
                    border: "white 1rem solid",
                  }}
                  value={`otpauth://totp/Nefentus?secret=${secretToken}&issuer=${email.current}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className={styles.copyLink}>
                {copied && (
                  <div className={styles.tooltip}>
                    Link copied to clipboard!
                  </div>
                )}
                <div
                  className={styles.linkBox}
                  onClick={() => {
                    navigator.clipboard.writeText(secretToken);
                    setCopied(true);
                  }}
                >
                  <p id="affiliate-link" className={styles.url}>
                    {secretToken?.slice(0, 15) + "..."}
                  </p>
                  <img src={UrlLink} alt="url icon" />
                </div>
              </div>
              <div className={styles.buttons}>
                <Button
                  color="light"
                  onClick={() => {
                    setOpen(!open);
                    setIsTotp(!isTotp);
                  }}
                >
                  Close
                </Button>

                <Button
                  onClick={() => {
                    setVerify(true);
                  }}
                >
                  Verify
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.modalSubtitle}>
                {" "}
                Enter code from Authenticator
              </div>
              <MessageComponent />

              <OneTimeCodeInput
                setOTPCode={setCode}
                resetCodeFlag={reset}
                request={() => {
                  handleTotpVerify(email.current, code, false);
                }}
              />

              <div className={styles.buttons}>
                <Button
                  color="light"
                  onClick={() => {
                    setOpen(!open);
                    setIsTotp(!isTotp);
                  }}
                >
                  Close
                </Button>

                <Button
                  onClick={() => {
                    handleTotpVerify(email.current, code, false);
                  }}
                >
                  Verify
                </Button>
              </div>
            </div>
          )}
        </ModalOverlay>
      )}
    </>
  );
};

export default SecurityItem;

const PasswordIcon = () => {
  return <div className={styles.value}>**********</div>;
};
