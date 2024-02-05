import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./settingsTitle.module.css";
import Button from "../button/button";
import backend_API from "../../../api/backendAPI";
import MessageComponent from "../../../components/message";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/popup";
import { useTranslation } from "react-i18next";
import { EnableType } from "./settingsItem";
import { MessageContext } from "../../../context/message";
import SecurityPopupHeader from "./securityPopupHeader";

const emptyArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const SecurityItem = ({ data, recover }) => {
  const { setErrorMessage, setInfoMessage, clearMessages } =
    useContext(MessageContext);
  // const [isTotp, setIsTotp] = useState();
  // const [isOtp, setIsOtp] = useState();
  const [status, setStatus] = useState();
  const [seedPhrases, setSeedPhrases] = useState([]);
  // const [reset, setReset] = useState(false);

  // const [copied, setCopied] = useState(false);
  // const [verify, setVerify] = useState(false);
  // const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(false);
  const [showRecommend, setShowRecommend] = useState(recover);

  // const [open, setOpen] = useState(false);

  // const [secretToken, setSecretToken] = useState("");

  // const [openBox, setOpenBox] = useState(false);
  // const [openChangePassword, setOpenChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [verificationCode, setVerificationCode] = useState(null);
  // const [phishingCode, setPhishingCode] = useState(data.value);
  // const [phishingCodeValue, setPhishingCodeValue] = useState();
  const [addSeedPhrases, setAddSeedPhrases] = useState(false);
  const [checkedSeedPhrases, setCheckedSeedPhrases] = useState(emptyArray);
  // const [seedStatus, setSeedStatus] = useState(false);

  const { t } = useTranslation();
  const backendAPI = new backend_API();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data.flow === "otp") {
  //     setStatus(isOtp);
  //   } else if (data.flow === "totp") {
  //     setStatus(isTotp);
  //   } else if (data.flow === "phishingCode"){
  //     setStatus(phishingCode)
  //   }
  // }, [data]);
  useEffect(() => {
    setStatus(data.value);
  }, [data]);
  useEffect(() => {
    if (recover) {
    }
  }, []);

  const handleOtp = async () => {
    const response = await backendAPI.setupOtp({ active: !status });
    if (response.status === 200) {
      setStatus(!status);
    }
  };
  const handleTotp = async () => {
    const response = await backendAPI.setupTotp({ active: !status });
    if (response.status === 200) {
      setStatus(!status);
    }
  };
  const handleTotpSecretKey = async () => {
    if (!status) {
      backendAPI
        .getTotpToken()
        .then((data) => console.log(data, "data"))
        .then((res) => {
          console.log(res, "res");
        });

      // setSecretToken(response);
      setShow(true);
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
        setShow(false);
        clearMessages();
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
      label: t("security.passwords.labelCurrent"),
      placeholder: t("security.passwords.placeholderCurrent"),
      type: "password",
      value: currentPassword,
      onChange: setCurrentPassword,
      required: true,
    },
    {
      label: t("security.passwords.labelNew"),
      placeholder: t("security.passwords.placeholderNew"),
      type: "password",
      value: newPassword,
      onChange: setNewPassword,
      required: true,
    },
    {
      label: t("security.passwords.labelConfirm"),
      placeholder: t("security.passwords.placeholderConfirm"),
      type: "password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      required: true,
    },
  ];

  const handleConfirm = async () => {
    if (!newPassword || !currentPassword) {
      setErrorMessage(t("messages.error.passwordRequired"));
      return;
    }
    if (!confirmPassword) {
      setErrorMessage(t("messages.error.confirmPasswordRequired"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage(t("messages.error.passwordEqual"));
      return;
    }

    const response = await backendAPI.changePasswordWithOldOne(
      newPassword,
      currentPassword,
    );
    if (response == null) {
      setErrorMessage(t("messages.error.passwordCorrect"));
      return;
    }
    setInfoMessage(t("messages.success.passwordChange"));
    await backendAPI.signout();
    setTimeout(() => {
      setShow(false);
      clearMessages();
      resetValues();

      navigate("/login");
    }, 1000);
  };

  const resetValues = () => {
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleConfirmPhishingCode = async () => {
    const requestData = {
      code: status,
    };
    const response2 = await backendAPI.setPhishingCode(requestData);
    // if (response2 === "Success") {
    //   setPhishingCodeValue(requestData.code);
    //   localStorage.setItem("antiPhishingCode", requestData.code);
    // }

    if (response2 == null) {
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setPhishingCode("");
    }

    setShow(false);
    clearMessages();
  };

  const comparePhrases = () => {
    let checked = true;
    seedPhrases.forEach((phrase, index) => {
      if (checkedSeedPhrases[index] != phrase) checked = false;
    });
    if (!checked) {
      setErrorMessage(t("security.items.seedErrorMessage"));
      return;
    }
    setInfoMessage(t("security.items.seedInfoMessage"));
    setCheckedSeedPhrases(emptyArray);
    setAddSeedPhrases(false);
    clearMessages();
  };

  const getSeedPhrases = async () => {
    const seed = await backendAPI.getSeedPhrase(currentPassword);
    if (seed) {
      setSeedPhrases(seed.split(" "));
      setInput(false);
      clearMessages();
      setAddSeedPhrases("step1");
    } else {
      setErrorMessage(t("messages.error.passwordCorrect"));
    }
    setCurrentPassword("");
  };
  const handleCloseSeedModal = () => {
    setAddSeedPhrases(false);
    clearMessages();
    setCurrentPassword("");
    setCheckedSeedPhrases(emptyArray);
  };
  const checkPhrase = (value, index) => {
    const copyPhrases = [...checkedSeedPhrases];
    copyPhrases[index] = value;
    setCheckedSeedPhrases(copyPhrases);
    return;
  };
  const handleRecoverWallet = async () => {
    const res = await backendAPI.recoverWallet(
      checkedSeedPhrases.join(" "),
      currentPassword,
    );
    console.log(res);
    if (res) {
      setInfoMessage(t("security.items.recoverInfoMessage"));
    } else {
      setErrorMessage(t("security.items.recoverErrorMessage"));
    }
    setAddSeedPhrases(false);
    clearMessages();
    setCheckedSeedPhrases(emptyArray);
    setCurrentPassword("");
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
            {data.type === "button" &&
            data.flow != "seed" &&
            data.flow != "recover" ? (
              <EnableType value={status} />
            ) : (
              <PasswordIcon type={data.flow} value={status} />
            )}
          </div>

          <Button
            color="gray"
            fontSize="1rem"
            width="10rem"
            onClick={
              data.flow === "otp"
                ? handleOtp
                : data.flow === "totp"
                ? handleTotp //handleTotpSecretKey
                : data.flow === "password"
                ? () => setShow(true)
                : data.flow === "seed"
                ? () => {
                    setInput(true);
                  }
                : data.flow === "recover"
                ? () => {
                    setInput(true);
                  }
                : () => setShow(true)
            }
          >
            {data.type === "button"
              ? data.flow === "seed"
                ? t("general.show")
                : data.flow === "recover"
                ? t("security.actions.recover")
                : status
                ? t("general.disable")
                : t("general.enable")
              : t("general.edit")}
          </Button>
        </div>
      </div>

      {/* {data.flow === "totp" && (
        <Popup
          show={show && secretToken}
          onClose={() => {
            setShow(false);
            // setIsTotp(!isTotp);
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
      )} */}

      {data.flow === "seed" && (
        <>
          <Popup
            className={styles.popupContainer}
            show={addSeedPhrases}
            onClose={handleCloseSeedModal}
            confirmTitle={
              addSeedPhrases === "step1"
                ? t("general.continue")
                : t("general.confirm")
            }
            cancelTitle={t("general.close")}
            onConfirm={
              addSeedPhrases === "step1"
                ? () => setAddSeedPhrases("step2")
                : comparePhrases
            }
          >
            <MessageComponent />
            <div className={styles.seedPhrasesModalWrapper}>
              <SecurityPopupHeader
                title={
                  addSeedPhrases === "step1"
                    ? t("security.items.seedPhrase")
                    : t("security.items.verifySeed")
                }
                description={
                  addSeedPhrases === "step1"
                    ? t("security.items.rememberSeed")
                    : t("security.items.enterSeed")
                }
              />

              {addSeedPhrases === "step2" ? (
                <div className={styles.seedPhrasesInputWrapper}>
                  {seedPhrases.map((phrase, index) => (
                    <div
                      style={{
                        display: "flex",
                        width: 100,
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <label>{index + 1}.</label>
                      <input
                        style={{
                          background:
                            checkedSeedPhrases[index] === phrase
                              ? "#333333"
                              : checkedSeedPhrases[index] == ""
                              ? "transparent"
                              : "#bb0000",
                        }}
                        onKeyDown={(e) => {
                          e.code === "Enter" &&
                            checkPhrase(e.target.value, index);
                        }}
                        onBlur={(e) => checkPhrase(e.target.value, index)}
                        className={styles.inputSeedPhrase}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.seedPhrasesInputWrapper}>
                  {seedPhrases.map((phrase, index) => (
                    <div
                      style={{
                        display: "flex",
                        width: 100,
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <label>{index + 1}.</label>
                      <p
                        style={{
                          background: "#333333",
                          width: 80,
                        }}
                        className={styles.seedPhrase}
                      >
                        {phrase}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Popup>
          <Popup
            className={styles.popupContainer}
            show={input}
            onConfirm={() => {
              getSeedPhrases();
            }}
            onClose={() => {
              setCurrentPassword("");
              setInput(false);
              clearMessages();
            }}
            confirmTitle={t("general.confirm")}
            cancelTitle={t("general.cancel")}
          >
            <>
              <MessageComponent />
              <SecurityPopupHeader
                title={t("security.passwords.labelCurrent")}
                description={t("security.items.askPassword")}
              />
              <div className={styles.inputItem}>
                <input
                  type="password"
                  className={styles.input}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </>
          </Popup>
        </>
      )}

      {data.flow === "recover" && (
        <>
          <Popup
            className={styles.popupContainer}
            show={addSeedPhrases}
            onClose={handleCloseSeedModal}
            confirmTitle={t("general.confirm")}
            cancelTitle={t("general.close")}
            onConfirm={handleRecoverWallet}
          >
            <MessageComponent />
            <div className={styles.seedPhrasesModalWrapper}>
              <SecurityPopupHeader
                title={t("security.items.verifySeed")}
                description={t("security.items.enterSeed")}
              />
              <div className={styles.seedPhrasesInputWrapper}>
                {checkedSeedPhrases.map((phrase, index) => (
                  <div
                    style={{
                      display: "flex",
                      width: 100,
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <label>{index + 1}.</label>
                    <input
                      style={{
                        background: "transparent",
                      }}
                      onKeyDown={(e) => {
                        e.code === "Enter" &&
                          checkPhrase(e.target.value, index);
                      }}
                      onBlur={(e) => checkPhrase(e.target.value, index)}
                      className={styles.inputSeedPhrase}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Popup>
          <Popup
            className={styles.popupContainer}
            show={input}
            onConfirm={() => {
              setInput(false);
              clearMessages();
              setAddSeedPhrases("step2");
            }}
            onClose={() => {
              setCurrentPassword("");
              setInput(false);
              clearMessages();
            }}
            confirmTitle={t("general.confirm")}
            cancelTitle={t("general.cancel")}
          >
            <>
              <MessageComponent />
              <SecurityPopupHeader
                title={t("security.passwords.labelCurrent")}
                description={t("security.items.newPassword")}
              />
              <div className={styles.inputItem}>
                <input
                  type="password"
                  className={styles.input}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </>
          </Popup>
          {recover && (
            <Popup
              className={styles.popupContainer}
              show={showRecommend}
              onConfirm={() => {
                setShowRecommend(false);
                setInput(true);
              }}
              onClose={() => {
                setShowRecommend(false);
              }}
              confirmTitle={t("general.confirm")}
              cancelTitle={t("general.cancel")}
            >
              <>
                <h1 style={{ fontSize: "1.8rem" }}>
                  {t("security.recommendRecoverModal.title")}
                </h1>
                <p
                  style={{ fontSize: "1.2rem", opacity: "0.6", width: "400px" }}
                >
                  {t("security.recommendRecoverModal.subtitle")}
                </p>
              </>
            </Popup>
          )}
        </>
      )}

      {data.flow === "password" && (
        <Popup
          className={styles.popupContainer}
          show={show}
          onClose={() => {
            setShow(false);
            resetValues();
          }}
          onConfirm={handleConfirm}
          cancelTitle={t("security.actions.close")}
          confirmTitle={t("security.actions.verify")}
        >
          <>
            <MessageComponent />
            <SecurityPopupHeader title={t("security.passwords.title")} />
            {passwordContent.map((item, index) => (
              <div className={styles.inputItem}>
                <div className={styles.modalSubtitle}>{item.label}</div>
                <input
                  className={styles.input}
                  type={item.type}
                  id={index}
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
        </Popup>
      )}

      {data.flow === "phishingCode" && (
        <Popup
          className={styles.popupContainer}
          show={show}
          title={t("security.antiPhishingCodeTitle")}
          onConfirm={handleConfirmPhishingCode}
          onClose={() => setShow(false)}
          cancelTitle={t("general.cancel")}
          confirmTitle={t("general.confirm")}
        >
          <>
            <input
              className={styles.input}
              value={status}
              placeholder={t("security.antiPhishingCodePlaceholder")}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
          </>
        </Popup>
      )}
    </>
  );
};

export default SecurityItem;

const PasswordIcon = ({ type, value }) => {
  return (
    <div className={styles.value}>
      {type === "password" || type === "seed"
        ? "**********"
        : type === "phishingCode" && value !== "undefined" && value
        ? value
        : ""}
    </div>
  );
};
