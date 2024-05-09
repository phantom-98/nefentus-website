import { useContext, useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Card from "../../components/card/card";
import ProductCard from "../../components/productCard/productCard";
import SettingsTitle from "../../components/settings/settingsTitle";
import styles from "./productBody.module.css";
import { MessageContext } from "../../../context/message";
import MessageComponent from "../../../components/message";
import Input, {
  Textarea,
  Attachment,
  Options,
  CurrencySelect,
  CurrencySelectWithLabel,
  RadioOption,
  Spinner,
  RadioSelect,
} from "../../../components/input/input";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import { useTranslation } from "react-i18next";
import Popup from "../../components/popup/popup";
import { checkJwtToken, formatUSDBalance } from "../../../utils";
import { useAuth } from "../../../context/auth/authContext";
import InfiniteDark from "../../../assets/icon/dark/infinite.svg";
import InfiniteLight from "../../../assets/icon/light/infinite.svg";
import BoxDark from "../../../assets/icon/dark/box.svg";
import BoxLight from "../../../assets/icon/light/box.svg";
import { useTheme } from "../../../context/themeContext/themeContext";

const ProductBody = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unlimit, setUnlimit] = useState(true);
  const [vatPercent, setVatPercent] = useState("");
  const [taxInfo, setTaxInfo] = useState("");
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [productLink, setProductLink] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const { t } = useTranslation();
  const { theme } = useTheme();

  const dashboardApi = new vendorDashboardApi();

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  useEffect(() => {
    loadProducts();
    loadTaxInfo();
  }, []);

  async function loadProducts() {
    await checkJwtToken();
    const newProducts = await dashboardApi.getProducts(0, 1000);
    if (newProducts) {
      const newSignedImagePaths = await Promise.all(
        newProducts?.content?.map((product) =>
          dashboardApi.getSignedImagePath(product.link),
        ),
      );

      const productData = newProducts?.content?.map((item, index) => ({
        ...item,
        price: item.price,
        image: newSignedImagePaths[index],
      }));
      setProducts(productData);
    }
  }

  async function loadTaxInfo() {
    const info = await dashboardApi.getTaxInfo();
    if (info && info[0]) {
      setTaxInfo(JSON.parse(info[0].vatPercent));
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
    if (priceAsFloat <= 0) {
      setErrorMessage(t("products.error.priceAsFloat"));
      return;
    }

    // Set stock to -1 if not given
    let stockRequest;
    if (unlimit || stock === null || stock === "") {
      stockRequest = -1;
    } else {
      const stockAsInt = parseInt(parseFloat(stock).toString());
      if (stockAsInt < 0) {
        setStock("");
        stockRequest = -1;
      } else {
        setStock(stockAsInt.toString());
        stockRequest = stockAsInt;
      }
    }
    if (!vatPercent) {
      setErrorMessage(t("products.error.chooseVat"));
      return;
    }

    const resp1 = await dashboardApi.upsertProduct(
      productLink,
      name,
      description,
      priceAsFloat,
      currency ?? "USD",
      stockRequest,
      vatPercent,
    );

    let resp2 = true;
    if (resp1 && imageChanged) {
      const imageProductLink = resp1.link;

      if (image) {
        console.log("Uploading image for product link: " + imageProductLink);
        resp2 = await dashboardApi.uploadProductImage(imageProductLink, image);
      } else {
        resp2 = await dashboardApi.deleteProductImage(imageProductLink, image);
      }
      setImageChanged(false);
    }

    if (resp1 && resp2) {
      if (productLink !== null)
        setInfoMessage(t("products.createProductModal.updatedSuccessfully"));
      else setInfoMessage(t("products.createProductModal.addedSuccessfully"));
    } else {
      if (productLink !== null)
        setErrorMessage(t("products.createProductModal.updateError"));
      else setErrorMessage(t("products.createProductModal.addError"));
    }

    loadProducts();
    setOpenModal(false);
  };

  const deleteProduct = async (link) => {
    const resp = await dashboardApi.deleteProduct(link);
    if (resp) {
      setInfoMessage(t("products.createProductModal.deletedSuccessfully"));
    } else {
      setErrorMessage(t("products.createProductModal.deletedError"));
    }
    loadProducts();
  };

  function showModal(link) {
    if (link) {
      const product = products.find((product) => product.link === link);

      setProductLink(link);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toFixed(2));
      setCurrency(product.currency);
      if (product.stock != "-1") {
        setStock(product.stock);
        setUnlimit(false);
      } else {
        setStock("");
        setUnlimit(true);
      }
      setVatPercent(product.vatPercent);
      // let imageName = null;
      // if (product.s3Key) imageName = product?.s3Key?.split("_")[1];
      setImage(product.image);

      setOpenModal("update");
    } else {
      setProductLink(null);
      setName("");
      setDescription("");
      setPrice("");
      setCurrency("USD");
      setStock("");
      setUnlimit(true);
      setVatPercent("");
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
              key={item.link}
              product={item}
              onClickEdit={() => showModal(item.link)}
              onClickDelete={() => deleteProduct(item.link)}
            />
          ))}
        </div>
      </Card>

      <div>
        <Popup
          show={openModal}
          title={
            openModal === "add"
              ? t("products.createProductModal.createProduct")
              : t("products.editProduct")
          }
          onClose={() => {
            clearMessages();
            setOpenModal(false);
            setProductLink(null);
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 0.5fr",
                  gap: "1rem",
                }}
              >
                <Input
                  dashboard
                  label={t("products.createProductModal.priceLabel").concat(
                    "*",
                  )}
                  placeholder={t(
                    "products.createProductModal.pricePlaceholder",
                  )}
                  value={price}
                  setState={setPrice}
                  number
                />
                <CurrencySelectWithLabel
                  label={t("products.createProductModal.currency").concat("*")}
                  value={currency}
                  setValue={setCurrency}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("products.createProductModal.stockLabel")}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <RadioOption
                      icon={theme === "dark" ? InfiniteDark : InfiniteLight}
                      content={t("products.createProductModal.limitless")}
                      value={unlimit}
                      onClick={() => {
                        setUnlimit(true);
                      }}
                      horizon={true}
                      style={{
                        width: "50%",
                      }}
                    />
                    <RadioOption
                      icon={theme === "dark" ? BoxDark : BoxLight}
                      content={t("products.createProductModal.quantity")}
                      value={!unlimit}
                      onClick={() => {
                        setUnlimit(false);
                        setStock(stock ? stock : 1);
                      }}
                      horizon={true}
                      style={{
                        width: "50%",
                      }}
                    />
                  </div>
                </div>
                <Spinner
                  label={t("products.createProductModal.stockAvailable")}
                  value={stock}
                  setValue={setStock}
                  dashboard
                  disabled={unlimit}
                />
              </div>
              <RadioSelect
                label={t("products.createProductModal.vat")}
                value={vatPercent}
                setValue={setVatPercent}
                options={
                  taxInfo
                    ? taxInfo.map((tax, index) => {
                        return {
                          value: tax,
                          label: tax + "%",
                          content: index == 0 ? "Standard" : "Reduced",
                        };
                      })
                    : []
                }
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
          if (!croppedImageData) return;
          setImage(dataURLtoFile(croppedImageData, image.name));
        }}
      />
    </>
  );
};

export default ProductBody;
