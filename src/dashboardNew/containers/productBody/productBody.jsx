import { useContext, useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Card from "../../components/card/card";
import ProductCard from "../../components/productCard/productCard";
import SettingsTitle from "../../components/settings/settingsTitle";
import styles from "./productBody.module.css";
import { MessageContext } from "../../../context/message";
import ModalOverlay from "../../../dashboard/modal/modalOverlay";
import MessageComponent from "../../../components/message";
import Input, { Textarea, Attachment } from "../../../components/input/input";
import CropDialog, {
  dataURLtoFile,
} from "../../../components/cropDialog/cropDialog";
import Button from "../../../components/button/button";

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

  const dashboardApi = new vendorDashboardApi();

  const { setInfoMessage, setErrorMessage, clearMessages } =
    useContext(MessageContext);

  useEffect(() => {
    loadProducts();
  }, []);

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
      setErrorMessage("Name is required!");
      return;
    }
    if (!description) {
      setErrorMessage("Description is required!");
      return;
    }
    if (!price) {
      setErrorMessage("Price is required!");
      return;
    }
    let priceAsFloat = null;
    priceAsFloat = parseFloat(price);
    if (!priceAsFloat) {
      setErrorMessage("Price must be a number!");
    }

    const resp1 = await dashboardApi.upsertProduct(
      productId,
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
      if (productId !== null) setInfoMessage("Product updated successfully!");
      else setInfoMessage("Product added successfully!");
    } else {
      if (productId !== null) setErrorMessage("Could not update the product!");
      else setErrorMessage("Could not add a new product!");
    }

    loadProducts();
    setOpenModal(false);
  };

  const deleteProduct = async (productId) => {
    const resp = await dashboardApi.deleteProduct(productId);
    if (resp) {
      setInfoMessage("Product deleted successfully!");
    } else {
      setErrorMessage("Could not delete the product!");
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
      <Card>
        <div className={styles.titleHeader}>
          <SettingsTitle
            title="Total Products"
            description="You’ve added 3 new product this month"
            product
            onCreate={handleProductClick}
          />
        </div>

        <div className={styles.row}>
          {products.map((item) => (
            <ProductCard
              product={item}
              onClickEdit={() => showModal(item.id)}
              onClickDelete={() => deleteProduct(item.id)}
            />
          ))}
        </div>
      </Card>

      <div className={styles.modalWrapper}>
        {openModal !== false && (
          <ModalOverlay>
            <div className={styles.modal}>
              <h4>{openModal === "add" ? "Create" : "Update"} Product</h4>

              <MessageComponent />

              <div className={styles.modalInputs}>
                <Attachment
                  label="Product image"
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
                  label="Name*"
                  placeholder="Enter name"
                  value={name}
                  setState={setName}
                />
                <Textarea
                  dashboard
                  label="Description*"
                  placeholder="Enter description"
                  value={description}
                  setState={setDescription}
                  rows={2}
                />
                <Input
                  dashboard
                  label="Price*"
                  placeholder="Enter price"
                  value={price}
                  setState={setPrice}
                  number
                />
                <Input
                  dashboard
                  label="Stock"
                  placeholder="Enter stock if limited stock"
                  value={stock}
                  setState={setStock}
                  number
                />
              </div>
              <div className={styles.modalButtons}>
                <div
                  className={styles.button}
                  onClick={() => {
                    clearMessages();
                    setOpenModal(false);
                    setProductId(null);
                  }}
                >
                  Cancel
                </div>
                <Button onClick={addOrUpdateProduct} color="white">
                  {openModal === "add" ? "Add" : "Update"} Product
                </Button>
              </div>
            </div>
          </ModalOverlay>
        )}
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
