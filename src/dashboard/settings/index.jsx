import InputComponent, {
  Attachment,
  OneTimeCodeInput,
  RawInput,
  Switcher,
} from "../input/input";
import styles from "./settings.module.css";
import { useEffect, useState, useContext, useRef } from "react";

import Logo from "../../assets/logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import backend_API from "../../api/backendAPI";
import InputComponent, { RawInput } from "../input/input";
import backendAPI from "../../api/backendAPI";
import Header from "../header/header";
import BlobPicture from "../../components/blobPicture/blobPicture";
import { KYC } from "./components/KYC";
import { Buttons } from "./components/buttons";
import Button from "../../components/button/button";
import { dashboardLink } from "../../utils";
import MessageComponent from "../../components/message";
import { MessageContext } from "../../context/message";
import TopInfo from "../topInfo/topInfo";
import Tabs from "../../components/tabs/index";
import CropDialog, {
  dataURLtoFile,
} from "../../components/cropDialog/cropDialog";
import CheckBox from "../../assets/icon/whiteCheckmark.svg";
import ModalOverlay from "../modal/modalOverlay";
import UrlLink from "../../assets/icon/copyClipboardWhite.svg";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { useAuth } from "../../context/auth/authContext";

let nav = [
  "Profile",
  "Change password",
  "Change email",
  "2-Factor Authentication",
];

const nav_kyc = [
  "Profile",
  "Change password",
  "Change email",
  "2-Factor Authentication",
  <div>
    <span className={styles.rest}>Know Your Customer(</span>KYC
    <span className={styles.rest}>)</span>
  </div>,
  "Invoice",
];

const instruction = [
  {
    title: "Personal information",
    description: "Change your personal information in the fields below.",
  },
  {
    title: "Password",
    description: "Please enter your current password to change it.",
  },
  {
    title: "Confirm",
    description:
      "Please confirm your identity. Company registration and utility bill can't be older than 6 months.",
  },
];

