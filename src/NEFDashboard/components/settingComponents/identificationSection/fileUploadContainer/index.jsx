import React from "react";
import { Flex } from "antd";
import AttachmentIcon from "../../../../../assets/newDashboardIcons/attachment.svg";
import AttachmentSuccessIcon from "../../../../../assets/newDashboardIcons/attachment-success.svg";
import AttachmentErrorIcon from "../../../../../assets/newDashboardIcons/attachment-error.svg";
import DeleteIcon from "../../../../../assets/newDashboardIcons/delete-dark-gray.svg";
import "./fileUploadContainer.css";

const FileUploadContainer = ({ type, label = "" }) => {
  const renderItem = () => {
    switch (type) {
      case "success":
        return (
          <Flex vertical gap={4}>
            <Flex align="center" justify="space-between">
              <div className="default-text-gray">{label}</div>
              <div className="default-text-gray identification-field-subText">
                Only .jpg and .png files. 500KB max size.
              </div>
            </Flex>
            <Flex
              className="identification-upload-wrapper identification-uploaded-wrapper"
              justify="space-between"
              align="center"
            >
              <Flex
                className="identification-uploaded-logo"
                gap={8}
                align="center"
              >
                <img src={AttachmentSuccessIcon} alt="icon" />
                <Flex vertical gap={2} className="identification-file-name">
                  <span className="file-name">Idphoto.png</span>
                  <span className="file-size">256KB</span>
                </Flex>
              </Flex>
              <div className="identification-trash-icon">
                <img src={DeleteIcon} alt="icon" />
              </div>
            </Flex>
          </Flex>
        );
      case "error":
        return (
          <Flex vertical gap={4}>
            <Flex align="center" justify="space-between">
              <div className="default-text-gray">{label}</div>
              <div className="default-text-gray identification-field-subText">
                Only .jpg and .png files. 500KB max size.
              </div>
            </Flex>
            <Flex
              className="identification-upload-wrapper identification-uploaded-wrapper"
              justify="space-between"
              align="center"
            >
              <Flex
                className="identification-uploaded-logo"
                gap={8}
                align="center"
              >
                <img src={AttachmentErrorIcon} alt="icon" />
                <Flex vertical gap={2} className="identification-file-name">
                  <span className="file-title">File uploading failed</span>
                  <span className="file-name">Idphoto.png</span>
                  <div className="choose-file">
                    Try again
                    <input type="file" />
                  </div>
                </Flex>
              </Flex>
              <div className="identification-trash-icon">
                <img src={DeleteIcon} alt="icon" />
              </div>
            </Flex>
          </Flex>
        );
      case "size-exceed":
        return (
          <Flex vertical gap={4}>
            <Flex align="center" justify="space-between">
              <div className="default-text-gray">{label}</div>
              <div className="default-text-gray identification-field-subText">
                Only .jpg and .png files. 500KB max size.
              </div>
            </Flex>
            <Flex
              className="identification-upload-wrapper identification-uploaded-wrapper"
              justify="space-between"
              align="center"
            >
              <Flex
                className="identification-uploaded-logo"
                gap={8}
                align="center"
              >
                <img src={AttachmentErrorIcon} alt="icon" />
                <Flex vertical gap={2} className="identification-file-name">
                  <span className="file-name">File is to big</span>
                  <span className="file-name">Idphoto.png</span>
                  <div className="choose-file">
                    Choose another file
                    <input type="file" />
                  </div>
                </Flex>
              </Flex>
              <div className="identification-trash-icon">
                <img src={DeleteIcon} alt="icon" />
              </div>
            </Flex>
          </Flex>
        );
      default:
        return (
          <Flex vertical gap={4}>
            <Flex align="center" justify="space-between">
              <div className="default-text-gray">{label}</div>
              <div className="default-text-gray identification-field-subText">
                Only .jpg and .png files. 500KB max size.
              </div>
            </Flex>
            <div className="identification-upload-wrapper">
              <input type="file" className="identification-upload" />
              <div className="identification-upload-logo">
                <img src={AttachmentIcon} alt="icon" />
              </div>
              <p>
                Drag and drop or <span>Choose file </span>to upload
              </p>
            </div>
          </Flex>
        );
    }
  };

  return renderItem();
};

export default FileUploadContainer;
