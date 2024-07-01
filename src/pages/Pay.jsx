import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import backendAPI from "../api/backendAPI";
import PayBody from "../components/payBody";
import { Spin } from "antd";
import ContentNotFound from "../NEFDashboard/components/contentNotFound";
import InvoiceNotFound from "../assets/newDashboardIcons/invoice-not-found.svg";
import { useTranslation } from "react-i18next";

const Pay = () => {
  const { t } = useTranslation();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const payLink = params.payLink;
  const backend_API = new backendAPI();

  async function loadInvoice() {
    const newInvoice = await backend_API.getInvoice(payLink);
    if (newInvoice) setInvoice(newInvoice);
    setLoading(false);
  }

  useEffect(() => {
    loadInvoice();
  }, []);

  return loading ? (
    <Spin size="large" spinning={loading} fullscreen />
  ) : (
    <div
      className={invoice && Object.keys(invoice)?.length > 0 ? "container" : ""}
    >
      <Helmet>
        <title>Nefentus | {t("payments.payInvoice")}</title>
      </Helmet>
      {invoice && Object.keys(invoice)?.length > 0 ? (
        <PayBody invoice={invoice} />
      ) : (
        <ContentNotFound
          icon={InvoiceNotFound}
          title={"invoice.invoiceNotFoundTitle"}
          description={"invoice.invoiceNotFoundDescription"}
        />
      )}
    </div>
  );
};

export default Pay;