const SettingsBody = ({ type }) => {
  const { user, setUser } = useAuth();
  const backendapi = new backendAPI();
  const [active, setActive] = useState(0);
  const [requireKyc, setRequireKyc] = useState(user?.requireKyc);
  const [profilePicUrl, setProfilePicUrl] = useState(user?.profileImage);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const { clearMessages } = useContext(MessageContext);

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePicUrl(user?.profileImage);
      setCounter(counter + 1);
      setRequireKyc(user?.requireKyc);
    };

    async function checkJwtAndNavigate() {
      const jwtIsValid = await backendapi.checkJwt();
      if (jwtIsValid) {
        const newLink = dashboardLink(user);
        setLink(newLink);
      } else {
        navigate("/login");
      }
    }

    checkJwtAndNavigate();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [counter]);

  useEffect(() => {
    if (requireKyc === "true") {
      nav = nav_kyc;
    }
  }, [requireKyc]);

  const [link, setLink] = useState("");
  return (
    <div
      className={`${styles.body} ${
        type === "vendor" ? "dashboard-body" : "container"
      }`}
      style={{ paddingTop: type === "vendor" ? "0" : "2rem" }}
    >
      {type === "vendor" ? (
        <Header title={"Settings"} />
      ) : (
        <>
          <div className={styles.navigation}>
            <img src={Logo} alt="" />

            <div className={styles.button}>
              <Link to={link} color="white">
                To Dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      {type !== "vendor" && (
        <div
          className={styles.profile}
          style={{ justifyContent: type === "vendor" ? "start" : "end" }}
        >
          <div
            className={styles.avatar}
            style={{
              width: type === "vendor" ? "10rem" : "7rem",
              height: type === "vendor" ? "10rem" : "7rem",
            }}
          >
            <BlobPicture />
          </div>

          <div className={styles.info}>
            <p className={styles.name}>
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>
      )}

      <Tabs
        tabIds={nav}
        initActiveTab={nav[active]}
        getHeader={(tabId) => tabId}
        getBody={(tabId) => {
          switch (tabId) {
            case nav[0]:
              return (
                <ProfileBody
                  active={active}
                  afterUpdateSettings={() =>
                    setProfilePicUrl(user?.profileImage)
                  }
                  user={user}
                  setUser={setUser}
                />
              );
            case nav[1]:
              return <PasswordBody active={active} />;
            case nav[2]:
              return <EmailBody active={active} />;
            case nav[3]:
              return (
                <AuthenticatorBody
                  active={active}
                  user={user}
                  setUser={setUser}
                />
              );
            case nav[4]:
              return <InvoiceBody user={user} />;
            default:
              return <KYC user={user} />;
          }
        }}
      />
    </div>
  );
};

export default SettingsBody;

const ProfileBody = ({ afterUpdateSettings, active, user, setUser }) => {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [business, setBusiness] = useState(user?.business);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [email, setEmail] = useState(user?.email);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [imageChanged, setImageChanged] = useState(false); // Set to true if image changed (was added or deleted))
  const isTotp = useRef(user?.hasTotp === "true");
  const isOtp = useRef(user?.hasOtp === "true");
  const [phishingCode, setPhishingCode] = useState(
    user?.antiPhishingCode !== "undefined" ? user?.antiPhishingCode : "",
  );
  const { t } = useTranslation();

  useEffect(() => {
    const profilePic = user?.profileImage;
    if (profilePic !== "null") setImageName(profilePic.split("_").pop());
  }, []);

  const profileContent = [
    {
      label: "First Name",
      type: "text",
      value: firstName,
      onChange: setFirstName,
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      value: lastName,
      onChange: setLastName,
      required: true,
    },
    {
      label: "Business",
      type: "text",
      value: business,
      onChange: setBusiness,
      required: false,
    },
    {
      label: "Phone Number",
      type: "text",
      value: phoneNumber,
      onChange: setPhoneNumber,
      required: false,
    },
  ];

  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const handleUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setCropDialogOpen(true);
    setImageChanged(true);
  };

  const checkErrors = () => {
    if (!firstName) {
      setErrorMessage(t("messages.error.firstNameRequired"));
      return null;
    }

    if (!lastName) {
      setErrorMessage(t("messages.error.lastNameRequired"));
      return null;
    }

    if (!email || !email.trim()) {
      setErrorMessage(t("messages.error.emailRequired"));
      return null;
    }

    return true;
  };

  const handleConfirm = async () => {
    if (checkErrors() == null) {
      return;
    }
    setErrorMessage(null);

    const requestData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      business: business || "",
      antiPhishingCode: phishingCode,
    };

    let response = 1;

    if (imageChanged) {
      let resp2;
      if (file) {
        resp2 = await backendAPI.uploadFile(file);
      } else {
        resp2 = await backendAPI.deleteProfileImage(file);
      }
      setUser({ ...user, profileImage: file ? resp2 : "null" });
      if (resp2 == null) {
        setErrorMessage(t("messages.error.uploadPicture"));
      }
      setImageChanged(false);
    }

    const response2 = await backendAPI.update(requestData);
    if (response2 == null) {
      setErrorMessage(t("messages.error.updateData"));
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    resetValues();
    afterUpdateSettings();

    if (response !== null && response2 !== null) {
      setInfoMessage(t("messages.success.updateSettings"));
    }
  };

  const resetValues = () => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setBusiness(user?.business);
    setPhoneNumber(user?.phoneNumber);
    setEmail(user?.email);
  };

  return (
    <div className={styles.tabContent}>
      <MessageComponent />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {profileContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            value={item.value}
            setState={item.onChange}
          />
        </div>
      ))}

      <div>
        <InputComponent
          disabled
          label={"Email Address"}
          placeholder={email}
          type={"text"}
          value={email}
        />
      </div>

      <InputComponent
        label="Anti Phishing Code"
        placeholder="Anti Phishing Code"
        type="text"
        value={phishingCode}
        setState={setPhishingCode}
      />

      <Attachment
        label="Upload logo image"
        onUpload={handleUpload}
        value={imageName}
        onDelete={() => {
          setFile(null);
          setImageChanged(true);
        }}
      />

      <CropDialog
        open={cropDialogOpen}
        file={file}
        aspect={1}
        onClose={() => setCropDialogOpen(false)}
        onSave={(croppedImageData) => {
          setCropDialogOpen(false);
          setFile(dataURLtoFile(croppedImageData, file.name));
        }}
      />

      <Buttons
        functions={[resetValues, handleConfirm]}
        buttons={["Reset", "Confirm"]}
      />
    </div>
  );
};

