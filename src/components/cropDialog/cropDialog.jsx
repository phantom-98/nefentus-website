import React, { useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import Resizer from "react-image-file-resizer";
import styles from "./cropDialog.module.css";
import { Buttons } from "../../dashboard/settings/components/buttons";
import "react-image-crop/dist/ReactCrop.css";
import { useTheme } from "../../context/themeContext/themeContext";

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      580,
      480,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
    );
  });

const CropDialog = ({ open, file, aspect, onSave, onClose }) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const { theme } = useTheme();
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(undefined);
  const [completedCrop, setCompletedCrop] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  useEffect(() => {
    if (open && aspect) {
    }
  }, [open, aspect]);

  useEffect(() => {
    if (open && file) {
      const imageReader = new FileReader();
      imageReader.readAsDataURL(file);
      imageReader.onloadend = () => {
        setImage(imageReader.result);
        const img = new Image();
        img.src = imageReader.result;
        if (aspect) {
          img.onload = function () {
            const size = img.width > img.height ? img.height : img.width;
            setCrop({
              unit: "px",
              x: (img.width - size / 2) / 2,
              y: (img.height - size / 2) / 2,
              width: size / 2,
              height: size / 2,
            });
            setCompletedCrop({
              unit: "px",
              x: (img.width - size / 2) / 2,
              y: (img.height - size / 2) / 2,
              width: size / 2,
              height: size / 2,
            });
          };
        }
      };
    }
  }, [open, file]);

  const keepOrigin = async () => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      onSave(reader.result);
    };
  };

  const handleCrop = async () => {
    const img = new Image();
    const resizef = await resizeFile(file);
    img.src = resizef;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";

      const cropX = completedCrop.x * scaleX;
      const cropY = completedCrop.y * scaleY;

      const centerX = img.naturalWidth / 2;
      const centerY = img.naturalHeight / 2;

      ctx.save();

      ctx.translate(-cropX, -cropY);
      ctx.translate(centerX, centerY);
      ctx.scale(zoom, zoom);
      ctx.translate(-centerX, -centerY);
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
      );
      const croppedImageData = canvas.toDataURL("image/jpeg");

      onSave(croppedImageData);
    };
  };

  return open ? (
    <div className={styles["modal-root"]}>
      <div className={styles["modal-mask"]}></div>
      <div className={styles["modal-wrap"]}>
        <div
          className={styles["modal"]}
          style={{
            width: 600,
            height: 600,
            backgroundColor: `${theme == "light" ? "#eeeeee" : ""}`,
          }}
        >
          <div className={styles["crop-container"]}>
            <ReactCrop
              crop={crop}
              onChange={(pxCrop, percentCrop) => setCrop(pxCrop)}
              zoom={zoom}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                src={image}
                style={{
                  transform: `scale(${zoom})`,
                  maxWidth: 580,
                  maxHeight: 480,
                }}
              />
            </ReactCrop>
          </div>

          <div className={styles["modal-footer"]}>
            <Buttons
              functions={[onClose, keepOrigin, handleCrop]}
              buttons={["Cancel", "Keep original image", "Crop"]}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CropDialog;
