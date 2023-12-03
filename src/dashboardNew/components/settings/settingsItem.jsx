import Button from "../button/button";
import styles from "./settingsTitle.module.css";

import Fail from "../../../assets/icon/fail.svg";
import Correct from "../../../assets/icon/correct.svg";
import ProfileImage from "../../../assets/icon/user.svg";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../popup/popup";
import { SearchOptions } from "../../../components/input/input";
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
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
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

  console.log(data.type);

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
            ) : data.type === "select" ? (
              <SelectType value={data.value} />
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
                : data.type === "select"
                ? () => handleSelect()
                : ""
            }
          >
            {data.type === "edit"
              ? `${t("security.actions.edit")}`
              : data.type === "image"
              ? `${t("security.actions.change")}`
              : data.type === "enable"
              ? `${t("security.actions.enable")}`
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
  return <div className={styles.value}> {value} </div>;
};

export const SelectPopup = ({
  selectDialogOpen,
  setSelectDialogOpen,
  value,
  setValue,
  id,
}) => {
  const { t } = useTranslation();
  const country_list = [
    { value: "Afghanistan", display: t("countries.Afghanistan") },
    { value: "Albania", display: t("countries.Albania") },
    { value: "Algeria", display: t("countries.Algeria") },
    { value: "Andorra", display: t("countries.Andorra") },
    { value: "Angola", display: t("countries.Angola") },
    { value: "Anguilla", display: t("countries.Anguilla") },
    { value: "Antigua & Barbuda", display: t("countries.AntiguaBarbuda") },
    { value: "Argentina", display: t("countries.Argentina") },
    { value: "Armenia", display: t("countries.Armenia") },
    { value: "Aruba", display: t("countries.Aruba") },
    { value: "Australia", display: t("countries.Australia") },
    { value: "Austria", display: t("countries.Austria") },
    { value: "Azerbaijan", display: t("countries.Azerbaijan") },
    { value: "Bahamas", display: t("countries.Bahamas") },
    { value: "Bahrain", display: t("countries.Bahrain") },
    { value: "Bangladesh", display: t("countries.Bangladesh") },
    { value: "Barbados", display: t("countries.Barbados") },
    { value: "Belarus", display: t("countries.Belarus") },
    { value: "Belgium", display: t("countries.Belgium") },
    { value: "Belize", display: t("countries.Belize") },
    { value: "Benin", display: t("countries.Benin") },
    { value: "Bermuda", display: t("countries.Bermuda") },
    { value: "Bhutan", display: t("countries.Bhutan") },
    { value: "Bolivia", display: t("countries.Bolivia") },
    {
      value: "Bosnia & Herzegovina",
      display: t("countries.BosniaHerzegovina"),
    },
    { value: "Botswana", display: t("countries.Botswana") },
    { value: "Brazil", display: t("countries.Brazil") },
    {
      value: "British Virgin Islands",
      display: t("countries.BritishVirginIslands"),
    },
    { value: "Brunei", display: t("countries.Brunei") },
    { value: "Bulgaria", display: t("countries.Bulgaria") },
    { value: "Burkina Faso", display: t("countries.BurkinaFaso") },
    { value: "Burundi", display: t("countries.Burundi") },
    { value: "Cambodia", display: t("countries.Cambodia") },
    { value: "Cameroon", display: t("countries.Cameroon") },
    { value: "Cape Verde", display: t("countries.CapeVerde") },
    { value: "Cayman Islands", display: t("countries.CaymanIslands") },
    { value: "Chad", display: t("countries.Chad") },
    { value: "Chile", display: t("countries.Chile") },
    { value: "China", display: t("countries.China") },
    { value: "Colombia", display: t("countries.Colombia") },
    { value: "Congo", display: t("countries.Congo") },
    { value: "Cook Islands", display: t("countries.CookIslands") },
    { value: "Costa Rica", display: t("countries.CostaRica") },
    { value: "Cote D'Ivoire", display: t("countries.CoteDIvoire") },
    { value: "Croatia", display: t("countries.Croatia") },
    { value: "Cuba", display: t("countries.Cuba") },
    { value: "Cyprus", display: t("countries.Cyprus") },
    { value: "Czech Republic", display: t("countries.CzechRepublic") },
    { value: "Denmark", display: t("countries.Denmark") },
    { value: "Djibouti", display: t("countries.Djibouti") },
    { value: "Dominica", display: t("countries.Dominica") },
    { value: "Dominican Republic", display: t("countries.DominicanRepublic") },
    { value: "Ecuador", display: t("countries.Ecuador") },
    { value: "Egypt", display: t("countries.Egypt") },
    { value: "El Salvador", display: t("countries.ElSalvador") },
    { value: "Equatorial Guinea", display: t("countries.EquatorialGuinea") },
    { value: "Estonia", display: t("countries.Estonia") },
    { value: "Ethiopia", display: t("countries.Ethiopia") },
    { value: "Falkland Islands", display: t("countries.FalklandIslands") },
    { value: "Faroe Islands", display: t("countries.FaroeIslands") },
    { value: "Fiji", display: t("countries.Fiji") },
    { value: "Finland", display: t("countries.Finland") },
    { value: "France", display: t("countries.France") },
    { value: "French Polynesia", display: t("countries.FrenchPolynesia") },
    { value: "French West Indies", display: t("countries.FrenchWestIndies") },
    { value: "Gabon", display: t("countries.Gabon") },
    { value: "Gambia", display: t("countries.Gambia") },
    { value: "Georgia", display: t("countries.Georgia") },
    { value: "Germany", display: t("countries.Germany") },
    { value: "Ghana", display: t("countries.Ghana") },
    { value: "Gibraltar", display: t("countries.Gibraltar") },
    { value: "Greece", display: t("countries.Greece") },
    { value: "Greenland", display: t("countries.Greenland") },
    { value: "Grenada", display: t("countries.Grenada") },
    { value: "Guam", display: t("countries.Guam") },
    { value: "Guatemala", display: t("countries.Guatemala") },
    { value: "Guernsey", display: t("countries.Guernsey") },
    { value: "Guinea", display: t("countries.Guinea") },
    { value: "Guinea Bissau", display: t("countries.GuineaBissau") },
    { value: "Guyana", display: t("countries.Guyana") },
    { value: "Haiti", display: t("countries.Haiti") },
    { value: "Honduras", display: t("countries.Honduras") },
    { value: "Hong Kong", display: t("countries.HongKong") },
    { value: "Hungary", display: t("countries.Hungary") },
    { value: "Iceland", display: t("countries.Iceland") },
    { value: "India", display: t("countries.India") },
    { value: "Indonesia", display: t("countries.Indonesia") },
    { value: "Iran", display: t("countries.Iran") },
    { value: "Iraq", display: t("countries.Iraq") },
    { value: "Ireland", display: t("countries.Ireland") },
    { value: "Isle of Man", display: t("countries.IsleofMan") },
    { value: "Israel", display: t("countries.Israel") },
    { value: "Italy", display: t("countries.Italy") },
    { value: "Jamaica", display: t("countries.Jamaica") },
    { value: "Japan", display: t("countries.Japan") },
    { value: "Jersey", display: t("countries.Jersey") },
    { value: "Jordan", display: t("countries.Jordan") },
    { value: "Kazakhstan", display: t("countries.Kazakhstan") },
    { value: "Kenya", display: t("countries.Kenya") },
    { value: "Kuwait", display: t("countries.Kuwait") },
    { value: "Kyrgyz Republic", display: t("countries.KyrgyzRepublic") },
    { value: "Laos", display: t("countries.Laos") },
    { value: "Latvia", display: t("countries.Latvia") },
    { value: "Lebanon", display: t("countries.Lebanon") },
    { value: "Lesotho", display: t("countries.Lesotho") },
    { value: "Liberia", display: t("countries.Liberia") },
    { value: "Libya", display: t("countries.Libya") },
    { value: "Liechtenstein", display: t("countries.Liechtenstein") },
    { value: "Lithuania", display: t("countries.Lithuania") },
    { value: "Luxembourg", display: t("countries.Luxembourg") },
    { value: "Macau", display: t("countries.Macau") },
    { value: "Macedonia", display: t("countries.Macedonia") },
    { value: "Madagascar", display: t("countries.Madagascar") },
    { value: "Malawi", display: t("countries.Malawi") },
    { value: "Malaysia", display: t("countries.Malaysia") },
    { value: "Maldives", display: t("countries.Maldives") },
    { value: "Mali", display: t("countries.Mali") },
    { value: "Malta", display: t("countries.Malta") },
    { value: "Mauritania", display: t("countries.Mauritania") },
    { value: "Mauritius", display: t("countries.Mauritius") },
    { value: "Mexico", display: t("countries.Mexico") },
    { value: "Moldova", display: t("countries.Moldova") },
    { value: "Monaco", display: t("countries.Monaco") },
    { value: "Mongolia", display: t("countries.Mongolia") },
    { value: "Montenegro", display: t("countries.Montenegro") },
    { value: "Montserrat", display: t("countries.Montserrat") },
    { value: "Morocco", display: t("countries.Morocco") },
    { value: "Mozambique", display: t("countries.Mozambique") },
    { value: "Namibia", display: t("countries.Namibia") },
    { value: "Nepal", display: t("countries.Nepal") },
    { value: "Netherlands", display: t("countries.Netherlands") },
    {
      value: "Netherlands Antilles",
      display: t("countries.NetherlandsAntilles"),
    },
    { value: "New Caledonia", display: t("countries.NewCaledonia") },
    { value: "New Zealand", display: t("countries.NewZealand") },
    { value: "Nicaragua", display: t("countries.Nicaragua") },
    { value: "Niger", display: t("countries.Niger") },
    { value: "Nigeria", display: t("countries.Nigeria") },
    { value: "Norway", display: t("countries.Norway") },
    { value: "Oman", display: t("countries.Oman") },
    { value: "Pakistan", display: t("countries.Pakistan") },
    { value: "Palestine", display: t("countries.Palestine") },
    { value: "Panama", display: t("countries.Panama") },
    { value: "Papua New Guinea", display: t("countries.PapuaNewGuinea") },
    { value: "Paraguay", display: t("countries.Paraguay") },
    { value: "Peru", display: t("countries.Peru") },
    { value: "Philippines", display: t("countries.Philippines") },
    { value: "Poland", display: t("countries.Poland") },
    { value: "Portugal", display: t("countries.Portugal") },
    { value: "Puerto Rico", display: t("countries.PuertoRico") },
    { value: "Qatar", display: t("countries.Qatar") },
    { value: "Reunion", display: t("countries.Reunion") },
    { value: "Romania", display: t("countries.Romania") },
    { value: "Russia", display: t("countries.Russia") },
    { value: "Rwanda", display: t("countries.Rwanda") },
    {
      value: "Saint Pierre & Miquelon",
      display: t("countries.SaintPierreMiquelon"),
    },
    { value: "Samoa", display: t("countries.Samoa") },
    { value: "San Marino", display: t("countries.SanMarino") },
    { value: "Satellite", display: t("countries.Satellite") },
    { value: "Saudi Arabia", display: t("countries.SaudiArabia") },
    { value: "Senegal", display: t("countries.Senegal") },
    { value: "Serbia", display: t("countries.Serbia") },
    { value: "Seychelles", display: t("countries.Seychelles") },
    { value: "Sierra Leone", display: t("countries.SierraLeone") },
    { value: "Singapore", display: t("countries.Singapore") },
    { value: "Slovakia", display: t("countries.Slovakia") },
    { value: "Slovenia", display: t("countries.Slovenia") },
    { value: "South Africa", display: t("countries.SouthAfrica") },
    { value: "South Korea", display: t("countries.SouthKorea") },
    { value: "Spain", display: t("countries.Spain") },
    { value: "Sri Lanka", display: t("countries.SriLanka") },
    { value: "St Kitts & Nevis", display: t("countries.StKittsNevis") },
    { value: "St Lucia", display: t("countries.StLucia") },
    { value: "St Vincent", display: t("countries.StVincent") },
    { value: "St. Lucia", display: t("countries.StLucia") },
    { value: "Sudan", display: t("countries.Sudan") },
    { value: "Suriname", display: t("countries.Suriname") },
    { value: "Swaziland", display: t("countries.Swaziland") },
    { value: "Sweden", display: t("countries.Sweden") },
    { value: "Switzerland", display: t("countries.Switzerland") },
    { value: "Syria", display: t("countries.Syria") },
    { value: "Taiwan", display: t("countries.Taiwan") },
    { value: "Tajikistan", display: t("countries.Tajikistan") },
    { value: "Tanzania", display: t("countries.Tanzania") },
    { value: "Thailand", display: t("countries.Thailand") },
    { value: "Timor L'Este", display: t("countries.TimorLEste") },
    { value: "Togo", display: t("countries.Togo") },
    { value: "Tonga", display: t("countries.Tonga") },
    { value: "Trinidad & Tobago", display: t("countries.TrinidadTobago") },
    { value: "Tunisia", display: t("countries.Tunisia") },
    { value: "Turkey", display: t("countries.Turkey") },
    { value: "Turkmenistan", display: t("countries.Turkmenistan") },
    { value: "Turks & Caicos", display: t("countries.TurksCaicos") },
    { value: "Uganda", display: t("countries.Uganda") },
    { value: "Ukraine", display: t("countries.Ukraine") },
    {
      value: "United Arab Emirates",
      display: t("countries.UnitedArabEmirates"),
    },
    { value: "United Kingdom", display: t("countries.UnitedKingdom") },
    { value: "Uruguay", display: t("countries.Uruguay") },
    { value: "Uzbekistan", display: t("countries.Uzbekistan") },
    { value: "Venezuela", display: t("countries.Venezuela") },
    { value: "Vietnam", display: t("countries.Vietnam") },
    { value: "Virgin Islands (US)", display: t("countries.VirginIslandsUS") },
    { value: "Yemen", display: t("countries.Yemen") },
    { value: "Zambia", display: t("countries.Zambia") },
    { value: "Zimbabwe", display: t("countries.Zimbabwe") },
  ].sort((country1, country2) => {
    return country1.display.localeCompare(country2.display);
  });

  const [CountryOption, setCountryOption] = useState(value);

  return (
    <Popup
      show={selectDialogOpen}
      title="Select Country"
      onConfirm={() => {
        setValue(CountryOption);
        setSelectDialogOpen(false);
      }}
      onClose={() => setSelectDialogOpen(false)}
    >
      <SearchOptions
        label={t("signUp.option1Label") + "*"}
        value={CountryOption}
        setValue={setCountryOption}
        options={country_list}
        placeholder={t("signUp.option1Placeholder")}
      />
    </Popup>
  );
};
