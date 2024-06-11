import React, { useContext, useEffect, useState } from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex } from "antd";
import FileUploadContainer from "../fileUploadContainer";
import backendAPI from "../../../../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../../../context/message";

const ModalLevel2 = ({ open, onClose, kycData, onRefresh }) => {
  const BackendAPI = new backendAPI();
  const { t } = useTranslation();
  const { setSuccessMessage, setErrorMessage } = useContext(MessageContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    PROOF_OF_ADRESS: {},
    PROOF_OF_COMPANY: {},
  });

  useEffect(() => {
    let dataset = {};
    kycData?.list?.map((kyc) => {
      dataset[kyc.type] = kyc?.data?.url;
    }),
      setData(dataset);
  }, [kycData]);

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
    if (
      Object.keys(data)?.every(
        (imageType) => typeof data[imageType] == "string",
      )
    ) {
      setErrorMessage("These documents have been rejected by admin");
      setLoading(false);
      return;
    }
    if (
      Object.keys(data)?.some(
        (field) =>
          data[field] == null ||
          (Object.keys(data[field])?.length > 0 && // When file object is stored in state
            typeof data[field] != "string" &&
            data[field]?.status == "size-exceed") ||
          Object.keys(data[field])?.length == 0,
      )
    ) {
      setErrorMessage("Upload valid image");
      setLoading(false);
      return;
    }
    const arrayWithResults = await Promise.allSettled(
      Object.keys(data).map((type) =>
        BackendAPI.uploadKYCByType(type, data[type]?.file),
      ),
    );
    if (arrayWithResults?.every((check) => check.status == "fulfilled")) {
      setSuccessMessage("Request has been submitted!");
      onRefresh();
    } else setErrorMessage("Invalid Data!");
    setLoading(false);
  };

  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Level 2 Verification</div>}
      onUpload={uploadData}
      loading={loading}
    >
      <Flex vertical gap={12}>
        <FileUploadContainer
          label="Proof of Address"
          name={"PROOF_OF_ADRESS"}
          fileData={data?.PROOF_OF_ADRESS}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
        />
        <FileUploadContainer
          label="Proof of Company"
          name={"PROOF_OF_COMPANY"}
          fileData={data?.PROOF_OF_COMPANY}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
        />
      </Flex>
    </IdentificationCommonModal>
  );
};

export default ModalLevel2;
