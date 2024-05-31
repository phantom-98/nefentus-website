import { useState } from "react";
import CreateInvoice from "./CreateInvoice";
import { Col, Row } from "antd";
import InvoicePreview from "./invoicePreview";

const CreateInvoiceDashboard = () => {
  const [invoice, setInvoice] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    company: "",
    invoiceNo: "",
    taxNumber: "",
    taxPercent: "",
    currency: "USD",
    qrValue: "",
    reverseCharge: false,
    isPerson: true,
    amount: "",
    note: "",
    taxInfo: 0,
    items: [
      {
        name: "",
        price: 0,
        quantity: 1,
        total: 0,
      },
    ],
  });

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
