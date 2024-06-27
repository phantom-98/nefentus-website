import styles from "./productBody.module.css";
import { useState, useEffect } from "react";
import ReceivePayment from "../receivePayment";
import backendAPI from "../../api/backendAPI";
import { useTranslation } from "react-i18next";
import { PaymentInfo, ProductInfo } from "../receivePayment";
// import { useAuth } from "../../context/auth/authContext";

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
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [isPerson, setPerson] = useState();
  const [tax, setTax] = useState(product.vatPercent);
  const [taxInfo, setTaxInfo] = useState();
  const [percent, setPercent] = useState();
  const [reverseCharge, setReverseCharge] = useState();
  const [changed, setChanged] = useState(false);
  const [amount, setAmount] = useState(quantity || 1);
  const [price, setPrice] = useState(0);

  async function fetchTaxInfo(country) {
    const info = await backend_API.getTaxInfo(country);
    if (info && info[0]) {
      setTaxInfo(info[0]);
    }
  }

  useEffect(() => {
    if (product) {
      fetchTaxInfo(product.user?.country);
      fetchProductImage();
      setPercent(product.vatPercent);
      setPrice(product.price * amount);
    }
  }, [product]);

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
      price={price}
      currency={product.currency}
      seller={product.user}
      transInfoArg={{ productLink: product.link }}
      vatPercent={reverseCharge ? null : percent}
      valid={name && email}
      info={
        <PaymentInfo
          fullName={name}
          setFullName={setName}
          email={email}
          setEmail={setEmail}
          country={country}
          setCountry={setCountry}
          address={address}
          setAddress={setAddress}
          isPerson={isPerson}
          setPerson={setPerson}
          business={company}
          setBusiness={setCompany}
          tax={tax}
          setTax={setTax}
          setReverseCharge={setReverseCharge}
          taxInfo={taxInfo}
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
      invoiceInfo={{
        amount: price,
        name,
        email,
        company,
        country,
        address,
        currency: product.currency ?? "USD",
        person: isPerson,
        taxNumber: tax,
        vatPercent: percent,
        reverseCharge,
        productLink: product.link,
        productAmount: amount,
      }}
    />
  );
};

export default ProductBody;
