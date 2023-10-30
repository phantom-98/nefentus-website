import Input from "../input/input";
import styles from "./loginBox.module.css";

import Logo from "../../assets/logo/logo2.svg";
import Button from "./../button/button";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dashboardLink, decryptData, encryptData } from "../../utils";

import backend_API from "../../api/backendAPI";

import CheckBox from "../../assets/icon/whiteCheckmark.svg";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Error from "../error/error";
import setCookie from "../setCookie/setCookie";
import ReCAPTCHA from "react-google-recaptcha";
import { OneTimeCodeInput } from "../../dashboard/input/input";

const ConfirmMeEmail = ({
  email,
  code,
  setCode,
  handleClickTotp,
  handleClickOtp,
  otp,
  totp,
  step,
}) => {
  console.log(code, "code");
  console.log(totp, otp, "111");

  return (
    <>
      {otp && !totp && (
        <div className={styles["confirm-email"]}>
          <h3>Check your email for a code</h3>
          <p>
            We have sent a 6-digits code to {email}. The code expires shortly,
            so please enter it soon.
          </p>
          <form onSubmit={handleClickOtp}>
            <OneTimeCodeInput
              setOTPCode={setCode}
              request={() => handleClickOtp()}
            />

            <div className={styles["button-group"]}>
              <div
                className={`${styles.buttonWrapper} ${styles.buttonWrapperOTP}`}
              >
                <Button className={styles.button} onClick={handleClickOtp}>
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {totp && !otp && (
        <div className={styles["confirm-email"]}>
          <h3>Enter code from your Authenticator</h3>
          <p>You need to enter 6-digit code from your Authenticator</p>
          <form onSubmit={handleClickTotp}>
            <OneTimeCodeInput
              setOTPCode={setCode}
              request={() => handleClickOtp()}
            />

            <div className={styles["button-group"]}>
              <div
                className={`${styles.buttonWrapper} ${styles.buttonWrapperOTP}`}
              >
                <Button className={styles.button} onClick={handleClickTotp}>
                  Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {totp && otp && (
        <>
          {!step ? (
            <div className={styles["confirm-email"]}>
              <h3>Check your email for a code</h3>
              <p>
                We have sent a 6-digits code to {email}. The code expires
                shortly, so please enter it soon.
              </p>
              <form onSubmit={handleClickOtp}>
                <OneTimeCodeInput
                  setOTPCode={setCode}
                  request={() => handleClickOtp()}
                />

                <div className={styles["button-group"]}>
                  <div
                    className={`${styles.buttonWrapper} ${styles.buttonWrapperOTP}`}
                  >
                    <Button className={styles.button} onClick={handleClickOtp}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className={styles["confirm-email"]}>
              <h3>Enter code from your Authenticator</h3>
              <p>You need to enter 6-digit code from your Authenticator</p>
              <form id={"totpForm"} onSubmit={handleClickTotp}>
                <OneTimeCodeInput
                  setOTPCode={setCode}
                  resetCodeFlag
                  request={() => handleClickOtp()}
                />

                <div className={styles["button-group"]}>
                  <div
                    className={`${styles.buttonWrapper} ${styles.buttonWrapperOTP}`}
                  >
                    <Button className={styles.button} onClick={handleClickTotp}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

const LoginBox = () => {
  const recaptchaRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const backendAPI = new backend_API();
  const { t } = useTranslation();
  const [checkBox, setCheckBox] = useState(
    Cookies.get("nefentus-remember-me")
      ? JSON.parse(Cookies.get("nefentus-remember-me"))
      : false,
  );

  const schema = z.object({
    email: z.string().min(1, { message: t("messages.validation.email") }),
    password: z.string().min(1, { message: t("messages.validation.password") }),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: Cookies.get("nefentus-username")
        ? Cookies.get("nefentus-username")
        : "",
      password: Cookies.get("nefentus-password")
        ? decryptData(Cookies.get("nefentus-password"))
        : "",
    },
  });

  useEffect(() => {
    if (checkBox) {
      setCookie("nefentus-username", getValues("email"), 365);
      setCookie("nefentus-password", encryptData(getValues("password")), 365);
      setCookie("nefentus-remember-me", checkBox, 365);
    } else {
      setCookie("nefentus-username", "", 365);
      setCookie("nefentus-password", "", 365);
      setCookie("nefentus-remember-me", false, 365);
    }
  }, [checkBox, getValues]);
  const [showConfirmMeEmail, setShowConfirmMeEmail] = useState(false);
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState(false);
  const [totp, setTotp] = useState(false);
  const [step, setStep] = useState(false);

  function navigateDashboard() {
    const link = dashboardLink(localStorage);
    navigate(link);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token")) {
      const paramValue = urlParams.get("token");
      activateUser(paramValue);
    } else {
    }

    async function checkJwtAndNavigate() {
      const jwtIsValid = await backendAPI.checkJwt();
      if (jwtIsValid) {
        navigateDashboard();
      }
    }

    checkJwtAndNavigate();
  }, []);

  async function loginUser(data, checkbox) {
    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      setErrorMessage(t("messages.error.reCAPTCHA"));
    } else {
      if (Cookies.get("acceptCookie") !== true) {
        checkbox = false;
      }
      try {
        const response = await backendAPI.login(
          data.email,
          data.password,
          checkbox,
        );
        if (response == null) {
          setErrorMessage(t("messages.error.loginData"));
          return;
        } else if (response.hasOtp || response.hasTotp) {
          setShowConfirmMeEmail(true);
          setOtp(response.hasOtp);
          setTotp(response.hasTotp);
          setEmail(response.email);
        } else {
          navigateDashboard();
        }
      } catch (error) {
        setErrorMessage(t("messages.error.login"));
      }
    }
  }

  async function verifyOtpCode(email, code, checkbox) {
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    try {
      const response = await backendAPI.verifyOTP(email, code, checkbox);
      if (response == null) {
        setErrorMessage(t("messages.error.confirm"));
        return;
      }
      if (otp && totp) {
        setStep(true);
      } else {
        navigateDashboard();
      }
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  }

  async function verifyTotpCode(email, code, checkbox) {
    if (Cookies.get("acceptCookie") !== true) {
      checkbox = false;
    }
    const response = await backendAPI.verifyTotpToken(email, code, checkbox);
    try {
      if (response == null) {
        setErrorMessage("Failed to Confirm");
        return;
      }
      console.log(response, "response");
      navigateDashboard();
    } catch (error) {
      setErrorMessage(t("messages.error.login"));
    }
  }

  const activateUser = async (token) => {
    try {
      const response = await backendAPI.activateAccount(token);
      if (response == null) {
        setErrorMessage(t("messages.error.activateAccount"));
        return;
      }
      setMessage(t("messages.success.activateAccount"));
    } catch (error) {
      setErrorMessage(t("messages.error.activateAccount"));
    }
  };

  return (
    <div className={`${styles.login}`}>
      <div className={styles.closeWrapper}>
        <Button link={"/"} color={"white"}>
          {t("login.close")}
        </Button>
      </div>
      <div className={styles.left}>
        <img src={Logo} alt="nefentus logo" />

        <div>
          <h2>
            <span className="gradient">{t("login.titleP1") + "*"}</span>
          </h2>
          <p>{t("login.description")}</p>

          <p>
            {t("login.info")}
            <u>
              <Link to="/signUp">{t("login.infoButton") + "*"}</Link>
            </u>
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <Error
          error={
            errorMessage || errors.email?.message || errors.password?.message
          }
        />
        {message && (
          <div className={styles.messagecontainer}>
            <p>{message}</p>
          </div>
        )}

        {showConfirmMeEmail ? (
          <ConfirmMeEmail
            email={email}
            code={code}
            setCode={setCode}
            handleClickOtp={() => verifyOtpCode(email, code, checkBox)}
            handleClickTotp={() => verifyTotpCode(email, code, checkBox)}
            otp={otp}
            totp={totp}
            step={step}
          />
        ) : (
          <form onSubmit={handleSubmit(loginUser)}>
            <div className={styles.inputWrapper}>
              <Input
                register={register}
                name={"email"}
                label={t("signUp.emailLabel")}
                placeholder={t("signUp.emailPlaceholder")}
              />
              <Input
                register={register}
                name={"password"}
                label={t("signUp.passwordLabel")}
                placeholder={t("signUp.passwordPlaceholder")}
                secure
              />

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY}
                theme="dark"
              />

              <div className={styles.rememberInfo}>
                <div onClick={() => setCheckBox((prev) => !prev)}>
                  <div className={styles.checkBox}>
                    {checkBox && <img src={CheckBox} alt="checkbox" />}
                  </div>
                  <p>{t("login.remember")}</p>
                </div>

                <Link to="/forgot-password">
                  <p>{t("login.forgot")}</p>
                </Link>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button className={styles.button} type="submit">
                {t("login.button")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginBox;
