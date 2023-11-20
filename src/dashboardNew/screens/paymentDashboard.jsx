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

const label = ["Created At", "Price ($)", "Status", "QR Code", "Actions"];

const PaymentDashboard = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoadingInvoiceData, setIsLoadingInvoiceData] = useState(false);
  const { t } = useTranslation();

  const vendorAPI = new vendorDashboardApi();
  const label = [
    t("payments.table.created"),
    t("payments.table.price"),
    t("payments.table.status"),
    t("payments.table.qr"),
    t("payments.table.actions"),
  ];
  useEffect(() => {
    fetchInvoices();
  }, [isLoadingInvoiceData]);

  async function fetchInvoices() {
    let newInvoices = await vendorAPI.getInvoices();
    // Reverse the array
    newInvoices = newInvoices.reverse();
    console.log(newInvoices, "newInvoices");

    if (newInvoices) {
      const newInvoiceData = newInvoices.map((item) => invoiceToArray(item));
      setInvoiceData(newInvoiceData);
    }
  }

  function invoiceToArray(invoice) {
    return [
      new Date(invoice.createdAt).toLocaleString(),
      parseFloat(invoice.price).toFixed(2),
      <TableStatus color="green">{t("general.open")}</TableStatus>,
      <TableQR data={invoice} link={process.env.VITE_REACT_APP_QR_CODE_LINK} />,
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
