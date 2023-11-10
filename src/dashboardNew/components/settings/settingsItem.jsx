import Button from "../button/button";
import styles from "./settingsTitle.module.css";

import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";

import { useEffect, useState } from "react";
import Popup from "../popup/popup";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";

const SettingsItem = ({ data, setIsSaveData }) => {
  const [show, setShow] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);

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
  };

  const handleData = (dataValue) => {
    data.setValue(dataValue);
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
              <EditType value={data.value} type={data.type} />
            ) : data.type === "image" ? (
              <ImageType value={data.value} />
            ) : data.type === "enable" ? (
              <EnableType value={data.value} />
            ) : (
              ""
            )}
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
                ? "Edit"
                : data.type === "image"
                ? "Change"
                : data.type === "enable"
                ? "Enable"
                : ""}
            </Button>
          </div>
          <EditPopup
            show={show}
            value={data.value}
            setValue={(editValue) => handleData(editValue)}
            setShow={setShow}
            type={data.type}
            popup={data.popup}
          />
        </div>
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
      <img src={value} alt="" />
    </div>
  );
};

const EnableType = ({ value }) => {
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>{value ? "On" : "Off"}</div>
    </div>
  );
};

export const EditPopup = ({
  show,
  setShow,
  value,
  setValue,
  type,
  popup,
  id,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    setValue(inputValue);
  };

  return (
    <Popup show={show} setShow={setShow} onClick={handleConfirmClick}>
      {popup === "language" ? (
        <select id="language" className={styles.input} onChange={handleChange}>
          <option value="English">English</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="German">German</option>
        </select>
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
