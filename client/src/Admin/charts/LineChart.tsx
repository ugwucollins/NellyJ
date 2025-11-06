import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "January",
    orders: 4000,
    users: 2400,
  },
  {
    name: "February",
    orders: 3000,
    users: 1398,
  },
  {
    name: "March",
    orders: 2000,
    users: 9800,
  },
  {
    name: "April",
    orders: 2780,
    users: 3908,
  },
  {
    name: "May",
    orders: 1890,
    users: 4800,
  },
  {
    name: "June",
    orders: 2390,
    users: 3800,
  },
  {
    name: "July",
    orders: 3490,
    users: 4300,
  },
  {
    name: "August",
    orders: 3490,
    users: 4300,
  },
  {
    name: "September",
    orders: 4590,
    users: 4300,
  },
  {
    name: "October",
    orders: 3490,
    users: 4300,
  },
  {
    name: "November",
    orders: 4590,
    users: 4300,
  },
  {
    name: "December",
    orders: 3490,
    users: 4300,
  },
];

export default function LineChartExample() {
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "100%",
        border: "none",
        maxHeight: "70vh",
        aspectRatio: 1,
      }}
      responsive
      data={data}
      margin={{
        top: 10,
        right: 20,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="bump" dataKey="orders" stroke="#82ca9d" />
    </LineChart>
  );
}
