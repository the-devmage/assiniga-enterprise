import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useProduct } from "../context/ProductContext";

export default function SalesChart() {
  const { orders } = useProduct();
  const COLORS = ["#4C1D95", "#8B5CF6", "#C4B5FD"];

  const data = [
    {
      label: "Building",
      sales: orders
        .filter((order) => order.cart[0].category === "building")
        .reduce((total, order) => total + order.totalQuantity, 0),
    },
    {
      label: "Electrical",
      sales: orders
        .filter((order) => order.cart[0].category === "electrical")
        .reduce((total, order) => total + order.totalQuantity, 0),
    },
    {
      label: "Plumbing",
      sales: orders
        .filter((order) => order.cart[0].category === "plumbing")
        .reduce((total, order) => total + order.totalQuantity, 0),
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={165}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          cx={140}
          cy={80}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="sales"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              name={entry.label}
            />
          ))}
        </Pie>
        <Legend
          align="right"
          iconType="circle"
          verticalAlign="middle"
          layout="vertical"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
