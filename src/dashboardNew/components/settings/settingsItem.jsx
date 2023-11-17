import Button from "../button/button";
import styles from "./settingsTitle.module.css";

import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";
import ProfileImage from "../../../assets/icon/user.svg";

import { useEffect, useState } from "react";
import Popup from "../popup/popup";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import Options from "../options/options";
import { useTranslation } from "react-i18next";

const langOptions = [
  { value: "en", label: "English" },
  { value: "uk", label: "Ukrainian" },
  { value: "de", label: "German" },
];

const SettingsItem = ({ data, setIsSaveData }) => {
  const [show, setShow] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [label, setLabel] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (data.popup === "language") {
      const labelOption = langOptions.find(
        (option) => option.value === data.value,
      );
      if (labelOption?.label) {
        setLabel(labelOption?.label);
      }
    }
  }, []);

  const handleEdit = () => {
    setShow(true);
  };

  const handleChangeImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const imageURL = URL.createObjectURL(selectedFile);

        data.setValue(imageURL);
        setCropDialogOpen(true);
        data.setFile(selectedFile);
        data.setImageChanged(true);
      }
    });
  };

  const handleEnable = () => {
    data.setValue((prev) => !prev);
    setIsSaveData(true);
  };

  const handleData = (dataValue) => {
    if (data.popup === "language") {
      const labelOption = langOptions.find(
        (option) => option.label === dataValue,
      );
      if (labelOption?.value) {
        data.setValue(labelOption?.value);
        setLabel(dataValue);
      }
    } else {
      data.setValue(dataValue);
    }
    setIsSaveData(true);
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
            {data.type === "edit" ? (
              <EditType
                value={data.popup === "language" ? label : data.value}
                type={data.type}
              />
            ) : data.type === "image" ? (
              <ImageType value={data.value} />
            ) : data.type === "enable" ? (
              <EnableType value={data.value} />
            ) : (
              ""
            )}
          </div>
          <Button
            color="gray"
            onClick={
              data.type === "edit"
                ? () => handleEdit()
                : data.type === "image"
                ? () => handleChangeImage()
                : data.type === "enable"
                ? () => handleEnable()
                : ""
            }
          >
            {data.type === "edit"
              ? `${t("security.actions.edit")}`
              : data.type === "image"
              ? `${t("security.actions.change")}`
              : data.type === "enable"
              ? `${t("security.actions.enable")}`
              : ""}
          </Button>
        </div>
        <EditPopup
          show={show}
          value={data.popup === "language" ? label : data.value}
          setValue={(editValue) => handleData(editValue)}
          setShow={setShow}
          type={data.type}
          popup={data.popup}
        />
      </div>

      <CropDialog
        open={cropDialogOpen}
        file={data.file}
        aspect={1}
        onClose={() => setCropDialogOpen(false)}
        onSave={(croppedImageData) => {
          setCropDialogOpen(false);
          data.setFile(dataURLtoFile(croppedImageData, data.file.name));
          data.setValue(croppedImageData);
          setIsSaveData(true);
        }}
      />
    </>
  );
};

export default SettingsItem;

const EditType = ({ value, type }) => {
  return <div className={styles.value}>{type === "password" ? "" : value}</div>;
};

const ImageType = ({ value }) => {
  return (
    <div className={styles.imageWrapper}>
      <img src={value ? value : ProfileImage} alt="" />
    </div>
  );
};

export const EnableType = ({ value }) => {
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>{value ? "On" : "Off"}</div>
    </div>
  );
};

export const EditPopup = ({ show, setShow, value, setValue, type, popup }) => {
  const [inputValue, setInputValue] = useState(value);
  const { t } = useTranslation();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    setValue(inputValue);
    setShow(false);
  };

  return (
    <Popup
      show={show}
      title={t("settingsItem.title")}
      onConfirm={handleConfirmClick}
      onClose={() => setShow(false)}
    >
      {popup === "language" ? (
        <Options
          options={langOptions.map((op) => op.label)}
          value={value}
          setValue={setValue}
        />
      ) : (
        <input
          value={inputValue}
          type={type}
          className={styles.input}
          onChange={handleChange}
        />
      )}
    </Popup>
  );
};
