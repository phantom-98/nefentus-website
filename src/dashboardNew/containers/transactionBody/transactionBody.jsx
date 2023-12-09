import { useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Table from "../../components/table/table";
import TableAction from "../../components/tableAction/tableAction";
import TableSearch from "../../components/tableSearch/tableSearch";
import TableStatus from "../../components/tableStatus/tableStatus";
import moment from "moment";
import { formatUSDBalance } from "../../../utils";
import { useTranslation } from "react-i18next";

const TransactionBody = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const dashboardApi = new vendorDashboardApi();
  const [totalAmount, setTotalAmount] = useState(0);
  const { t } = useTranslation();

  const label = [
    t("transactions.table.product"),
    t("transactions.table.order"),
    t("transactions.table.email"),
    t("transactions.table.amount"),
    t("transactions.table.currency"),
    t("transactions.table.transaction"),
    t("transactions.table.date"),
    t("transactions.table.earnings"),
    t("transactions.table.action"),
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    let newOrders = await dashboardApi.getOrders();
    // Reverse the array
    newOrders = newOrders.reverse();

    if (newOrders) {
      let total = 0;
      newOrders.forEach((order) => {
        total = total + order.totalPrice;
      });
      const newOrderData = newOrders.map((order) => orderToArray(order));
      const newOrderIds = newOrders.map((order) => order.id);
      setTotalAmount(total);
      setOrderData(newOrderData);
      setOrderIds(newOrderIds);
    }
  }

  function orderToArray(order) {
    return [
      order.product ? order.product.name : t("payment.customPayment"),
      `#${order.id}`,
      order.invoice?.user?.email,
      `${order.totalPrice}`,
      <TableStatus color="blue">{order.currency}</TableStatus>,
      `#${order.invoice.id}`,
      moment(order.updatedAt).format("MMM D, YYYY"),
      `$${order.totalPrice}`,
      <TableAction button2="Details" />,
    ];
  }

  return (
    <div>
      <TableSearch
        title={t("transactions.title")}
        description={`${t("transactions.subtitle")} ${totalAmount}$`}
      />
      <Table
        grid="1.4fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr"
        label={label}
        data={orderData}
      />
    </div>
  );
};

export default TransactionBody;
