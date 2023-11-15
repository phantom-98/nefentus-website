import React, { useEffect, useRef, useState } from "react";
import styles from "./settingsTitle.module.css";
// import { EnableType } from "./settingsItem";
import Button from "../button/button";
import backend_API from "../../../api/backendAPI";
import QRCode from "react-qr-code";
import UrlLink from "../../../assets/icon/copyClipboardWhite.svg";
import MessageComponent from "../../../components/message";
import { OneTimeCodeInput, RawInput } from "../../../dashboard/input/input";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/popup";
import { useTranslation } from "react-i18next";

const SecurityItem = ({ data }) => {
  const [isTotp, setIsTotp] = useState(
    localStorage.getItem("hasTotp") === "true",
  );
  const [isOtp, setIsOtp] = useState(localStorage.getItem("hasOtp") === "true");
  const [status, setStatus] = useState(data.value);
  const email = useRef(localStorage.getItem("email"));
  const [reset, setReset] = useState(false);

  const [copied, setCopied] = useState(false);
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);

  const [secretToken, setSecretToken] = useState("");

  const [openBox, setOpenBox] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [phishingCode, setPhishingCode] = useState(data.value);
  const [phishingCodeValue, setPhishingCodeValue] = useState(
    localStorage.getItem("antiPhishingCode"),
  );

  const { t } = useTranslation();
  const backendAPI = new backend_API();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.flow === "otp") {
      setStatus(isOtp);
    }
    if (data.flow === "totp") {
      setStatus(isTotp);
    }
  }, [isOtp, isTotp, phishingCodeValue.current]);

  const handleOtp = async () => {
    const response = await backendAPI.setupOtp({ active: !isOtp });

    setIsOtp(!isOtp);

    if (response.status === 200) {
      console.log(response.status, "status");
      console.log(isOtp, "statusOtp");
      localStorage.setItem("hasOtp", (!isOtp).toString());
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

  const passwordContent = [
    {
      label: "Current Password",
      placeholder: "Enter your password",
      type: "password",
      value: currentPassword,
      onChange: setCurrentPassword,
      required: true,
    },
    {
      label: "New Password",
      placeholder: "Enter new password",
      type: "password",
      value: newPassword,
      onChange: setNewPassword,
      required: true,
    },
    {
      label: "Confirm Password",
      placeholder: "Confirm new password",
      type: "password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      required: true,
    },
  ];

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      return;
    }

    const response = await backendAPI.changePasswordDashboard(
      newPassword,
      currentPassword,
    );
    if (response == null) {
      return;
    }
    setOpenBox(true);
  };

  const handleConfirmCode = async () => {
    const response =
      await backendAPI.changePasswordConfirmDashboard(verificationCode);
    if (response == null) {
      return;
    }
    resetValues();
    setVerificationCode("");
    setOpenBox(false);
    setOpenChangePassword(false);
  };

  const resetValues = () => {
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleClose = () => {
    setOpenBox(false);
    setVerificationCode("");
    setOpenChangePassword(false);
  };

  const handleConfirmPhishingCode = async () => {
    const requestData = {
      code: phishingCode,
    };

    const response2 = await backendAPI.setPhishingCode(requestData);
    if (response2 === "Success") {
      setPhishingCodeValue(requestData.code);
      localStorage.setItem("antiPhishingCode", requestData.code);
    }

    if (response2 == null) {
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setPhishingCode("");
    }

    setShow(false);
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
              <PasswordIcon
                type={data.flow}
                value={phishingCodeValue ? phishingCodeValue : data?.value}
              />
            )}
          </div>

          <Button
            color="gray"
            onClick={
              data.flow === "otp"
                ? handleOtp
                : data.flow === "totp"
                ? handleTotpSecretKey
                : data.flow === "password"
                ? () => setOpenChangePassword(true)
                : () => setShow(true)
            }
          >
            {data.type === "button" ? (status ? "Disable" : "Enable") : "Edit"}
          </Button>
        </div>
      </div>

      <Popup
        show={open && secretToken}
        onClose={() => {
          setOpen(!open);
          setIsTotp(!isTotp);
        }}
        onConfirm={() => handleTotpVerify(email.current, code, false)}
        cancelTitle={t("security.actions.close")}
        confirmTitle={t("security.actions.verify")}
      >
        <div className={styles.modalTitle}>
          {"TOTP ".concat(t("security.authentication"))}
        </div>

        {!verify ? (
          <div>
            <div className={styles.modalSubtitle}>
              {" "}
              {t("security.scanModal.title")}
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
                <div className={styles.tooltip}>Link copied to clipboard!</div>
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
          </div>
        )}
      </Popup>

      <Popup
        show={openChangePassword}
        onClose={!openBox ? setOpenChangePassword(false) : handleClose}
        onConfirm={handleConfirm}
        cancelTitle={t("security.actions.close")}
        confirmTitle={t("security.actions.verify")}
      >
        {!openBox ? (
          <>
            <div className={styles.modalTitle}>Change Password</div>
            {passwordContent.map((item) => (
              <div className={styles.inputItem}>
                <div className={styles.modalSubtitle}>{item.label}</div>
                <input
                  className={styles.input}
                  type={item.type}
                  name=""
                  id=""
                  value={item.value}
                  placeholder={item.placeholder}
                  onChange={(e) => {
                    item.onChange(e.target.value);
                  }}
                  disabled={item.disabled === true}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.modalTitle}>{t("security.enterCode")}</div>

            <RawInput
              value={verificationCode}
              setState={setVerificationCode}
              type="text"
            />
          </>
        )}
      </Popup>
      {/*)}*/}

      <Popup
        show={show}
        title="Enter Anti-Phishing code:"
        onConfirm={handleConfirmPhishingCode}
        onClose={() => setShow(false)}
      >
        <>
          <input
            className={styles.input}
            value={phishingCode === "null" ? "" : phishingCode}
            placeholder={"Enter anti-phishing code"}
            onChange={(e) => {
              setPhishingCode(e.target.value);
            }}
          />
        </>
      </Popup>
    </>
  );
};

export default SecurityItem;

const PasswordIcon = ({ type, value }) => {
  return (
    <div className={styles.value}>
      {type === "password"
        ? "**********"
        : type === "phishingCode" && value !== "null" && value
        ? value
        : "Not Set"}
    </div>
  );
};
