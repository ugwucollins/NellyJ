import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipContentProps,
} from "recharts";
import type { TooltipIndex } from "recharts/types/state/tooltipSlice";
import { UserAdminAuth } from "../context/AdminContext";

// create an object  of all the months
export const months: any = {
  January: "January",
  February: "February",
  March: "March",
  April: "April",
  May: "May",
  June: "June",
  July: "July",
  August: "August",
  September: "September",
  October: "October",
  November: "November",
  December: "December",
};

const getIntroOfPage = (label: string | number | undefined) => {
  if (label === "January") {
    return "The Total customers for the month of January";
  }
  if (label === "February") {
    return "The Total customers for the month of February";
  }
  if (label === "March") {
    return "The Total customers for the month of March";
  }
  if (label === "April") {
    return "The Total customers for the month of April";
  }
  if (label === "May") {
    return "The Total customers for the month of May";
  }
  if (label === "June") {
    return "The Total customers for the month of June";
  }
  if (label === "July") {
    return "The Total customers for the month of July";
  }
  if (label === "August") {
    return "The Total customers for the month of ";
  }
  if (label === "September") {
    return "The Total customers for the month of September";
  }
  if (label === "October") {
    return "The Total customers for the month of October";
  }
  if (label === "November") {
    return "The Total customers for the month of November";
  }
  if (label === "December") {
    return "The Total customers for the month of December";
  }

  return "";
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip bg-transparent"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <div className="bg-slate-50/90 rounded-t-3xl rounded-r-3xl p-3.5 text-black">
          <p className="label font-semibold">{`Users ${label} : ${payload[0].value}`}</p>
          <p className="label font-semibold">{`Orders ${label} : ${payload[1].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">The total Sales for the month of {label}</p>
        </div>
      )}
    </div>
  );
};

const CustomContentOfTooltip = ({
  isAnimationActive = true,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) => {
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
    <BarChart
      style={{
        maxHeight: "70vh",
        aspectRatio: 1,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 0,
        bottom: 15,
      }}
      className="py-5 border-none ring-0 w-full max-w-[95%] max-sm:max-w-full bg-slate-50/50 dark:text-black dark:bg-transparent rounded-xl shadow-md "
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip
        content={CustomTooltip}
        isAnimationActive={isAnimationActive}
        defaultIndex={defaultIndex}
      />
      <Legend />

      <Bar
        dataKey="users"
        barSize={15}
        fill="#854d0e"
        isAnimationActive={isAnimationActive}
      />
      <Bar
        dataKey="orders"
        barSize={15}
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
    </BarChart>
  );
};

export default CustomContentOfTooltip;
