import RevenueChartChart from "../ui/RevenueChart";
import SalesChart from "../ui/SalesChart";
import OrdersLayout from "../ui/OrdersLayout";

export default function Dashboard() {
  return (
    <>
      <h1 className="mb-5 mt-1 ml-12 text-4xl font-bold ">Dashboard</h1>
      <section className="dashboard-layout bg-[#E8F7FB] h-[80%] min-w-fit rounded-xl m-3 py-8 px-4 overflow-auto ">
        <div className="col-span-2">
          <RevenueChartChart />
        </div>
        <div>
          <SalesChart />
        </div>
        <div className="px-2">
          <h2 className="font-bold mb-2 text-gray-600 ">Recent Orders</h2>
          <div className="">
            <OrdersLayout />
          </div>
        </div>
      </section>
    </>
  );
}
