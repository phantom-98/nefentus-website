import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "../button/button";
import imputStyles from "../../../components/input/input.module.css";
import Popup from "../popup/popup";
import MessageComponent from "../../../components/message";
import Input, { Options, SearchOptions } from "../../../components/input/input";
import { useTranslation } from "react-i18next";
import { countryList } from "../../../constants";
import "./identificationPersonalDetail.css";
import { MessageContext } from "../../../context/message";

const IdentificationPersonalDetail = ({
  openModal,
  closeModal,
  personalDetail,
  handlePersonalDetail,
}) => {
  const [countries, setCountries] = useState([]);
  const [details, setDetails] = useState({ ...personalDetail });
  const { t } = useTranslation();
  const { setErrorMessage } = useContext(MessageContext);

  useEffect(() => {
    if (countryList?.length) setCountries(countryList);
  }, [countryList]);

  useEffect(() => {
    setDetails({ ...personalDetail });
  }, [personalDetail]);

  const translateCountry = (country) => {
    const { t } = useTranslation();
    let c = "";
    countryList.forEach(({ value, display }) => {
      if (value == country) {
        c = display;
        return;
      }
    });
    return t(c);
  };

  const validateFields = () => {
    if (
      details?.firstName === "" ||
      details?.lastName === "" ||
      details?.city === "" ||
      details?.zip === "" ||
      details?.country === "" ||
      details?.address === ""
    )
      setErrorMessage(t("messages.error.allFields"));
    else {
      handlePersonalDetail({ ...details });
      closeModal();
    }
  };

  const handleDetails = (value, key) => {
    setDetails({ ...details, [key]: value });
  };

  return (
    <Popup show={openModal}>
      <div className="identification-personal-detail-modal">
        <MessageComponent />

        <h4>{t("identification.verification.personalDetail")}</h4>

        <div className="identification-detail-inputs">
          <Input
            // dashboard
            label={t("dashboard.modal.firstName").concat("*")}
            placeholder={t("dashboard.modal.firstNamePlaceholder")}
            value={details?.firstName}
            setState={(value) => handleDetails(value, "firstName")}
          />
          <Input
            // dashboard
            label={t("dashboard.modal.lastName").concat("*")}
            placeholder={t("dashboard.modal.lastNamePlaceholder")}
            value={details?.lastName}
            setState={(value) => handleDetails(value, "lastName")}
          />
          <Input
            // dashboard
            label={t("dashboard.modal.address").concat("*")}
            placeholder={t("identification.verification.addressPlaceholder")}
            value={details?.address}
            setState={(value) => handleDetails(value, "address")}
          />
          <Input
            // dashboard
            label={t("identification.verification.city").concat("*")}
            placeholder={t("identification.verification.cityPlaceholder")}
            value={details?.city}
            setState={(value) => handleDetails(value, "city")}
            // disabled={editEmailAddress != null}
          />
          <Input
            // dashboard
            label={t("identification.verification.zip").concat("*")}
            placeholder={t("identification.verification.zipPlaceholder")}
            value={details?.zip}
            setState={(value) => handleDetails(value, "zip")}
            // disabled={editEmailAddress != null}
          />

          {
            <SearchOptions
              value={translateCountry(details?.country)}
              setValue={(value) => handleDetails(value, "country")}
              label={t("identification.verification.country").concat("*")}
              options={countries?.map(({ value, display }) => {
                return { value, display: t(display) };
              })}
              placeholder={t("signUp.option1Placeholder")}
              className="countryOption"
            />
          }
        </div>
        <div className="identification-detail-modalButtons">
          <Button onClick={() => closeModal()} color="gray">
            {t("general.cancel")}
          </Button>
          <Button color="white" onClick={() => validateFields()}>
            {t("general.confirm")}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default IdentificationPersonalDetail;
