import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer, Flex, Typography } from "antd";
import Input, {
  Attachment,
  CurrencySelectWithLabel,
  RadioOption,
  RadioSelect,
  Spinner,
  Textarea,
} from "../../../components/input/input";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/themeContext/themeContext";
import InfiniteDark from "../../../assets/icon/dark/infinite.svg";
import InfiniteLight from "../../../assets/icon/light/infinite.svg";
import BoxDark from "../../../assets/icon/dark/box.svg";
import BoxLight from "../../../assets/icon/light/box.svg";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import "./addProduct.css";
import { MessageContext } from "../../../context/message";

const AddProduct = ({
  open,
  onClose,
  isMobile,
  reloadProduct,
  selectedProduct,
}) => {
  const { Title, Text, Paragraph } = Typography;
  const dashboardApi = new vendorDashboardApi();
  const { setInfoMessage, setErrorMessage } = useContext(MessageContext);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [imageChanged, setImageChanged] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [taxInfo, setTaxInfo] = useState([]);
  const [progressImage, setProgressImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    image: null,
    price: "",
    currency: "USD",
    unlimit: false,
    stock: "",
    vatPercent: "",
    name: "",
    description: "",
    productLink: null,
  });

  useEffect(() => {
    loadTaxInfo();
  }, []);

  useEffect(() => {
    if (Object.keys(selectedProduct)?.length) {
      delete selectedProduct?.user;
      setProduct({
        ...selectedProduct,
        productLink: selectedProduct?.link,
        stock: selectedProduct?.stock < 0 ? "" : selectedProduct?.stock,
        unlimit: selectedProduct?.stock < 0,
      });
    }
  }, [selectedProduct]);

  const loadTaxInfo = async () => {
    const info = await dashboardApi.getTaxInfo();
    if (info && info[0]) {
      setTaxInfo(JSON.parse(info[0].vatPercent));
    }
  };

  const addOrUpdateProduct = async () => {
    setLoading(true);
    if (!product?.name) {
      setLoading(false);
      setErrorMessage(t("products.error.name"));
      return;
    }
    if (!product?.description) {
      setLoading(false);
      setErrorMessage(t("products.error.description"));
      return;
    }
    if (!product?.price) {
      setLoading(false);
      setErrorMessage(t("products.error.price"));
      return;
    }
    let priceAsFloat = null;
    priceAsFloat = parseFloat(product?.price);
    if (priceAsFloat <= 0) {
      setLoading(false);
      setErrorMessage(t("products.error.priceAsFloat"));
      return;
    }

    // Set stock to -1 if not given
    let stockRequest;
    if (product?.unlimit || product?.stock === null || product?.stock === "") {
      stockRequest = -1;
    } else {
      const stockAsInt = parseInt(parseFloat(product?.stock).toString());
      if (stockAsInt < 0) {
        setProduct({ ...product, stock: "" });
        stockRequest = -1;
      } else {
        setProduct({ ...product, stock: stockAsInt.toString() });
        stockRequest = stockAsInt;
      }
    }
    if (!product?.vatPercent) {
      setLoading(false);
      setErrorMessage(t("products.error.chooseVat"));
      return;
    }

    const resp1 = await dashboardApi.upsertProduct(
      product?.productLink,
      product?.name,
      product?.description,
      priceAsFloat,
      product?.currency ?? "USD",
      stockRequest,
      product?.vatPercent,
    );

    let resp2 = true;
    if (resp1 && imageChanged) {
      const imageProductLink = resp1.link;

      if (product?.image) {
        resp2 = await dashboardApi.uploadProductImage(
          imageProductLink,
          product?.image,
        );
      } else {
        resp2 = await dashboardApi.deleteProductImage(
          imageProductLink,
          product?.image,
        );
      }
      setImageChanged(false);
    }
    setLoading(false);
    if (resp1 && resp2) {
      if (product?.productLink !== null)
        setInfoMessage(t("products.createProductModal.updatedSuccessfully"));
      else setInfoMessage(t("products.createProductModal.addedSuccessfully"));
    } else {
      if (product?.productLink !== null)
        setErrorMessage(t("products.createProductModal.updateError"));
      else setErrorMessage(t("products.createProductModal.addError"));
    }
    reloadProduct();
  };

  return (
    <Drawer
      title={
        <Flex justify={"space-between"} align={"center"}>
          <Title level={4} style={{ margin: "0" }}>
            {Object.keys(selectedProduct)?.length > 0
              ? t("products.createProductModal.updateProduct")
              : t("products.createProductModal.createProduct")}
          </Title>
          <Button type="text" onClick={() => onClose()}>
            {/* <img src={CloseIcon} alt="CloseIcon" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.2501 4.75843C14.9251 4.43343 14.4001 4.43343 14.0751 4.75843L10.0001 8.8251L5.9251 4.7501C5.6001 4.4251 5.0751 4.4251 4.7501 4.7501C4.4251 5.0751 4.4251 5.6001 4.7501 5.9251L8.8251 10.0001L4.7501 14.0751C4.4251 14.4001 4.4251 14.9251 4.7501 15.2501C5.0751 15.5751 5.6001 15.5751 5.9251 15.2501L10.0001 11.1751L14.0751 15.2501C14.4001 15.5751 14.9251 15.5751 15.2501 15.2501C15.5751 14.9251 15.5751 14.4001 15.2501 14.0751L11.1751 10.0001L15.2501 5.9251C15.5668 5.60843 15.5668 5.0751 15.2501 4.75843Z"
                fill="#B1B1B1"
              />
            </svg>
          </Button>
        </Flex>
      }
      width={isMobile ? 390 : 500}
      closable={false}
      onClose={onClose}
      open={open}
      className="product-drawer-container"
    >
      <div className="modalInputs">
        <Attachment
          label={t("products.createProductModal.imageLabel")}
          onUpload={(file) => {
            setProgressImage(file);
            setImageChanged(true);
            setCropDialogOpen(true);
          }}
          onDelete={() => {
            setProgressImage(null);
            setImageChanged(true);
          }}
          value={product.image}
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
            label={t("products.createProductModal.priceLabel").concat("*")}
            placeholder={t("products.createProductModal.pricePlaceholder")}
            value={product?.price}
            setState={(value) => setProduct({ ...product, price: value })}
            number
          />
          <CurrencySelectWithLabel
            label={t("products.createProductModal.currency").concat("*")}
            value={product?.currency}
            setValue={(value) => setProduct({ ...product, currency: value })}
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
                value={product?.unlimit}
                onClick={() => setProduct({ ...product, unlimit: true })}
                horizon={true}
                style={{
                  width: "50%",
                }}
              />
              <RadioOption
                icon={theme === "dark" ? BoxDark : BoxLight}
                content={t("products.createProductModal.quantity")}
                value={!product?.unlimit}
                onClick={() =>
                  setProduct({
                    ...product,
                    unlimit: false,
                    stock: product?.stock || 1,
                  })
                }
                horizon={true}
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
          <Spinner
            label={t("products.createProductModal.stockAvailable")}
            value={product?.stock}
            setValue={(value) => setProduct({ ...product, stock: value })}
            isDrawer
            dashboard
            disabled={product?.unlimit}
          />
        </div>
        <RadioSelect
          label={t("products.createProductModal.vat")}
          value={product?.vatPercent}
          setValue={(value) => setProduct({ ...product, vatPercent: value })}
          options={
            taxInfo?.length > 0
              ? taxInfo.map((tax, index) => {
                  return {
                    value: tax,
                    label: tax + "%",
                    content:
                      index == 0
                        ? t("products.createProductModal.standard")
                        : t("products.createProductModal.reduced"),
                  };
                })
              : []
          }
        />
        <Input
          dashboard
          label={t("products.createProductModal.nameLabel") + "*"}
          placeholder={t("products.createProductModal.namePlaceholder")}
          value={product?.name}
          setState={(value) => setProduct({ ...product, name: value })}
        />
        <Textarea
          dashboard
          label={t("products.createProductModal.descriptionLabel") + "*"}
          placeholder={t("products.createProductModal.descriptionPlaceholder")}
          value={product?.description}
          setState={(value) => setProduct({ ...product, description: value })}
          rows={3}
        />
        <Flex align="center" justify="flex-end" gap={6}>
          <Button
            className="product-drawer-cancel"
            onClick={onClose}
            disabled={loading}
          >
            {t("products.createProductModal.cancel")}
          </Button>
          <Button
            className="product-drawer-save"
            onClick={addOrUpdateProduct}
            loading={loading}
            disabled={loading}
          >
            {Object.keys(selectedProduct)?.length > 0
              ? t("products.createProductModal.update")
              : t("products.createProductModal.add")}
          </Button>
        </Flex>
      </div>
      <CropDialog
        open={cropDialogOpen}
        file={progressImage}
        onClose={() => setCropDialogOpen(false)}
        onSave={(croppedImageData) => {
          setCropDialogOpen(false);
          if (!croppedImageData) return;
          setProduct({
            ...product,
            image: dataURLtoFile(croppedImageData, progressImage?.name),
          });
        }}
      />
    </Drawer>
  );
};

export default AddProduct;
