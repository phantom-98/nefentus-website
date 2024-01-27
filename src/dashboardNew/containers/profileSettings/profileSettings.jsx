import { useContext, useEffect, useState } from "react";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [business, setBusiness] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [imageName, setImageName] = useState(null);
  const [marketingUpdates, setMarketingUpdates] = useState("");
  const [emailNotifications, setEmailNotifications] = useState("");
  const [appNotifications, setAppNotifications] = useState("");
  const [notificationLanguage, setNotificationLanguage] = useState("");

  const [isSaveData, setIsSaveData] = useState(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const { t } = useTranslation();

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const data = await backendAPI.getProfile();
    setFirstName(data["firstName"]);
    setLastName(data["lastName"]);
    setBusiness(data["business"]);
    setPhoneNumber(data["phoneNumber"]);
    setCountry(data["country"]);
    setEmail(data["email"]);
    setImageName(data["imgData"]);
    setMarketingUpdates(data["marketingUpdates"]);
    setEmailNotifications(data["emailNotifications"]);
    setAppNotifications(data["appNotifications"]);
    setNotificationLanguage(data["notificationLanguage"]);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const updateUser = async () => {
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
    }

    if (response !== null) {
      setInfoMessage(t("messages.success.updateSettings"));
    }

    setIsSaveData(false);
  };

  const uploadAvatar = async () => {
    if (imageChanged) {
      let resp2;
      if (file) {
        resp2 = await backendAPI.uploadFile(file);
      } else {
        resp2 = await backendAPI.deleteProfileImage(file);
      }
      if (resp2 == null) {
        setErrorMessage(t("messages.error.uploadPicture"));
      }
      setImageChanged(false);
      setIsSaveData(false);
    }
  };

  useEffect(() => {
    console.log("avatar upload", imageChanged);
    if (isSaveData) {
      if (!imageChanged) updateUser();
      else uploadAvatar();
    }
  }, [isSaveData]);

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
      label: `${t("profile.business").concat("*")}`,
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
      label: `${t("profile.phoneNumber").concat("*")}`,
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
      description: `${t("profile.avatarDescription").concat("*")}`,
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

  // useEffect(() => {
  //   const profilePic = localStorage.getItem("profile_pic");
  //   if (profilePic !== "null") setImageName(profilePic);
  // }, []);

  return (
    <Card className={styles.card}>
      <SettingsTitle
        title={t("profile.title")}
        description={t("profile.description")}
      />

      {data.map((item) => (
        <SettingsItem data={item} setIsSaveData={setIsSaveData} />
      ))}
    </Card>
  );
};

export default ProfileSettings;