const PasswordBody = ({ active }) => {
  const [openBox, setOpenBox] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const { t } = useTranslation();

  const backendAPI = new backend_API();

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
      setErrorMessage(t("messages.error.passwordEqual"));
      return;
    }

    const response = await backendAPI.changePasswordDashboard(
      newPassword,
      currentPassword,
    );
    if (response == null) {
      setErrorMessage(t("messages.error.oldPassword"));
      return;
    }
    setErrorMessage(null);
    setOpenBox(true);
  };

  const handleConfirmCode = async () => {
    const response =
      await backendAPI.changePasswordConfirmDashboard(verificationCode);
    if (response == null) {
      setErrorMessage(t("messages.error.codeValid"));
      return;
    }
    setInfoMessage(t("messages.success.passwordChange"));
    resetValues();
    setVerificationCode("");
    setOpenBox(false);
  };

  const resetValues = () => {
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleClose = () => {
    setOpenBox(false);
    setVerificationCode("");
  };

  return (
    <div className={styles.tabContent}>
      {openBox && (
        <div className={styles.modal}>
          <div className={`${styles.popup} card`}>
            <MessageComponent />

            <p className={styles.modalHeadline}>Enter verification code:</p>

            <RawInput
              value={verificationCode}
              setState={setVerificationCode}
              type="text"
            />

            <div className={styles.modalButtonRow}>
              <Button onClick={handleClose} color="black">
                Cancel
              </Button>
              <Button onClick={handleConfirmCode} color="white">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <MessageComponent hide={openBox} />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {passwordContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            setState={item.onChange}
            value={item.value}
            secure
          />
        </div>
      ))}

      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};

const EmailBody = ({ active }) => {
  const [openBox, setOpenBox] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const { t } = useTranslation();

  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const passwordContent = [
    {
      label: "New Email",
      placeholder: "Enter new email",
      type: "email",
      value: newEmail,
      onChange: setNewEmail,
      required: true,
    },
    {
      label: "Confirm Email",
      placeholder: "Confirm new email",
      type: "email",
      value: confirmEmail,
      onChange: setConfirmEmail,
      required: true,
    },
  ];

  const logOut = async () => {
    try {
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    if (newEmail !== confirmEmail) {
      setErrorMessage(t("messages.error.emailEqual"));
      return;
    }

    const response = await backendAPI.changeEmailDashboard(newEmail);
    if (response == null) {
      setErrorMessage(t("messages.error.emailUsed"));
      return;
    } else {
      setInfoMessage(t("messages.success.email"));
    }
    setErrorMessage(null);
    setOpenBox(true);
  };

  const resetValues = () => {
    setNewEmail("");
    setConfirmEmail("");
  };

  const handleClose = () => {
    setOpenBox(false);
    setVerificationCode("");
  };

  const handleCode = async () => {
    if (verificationCode.trim().length === 0) {
      setErrorMessage(t("messages.error.confirmCode"));
      return;
    } else {
      const response = await backendAPI.confirmEmail(
        verificationCode.trim(),
        newEmail,
      );
      if (response == null) {
        setErrorMessage(t("messages.error.verificationCode"));
        return;
      } else {
        setInfoMessage(t("messages.success.email"));
        resetValues();
        await logOut();
      }
    }
  };

  return (
    <div className={styles.tabContent}>
      {openBox && (
        <div className={styles.modal}>
          <div className={`${styles.popup} card`}>
            <MessageComponent />

            <p className={styles.modalHeadline}>Enter verification code:</p>

            <RawInput
              value={verificationCode}
              setState={setVerificationCode}
              type="text"
            />

            <div className={styles.modalButtonRow}>
              <Button onClick={handleClose} color="white">
                Cancel
              </Button>
              <Button onClick={handleCode} color="black">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <MessageComponent hide={openBox} />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      {passwordContent.map((item) => (
        <div>
          <InputComponent
            label={item.label + (item.required ? "*" : "")}
            placeholder={item.placeholder}
            type={item.type}
            setState={item.onChange}
            value={item.value}
            secure
          />
        </div>
      ))}
      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};

const InvoiceBody = ({ user }) => {
  const [vatNumber, setVatNumber] = useState(user?.vatNumber);
  const [sendInvoice, setSendInvoice] = useState(JSON.parse(user?.sendInvoice));
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();

  const handleConfirm = async () => {
    const response = await backendAPI.updateInvoiceSettings({
      sendInvoice,
      vatNumber,
    });
    if (response == null) {
      setErrorMessage("Failed to update");
      return;
    } else {
      setInfoMessage("Successfully updated!");
    }
    setErrorMessage(null);
  };

  return (
    <div className={styles.tabContent}>
      <TopInfo
        title="Invoice"
        description="Enter your VAT number and confirm if you want to receive invoices."
      />
      <MessageComponent />

      <InputComponent
        label="VAT Number"
        placeholder="Enter your VAT number"
        type="text"
        setState={setVatNumber}
        value={vatNumber}
        secure
      />
      <div className={styles.input}>
        <p>Send invoices</p>
        <div
          onClick={() => setSendInvoice((prev) => !prev)}
          className={styles.checkBox}
        >
          {sendInvoice && <img src={CheckBox} alt="checkbox" />}
        </div>
      </div>

      <Buttons functions={["", handleConfirm]} buttons={["Reset", "Confirm"]} />
    </div>
  );
};

const AuthenticatorBody = ({ active, user, setUser }) => {
  const [isTotp, setIsTotp] = useState(user?.hasTotp === "true");
  const [isOtp, setIsOtp] = useState(user?.hasOtp === "true");
  const email = useRef(user?.email);
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [reset, setReset] = useState(false);

  const [copied, setCopied] = useState(false);
  const [verify, setVerify] = useState(false);
  const [code, setCode] = useState("");

  const [open, setOpen] = useState(false);
  const [secretToken, setSecretToken] = useState("");

  const backendAPI = new backend_API();

  const handleTotpSecretKey = async (isTotp) => {
    setIsTotp(isTotp);
    if (isTotp) {
      setOpen(true);
      const response = await backendAPI.getTotpToken();
      setSecretToken(response);
    } else {
      await backendAPI.setupTotp({
        active: false,
      });
      setInfoMessage("Settings updated successfully!");
    }
  };

  const handleTotpVerify = async (email, token, rememberMe) => {
    const response = await backendAPI.verifyTotpToken(
      email,
      token,
      rememberMe,
      () => {},
    );
    console.log(response, "response");
    if (response?.status === 200) {
      const response2 = await backendAPI.setupTotp({
        active: true,
      });

      if (response2 == null) {
        setErrorMessage("Error on updating data");
      } else {
        setUser({ ...user, hasTotp: true.toString() });
        setInfoMessage("Settings updated successfully!");
        setOpen(false);
        setVerify(false);
      }
    }
    if (response.status === 400) {
      setErrorMessage("Incorrect code");
      setReset(true);
      setTimeout(() => {
        setReset(false);
      });
    }
  };

  const handleOtp = async (data) => {
    setIsOtp(data);

    const response = await backendAPI.setupOtp({ active: data });
    if (response == null) {
      setErrorMessage("Error on updating data");
    }

    if (response.status === 200) {
      console.log(response.status, "status");
      console.log(isOtp, "statusOtp");
      setUser({ ...user, hasOtp: true.toString() });
      setInfoMessage("Settings updated successfully!");
    }
  };

  return (
    <div className={styles.tabContent}>
      <MessageComponent />

      <TopInfo
        title={instruction[active].title}
        description={instruction[active].description}
      />

      <Switcher
        title={"One-time passwords via email"}
        checked={isOtp}
        setChecked={handleOtp}
      />

      <Switcher
        title={"Time-based one-time password"}
        checked={isTotp}
        setChecked={handleTotpSecretKey}
      />

      {open && secretToken && (
        <ModalOverlay>
          <div className={styles.modalTitle}>
            {t("security.scanModal.TOTPTitle")}
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
                  <div className={styles.tooltip}>
                    {t("security.scanModal.copyLink")}
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
              <Buttons
                buttons={[t("general.close"), t("general.verify")]}
                functions={[
                  () => {
                    setOpen(!open);
                    setIsTotp(!isTotp);
                  },
                  () => {
                    setVerify(true);
                  },
                ]}
              />
            </div>
          ) : (
            <div>
              <div className={styles.modalSubtitle}>
                {" "}
                {t("security.scanModal.TOTPDescription")}
              </div>
              <MessageComponent />

              <OneTimeCodeInput
                setOTPCode={setCode}
                resetCodeFlag={reset}
                request={() => {
                  handleTotpVerify(email.current, code, false);
                }}
              />
              <Buttons
                buttons={["Close", "Verify"]}
                functions={[
                  () => {
                    setOpen(!open);
                    setIsTotp(!isTotp);
                  },
                  () => {
                    handleTotpVerify(email.current, code, false);
                  },
                ]}
              />
            </div>
          )}
        </ModalOverlay>
      )}
    </div>
  );
};
