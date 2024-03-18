import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import PayBody from "../components/payBody";

const Pay = () => {
  const [invoice, setInvoice] = useState({});
  const params = useParams();
  const payLink = params.payLink;
  const backend_API = new backendAPI();

  async function loadInvoice() {
    const newInvoice = await backend_API.getInvoice(payLink);
    if (newInvoice) setInvoice(newInvoice);
    console.log(newInvoice, "invoice", payLink);
  }

  useEffect(() => {
    loadInvoice();
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Pay invoice | Nefentus</title>
      </Helmet>
      <PayBody invoice={invoice} />
    </div>
  );
};

export default Pay;
