import Button from "../../components/button/button";
import Card from "../../components/card/card";
import SettingsItem from "../../components/settings/settingsItem";
import SettingsTitle from "../../components/settings/settingsTitle";

import styles from "./profileSettings.module.css";

const data = [
  {
    list: [
      {
        label: "First name*",
        description: "",
        value: "Erin",
      },
      {
        label: "Last name*",
        description: "",
        value: "Vaccaro",
      },
      {
        label: "Business",
        description:
          "If you are a business, please enter your business name here.",
        value: "",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Email*",
        description: "",
        value: "er**@gmail.com",
      },
      {
        label: "Phone number",
        description: "",
        value: "+38162**80",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Avatar",
        description: "Select an avatar to personalize your account. ",
        value:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3161&q=80",
      },
    ],
    type: "image",
  },
  {
    list: [
      {
        label: "Marketing updates",
        description:
          "Receive marketing updates via email, push notifications (in the mobile app) and inbox notifications (in the web application).",
        value: false,
      },
      {
        label: "Email notifications",
        description: "Receive notifications via email.",
        value: true,
      },
      {
        label: "App notifications",
        description:
          "Receive notifications via push notifications (in the mobile app).",
        value: false,
      },
    ],
    type: "enable",
  },
  {
    list: [
      {
        label: "Notification language",
        description:
          "Select your preferred language for email, app push and on-site inbox notifications.",
        value: "English",
        popup: "language",
      },
    ],
    type: "edit",
  },
  {
    list: [
      {
        label: "Enable invoicing",
        description:
          "Receive invoices for each product sold for your accounting. ",
        value: false,
      },
    ],
    type: "enable",
  },
];

const ProfileSettings = () => {
  return (
    <Card className={styles.card}>
      <SettingsTitle
        title="User Profile"
        description="Update your personal information and notification settings"
      />

      {data.map((item) => (
        <SettingsItem data={item} />
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
