import React, { useState } from "react";
import { Button, Flex, Input, Select, Typography } from "antd";
import ProfileImage from "../../../../assets/newDashboardIcons/user.png";
import UploadIcon from "../../../../assets/newDashboardIcons/upload.svg";
import deleteIcon from "../../../../assets/newDashboardIcons/delete-red.svg";
import { getFlagLink } from "../../../../countries";
import { useTranslation } from "react-i18next";
import "./profileSection.css";
import NotificationSection from "./notificationSection";
import ChangeEmailModal from "./changeEmailModal";

const countries = [
  {
    title: "USA",
    value: "usa",
    icon: "US",
  },
  {
    title: "Ukraine",
    value: "ukraine",
    icon: "UA",
  },
  {
    title: "Pakistan",
    value: "pak",
    icon: "PK",
  },
  {
    title: "Germany",
    value: "germany",
    icon: "DE",
  },
];

const ProfileSection = () => {
  const { t } = useTranslation();
  const { Text } = Typography;
  const [emailModal, setEmailModal] = useState(false);
  const profile_options = [
    {
      title: "Name",
      value: "Mykola Kisl",
      actionItem: <Button className="default-text-gray">Change</Button>,
    },
    {
      title: "Email",
      value: "mykolakisl@gmail.com",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setEmailModal(true)}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Phone",
      value: "+38(066)111-59-21",
      actionItem: <Button className="default-text-gray">Change</Button>,
    },
    {
      title: "Country",
      actionItem: (
        <Select
          className="country-select-field"
          defaultValue={"usa"}
          options={countries?.map((country) => ({
            value: country?.value,
            label: (
              <Flex align="center" gap={6}>
                <img
                  src={getFlagLink(country?.icon)}
                  alt="flag"
                  className="profile-country-icon"
                />
                <Text>{t(country?.title)}</Text>
              </Flex>
            ),
          }))}
        />
      ),
    },
    {
      title: "Business",
      value: "Meta",
      actionItem: <Button className="business-save-button">Save</Button>,
    },
  ];
  return (
    <>
      {emailModal && (
        <ChangeEmailModal
          open={emailModal}
          onClose={() => setEmailModal(false)}
        />
      )}
      <div>
        <Flex vertical gap={32} className="personal-profile-detail">
          <Flex align="center" justify="space-between">
            <div>
              <div className="default-text profile-photo-title">Your Photo</div>
              <div className="default-text-gray">
                This will be displayed on your profile
              </div>
            </div>
            <Flex align="center" gap={24}>
              <img src={ProfileImage} className="user-profile-image" />
              <Flex align="center" gap={8}>
                <Button
                  icon={<img src={UploadIcon} />}
                  className="default-text-gray profile-image-upload"
                >
                  Upload New Picture
                </Button>
                <Button
                  icon={<img src={deleteIcon} />}
                  className="default-text-gray delete-picture-button"
                >
                  Delete Picture
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex vertical gap={32} className="profile-options-container">
            {profile_options?.map((data, index) => (
              <Flex align="center" justify="space-between" gap={8} key={index}>
                <div>
                  <Text className="default-text profile-option-title">
                    {data?.title}
                  </Text>
                  {index === profile_options?.length - 1 && (
                    <div className="default-text-gray profile-option-subtitle">
                      If you have business, please enter your business name here
                    </div>
                  )}
                </div>

                {index === profile_options?.length - 1 ? (
                  <Flex
                    align="center"
                    justify="space-between"
                    gap={16}
                    className="profile-option-subcontainer business-option-container"
                  >
                    <Input
                      className="business-input-field"
                      defaultValue={data?.value}
                    />
                    {data?.actionItem}
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    justify="start"
                    gap={16}
                    className="profile-option-subcontainer"
                  >
                    {" "}
                    {data?.value && (
                      <Text className="default-text-gray profile-option-value">
                        {data?.value}
                      </Text>
                    )}
                    {data?.actionItem}
                  </Flex>
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
        <NotificationSection />
      </div>
    </>
  );
};

export default ProfileSection;
