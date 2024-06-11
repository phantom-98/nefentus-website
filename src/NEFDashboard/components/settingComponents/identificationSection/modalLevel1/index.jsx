import React, { useContext, useEffect, useState } from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex, Input, Select } from "antd";
import FileUploadContainer from "../fileUploadContainer";
import backendAPI from "../../../../../api/backendAPI";
import "./modalLevel1.css";
import { countryList } from "../../../../../constants";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../../../context/message";

const ModalLevel1 = ({ open, onClose, kycData, onRefresh }) => {
  const BackendAPI = new backendAPI();
  const { t } = useTranslation();
  const { setSuccessMessage, setErrorMessage } = useContext(MessageContext);
  const [errorField, setErrorField] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    FIRST_NAME: "",
    LAST_NAME: "",
    COUNTRY: null,
    street: "",
    ADRESS: "",
    CITY: "",
    ZIP_CODE: "",
    GOVERNMENT_ISSUES_ID: {},
    PICTURE_WIDTH_ID_IN_HAND: {},
  });

  useEffect(() => {
    let dataset = {};
    kycData?.list?.map((kyc) => {
      dataset[kyc.type] = kyc?.data?.url;
    }),
      setData(dataset);
  }, [kycData]);

  const [countries] = useState(
    countryList?.map((country) => ({
      label: t(country?.display),
      value: country?.value,
    })),
  );

  const onUploadImage = (base_64, file, name, key) => {
    setData({
      ...data,
      [key]: {
        base_64,
        file,
        name,
        status: file.size / 1024 > 500 ? "size-exceed" : "success",
      },
    });
  };

  const onDeleteImage = (key) => {
    setData({ ...data, [key]: {} });
  };

  const uploadData = async () => {
    setLoading(true);
    setErrorField("");
    const payloadText = { ...data };
    const payloadFile = {
      GOVERNMENT_ISSUES_ID: data?.GOVERNMENT_ISSUES_ID,
      PICTURE_WIDTH_ID_IN_HAND: data?.PICTURE_WIDTH_ID_IN_HAND,
    };

    delete payloadText.street;
    delete payloadText.GOVERNMENT_ISSUES_ID;
    delete payloadText.PICTURE_WIDTH_ID_IN_HAND;
    if (
      Object.keys(payloadText)?.some(
        (field) => payloadText[field] == null || payloadText[field] == "",
      )
    ) {
      const getErrorField = Object.keys(payloadText)?.find(
        (field) => payloadText[field] == null || payloadText[field] == "",
      );
      setErrorField(getErrorField);
      setLoading(false);
      return;
    }

    if (
      Object.keys(payloadFile)?.some(
        (field) =>
          payloadFile[field] == null ||
          (Object.keys(payloadFile[field])?.length > 0 && // When file object is stored in state
            typeof payloadFile[field] != "string" &&
            payloadFile[field]?.status == "size-exceed") ||
          Object.keys(payloadFile[field])?.length == 0,
      )
    ) {
      setErrorMessage("Upload valid size image");
      setLoading(false);
      return;
    }

    const arrayWithResultsText = await Promise.allSettled(
      Object.keys(payloadText)?.map((type) =>
        BackendAPI.uploadKYCByText(type, payloadText[type]),
      ),
    );

    const arrayWithResults = await Promise.allSettled(
      Object.keys(payloadFile).map((type) =>
        BackendAPI.uploadKYCByType(type, payloadFile[type]?.file),
      ),
    );

    if (
      arrayWithResultsText?.every((check) => check.status == "fulfilled") &&
      arrayWithResults?.every((check) => check.status == "fulfilled")
    ) {
      setSuccessMessage("Request has been submitted!");
      onRefresh();
    } else setErrorMessage("Invalid Data!");
    setLoading(false);
  };
  const onFieldChange = (value, key) => setData({ ...data, [key]: value });
  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Level 1 Verification</div>}
      onUpload={uploadData}
      loading={loading}
    >
      <Flex vertical gap={16}>
        <Flex align="center" gap={12}>
          <div className="identification-name-container">
            <div>First Name*</div>
            <div className="identification-field-container">
              <Input
                placeholder="Enter your first name"
                className={` ${
                  errorField == "FIRST_NAME" ? "identification-error-field" : ""
                } identification-input-field`}
                name="FIRST_NAME"
                value={data?.FIRST_NAME}
                onChange={(e) => onFieldChange(e.target.value, e.target.name)}
              />
              {errorField == "FIRST_NAME" && (
                <div className="default-text identification-error-text">
                  This field is required
                </div>
              )}
            </div>
          </div>
          <div className="identification-name-container">
            <div>Last Name*</div>
            <div className="identification-field-container">
              <Input
                placeholder="Enter your last name"
                className={`${
                  errorField == "LAST_NAME" ? "identification-error-field" : ""
                } identification-input-field`}
                name="LAST_NAME"
                value={data?.LAST_NAME}
                onChange={(e) => onFieldChange(e.target.value, e.target.name)}
              />
              {errorField == "LAST_NAME" && (
                <div className="default-text identification-error-text">
                  This field is required
                </div>
              )}
            </div>
          </div>
        </Flex>
        <Flex vertical>
          <div className="default-text-gray">Address*</div>
          <Flex vertical>
            <Select
              showSearch
              options={countries}
              placeholder="Select Country"
              className={`${
                errorField == "COUNTRY" ? "identification-error-field" : ""
              } identification-country-select`}
              value={data?.COUNTRY}
              onChange={(e) => onFieldChange(e, "COUNTRY")}
            />
            {/* <Input
              placeholder="Skovoda str. 15"
              className={`street-field ${
                errorField == "street" ? "identification-error-field" : ""
              }`}
              name="street"
              value={data?.street}
              onChange={(e) => onFieldChange(e.target.value, e.target.name)}
            /> */}
            <Input
              placeholder="Address Line 2"
              className={`${
                errorField == "ADRESS" ? "identification-error-field" : ""
              } street-field`}
              name="ADRESS"
              value={data?.ADRESS}
              onChange={(e) => onFieldChange(e.target.value, e.target.name)}
            />
            <Flex
              className={`${
                errorField == "CITY" || errorField == "ZIP_CODE"
                  ? "identification-error-field"
                  : ""
              } identification-city-zip`}
            >
              <Input
                placeholder="City"
                name="CITY"
                value={data?.CITY}
                onChange={(e) => onFieldChange(e.target.value, e.target.name)}
              />
              <Input
                placeholder="Zip"
                type="number"
                name="ZIP_CODE"
                value={data?.ZIP_CODE}
                onChange={(e) => onFieldChange(e.target.value, e.target.name)}
              />
            </Flex>
          </Flex>
        </Flex>
        <FileUploadContainer
          label="Government Issue ID"
          name={"GOVERNMENT_ISSUES_ID"}
          fileData={data?.GOVERNMENT_ISSUES_ID}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
        />
        <FileUploadContainer
          name={"PICTURE_WIDTH_ID_IN_HAND"}
          fileData={data?.PICTURE_WIDTH_ID_IN_HAND}
          label="Picture with ID in hand"
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
        />
      </Flex>
    </IdentificationCommonModal>
  );
};

export default ModalLevel1;
