import { useEffect, useState } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";
import PaymentForm from "../components/paymentForm/paymentForm";
import Table from "../components/table/table";
import TableAction from "../components/tableAction/tableAction";
import TableQR from "../components/tableQR/tableQR";
import TableSearch from "../components/tableSearch/tableSearch";
import TableStatus from "../components/tableStatus/tableStatus";
import vendorDashboardApi from "../../api/vendorDashboardApi";
import SignupByEmail from "../../components/signupByEmail/signupByEmail";
import { useTranslation } from "react-i18next";
import { checkJwtToken, formatUSDBalance } from "../../utils";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/auth/authContext";

const PaymentDashboard = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoadingInvoiceData, setIsLoadingInvoiceData] = useState(false);
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  const vendorAPI = new vendorDashboardApi();
  const label = [
    t("payments.table.created"),
    t("payments.table.price").concat("(" + currencyRate.symbol + ")"),
    t("payments.table.status"),
    t("payments.table.qr"),
    t("payments.table.actions"),
  ];
  useEffect(() => {
    fetchInvoices();
  }, [isLoadingInvoiceData]);

  async function fetchInvoices() {
    await checkJwtToken();
    let newInvoices = await vendorAPI.getInvoices();
    // Reverse the array
    newInvoices = newInvoices.reverse();

    if (newInvoices) {
      setInvoices(newInvoices);
      const newInvoiceData = newInvoices.map((item) => invoiceToArray(item));
      setInvoiceData(newInvoiceData);
    }
  }

  useEffect(() => {
    if (invoices) {
      const _invoiceData = invoiceData.map((item, index) => {
        const _row = item;
        _row[1] = formatUSDBalance(
          parseFloat(invoices[index].price) * currencyRate.rate,
        );
        return _row;
      });
      setInvoiceData(_invoiceData);
    }
  }, [currencyRate]);

  function invoiceToArray(invoice) {
    return [
      new Date(invoice.createdAt).toLocaleString(),
      formatUSDBalance(parseFloat(invoice.price) * currencyRate.rate),
      <TableStatus color={invoice.paidAt ? "green" : "blue"}>
        {invoice.paidAt ? t("general.paid") : t("general.open")}
      </TableStatus>,
      <TableQR
        data={invoice}
        link={`${window.location.origin}/pay/${invoice.link}`}
      />,
      // <TableQR link={`${window.location.origin}/pay/${invoice.link}`} />,
      <TableAction deleteUser={() => deleteInvoice(invoice.link)} />,
    ];
  }

  async function deleteInvoice(link) {
    const result = await vendorAPI.deleteInvoice(link);
    if (result) {
      setIsLoadingInvoiceData((prev) => !prev);
      setInfoMessage(t("messages.success.deleteInvoice"));
    } else {
      setIsLoadingInvoiceData((prev) => !prev);
      setErrorMessage(t("messages.error.deleteInvoice"));
    }
  }

  return (
    <div>
      <Helmet>
        <title>Nefentus | {t("navigation.payment")}</title>
      </Helmet>
      <ThirdwebProvider
        activeChain="ethereum"
        supportedWallets={[metamaskWallet()]}
        clientId="639eea2ebcabed7eab90b56aceeed08b"
      >
        <PaymentForm setLoadingData={setIsLoadingInvoiceData} />
        <Table grid="1fr 1fr 1fr 1fr 1fr" label={label} data={invoiceData} />
      </ThirdwebProvider>
      <SignupByEmail />
    </div>
  );
};

export default PaymentDashboard;
