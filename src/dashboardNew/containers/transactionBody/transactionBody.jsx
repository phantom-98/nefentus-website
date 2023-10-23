import { useEffect, useState } from "react";
import vendorDashboardApi from "../../../api/vendorDashboardApi";
import Table from "../../components/table/table";
import TableAction from "../../components/tableAction/tableAction";
import TableSearch from "../../components/tableSearch/tableSearch";
import TableStatus from "../../components/tableStatus/tableStatus";
import moment from "moment";

const label = [
  "Product",
  "Order",
  "Email",
  "Amount",
  "Currency",
  "Transaction",
  "Date",
  "Earnings",
  "Action",
];

const TransactionBody = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const dashboardApi = new vendorDashboardApi();

  useEffect(() => {
    fetchOrders();
  });

  async function fetchOrders() {
    let newOrders = await dashboardApi.getOrders();
    // Reverse the array
    newOrders = newOrders.reverse();

    if (newOrders) {
      const newOrderData = newOrders.map((order) => orderToArray(order));
      const newOrderIds = newOrders.map((order) => order.id);
      setOrderData(newOrderData);
      setOrderIds(newOrderIds);
    }
  }

  function orderToArray(order) {
    return [
      order.product ? order.product.name : "Custom payment",
      `#${order.id}`,
      order.invoice?.user?.email,
      `${order.totalPrice}`,
      <TableStatus color="blue">{order.currency}</TableStatus>,
      `#${order.invoice.id}`,
      moment(order.updatedAt).format("MMM D, YYYY"),
      `$5,595.00`,
      <TableAction button="Disable" button2="Details" />,
    ];
  }

  return (
    <div>
      <TableSearch
        title="Recent Transactions"
        description="Your current gross amount is: $23,335.56"
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
