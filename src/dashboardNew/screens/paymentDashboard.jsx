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
  const { rateList, currencyRate } = useAuth();

  const calcRate = (currency) => {
    const res = rateList.find((item) => item.to === currency);
    if (rateList && res) {
      return res.rate;
    } else return 1;
  };

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
    let newInvoices = await vendorAPI.getInvoices(0, 1000);
    // Reverse the array
    newInvoices = { ...newInvoices, content: newInvoices?.content.reverse() };

    if (newInvoices?.content) {
      setInvoices(newInvoices?.content);
      const newInvoiceData = newInvoices?.content?.map((item) =>
        invoiceToArray(item),
      );
      setInvoiceData(newInvoiceData);
    }
  }

  useEffect(() => {
    if (invoices) {
      const _invoiceData = invoiceData.map((item, index) => {
        const _row = item;
        _row[1] = formatUSDBalance(
          parseFloat(invoices[index].price) /
            calcRate(invoices[index].currency),
        );
        return _row;
      });
      setInvoiceData(_invoiceData);
    }
  }, [rateList]);

  function invoiceToArray(invoice) {
    return [
      new Date(invoice.createdAt).toLocaleString(),
      formatUSDBalance(parseFloat(invoice.price) / calcRate(invoice.currency)),
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
        <div
          style={{
            background: "var(--bg2-color)",
            borderRadius: "1rem",
          }}
        >
          <PaymentForm setLoadingData={setIsLoadingInvoiceData} />
          <Table grid="1fr 1fr 1fr 1fr 1fr" label={label} data={invoiceData} />
        </div>
      </ThirdwebProvider>
      <SignupByEmail />
    </div>
  );
};

export default PaymentDashboard;
