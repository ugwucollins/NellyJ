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

// #region Sample data
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

// #endregion
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
          <p className="label font-semibold">{`${label} : ${payload[0].value}`}</p>
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
        dataKey="orders"
        barSize={15}
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Bar
        dataKey="users"
        barSize={15}
        fill="#854d0e"
        isAnimationActive={isAnimationActive}
      />
    </BarChart>
  );
};

export default CustomContentOfTooltip;
