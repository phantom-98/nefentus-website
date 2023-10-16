import PaymentForm from "../components/paymentForm/paymentForm";
import Table from "../components/table/table";
import TableAction from "../components/tableAction/tableAction";
import TableQR from "../components/tableQR/tableQR";
import TableSearch from "../components/tableSearch/tableSearch";
import TableStatus from "../components/tableStatus/tableStatus";

const label = ["Created At", "Price ($)", "Status", "QR Code", "Actions"];

const data = [
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
  [
    "Ruth Sharp",
    "183.902.00",
    <TableStatus color="green">Open</TableStatus>,
    <TableQR link="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" />,
    <TableAction button="Disable" button2="Delete" />,
  ],
];

const PaymentDashboard = () => {
  return (
    <div>
      <PaymentForm />
      <Table grid="1fr 1fr 1fr 1fr 1fr" label={label} data={data} />
    </div>
  );
};

export default PaymentDashboard;
