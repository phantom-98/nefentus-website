import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { PaymentInfo, ProductInfo } from "../receivePayment";
import backendAPI from "../../api/backendAPI";

const PayBody = ({ invoice }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const [changed, setChanged] = useState(false);
  const [amount, setAmount] = useState(1);
  const [imageSource, setImageSource] = useState(null);
  const [price, setPrice] = useState(0);
  const backend_API = new backendAPI();

  async function fetchProductImage(product) {
    if (product.s3Key) {
      const newImageSource = await backend_API.getProductImage(product.link);
      if (newImageSource) setImageSource(newImageSource);
    }
  }

  useEffect(() => {
    setEmail(invoice.email);
    setName(invoice.name);
    setCompany(invoice.company);
    setAddress(invoice.address);
    setTax(invoice.taxNumber);
    setAmount(invoice.productAmount);
    if (invoice.product) {
      fetchProductImage(invoice.product);
      setPrice(invoice.product.price * amount);
    } else {
      setPrice(invoice.price);
    }
  }, [invoice]);

  useEffect(() => {
    if (invoice.product) {
      if (invoice.product.stock != -1 && amount > invoice.product.stock) {
        setAmount(invoice.product.stock);
      }
      if (amount >= 0) {
        setPrice(invoice.product.price * amount);
      } else {
        setPrice(0);
      }
    }
  }, [amount]);

  const updateInvoiceData = async () => {
    const req = {
      amountUSD: price,
      name,
      email,
      company,
      address,
      taxNumber: tax,
      product: invoice.product,
      productAmount: amount,
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
      priceUSD={price}
      seller={invoice.user}
      transInfoArg={{
        invoiceId: invoice.id,
        productId: invoice.product ? invoice.product.id : null,
      }}
      disabled={!name || !email}
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
        invoice.product && (
          <ProductInfo
            productPic={imageSource}
            name={invoice.product.name}
            price={invoice.product.price}
            amount={amount}
            setAmount={setAmount}
            setChanged={setChanged}
          />
        )
      }
    />
  );
};

export default PayBody;
