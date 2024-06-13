import React, { useRef } from "react";
import { Flex } from "antd";
import AttachmentIcon from "../../../../../assets/newDashboardIcons/attachment.svg";
import AttachmentSuccessIcon from "../../../../../assets/newDashboardIcons/attachment-success.svg";
import AttachmentErrorIcon from "../../../../../assets/newDashboardIcons/attachment-error.svg";
import DeleteIcon from "../../../../../assets/newDashboardIcons/delete-dark-gray.svg";
import "./fileUploadContainer.css";
import { formatUSDBalance } from "../../../../../utils";

const FileUploadContainer = ({
  name,
  fileData,
  type,
  label = "",
  onUploadImage,
  onDeleteImage,
}) => {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const onChangeImage = (inputReference) => {
    const file = inputReference.current.files[0];
    const fileName = inputReference.current.value.split("\\").pop();
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      onUploadImage(reader.result, file, fileName, name);
    });
    reader.readAsDataURL(file);
  };

  const extractImageName = (url) => {
    const urlParts = url.split("/");
    const fullName = urlParts[urlParts.length - 1];
    return fullName.split("?")[0]?.split("_").pop();
  };

  const renderItem = (type) => {
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
                  <span className="file-name">
                    {typeof fileData == "string"
                      ? extractImageName(fileData)
                      : fileData?.name}
                  </span>
                  {typeof fileData == "string" ? null : (
                    <span className="file-size">
                      {formatUSDBalance(fileData?.file?.size / 1024) + "KB"}
                    </span>
                  )}
                </Flex>
              </Flex>
              <div
                className="identification-trash-icon"
                onClick={() => onDeleteImage(name)}
              >
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
                    <input type="file" onChange={() => onChangeImage(obj)} />
                  </div>
                </Flex>
              </Flex>
              <div
                className="identification-trash-icon"
                onClick={() => onDeleteImage(name)}
              >
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
                  <span className="file-name">{fileData?.name}</span>
                  <div className="choose-file">
                    Choose another file
                    <input
                      type="file"
                      className="input-file-on-error"
                      ref={inputRef2}
                      onChange={() => onChangeImage(inputRef2)}
                    />
                  </div>
                </Flex>
              </Flex>
              <div
                className="identification-trash-icon"
                onClick={() => onDeleteImage(name)}
              >
                <img src={DeleteIcon} alt="icon" />
              </div>
            </Flex>
          </Flex>
        );
      default:
        return (
          <Flex vertical gap={4} onClick={() => inputRef.current.click()}>
            <Flex align="center" justify="space-between">
              <div className="default-text-gray">{label}</div>
              <div className="default-text-gray identification-field-subText">
                Only .jpg and .png files. 500KB max size.
              </div>
            </Flex>
            <div className="identification-upload-wrapper">
              <input
                accept=".jpg, .png"
                ref={inputRef}
                type="file"
                className="identification-upload"
                onChange={() => onChangeImage(inputRef)}
              />
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

  return renderItem(typeof fileData == "string" ? "success" : fileData?.status);
};

export default FileUploadContainer;
