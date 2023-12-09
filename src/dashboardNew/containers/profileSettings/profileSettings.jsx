import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [business, setBusiness] = useState(localStorage.getItem("business"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber"),
  );
  const [country, setCountry] = useState(localStorage.getItem("country"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [imageName, setImageName] = useState(null);
  const [marketingUpdates, setMarketingUpdates] = useState(
    localStorage.getItem("marketingUpdates") === "true",
  );
  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem("emailNotifications") === "true",
  );
  const [appNotifications, setAppNotifications] = useState(
    localStorage.getItem("appNotifications") === "true",
  );
  const [notificationLanguage, setNotificationLanguage] = useState(
    localStorage.getItem("notificationLanguage"),
  );
  const [enableInvoicing, setEnableInvoicing] = useState(
    localStorage.getItem("enableInvoicing") === "true",
  );
  const [isSaveData, setIsSaveData] = useState(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const { t } = useTranslation();

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();
  const navigate = useNavigate();

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
      enableInvoicing,
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
    {
      label: `${t("profile.enableInvoicing")}`,
      description: `${t("profile.enableInvoicingDescription")}`,
      value: enableInvoicing,
      setValue: setEnableInvoicing,
      type: "enable",
    },
  ];

  useEffect(() => {
    const profilePic = localStorage.getItem("profile_pic");
    if (profilePic !== "null") setImageName(profilePic);
  }, []);

  return (
    <Card className={styles.card}>
      <SettingsTitle
        title={t("profile.title")}
        description={t("profile.description")}
      />

      {data.map((item) => (
        <SettingsItem data={item} setIsSaveData={setIsSaveData} />
      ))}

      {/*
      <div
        className={styles.button}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="light">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
	  */}
    </Card>
  );
};

export default ProfileSettings;
