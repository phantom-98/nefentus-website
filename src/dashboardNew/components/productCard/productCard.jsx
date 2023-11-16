import styles from "./productCard.module.css";
import vendorDashboardApi from "../../../api/vendorDashboardApi";

import Edit from "../../../assets/icon/edit.svg";
import Delete from "../../../assets/icon/delete.svg";
import Button from "../button/button";
import { useContext, useEffect, useState } from "react";
import Popup from "../popup/popup";
import Input, { Attachment, Textarea } from "../../../components/input/input";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import MessageComponent from "../../../components/message";
import { MessageContext } from "../../../context/message";
import { useTranslation } from "react-i18next";

const ProductCard = ({ onClickDelete = () => {}, product = {}, update }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const dashboardApi = new vendorDashboardApi();
  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);
  const { t } = useTranslation();

  const updateProduct = async () => {
    if (!name) {
      setErrorMessage(t("products.error.name"));
      return;
    }
    if (!description) {
      setErrorMessage(t("products.error.description"));
      return;
    }
    if (!price) {
      setErrorMessage(t("products.error.price"));
      return;
    }
    let priceAsFloat = null;
    priceAsFloat = parseFloat(price);
    if (!priceAsFloat) {
      setErrorMessage(t("products.error.priceAsFloat"));
    }

    const resp1 = await dashboardApi.upsertProduct(
      product.id,
      name,
      description,
      price,
      stock,
      image,
    );
    const imageProductId = resp1.id;

    let resp2 = true;
    if (imageChanged) {
      if (image) {
        console.log("Uploading image for product id: " + imageProductId);
        resp2 = await dashboardApi.uploadProductImage(imageProductId, image);
      } else {
        resp2 = await dashboardApi.deleteProductImage(imageProductId, image);
      }
      setImageChanged(false);
    }

    if (resp1 && resp2) {
      if (product.id !== null) setInfoMessage("Product updated successfully!");
      else setInfoMessage("Product added successfully!");
    } else {
      if (product.id !== null) setErrorMessage("Could not update the product!");
      else setErrorMessage("Could not add a new product!");
    }

    setShow(false);
    update();
    clearMessages();
  };

  return (
    <>
      <div className={`card ${styles.card}`}>
        <div className={styles.imageWrapper}>
          <div className={styles.icons}>
            <img src={Edit} alt="Edit product" onClick={() => setShow(true)} />
            <img src={Delete} alt="Delete product" onClick={onClickDelete} />
          </div>
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          )}
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.body}>
          <div className={styles.name}>{product.name}</div>

          <p className={styles.description}>{product.description}</p>

          <p className={styles.price}>${product.price}</p>

          <Button link={`${window.location.origin}/product/${product.link}`}>
            Open
          </Button>
        </div>
      </div>

      <Popup
        show={show}
        title="Edit Product"
        onConfirm={updateProduct}
        onClose={() => setShow(false)}
      >
        <MessageComponent />
        <div className={styles.inputWrapper}>
          <div className={styles.modalInputs}>
            <Attachment
              label={t("products.createProductModal.imageLabel")}
              onUpload={(file) => {
                setImage(file);
                setImageChanged(true);
                setCropDialogOpen(true);
              }}
              onDelete={() => {
                setImage(null);
                setImageChanged(true);
              }}
              value={product?.s3Key?.split("_")[1]}
              dashboard
            />
            <Input
              dashboard
              label={t("products.createProductModal.nameLabel")}
              placeholder={t("products.createProductModal.namePlaceholder")}
              value={name}
              setState={setName}
            />
            <Textarea
              dashboard
              label={t("products.createProductModal.descriptionLabel")}
              placeholder={t(
                "products.createProductModal.descriptionPlaceholder",
              )}
              value={description}
              setState={setDescription}
              rows={2}
            />
            <Input
              dashboard
              label={t("products.createProductModal.priceLabel")}
              placeholder={t("products.createProductModal.pricePlaceholder")}
              value={price}
              setState={setPrice}
              number
            />
            <Input
              dashboard
              label={t("products.createProductModal.stockLabel")}
              placeholder={t("products.createProductModal.stockPlaceholder")}
              value={stock}
              setState={setStock}
              number
            />
          </div>
        </div>
      </Popup>

      <CropDialog
        open={cropDialogOpen}
        file={image}
        onClose={() => setCropDialogOpen(false)}
        onSave={(croppedImageData) => {
          setCropDialogOpen(false);
          setImage(dataURLtoFile(croppedImageData, image.name));
        }}
      />
    </>
  );
};

export default ProductCard;
