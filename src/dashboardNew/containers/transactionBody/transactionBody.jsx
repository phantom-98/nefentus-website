import Table from "../../components/table/table";
import TableAction from "../../components/tableAction/tableAction";
import TableSearch from "../../components/tableSearch/tableSearch";
import TableStatus from "../../components/tableStatus/tableStatus";

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

const data = [
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Nemanja Mijailovic",
    "#C233n867",
    "john.doesads90@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
  [
    "Ruth Sharp",
    "#C233n867",
    "john.doe@gmail.com",
    "#1,592.00",
    <TableStatus color="blue">Bitcoin</TableStatus>,
    "#40732432",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" button2="Details" />,
  ],
];

const TransactionBody = () => {
  return (
    <div>
      <TableSearch
        title="Recent Transactions"
        description="Your current gross amount is: $23,335.56"
      />
      <Table
        grid="1.4fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr"
        label={label}
        data={data}
      />
    </div>
  );
};

export default TransactionBody;
