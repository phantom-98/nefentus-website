import React from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex } from "antd";
import FileUploadContainer from "../fileUploadContainer";

const ModalLevel2 = ({ open, onClose }) => {
  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Level 2 Verification</div>}
    >
      <Flex vertical gap={12}>
        <FileUploadContainer type={""} label={"Proof of Address"} />
        <FileUploadContainer type={"success"} label={"Proof of Company"} />
      </Flex>
    </IdentificationCommonModal>
  );
};

export default ModalLevel2;
