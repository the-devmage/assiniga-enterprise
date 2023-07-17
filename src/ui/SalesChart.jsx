import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useProduct } from "../context/ProductContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { sortedOrders } from "../utils/helpers/SortOrders";

export default function SalesChart() {
  const { orders } = useProduct();
  const newSales = sortedOrders(orders);
  const COLORS = ["#4C1D95", "#8B5CF6", "#C4B5FD"];

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), 2),
    end: new Date(),
  });

  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    sales: newSales
      .filter((order) => isSameDay(date, new Date(order.createdAt)))
      .reduce((total, sale) => total + Number(sale.totalQuantity), 0),
  }));

  return (
    <div>
      <h2 className="font-bold ">
        Sales from {format(allDates.at(0), "MMM dd")} -{" "}
        {format(allDates.at(-1), "MMM dd")}
      </h2>
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
    </div>
  );
}
