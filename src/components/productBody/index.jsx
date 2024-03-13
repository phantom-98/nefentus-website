import styles from "./productBody.module.css";
import { useState, useEffect } from "react";
import ReceivePayment from "../receivePayment";
import backendAPI from "../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { PaymentInfo, ProductInfo } from "../receivePayment";

const ProductBody = ({ product, quantity }) => {
  const backend_API = new backendAPI();
  const [imageSource, setImageSource] = useState(null);
  const { t } = useTranslation();
  async function fetchProductImage() {
    if (product.s3Key) {
      const newImageSource = await backend_API.getProductImage(product.link);
      if (newImageSource) setImageSource(newImageSource);
    }
  }

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const [changed, setChanged] = useState(false);
  const [amount, setAmount] = useState(quantity || 1);
  const [link, setLink] = useState(null);
  const [price, setPrice] = useState(0);

  const updateInvoiceData = async () => {
    const req = {
      amountUSD: price,
      name,
      email,
      company,
      address,
      taxNumber: tax,
      productLink: product.link,
      productAmount: amount,
    };
    const data = await backend_API.updateInvoice(link, req);
    if (data) {
      setLink(data.link);
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  useEffect(() => {
    if (product) {
      fetchProductImage();
      setPrice(product.price * amount);
    }
  }, [product]);

  useEffect(() => {
    if (changed) {
      updateInvoiceData();
      setChanged(false);
    }
  }, [changed]);

  useEffect(() => {
    if (product.stock != -1 && amount > product.stock) {
      setAmount(product.stock);
    }
    if (amount >= 0) {
      setPrice(product.price * amount);
    } else {
      setPrice(0);
    }
  }, [amount]);

  return (
    <ReceivePayment
      priceUSD={price}
      seller={product.user}
      transInfoArg={{ productLink: product.link, invoiceLink: link }}
      valid={name && email}
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
          amount={amount}
          setAmount={setAmount}
          setChanged={setChanged}
        />
      }
    />
  );
};

export default ProductBody;
