import Button from "../button/button";
import styles from "./settingsTitle.module.css";

import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";
import ProfileImage from "../../../assets/icon/user.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../popup/popup";
import { SearchOptions } from "../../../components/input/input";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import Options from "../options/options";
import { MessageContext } from "../../../context/message";
import { countryList } from "../../../constants";

const langOptions = [
  { value: "en", label: "English" },
  { value: "uk", label: "Українська" },
  { value: "de", label: "Deutsch" },
];

const translateCountry = (country) => {
  const { t } = useTranslation();
  let c = "";
  countryList?.length &&
    countryList?.forEach(({ value, display }) => {
      if (value == country) {
        c = display;
        return;
      }
    });
  return t(c);
};

const SettingsItem = ({ data, setIsSaveData }) => {
  const [show, setShow] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [label, setLabel] = useState(null);
  const [file, setFile] = useState(null);

  const { t } = useTranslation();

  const { setErrorMessage, setInfoMessage } = useContext(MessageContext);

  useEffect(() => {
    if (data.popup === "language") {
      const labelOption = langOptions.find(
        (option) => option.value === data.value,
      );
      if (labelOption?.label) {
        setLabel(labelOption?.label);
      }
    }
  }, [data]);

  const handleEdit = () => {
    setShow(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.value);
    setInfoMessage(t("profile.affiliate") + " " + t("general.copied"));
  };

  const handleSelect = () => {
    setSelectDialogOpen(true);
  };

  const handleChangeImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        // const imageURL = URL.createObjectURL(selectedFile);

        // data.setValue(imageURL);
        setCropDialogOpen(true);
        setFile(selectedFile);
        // data.setImageChanged(true);
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
            ) : data.type === "copy" ? (
              <CopyType text={data.value} />
            ) : data.type === "image" ? (
              <ImageType value={data.value} />
            ) : data.type === "enable" ? (
              <EnableType value={data.value} />
            ) : data.type === "select" ? (
              <SelectType value={data.value} />
            ) : (
              ""
            )}
          </div>
          <Button
            color="gray"
            fontSize="1rem"
            width="10rem"
            onClick={
              data.type === "edit"
                ? () => handleEdit()
                : data.type === "copy"
                ? () => handleCopy()
                : data.type === "image"
                ? () => handleChangeImage()
                : data.type === "enable"
                ? () => handleEnable()
                : data.type === "select"
                ? () => handleSelect()
                : ""
            }
          >
            {data.type === "edit"
              ? `${t("security.actions.edit")}`
              : data.type === "copy"
              ? `${t("general.copy")}`
              : data.type === "image"
              ? `${t("security.actions.change")}`
              : data.type === "enable"
              ? data.value
                ? `${t("security.actions.disable")}`
                : `${t("security.actions.enable")}`
              : data.type === "select"
              ? `${t("security.actions.select")}`
              : ""}
          </Button>
          {data.type === "edit" && (
            <EditPopup
              show={show}
              value={data.popup === "language" ? label : data.value}
              setValue={(editValue) => handleData(editValue)}
              setShow={setShow}
              type={data.type}
              popup={data.popup}
            />
          )}
          {data.type === "select" && (
            <SelectPopup
              selectDialogOpen={selectDialogOpen}
              setSelectDialogOpen={setSelectDialogOpen}
              value={data.value}
              setValue={(selectedValue) => handleData(selectedValue)}
            />
          )}
        </div>
        <EditPopup
          show={show}
          label={data.label}
          value={data.popup === "language" ? label : data.value}
          setValue={(editValue) => handleData(editValue)}
          setShow={setShow}
          type={data.type}
          popup={data.popup}
        />
      </div>

      {data.type === "image" && (
        <CropDialog
          open={cropDialogOpen}
          file={file}
          aspect={1}
          onClose={() => {
            setCropDialogOpen(false);
          }}
          onSave={(croppedImageData) => {
            setCropDialogOpen(false);
            if (!croppedImageData) return;
            data.setFile(dataURLtoFile(croppedImageData, file.name));
            data.setValue(croppedImageData);
            data.setImageChanged(true);
            setIsSaveData(true);
          }}
        />
      )}
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
  const { t } = useTranslation();
  return (
    <div className={styles.enableWrapper}>
      <img className={styles.enableIcon} src={value ? Correct : Fail} alt="" />

      <div className={styles.text}>
        {value ? t("profile.action.turnOn") : t("profile.action.turnOff")}
      </div>
    </div>
  );
};

export const EditPopup = ({
  title = "Change Value",
  show,
  setShow,
  value,
  setValue,
  type,
  popup,
  label,
}) => {
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
      cancelTitle={t("general.cancel")}
      confirmTitle={t("general.confirm")}
      title={label}
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

export const SelectType = ({ value }) => {
  return <div className={styles.value}> {translateCountry(value)} </div>;
};

export const SelectPopup = ({
  selectDialogOpen,
  setSelectDialogOpen,
  value,
  setValue,
  id,
}) => {
  const { t } = useTranslation();
  const [CountryOption, setCountryOption] = useState(translateCountry(value));

  return (
    <Popup
      show={selectDialogOpen}
      title={t("profile.action.selectCountry")}
      cancelTitle={t("general.cancel")}
      confirmTitle={t("general.confirm")}
      onConfirm={() => {
        setValue(CountryOption);
        setSelectDialogOpen(false);
      }}
      onClose={() => setSelectDialogOpen(false)}
    >
      <SearchOptions
        value={translateCountry(value)}
        setValue={setCountryOption}
        options={
          countryList?.length &&
          countryList?.map(({ value, display }) => {
            return { value, display: t(display) };
          })
        }
        placeholder={t("signUp.option1Placeholder")}
        className="countryOption"
      />
    </Popup>
  );
};

const CopyType = ({ text }) => {
  return <span className={styles.text}>{text}</span>;
};
