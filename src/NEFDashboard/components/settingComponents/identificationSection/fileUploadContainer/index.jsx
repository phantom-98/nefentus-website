import React, { useRef } from "react";
import { Button, Flex, Upload } from "antd";
import AttachmentIcon from "../../../../../assets/newDashboardIcons/attachment.svg";
import AttachmentSuccessIcon from "../../../../../assets/newDashboardIcons/attachment-success.svg";
import AttachmentErrorIcon from "../../../../../assets/newDashboardIcons/attachment-error.svg";
import DeleteIcon from "../../../../../assets/newDashboardIcons/delete-dark-gray.svg";
import DownloadIcon from "../../../../../assets/newDashboardIcons/download.svg";
import FileIcon from "../../../../../assets/newDashboardIcons/file.svg";
import { formatUSDBalance } from "../../../../../utils";
import "./fileUploadContainer.css";

const FileUploadContainer = ({
  name,
  fileData,
  label = "",
  onUploadImage,
  onDeleteImage,
  verification,
}) => {
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    // action: null,

    onChange(info) {
      const file = info?.file;
      const fileName = file?.name.split("\\").pop();
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        onUploadImage(reader.result, file, fileName, name);
      });
      reader.readAsDataURL(file);
    },
  };

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

  const previewImage = (file) => {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${file}" alt="Image">`);
  };

  const downloadFile = (url, fileName) => {
    // Create a new anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(a);

    // Programmatically trigger a click event on the anchor
    a.click();

    // Remove the anchor from the body
    document.body.removeChild(a);
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
                <img
                  src={verification ? FileIcon : AttachmentSuccessIcon}
                  alt="icon"
                />
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
              {verification ? (
                <Flex gap={8}>
                  <Button
                    className="default-text preview-file-button"
                    onClick={() => {
                      previewImage(fileData);
                    }}
                  >
                    Preview
                  </Button>
                  <div>
                    <img
                      src={DownloadIcon}
                      alt="icon"
                      className="download-file-icon"
                      onClick={() =>
                        downloadFile(fileData, extractImageName(fileData))
                      }
                    />
                  </div>
                </Flex>
              ) : (
                <div
                  className="identification-trash-icon"
                  onClick={() => onDeleteImage(name)}
                >
                  <img src={DeleteIcon} alt="icon" />
                </div>
              )}
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
            <Dragger
              beforeUpload={() => false}
              {...props}
              className="identification-ant-upload cursor-pointer"
            >
              <div className="identification-upload-wrapper">
                <div className="identification-upload-logo">
                  <img src={AttachmentIcon} alt="icon" />
                </div>
                <p>
                  Drag and drop or <span>Choose file </span>to upload
                </p>
              </div>
            </Dragger>
          </Flex>
          // <Flex
          //   vertical
          //   gap={4}
          //   onClick={() => inputRef.current.click()}
          //   className="cursor-pointer"
          // >
          //   <Flex align="center" justify="space-between">
          //     <div className="default-text-gray">{label}</div>
          //     <div className="default-text-gray identification-field-subText">
          //       Only .jpg and .png files. 500KB max size.
          //     </div>
          //   </Flex>
          //   <div className="identification-upload-wrapper">
          //     <input
          //       accept=".jpg, .png"
          //       ref={inputRef}
          //       type="file"
          //       className="identification-upload"
          //       onChange={() => onChangeImage(inputRef)}
          //     />
          //     <div className="identification-upload-logo">
          //       <img src={AttachmentIcon} alt="icon" />
          //     </div>
          //     <p>
          //       Drag and drop or <span>Choose file </span>to upload
          //     </p>
          //   </div>
          // </Flex>
        );
    }
  };

  return renderItem(typeof fileData == "string" ? "success" : fileData?.status);
};

export default FileUploadContainer;
