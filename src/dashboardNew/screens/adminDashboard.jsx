import AdminBody from "../components/adminBody/adminBody";
import EarningCards from "../components/earningCards/earningCards";
import Table from "../components/table/table";
import TableAction from "../components/tableAction/tableAction";
import TableSearch from "../components/tableSearch/tableSearch";
import TableStatus from "../components/tableStatus/tableStatus";

const data = [
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: 2.11,
  },
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: -2.11,
  },
  {
    label: "Sales Total",
    value: "+$4,678.67",
    percentage: 2.11,
  },
];

const label = [
  "Name",
  "Roles",
  "Email",
  "Status",
  "Incomes",
  "Join on",
  "Earnings",
  "Action",
];

const tableData = [
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="green">Enabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="red">Disabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="red">Disabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
  [
    "Ruth Sharp",
    "Vendor",
    "john.doe@gmail.com",
    <TableStatus color="red">Disabled</TableStatus>,
    "$1,592.00",
    "Jan 6, 2023",
    "$5,595.00",
    <TableAction button="Disable" />,
  ],
];

const dataRoles = [
  {
    color: "#107CDF",
    legend: "Vendor",
    num: 311,
    percentage: 31.61,
  },
  {
    color: "#F5B51B",
    legend: "Affiliate",
    num: 100,
    percentage: 10.18,
  },
  {
    color: "#23C215",
    legend: "Diamond",
    num: 21,
    percentage: 2.14,
  },
  {
    color: "#AF26E7",
    legend: "Gold",
    num: 550,
    percentage: 56.07,
  },
];

const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];

const chartData = {
  labels,
  datasets: [
    {
      label: "Last 24h",
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "#0784B5",
      backgroundColor: "#0784B5",
    },
    {
      label: "Previous 24h",
      data: [12, 18, 9, 5, 3, 15, 20],
      borderColor: "rgba(255, 255, 255,0.2)",
      backgroundColor: "rgba(255, 255, 255,0.2)",
    },
  ],
};

const AdminDashboard = ({ type }) => {
  return (
    <div>
      <EarningCards data={data} />
      <AdminBody data={dataRoles} chartData={chartData} type={type} />
      <div>
        <div>
          <TableSearch title="User Management" />
          <Table
            grid="1.3fr 1fr 1.7fr 1fr 1fr 1fr 1fr 1fr"
            label={label}
            data={tableData}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
