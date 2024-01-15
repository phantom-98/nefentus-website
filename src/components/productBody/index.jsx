import styles from "./productBody.module.css";
import { useState, useEffect } from "react";
import ReceivePayment from "../receivePayment";
import TopInfo from "../../dashboard/topInfo/topInfo";
import backendAPI from "../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { PaymentInfo, ProductInfo } from "../receivePayment";

const ProductBody = ({ product }) => {
  const backend_API = new backendAPI();
  const [imageSource, setImageSource] = useState(null);
  const { t } = useTranslation();
  async function fetchProductImage() {
    if (product.s3Key) {
      console.log("Fetch image");
      const newImageSource = await backend_API.getProductImage(product.link);
      if (newImageSource) setImageSource(newImageSource);
    }
  }

  useEffect(() => {
    if (product) {
      fetchProductImage();
    }
  }, [product]);

  return (
    <ReceivePayment
      priceUSD={product.price}
      userId={product.user ? product.user.id : null}
      transInfoArg={{ productId: product.id }}
      disabled={product.stock === 0}
      info={
        <PaymentInfo
        // fullName={name}
        // setFullName={setName}
        // email={email}
        // setEmail={setEmail}
        // address={address}
        // setAddress={setAddress}
        // business={company}
        // setBusiness={setCompany}
        // tax={tax}
        // setTax={setTax}
        />
      }
      children={
        <ProductInfo
          productPic={imageSource}
          name={product.name}
          description={product.description}
          price={product.price}
          amount={product.stock}
        />
      }
    />
  );
};

export default ProductBody;
