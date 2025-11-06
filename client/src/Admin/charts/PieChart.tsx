import { Pie, PieChart, Tooltip } from "recharts";

// #region Sample data
const data01 = [
  { name: "Total Customer", value: 20 },
  { name: "Total Orders", value: 300 },
  { name: "Total Booked Events", value: 300 },
  { name: "Total Products", value: 200 },
  { name: "Total Contacts", value: 100 },
];

// #endregion
export default function TwoLevelPieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
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
        // fill="#8884d8"
        fill="#1e40af"
        // fill="#1e3a8a"
        label
        isAnimationActive={isAnimationActive}
      />
      <Tooltip />
    </PieChart>
  );
}
