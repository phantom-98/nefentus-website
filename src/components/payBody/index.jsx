import styles from "./payBody.module.css";
import ReceivePayment from "../receivePayment";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { PaymentInfo, ProductInfo } from "../receivePayment";
import backendAPI from "../../api/backendAPI";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import { useAuth } from "../../context/auth/authContext";

const PayBody = ({ invoice }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [isPerson, setPerson] = useState();
  const [tax, setTax] = useState();
  const [taxInfo, setTaxInfo] = useState();
  const [percent, setPercent] = useState();
  const [reverseCharge, setReverseCharge] = useState();
  const [changed, setChanged] = useState(false);
  const [amount, setAmount] = useState(1);
  const [imageSource, setImageSource] = useState(null);
  const [price, setPrice] = useState(0);
  const [disable, setDisable] = useState(false);
  // const { user } = useAuth();
  const backend_API = new backendAPI();

  async function fetchProductImage(product) {
    if (product.s3Key) {
      const newImageSource = await backend_API.getProductImage(product.link);
      if (newImageSource) setImageSource(newImageSource);
    }
  }
  async function fetchTaxInfo(country) {
    const info = await backend_API.getTaxInfo(country);
    if (info && info[0]) {
      setTaxInfo(info[0]);
    }
  }

  useEffect(() => {
    fetchTaxInfo(invoice.user?.country);
    setEmail(invoice.email);
    setName(invoice.name);
    setCompany(invoice.company);
    setCountry(invoice.country);
    setAddress(invoice.address);
    setPerson(invoice.person);
    setTax(invoice.taxNumber);
    if (invoice.vatPercent) {
      setPercent(invoice.vatPercent);
    } else {
      setPercent(invoice.product?.vatPercent);
    }
    setAmount(invoice.productAmount);
    if (invoice.product) {
      fetchProductImage(invoice.product);
      setPrice(invoice.product.price * invoice.productAmount);
    } else {
      setPrice(invoice.price);
    }
    if (invoice.paidAt) {
      setDisable(true);
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
      country,
      address,
      person: isPerson,
      taxNumber: tax,
      vatPercent: percent,
      reverseCharge,
      productLink: invoice.product ? invoice.product.link : null,
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
        invoiceLink: invoice.link,
        productLink: invoice.product ? invoice.product.link : null,
      }}
      vatPercent={reverseCharge ? null : percent}
      valid={name && email}
      disabled={disable}
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
          // percent={percent}
          // setPercent={setPercent}
          // reverseCharge={reverseCharge}
          setReverseCharge={setReverseCharge}
          taxInfo={taxInfo}
          setChanged={setChanged}
          // isSeller={user && invoice.user?.email === user?.email}
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
