import { useContext, useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Card from "../../components/card/card";
import ProductCard from "../../components/productCard/productCard";
import SettingsTitle from "../../components/settings/settingsTitle";
import styles from "./productBody.module.css";
import { MessageContext } from "../../../context/message";
import MessageComponent from "../../../components/message";
import Input, { Textarea, Attachment } from "../../../components/input/input";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import { useTranslation } from "react-i18next";
import Popup from "../../components/popup/popup";

const ProductBody = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [load, setLoad] = useState(false);

  const { t } = useTranslation();

  const dashboardApi = new vendorDashboardApi();

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  useEffect(() => {
    loadProducts();
  }, [load]);

  async function loadProducts() {
    const newProducts = await dashboardApi.getProducts();
    if (newProducts) {
      const newSignedImagePaths = await Promise.all(
        newProducts.map((product) =>
          dashboardApi.getSignedImagePath(product.id),
        ),
      );

      const productData = newProducts.map((item, index) => ({
        ...item,
        image: newSignedImagePaths[index],
      }));
      setProducts(productData);
    }
  }

  const handleProductClick = () => {
    showModal(null);
  };

  const addOrUpdateProduct = async () => {
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

    // Set stock to -1 if not given
    let stockRequest = stock;
    if (stock === null || stock === "") {
      stockRequest = -1;
    }

    const resp1 = await dashboardApi.upsertProduct(
      productId,
      name,
      description,
      price,
      stockRequest,
      image,
    );

    let resp2 = true;
    if (resp1 && imageChanged) {
      const imageProductId = resp1.id;

      if (image) {
        console.log("Uploading image for product id: " + imageProductId);
        resp2 = await dashboardApi.uploadProductImage(imageProductId, image);
      } else {
        resp2 = await dashboardApi.deleteProductImage(imageProductId, image);
      }
      setImageChanged(false);
    }

    if (resp1 && resp2) {
      if (productId !== null)
        setInfoMessage(t("products.createProductModal.updatedSuccessfully"));
      else setInfoMessage(t("products.createProductModal.addedSuccessfully"));
    } else {
      if (productId !== null)
        setErrorMessage(t("products.createProductModal.updateError"));
      else setErrorMessage(t("products.createProductModal.addError"));
    }

    loadProducts();
    setOpenModal(false);
  };

  const deleteProduct = async (productId) => {
    const resp = await dashboardApi.deleteProduct(productId);
    if (resp) {
      setInfoMessage(t("products.createProductModal.deletedSuccessfully"));
    } else {
      setErrorMessage(t("products.createProductModal.deletedError"));
    }
    loadProducts();
  };

  function showModal(updateProductId) {
    if (updateProductId) {
      const product = products.find(
        (product) => product.id === updateProductId,
      );

      setProductId(updateProductId);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      let imageName = null;
      if (product.s3Key) imageName = product.s3Key.split("_").pop();
      setImage(imageName);

      setOpenModal("update");
    } else {
      setProductId(null);
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage(null);

      setOpenModal("add");
    }
  }

  return (
    <>
      <MessageComponent />

      <Card>
        <div className={styles.titleHeader}>
          <SettingsTitle
            title={t("products.totalProducts")}
            description={t("products.subtitle1")
              .concat(` ${products.length.toString()} `)
              .concat(t("products.subtitle2"))}
            product
            onCreate={handleProductClick}
          />
        </div>

        <div className={styles.row}>
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onClickEdit={() => showModal(item.id)}
              onClickDelete={() => deleteProduct(item.id)}
              update={() => setLoad(!load)}
            />
          ))}
        </div>
      </Card>

      <div>
        <Popup
          show={openModal}
          title={t("products.createProductModal.createProduct")}
          onClose={() => {
            clearMessages();
            setOpenModal(false);
            setProductId(null);
          }}
          onConfirm={() => addOrUpdateProduct()}
          cancelTitle={t("general.cancel")}
          confirmTitle={
            openModal === "add" ? t("general.add") : t("general.update")
          }
        >
          <MessageComponent />
          <div className={styles.modal}>
            {/* <h4>
              {openModal === "add"
                ? t("products.createProductModal.createProduct")
                : t("products.createProductModal.updateProduct")}
            </h4> */}
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
                value={image}
                dashboard
              />
              <Input
                dashboard
                label={t("products.createProductModal.nameLabel") + "*"}
                placeholder={t("products.createProductModal.namePlaceholder")}
                value={name}
                setState={setName}
              />
              <Textarea
                dashboard
                label={t("products.createProductModal.descriptionLabel") + "*"}
                placeholder={t(
                  "products.createProductModal.descriptionPlaceholder",
                )}
                value={description}
                setState={setDescription}
                rows={2}
              />
              <Input
                dashboard
                label={t("products.createProductModal.priceLabel") + "*"}
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
      </div>

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

export default ProductBody;
