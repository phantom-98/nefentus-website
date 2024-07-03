import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Flex, Input, Select, Typography } from "antd";
import ProfileImage from "../../../../assets/newDashboardIcons/user.png";
import UploadIcon from "../../../../assets/newDashboardIcons/upload.svg";
import deleteIcon from "../../../../assets/newDashboardIcons/delete-red.svg";
import ProfileImg from "../../../../assets/icon/user.svg";
import EmailIcon from "../../../../assets/newDashboardIcons/email.svg";
import { getCountryList, getFlagLink } from "../../../../countries";
import { useTranslation } from "react-i18next";
import NotificationSection from "./notificationSection";
import ChangeFieldModal from "./changeFieldModal";
import backend_API from "../../../../api/backendAPI";
import "./profileSection.css";
import { countryList, updatedCountries } from "../../../../constants";
import CropDialog, {
  dataURLtoFile,
} from "../../../../components/cropDialog/cropDialog";
import { MessageContext } from "../../../../context/message";
import { validateEmail, validatePhoneNumber } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const { t } = useTranslation();
  const { Text } = Typography;
  const backendAPI = new backend_API();
  const navigate = useNavigate();
  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);
  const [fieldModal, setFieldModal] = useState("");
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [cropFile, setCropFile] = useState({});
  const [user, setUser] = useState({});
  const [selectedField, setSelectedField] = useState("");
  const [countries] = useState(
    updatedCountries?.map((country) => ({
      label: t(country?.display),
      value: country?.value,
      icon: country?.symbol,
    })),
  );
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (file) uploadAvatar();
  }, [file]);

  const profile_options = [
    {
      title: "First Name",
      key: "firstName",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setSelectedField("firstName")}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Last Name",
      key: "lastName",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setSelectedField("lastName")}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Email",
      key: "email",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setSelectedField("email")}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Phone",
      key: "phoneNumber",
      value: "+38(066)111-59-21",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setSelectedField("phoneNumber")}
        >
          Change
        </Button>
      ),
    },
    {
      title: "Country",
      actionItem: (
        <Select
          showSearch
          value={user?.country}
          className="country-select-field"
          options={countries?.map((countryData) => ({
            label: (
              <Flex align="center" gap={6}>
                <img src={getFlagLink(countryData?.icon)} width={22} />
                <div>{countryData?.label}</div>
              </Flex>
            ),
            value: countryData?.value,
          }))}
          virtual={false}
          onChange={(value) => {
            setUser({ ...user, country: value });
            updateUser({ ...user, country: value });
          }}
        />
      ),
    },
    {
      title: "Business",
      key: "business",
      actionItem: (
        <Button
          className="default-text-gray"
          onClick={() => setSelectedField("business")}
        >
          Change
        </Button>
      ),
    },
  ];

  const fetchUser = async () => {
    const data = await backendAPI.getProfile();
    if (data) setUser(data);
  };

  const handleChangeImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setCropFile(selectedFile);
        setCropDialogOpen(true);
      }
    });
  };

  const uploadAvatar = async () => {
    let resp2;
    if (file) {
      resp2 = await backendAPI.uploadFile(file);
    } else {
      resp2 = await backendAPI.deleteProfileImage(file);
    }
    setUser({ ...user, profileImage: file ? resp2 : null });
    if (resp2 == null) {
      setErrorMessage(t("messages.error.uploadPicture"));
    } else {
      setInfoMessage(t("messages.success.updatePicture"));
    }
    setFile(null);
  };

  const updateUser = async (userData = user) => {
    if (!validateEmail(userData?.email)) {
      setErrorMessage(t("messages.error.invalidMail"));
      return;
    }
    if (userData?.phoneNumber && !validatePhoneNumber(userData?.phoneNumber)) {
      setErrorMessage(t("messages.error.invalidPhone"));
      return;
    }
    const requestData = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
      email: userData?.email,
      country: userData?.country,
      business: userData?.business || "",
      marketingUpdates: userData?.marketingUpdates,
      emailNotifications: userData?.emailNotifications,
      appNotifications: userData?.appNotifications,
      notificationLanguage: userData?.notificationLanguage,
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
        setErrorMessage(t("messages.error.updateData"));
        await backendAPI.signout();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      fetchUser();
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
    fetchUser();
    setFieldModal("");
  };

  const onUserChange = (value, key) => {
    setUser({ ...user, [key]: value });
    updateUser({ ...user, [key]: value });
  };

  return (
    <>
      {fieldModal && (
        <ChangeFieldModal
          open={fieldModal?.length > 0}
          onClose={() => setFieldModal("")}
          keyField={fieldModal}
          autoFilledValue={user[fieldModal]}
          onSubmit={(value) => {
            updateUser({ ...user, [fieldModal]: value });
          }}
        />
      )}
      {cropDialogOpen && (
        <CropDialog
          open={cropDialogOpen}
          file={cropFile}
          aspect={1}
          onClose={() => {
            setCropDialogOpen(false);
          }}
          onSave={(croppedImageData) => {
            setCropDialogOpen(false);
            if (!croppedImageData) return;
            setFile(dataURLtoFile(croppedImageData, cropFile.name));
          }}
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
              <Avatar
                shape="circle"
                size={54}
                icon={
                  user?.profileImage ? (
                    <img src={user?.profileImage} width={54} />
                  ) : (
                    <img src={ProfileImg} width={54} />
                  )
                }
              />
              <Flex align="center" gap={8}>
                <Button
                  icon={<img src={UploadIcon} />}
                  className="default-text-gray profile-image-upload"
                  onClick={() => handleChangeImage()}
                >
                  Upload New Picture
                </Button>
                <Button
                  icon={<img src={deleteIcon} />}
                  className="default-text-gray delete-picture-button"
                  onClick={() => uploadAvatar()}
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

                {selectedField == data?.key ? (
                  <Flex
                    align="center"
                    justify="space-between"
                    gap={16}
                    className="profile-option-subcontainer business-option-container"
                  >
                    <Input
                      className="business-input-field"
                      value={user[selectedField]}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          [selectedField]: e.target.value,
                        })
                      }
                    />
                    <Button
                      className="business-save-button"
                      onClick={() => {
                        setSelectedField("");
                        updateUser(user);
                      }}
                    >
                      Save
                    </Button>
                  </Flex>
                ) : (
                  <Flex
                    align="center"
                    justify="start"
                    gap={16}
                    className="profile-option-subcontainer"
                  >
                    {user[data?.key] ? (
                      <Text className="default-text-gray profile-option-value">
                        {user[data?.key]}
                      </Text>
                    ) : (
                      data?.title != "Country" && (
                        <div className="default-text-gray profile-option-value"></div>
                      )
                    )}
                    {data?.actionItem}
                  </Flex>
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
        <NotificationSection user={user} onSubmit={onUserChange} />
      </div>
    </>
  );
};

export default ProfileSection;
