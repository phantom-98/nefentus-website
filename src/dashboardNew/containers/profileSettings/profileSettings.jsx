import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";
import backend_API from "../../../api/backendAPI";
import { MessageContext } from "../../../context/message";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [business, setBusiness] = useState(localStorage.getItem("business"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber"),
  );
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [imageName, setImageName] = useState(null);
  const [marketingUpdates, setMarketingUpdates] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [notificationLanguage, setNotificationLanguage] = useState(false);
  const [enableInvoicing, setEnableInvoicing] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  const backendAPI = new backend_API();

  const updateUser = async () => {
    const requestData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      business: business || "",
    };

    const response = await backendAPI.update(requestData);
    if (response == null) {
      setErrorMessage("Error on updating data");
      await backendAPI.signout();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    if (response !== null) {
      setInfoMessage("Settings updated successfully!");
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
        setErrorMessage("Error on uploading the profile picture");
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
      label: "First name*",
      description: "",
      value: firstName,
      setValue: setFirstName,
      type: "edit",
    },
    {
      label: "Last name*",
      description: "",
      value: lastName,
      setValue: setLastName,
      type: "edit",
    },
    {
      label: "Business",
      description:
        "If you are a business, please enter your business name here.",
      value: business,
      setValue: setBusiness,
      type: "edit",
    },
    {
      label: "Email*",
      description: "",
      value: email,
      setValue: setEmail,
      type: "edit",
    },
    {
      label: "Phone number",
      description: "",
      value: phoneNumber,
      setValue: setPhoneNumber,
      type: "edit",
    },
    {
      label: "Avatar",
      description: "Select an avatar to personalize your account. ",
      value: imageName,
      setValue: setImageName,
      type: "image",
      file: file,
      setFile: setFile,
      imageChanged: imageChanged,
      setImageChanged: setImageChanged,
    },
    {
      label: "Marketing updates",
      description:
        "Receive marketing updates via email, push notifications (in the mobile app) and inbox notifications (in the web application).",
      value: marketingUpdates,
      setValue: setMarketingUpdates,
      type: "enable",
    },
    {
      label: "Email notifications",
      description: "Receive notifications via email.",
      value: emailNotification,
      setValue: setEmailNotification,
      type: "enable",
    },
    {
      label: "App notifications",
      description:
        "Receive notifications via push notifications (in the mobile app).",
      value: appNotification,
      setValue: setAppNotification,
      type: "enable",
    },
    {
      label: "Notification language",
      description:
        "Select your preferred language for email, app push and on-site inbox notifications.",
      value: notificationLanguage,
      setValue: setNotificationLanguage,
      popup: "language",
      type: "edit",
    },
    {
      label: "Enable invoicing",
      description:
        "Receive invoices for each product sold for your accounting. ",
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
        title="User Profile"
        description="Update your personal information and notification settings"
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
