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

const langOptions = [
  { value: "en", label: "English" },
  { value: "uk", label: "Українська" },
  { value: "de", label: "Deutsch" },
];

const country_list = [
  { value: "Afghanistan", display: "countries.Afghanistan" },
  { value: "Albania", display: "countries.Albania" },
  { value: "Algeria", display: "countries.Algeria" },
  { value: "Andorra", display: "countries.Andorra" },
  { value: "Angola", display: "countries.Angola" },
  { value: "Anguilla", display: "countries.Anguilla" },
  { value: "Antigua & Barbuda", display: "countries.AntiguaBarbuda" },
  { value: "Argentina", display: "countries.Argentina" },
  { value: "Armenia", display: "countries.Armenia" },
  { value: "Aruba", display: "countries.Aruba" },
  { value: "Australia", display: "countries.Australia" },
  { value: "Austria", display: "countries.Austria" },
  { value: "Azerbaijan", display: "countries.Azerbaijan" },
  { value: "Bahamas", display: "countries.Bahamas" },
  { value: "Bahrain", display: "countries.Bahrain" },
  { value: "Bangladesh", display: "countries.Bangladesh" },
  { value: "Barbados", display: "countries.Barbados" },
  { value: "Belarus", display: "countries.Belarus" },
  { value: "Belgium", display: "countries.Belgium" },
  { value: "Belize", display: "countries.Belize" },
  { value: "Benin", display: "countries.Benin" },
  { value: "Bermuda", display: "countries.Bermuda" },
  { value: "Bhutan", display: "countries.Bhutan" },
  { value: "Bolivia", display: "countries.Bolivia" },
  {
    value: "Bosnia & Herzegovina",
    display: "countries.BosniaHerzegovina",
  },
  { value: "Botswana", display: "countries.Botswana" },
  { value: "Brazil", display: "countries.Brazil" },
  {
    value: "British Virgin Islands",
    display: "countries.BritishVirginIslands",
  },
  { value: "Brunei", display: "countries.Brunei" },
  { value: "Bulgaria", display: "countries.Bulgaria" },
  { value: "Burkina Faso", display: "countries.BurkinaFaso" },
  { value: "Burundi", display: "countries.Burundi" },
  { value: "Cambodia", display: "countries.Cambodia" },
  { value: "Cameroon", display: "countries.Cameroon" },
  { value: "Cape Verde", display: "countries.CapeVerde" },
  { value: "Cayman Islands", display: "countries.CaymanIslands" },
  { value: "Chad", display: "countries.Chad" },
  { value: "Chile", display: "countries.Chile" },
  { value: "China", display: "countries.China" },
  { value: "Colombia", display: "countries.Colombia" },
  { value: "Congo", display: "countries.Congo" },
  { value: "Cook Islands", display: "countries.CookIslands" },
  { value: "Costa Rica", display: "countries.CostaRica" },
  { value: "Cote D'Ivoire", display: "countries.CoteDIvoire" },
  { value: "Croatia", display: "countries.Croatia" },
  { value: "Cuba", display: "countries.Cuba" },
  { value: "Cyprus", display: "countries.Cyprus" },
  { value: "Czech Republic", display: "countries.CzechRepublic" },
  { value: "Denmark", display: "countries.Denmark" },
  { value: "Djibouti", display: "countries.Djibouti" },
  { value: "Dominica", display: "countries.Dominica" },
  { value: "Dominican Republic", display: "countries.DominicanRepublic" },
  { value: "Ecuador", display: "countries.Ecuador" },
  { value: "Egypt", display: "countries.Egypt" },
  { value: "El Salvador", display: "countries.ElSalvador" },
  { value: "Equatorial Guinea", display: "countries.EquatorialGuinea" },
  { value: "Estonia", display: "countries.Estonia" },
  { value: "Ethiopia", display: "countries.Ethiopia" },
  { value: "Falkland Islands", display: "countries.FalklandIslands" },
  { value: "Faroe Islands", display: "countries.FaroeIslands" },
  { value: "Fiji", display: "countries.Fiji" },
  { value: "Finland", display: "countries.Finland" },
  { value: "France", display: "countries.France" },
  { value: "French Polynesia", display: "countries.FrenchPolynesia" },
  { value: "French West Indies", display: "countries.FrenchWestIndies" },
  { value: "Gabon", display: "countries.Gabon" },
  { value: "Gambia", display: "countries.Gambia" },
  { value: "Georgia", display: "countries.Georgia" },
  { value: "Germany", display: "countries.Germany" },
  { value: "Ghana", display: "countries.Ghana" },
  { value: "Gibraltar", display: "countries.Gibraltar" },
  { value: "Greece", display: "countries.Greece" },
  { value: "Greenland", display: "countries.Greenland" },
  { value: "Grenada", display: "countries.Grenada" },
  { value: "Guam", display: "countries.Guam" },
  { value: "Guatemala", display: "countries.Guatemala" },
  { value: "Guernsey", display: "countries.Guernsey" },
  { value: "Guinea", display: "countries.Guinea" },
  { value: "Guinea Bissau", display: "countries.GuineaBissau" },
  { value: "Guyana", display: "countries.Guyana" },
  { value: "Haiti", display: "countries.Haiti" },
  { value: "Honduras", display: "countries.Honduras" },
  { value: "Hong Kong", display: "countries.HongKong" },
  { value: "Hungary", display: "countries.Hungary" },
  { value: "Iceland", display: "countries.Iceland" },
  { value: "India", display: "countries.India" },
  { value: "Indonesia", display: "countries.Indonesia" },
  { value: "Iran", display: "countries.Iran" },
  { value: "Iraq", display: "countries.Iraq" },
  { value: "Ireland", display: "countries.Ireland" },
  { value: "Isle of Man", display: "countries.IsleofMan" },
  { value: "Israel", display: "countries.Israel" },
  { value: "Italy", display: "countries.Italy" },
  { value: "Jamaica", display: "countries.Jamaica" },
  { value: "Japan", display: "countries.Japan" },
  { value: "Jersey", display: "countries.Jersey" },
  { value: "Jordan", display: "countries.Jordan" },
  { value: "Kazakhstan", display: "countries.Kazakhstan" },
  { value: "Kenya", display: "countries.Kenya" },
  { value: "Kuwait", display: "countries.Kuwait" },
  { value: "Kyrgyz Republic", display: "countries.KyrgyzRepublic" },
  { value: "Laos", display: "countries.Laos" },
  { value: "Latvia", display: "countries.Latvia" },
  { value: "Lebanon", display: "countries.Lebanon" },
  { value: "Lesotho", display: "countries.Lesotho" },
  { value: "Liberia", display: "countries.Liberia" },
  { value: "Libya", display: "countries.Libya" },
  { value: "Liechtenstein", display: "countries.Liechtenstein" },
  { value: "Lithuania", display: "countries.Lithuania" },
  { value: "Luxembourg", display: "countries.Luxembourg" },
  { value: "Macau", display: "countries.Macau" },
  { value: "Macedonia", display: "countries.Macedonia" },
  { value: "Madagascar", display: "countries.Madagascar" },
  { value: "Malawi", display: "countries.Malawi" },
  { value: "Malaysia", display: "countries.Malaysia" },
  { value: "Maldives", display: "countries.Maldives" },
  { value: "Mali", display: "countries.Mali" },
  { value: "Malta", display: "countries.Malta" },
  { value: "Mauritania", display: "countries.Mauritania" },
  { value: "Mauritius", display: "countries.Mauritius" },
  { value: "Mexico", display: "countries.Mexico" },
  { value: "Moldova", display: "countries.Moldova" },
  { value: "Monaco", display: "countries.Monaco" },
  { value: "Mongolia", display: "countries.Mongolia" },
  { value: "Montenegro", display: "countries.Montenegro" },
  { value: "Montserrat", display: "countries.Montserrat" },
  { value: "Morocco", display: "countries.Morocco" },
  { value: "Mozambique", display: "countries.Mozambique" },
  { value: "Namibia", display: "countries.Namibia" },
  { value: "Nepal", display: "countries.Nepal" },
  { value: "Netherlands", display: "countries.Netherlands" },
  {
    value: "Netherlands Antilles",
    display: "countries.NetherlandsAntilles",
  },
  { value: "New Caledonia", display: "countries.NewCaledonia" },
  { value: "New Zealand", display: "countries.NewZealand" },
  { value: "Nicaragua", display: "countries.Nicaragua" },
  { value: "Niger", display: "countries.Niger" },
  { value: "Nigeria", display: "countries.Nigeria" },
  { value: "Norway", display: "countries.Norway" },
  { value: "Oman", display: "countries.Oman" },
  { value: "Pakistan", display: "countries.Pakistan" },
  { value: "Palestine", display: "countries.Palestine" },
  { value: "Panama", display: "countries.Panama" },
  { value: "Papua New Guinea", display: "countries.PapuaNewGuinea" },
  { value: "Paraguay", display: "countries.Paraguay" },
  { value: "Peru", display: "countries.Peru" },
  { value: "Philippines", display: "countries.Philippines" },
  { value: "Poland", display: "countries.Poland" },
  { value: "Portugal", display: "countries.Portugal" },
  { value: "Puerto Rico", display: "countries.PuertoRico" },
  { value: "Qatar", display: "countries.Qatar" },
  { value: "Reunion", display: "countries.Reunion" },
  { value: "Romania", display: "countries.Romania" },
  { value: "Russia", display: "countries.Russia" },
  { value: "Rwanda", display: "countries.Rwanda" },
  {
    value: "Saint Pierre & Miquelon",
    display: "countries.SaintPierreMiquelon",
  },
  { value: "Samoa", display: "countries.Samoa" },
  { value: "San Marino", display: "countries.SanMarino" },
  { value: "Satellite", display: "countries.Satellite" },
  { value: "Saudi Arabia", display: "countries.SaudiArabia" },
  { value: "Senegal", display: "countries.Senegal" },
  { value: "Serbia", display: "countries.Serbia" },
  { value: "Seychelles", display: "countries.Seychelles" },
  { value: "Sierra Leone", display: "countries.SierraLeone" },
  { value: "Singapore", display: "countries.Singapore" },
  { value: "Slovakia", display: "countries.Slovakia" },
  { value: "Slovenia", display: "countries.Slovenia" },
  { value: "South Africa", display: "countries.SouthAfrica" },
  { value: "South Korea", display: "countries.SouthKorea" },
  { value: "Spain", display: "countries.Spain" },
  { value: "Sri Lanka", display: "countries.SriLanka" },
  { value: "St Kitts & Nevis", display: "countries.StKittsNevis" },
  { value: "St Lucia", display: "countries.StLucia" },
  { value: "St Vincent", display: "countries.StVincent" },
  { value: "St. Lucia", display: "countries.StLucia" },
  { value: "Sudan", display: "countries.Sudan" },
  { value: "Suriname", display: "countries.Suriname" },
  { value: "Swaziland", display: "countries.Swaziland" },
  { value: "Sweden", display: "countries.Sweden" },
  { value: "Switzerland", display: "countries.Switzerland" },
  { value: "Syria", display: "countries.Syria" },
  { value: "Taiwan", display: "countries.Taiwan" },
  { value: "Tajikistan", display: "countries.Tajikistan" },
  { value: "Tanzania", display: "countries.Tanzania" },
  { value: "Thailand", display: "countries.Thailand" },
  { value: "Timor L'Este", display: "countries.TimorLEste" },
  { value: "Togo", display: "countries.Togo" },
  { value: "Tonga", display: "countries.Tonga" },
  { value: "Trinidad & Tobago", display: "countries.TrinidadTobago" },
  { value: "Tunisia", display: "countries.Tunisia" },
  { value: "Turkey", display: "countries.Turkey" },
  { value: "Turkmenistan", display: "countries.Turkmenistan" },
  { value: "Turks & Caicos", display: "countries.TurksCaicos" },
  { value: "Uganda", display: "countries.Uganda" },
  { value: "Ukraine", display: "countries.Ukraine" },
  {
    value: "United Arab Emirates",
    display: "countries.UnitedArabEmirates",
  },
  { value: "United Kingdom", display: "countries.UnitedKingdom" },
  { value: "Uruguay", display: "countries.Uruguay" },
  { value: "Uzbekistan", display: "countries.Uzbekistan" },
  { value: "Venezuela", display: "countries.Venezuela" },
  { value: "Vietnam", display: "countries.Vietnam" },
  { value: "Virgin Islands (US", display: "countries.VirginIslandsUS" },
  { value: "Yemen", display: "countries.Yemen" },
  { value: "Zambia", display: "countries.Zambia" },
  { value: "Zimbabwe", display: "countries.Zimbabwe" },
].sort((country1, country2) => {
  return country1.value.localeCompare(country2.value);
});

const translateCountry = (country) => {
  const { t } = useTranslation();
  let c = "";
  country_list.forEach(({ value, display }) => {
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
  }, [data]);

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
            fontSize="1rem"
            width="10rem"
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
          file={data.file}
          aspect={1}
          onClose={() => {
            console.log("crop dialog closed");
            setCropDialogOpen(false);
          }}
          onSave={(croppedImageData) => {
            console.log("image upload - ", croppedImageData, data.file);
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
        options={country_list.map(({ value, display }) => {
          return { value, display: t(display) };
        })}
        placeholder={t("signUp.option1Placeholder")}
        className="countryOption"
      />
    </Popup>
  );
};
