import react, { useEffect, useState } from "react";
import CreateInvoice from "./CreateInvoice";
import { Col, Row } from "antd";
import InvoicePreview from "./invoicePreview";
import { currencies } from "../../../constants";
import usePrices from "../../../hooks/prices";

const CreateInvoiceDashboard = () => {
  let { prices, fetchPrices } = usePrices();
  const [invoice, setInvoice] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    company: "",
    invoiceNo: 1000,
    taxNumber: "",
    taxPercent: "",
    currency: "USD",
    qrValue: "",
    reverseCharge: false,
    isPerson: true,
    amount: 0,
    note: "",
    taxInfo: "",
    items: [
      {
        name: "",
        price: 0,
        quantity: 1,
        total: 0,
      },
    ],
    transactionCost: {
      cryptoValue: 0.000589584,
      amount_dollar: 0,
    },
    swapCost: 0,
    totalDue: 0,
  });

  useEffect(() => {
    fetchPrices();
  }, []);
  useEffect(() => {
    TransactionPriceInDollar();
  }, [prices]);
  const TransactionPriceInDollar = async () => {
    const index = currencies()?.findIndex(
      (currency) => currency?.blockchain == "BNB" && currency?.abbr == "BNB",
    );

    setInvoice({
      ...invoice,
      transactionCost: {
        ...invoice?.transactionCost,
        amount_dollar: invoice?.transactionCost?.cryptoValue * prices[index],
      },
    });
  };

  return (
    <>
      <div className="create-invoice-container">
        <Row>
          <Col lg={12} span={24}>
            <CreateInvoice invoice={invoice} setInvoice={setInvoice} />
          </Col>
          <Col lg={12} span={24}>
            <InvoicePreview invoice={invoice} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateInvoiceDashboard;
