import { Pie, PieChart, Tooltip } from "recharts";
import { RealValues } from "../../seller/Context/RealValues";

// #region Sample data

// #endregion
export default function TwoLevelPieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const { product, orders, sellers, customers, events, contacts } =
    RealValues();

  const data01 = [
    { name: "Total Customer", value: customers },
    { name: "Total Orders", value: orders },
    { name: "Total sellers", value: sellers },
    { name: "Total Booked Events", value: events },
    { name: "Total Products", value: product },
    { name: "Total Contacts", value: contacts },
  ];
  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "70vh",
        aspectRatio: 1,
        border: "none",
      }}
      className="rounded-2xl border-none ring-0"
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#1e40af"
        label
        isAnimationActive={isAnimationActive}
      />
      <Tooltip />
    </PieChart>
  );
}
