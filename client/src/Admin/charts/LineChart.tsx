import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { UserAdminAuth } from "../context/AdminContext";
import { months } from "./BarChart";

export default function LineChartExample() {
  const { customers, allOrders }: any = UserAdminAuth();
  // create a filter for the months
  const January =
    allOrders && allOrders.filter((item: any) => item.month === months.January);
  const February =
    allOrders &&
    allOrders.filter((item: any) => item.month === months.February);
  const March =
    allOrders && allOrders.filter((item: any) => item.month === months.March);
  const April =
    allOrders && allOrders.filter((item: any) => item.month === months.April);
  const May =
    allOrders && allOrders.filter((item: any) => item.month === months.May);
  const June =
    allOrders && allOrders.filter((item: any) => item.month === months.June);
  const July =
    allOrders && allOrders.filter((item: any) => item.month === months.July);
  const August =
    allOrders && allOrders.filter((item: any) => item.month === months.August);
  const September =
    allOrders &&
    allOrders.filter((item: any) => item.month === months.September);
  const October =
    allOrders && allOrders.filter((item: any) => item.month === months.October);
  const November =
    allOrders &&
    allOrders.filter((item: any) => item.month === months.November);
  const December =
    allOrders &&
    allOrders.filter((item: any) => item.month === months.December);

  // create a filter for the user
  const JanuaryUser =
    customers && customers.filter((item: any) => item.month === months.January);
  const FebruaryUser =
    customers &&
    customers.filter((item: any) => item.month === months.February);
  const MarchUser =
    customers && customers.filter((item: any) => item.month === months.March);
  const AprilUser =
    customers && customers.filter((item: any) => item.month === months.April);
  const MayUser =
    customers && customers.filter((item: any) => item.month === months.May);
  const JuneUser =
    customers && customers.filter((item: any) => item.month === months.June);
  const JulyUser =
    customers && customers.filter((item: any) => item.month === months.July);
  const AugustUser =
    customers && customers.filter((item: any) => item.month === months.August);
  const SeptemberUser =
    customers &&
    customers.filter((item: any) => item.month === months.September);
  const OctoberUser =
    customers && customers.filter((item: any) => item.month === months.October);
  const NovemberUser =
    customers &&
    customers.filter((item: any) => item.month === months.November);
  const DecemberUser =
    customers &&
    customers.filter((item: any) => item.month === months.December);

  const data = [
    {
      name: "January",
      orders: January.length,
      users: JanuaryUser.length,
    },
    {
      name: "February",
      orders: February.length,
      users: FebruaryUser.length,
    },
    {
      name: "March",
      orders: March.length,
      users: MarchUser.length,
    },
    {
      name: "April",
      orders: April.length,
      users: AprilUser.length,
    },
    {
      name: "May",
      orders: May.length,
      users: MayUser.length,
    },
    {
      name: "June",
      orders: June.length,
      users: JuneUser.length,
    },
    {
      name: "July",
      orders: July.length,
      users: JulyUser.length,
    },
    {
      name: "August",
      orders: August.length,
      users: AugustUser.length,
    },
    {
      name: "September",
      orders: September.length,
      users: SeptemberUser.length,
    },
    {
      name: "October",
      orders: October.length,
      users: OctoberUser.length,
    },
    {
      name: "November",
      orders: November.length,
      users: NovemberUser.length,
    },
    {
      name: "December",
      orders: December.length,
      users: DecemberUser.length,
    },
  ];

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
      <Line type="bump" dataKey="orders" stroke="#82ca9d" />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
