import { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MessageComponent from "../../../components/message";
import { useAuth } from "../../../context/auth/authContext";
import { encodeConstructorParamsForImplementation } from "@thirdweb-dev/sdk";
import { validateEmail, validatePhoneNumber } from "../../../utils";

const ProfileSettings = () => {
  const { user, setUser, setAvatarUrl } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [business, setBusiness] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("unknown");
  const [email, setEmail] = useState("");
  const [imageName, setImageName] = useState(null);
  const [marketingUpdates, setMarketingUpdates] = useState("");
  const [emailNotifications, setEmailNotifications] = useState("");
  const [appNotifications, setAppNotifications] = useState("");
  const [notificationLanguage, setNotificationLanguage] = useState("en");

  const isDataSave = useRef(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const { t } = useTranslation();

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const data = await backendAPI.getProfile();
    setUser({ ...data });
    setUserProfile(data);
    setFirstName(data["firstName"]);
    setLastName(data["lastName"]);
    setBusiness(data["business"]);
    setPhoneNumber(data["phoneNumber"]);
    data["country"] && setCountry(data["country"]);
    setEmail(data["email"]);
    setImageName(data["profileImage"] ?? "");
    setMarketingUpdates(data["marketingUpdates"]);
    setEmailNotifications(data["emailNotifications"]);
    setAppNotifications(data["appNotifications"]);
    data["notificationLanguage"] &&
      setNotificationLanguage(data["notificationLanguage"]);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    setAvatarUrl(imageName);
  }, [imageName]);

  const updateUser = async () => {
    if (!validateEmail(email)) {
      isDataSave.current = false;
      setEmail(userProfile["email"]);
      setErrorMessage(t("messages.error.invalidMail"));
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      isDataSave.current = false;
      setPhoneNumber(userProfile["phoneNumber"]);
      setErrorMessage(t("messages.error.invalidPhone"));
      return;
    }
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      country: country,
      business: business || "",
      marketingUpdates,
      emailNotifications,
      appNotifications,
      notificationLanguage,
    };

    const response = await backendAPI.update(requestData);
    if (response == null) {
      setErrorMessage(t("messages.error.updateData"));
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (response.status == 400) {
      const data = await response.json();
      if (data["firstName"]) {
        if (
          data["firstName"] == "First name must be between 2 and 70 characters"
        ) {
          setErrorMessage(t("messages.validation.validFirstName"));
        } else {
          setErrorMessage(t("messages.validation.firstName"));
        }
      } else if (data["lastName"]) {
        if (
          data["lastName"] == "Last name must be between 2 and 70 characters"
        ) {
          setErrorMessage(t("messages.validation.validLastName"));
        } else {
          setErrorMessage(t("messages.validation.lastName"));
        }
      } else if (data["country"]) {
        setErrorMessage(t("messages.error.country"));
      } else if (data["email"]) {
        if (data["email"] == "Email is already used") {
          setErrorMessage(t("messages.error.emailUsed"));
        } else if (data["email"] == "Please enter your email") {
          setErrorMessage(t("messages.validation.email"));
        } else if (
          data["email"] == "Email must be less than or equal to 70 characters"
        ) {
          setErrorMessage(t("messages.validation.lengthEmail"));
        } else if (data["email"] == "Please enter a valid email") {
          setErrorMessage(t("messages.validation.validEmail"));
        }
      } else {
        console.log("response", response);
        setErrorMessage(t("messages.error.updateData"));
        await backendAPI.signout();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      fetchProfile();
    } else if (response.ok) {
      const data = await response.json();
      if (data["email"] != data["contactEmail"]) {
        setInfoMessage(t("messages.success.email"));
        await backendAPI.signout();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setInfoMessage(t("messages.success.updateSettings"));
      }
    } else {
      setErrorMessage(t("messages.error.updateData"));
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    fetchProfile();
    isDataSave.current = false;
  };

  const uploadAvatar = async () => {
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
      isDataSave.current = false;
    }
  };

  const data = [
    {
      label: `${t("profile.firstName").concat("*")}`,
      description: "",
      value: firstName,
      setValue: setFirstName,
      type: "edit",
    },
    {
      label: `${t("profile.lastName").concat("*")}`,
      description: "",
      value: lastName,
      setValue: setLastName,
      type: "edit",
    },
    {
      label: `${t("profile.business")}`,
      description: `${t("profile.businessDescription")}`,
      value: business,
      setValue: setBusiness,
      type: "edit",
    },
    {
      label: `${t("profile.email").concat("*")}`,
      description: "",
      value: email,
      setValue: setEmail,
      type: "edit",
    },
    {
      label: `${t("profile.phoneNumber")}`,
      description: "",
      value: phoneNumber,
      setValue: setPhoneNumber,
      type: "edit",
    },
    {
      label: `${t("profile.country").concat("*")}`,
      description: "",
      value: country,
      setValue: setCountry,
      type: "select",
    },
    {
      label: `${t("profile.avatar")}`,
      description: `${t("profile.avatarDescription")}`,
      value: imageName,
      setValue: setImageName,
      type: "image",
      file: file,
      setFile: setFile,
      imageChanged: imageChanged,
      setImageChanged: setImageChanged,
    },
    {
      label: `${t("profile.marketingUpdates")}`,
      description: `${t("profile.marketingUpdatesDescription")}`,
      value: marketingUpdates,
      setValue: setMarketingUpdates,
      type: "enable",
    },
    {
      label: `${t("profile.emailNotifications")}`,
      description: `${t("profile.emailNotificationsDescription")}`,
      value: emailNotifications,
      setValue: setEmailNotifications,
      type: "enable",
    },
    {
      label: `${t("profile.appNotifications")}`,
      description: `${t("profile.appNotificationsDescription")}`,
      value: appNotifications,
      setValue: setAppNotifications,
      type: "enable",
    },
    {
      label: `${t("profile.notificationLanguage")}`,
      description: `${t("profile.notificationLanguageDescription")}`,
      value: notificationLanguage,
      setValue: setNotificationLanguage,
      popup: "language",
      type: "edit",
    },
  ];

  useEffect(() => {
    if (isDataSave.current) {
      if (!imageChanged) updateUser();
      else uploadAvatar();
    }
  }, [data, isDataSave]);

  // useEffect(() => {
  //   const profilePic = localStorage.getItem("profile_pic");
  //   if (profilePic !== "null") setImageName(profilePic);
  // }, []);

  return (
    <>
      <MessageComponent />
      <Card className={styles.card}>
        <SettingsTitle
          title={t("profile.title")}
          description={t("profile.description")}
        />

        {data.map((item) => (
          <SettingsItem
            data={item}
            setIsSaveData={(toggle) => (isDataSave.current = toggle)}
          />
        ))}
      </Card>
    </>
  );
};

export default ProfileSettings;
