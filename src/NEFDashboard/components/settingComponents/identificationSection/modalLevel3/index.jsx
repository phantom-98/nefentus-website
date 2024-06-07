import React from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex } from "antd";
import FileUploadContainer from "../fileUploadContainer";

const ModalLevel3 = ({ open, onClose }) => {
  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Level 3 Verification</div>}
    >
      <FileUploadContainer type={""} label={"Enhanced Deligence"} />
    </IdentificationCommonModal>
  );
};

export default ModalLevel3;
