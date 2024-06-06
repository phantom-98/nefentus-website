import React from "react";
import IdentificationCommonModal from "../identificationCommonModal";
import { Flex, Input, Select } from "antd";
import "./modalLevel1.css";
import FileUploadContainer from "../fileUploadContainer";

const ModalLevel1 = ({ open, onClose }) => {
  return (
    <IdentificationCommonModal
      open={open}
      onClose={onClose}
      title={<div>Level 1 Verification</div>}
    >
      <Flex vertical gap={16}>
        <Flex align="center" gap={12}>
          <div className="identification-name-container">
            <div>First Name*</div>
            <Input
              placeholder="Enter your first name"
              className="identification-input-field"
            />
          </div>
          <div className="identification-name-container">
            <div>Last Name*</div>
            <Input
              placeholder="Enter your last name"
              className="identification-input-field"
            />
          </div>
        </Flex>
        <Flex vertical>
          <div className="default-text-gray">Address*</div>
          <Flex vertical>
            <Select
              options={[
                { label: "check1", value: "check1" },
                { label: "check2", value: "check2" },
                { label: "check3", value: "check3" },
                { label: "check4", value: "check4" },
                { label: "check5", value: "check5" },
                { label: "check6", value: "check6" },
                { label: "check7", value: "check7" },
                { label: "check8", value: "check8" },
                { label: "check9", value: "check9" },
                { label: "check10", value: "check10" },
                { label: "check11", value: "check11" },
              ]}
              placeholder="Select Country"
              className="identification-country-select"
            />
            <Input placeholder="Skovoda str. 15" className="street-field" />
            <Input placeholder="Address Line 2" className="street-field" />
            <Flex className="identification-city-zip">
              <Input placeholder="City" className="" />
              <Input placeholder="Zip" className="" type="number" />
            </Flex>
          </Flex>
        </Flex>
        <FileUploadContainer type={""} label="Government Issue ID" />
        <FileUploadContainer type={"success"} label="Picture with ID in hand" />
        {/* <FileUploadContainer type={"size-exceed"} />
        <FileUploadContainer type={"error"} /> */}
      </Flex>
    </IdentificationCommonModal>
  );
};

export default ModalLevel1;
