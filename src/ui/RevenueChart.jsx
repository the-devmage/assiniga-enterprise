import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useProduct } from "../context/ProductContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { sortedOrders } from "../utils/helpers/SortOrders";
import DateFilter from "../components/DateFilter";

export default function RevenueChart({sortBy, setSortBy}) {
  const { orders } = useProduct();
  const newOrders = sortedOrders(orders);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), sortBy - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    totalRevenue: newOrders
      .filter((order) => isSameDay(date, new Date(order.createdAt)))
      .reduce((total, sale) => total + Number(sale.totalPrice), 0),
  }));

  return (
    <>
      <header className="flex justify-between">
        <h2 className="font-bold mb-2 ">
          Total Revenue from {format(allDates.at(0), "MMM dd")} - { format(allDates.at(-1), "MMM dd")}
        </h2>
        <DateFilter sortBy={sortBy} setSortBy={setSortBy} />
      </header>

      <ResponsiveContainer width="95%" height={230}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="label" width={500} fontSize={13} />
          <YAxis unit={"\u20B5"} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#8884d8"
            strokeWidth={2}
            name="Total Revenue"
            unit={"	\u20B5"}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
