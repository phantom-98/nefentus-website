import { useEffect, useState, useRef } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Table from "../../components/table/table";
import TableAction from "../../components/tableAction/tableAction";
import TableSearch from "../../components/tableSearch/tableSearch";
import TableStatus from "../../components/tableStatus/tableStatus";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { TransactionInfo } from "../../components/popup/popup";
import styles from "./transactionBody.module.css";
import { useAuth } from "../../../context/auth/authContext";
import { formatUSDBalance } from "../../../utils";

const TransactionBody = () => {
  const [orderData, setOrderData] = useState([]);
  const dashboardApi = new vendorDashboardApi();
  const [totalAmount, setTotalAmount] = useState(0);
  const [getDataInput, setGetDataInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [detail, setDetail] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const { t } = useTranslation();
  const { currencyRate } = useAuth();

  const label = [
    t("transactions.table.product"),
    t("transactions.table.transaction"),
    t("transactions.table.email"),
    t("transactions.table.currency"),
    t("transactions.table.invoice"),
    t("transactions.table.date"),
    t("transactions.table.earnings").concat("(" + currencyRate.symbol + ")"),
    t("transactions.table.action"),
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    let list = await dashboardApi.getOrders();
    // Reverse the array
    list = list.reverse();

    if (list) {
      let total = 0;
      list.forEach((item) => {
        total = total + item.order.totalPrice;
      });
      const newOrderData = list.map((item) =>
        orderToArray(item.order, item.hash),
      );
      setTotalAmount(total);
      setOrderData(newOrderData);
      setFilteredData(newOrderData);
    }
  }

  const showDetails = async (hash) => {
    const data = await dashboardApi.getTransaction(hash);
    if (data) {
      setTransaction(data);
      setDetail(true);
    }
  };

  function orderToArray(order, hash) {
    return [
      order.invoice?.product
        ? order.invoice?.product.name
        : t("payment.customPayment"),
      <CopyValue link={hash} />,
      order.invoice?.user?.email,
      <TableStatus color="blue">{order.currency}</TableStatus>,
      <CopyValue
        title={order.invoice.link}
        link={`${window.location.origin}/pay/${order.invoice.link}`}
      />,
      moment(order.updatedAt).format("MMM D YYYY, HH:mm:ss"),
      `${currencyRate.symbol}${formatUSDBalance(
        order.totalPrice * currencyRate.rate,
      )}`,
      <TableAction
        button2={t("transactions.table.details")}
        onClick2={() => showDetails(hash)}
      />,
    ];
  }

  const findUser = () => {
    if (getDataInput.trim() == "") {
      setFilteredData(orderData);
    } else {
      const matchingSubarrays = [];
      orderData.forEach((innerArray) => {
        if (
          innerArray.some(
            (innerValue) =>
              innerValue &&
              typeof innerValue === "string" &&
              innerValue
                .toLowerCase()
                .includes(getDataInput.trim().toLowerCase()),
          )
        ) {
          matchingSubarrays.push(innerArray);
        }
      });
      setFilteredData([...matchingSubarrays]);
    }
  };

  return (
    <div>
      <TableSearch
        title={t("transactions.title")}
        description={`${t("transactions.subtitle")} ${formatUSDBalance(
          totalAmount * currencyRate.rate,
        )}${currencyRate.symbol}`}
        users={filteredData}
        setGetDataInput={setGetDataInput}
        findUser={findUser}
        getDataInput={getDataInput}
      />
      <Table
        grid="1.4fr 1.4fr 2fr 1fr 1.4fr 1.2fr 1fr 1fr"
        label={label}
        data={filteredData}
      />
      {transaction && (
        <TransactionInfo
          show={detail}
          setShow={setDetail}
          transaction={transaction}
        />
      )}
    </div>
  );
};

export default TransactionBody;

const CopyValue = ({ link, title }) => {
  const { t } = useTranslation();
  const ref = useRef();

  const formatLink = (cp) => {
    if (!cp) return "unknown";
    if (cp.length <= 18) return cp;
    return (
      cp.substring(0, 8) + " ... " + cp.substring(cp.length - 8, cp.length)
    );
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link);

    ref.current.style.visibility = "visible";
    ref.current.style.opacity = "1";
    setTimeout(() => {
      ref.current.style.visibility = "hidden";
      ref.current.style.opacity = "0.3";
    }, 2000);
  };

  return (
    <>
      <div
        onClick={copyLinkToClipboard}
        title={title ? title : link}
        className={styles.container}
      >
        <span className={styles.tooltip} ref={ref}>
          {t("sidebar.copied")}
        </span>
        {formatLink(title ? title : link)}
      </div>
    </>
  );
};
