import styles from "./productBody.module.css";
import { useState, useEffect } from "react";
import ReceivePayment from "../receivePayment";
import backendAPI from "../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { PaymentInfo, ProductInfo } from "../receivePayment";

const ProductBody = ({ product }) => {
  const backend_API = new backendAPI();
  const [imageSource, setImageSource] = useState(null);
  const { t } = useTranslation();
  async function fetchProductImage() {
    if (product.s3Key) {
      const newImageSource = await backend_API.getProductImage(product.link);
      if (newImageSource) setImageSource(newImageSource);
    }
  }

  useEffect(() => {
    if (product) {
      fetchProductImage();
    }
  }, [product]);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const [changed, setChanged] = useState(false);

  const updateInvoiceData = async () => {
    const req = {
      amountUSD: invoice.price,
      name,
      email,
      company,
      address,
      taxNumber: tax,
    };
    const data = await backend_API.updateInvoice(invoice.link, req);
    if (data) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  useEffect(() => {
    if (changed) {
      updateInvoiceData();
      setChanged(false);
    }
  }, [changed]);

  return (
    <ReceivePayment
      priceUSD={product.price}
      seller={product.user}
      transInfoArg={{ productId: product.id }}
      disabled={product.stock === 0}
      info={
        <PaymentInfo
          fullName={name}
          setFullName={setName}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          business={company}
          setBusiness={setCompany}
          tax={tax}
          setTax={setTax}
          setChanged={setChanged}
        />
      }
      children={
        <ProductInfo
          productPic={imageSource}
          name={product.name}
          price={product.price}
          amount={product.stock}
        />
      }
    />
  );
};

export default ProductBody;
