import { useProduct } from "../context/ProductContext";
import { sortedOrders } from "../utils/helpers/SortOrders";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import Loading from "../components/Loading";
import { format } from "date-fns";
export default function OrdersLayout() {
  const { orders, orderLoading } = useProduct();
  const recentOrders = sortedOrders(orders)?.slice(0, 3);

  return (
    <>
      <header className="orders-layout text-[whitesmoke] font-helvetica bg-[#8884d8] px-1 mb-2 rounded-md font-semibold border border-[#559cb4] ">
        <div>Order ID</div>
        <div>Date placed</div>
        <div>Quantity</div>
        <div>Amount</div>
      </header>
      <section className="border border-[#559cb4] rounded-md">
        {orderLoading && <Loading height={"100%"} />}

        {recentOrders?.map((order) => (
          <div className="orders-layout orders  px-2 py-[1px] items-center" key={order.id}>
            <div className="text-[13px] ">{order.id.slice(0,-7)}***</div>
            <div className="flex flex-col">
              <p className="text-[13px]">{format(new Date(order.createdAt), "MMM dd")}</p>
              <p className="text-[13px]">
                {format(new Date(order.createdAt), "h m a")}
              </p>
            </div>
            <div>{order.totalQuantity}</div>
            <div>{formatCurrency(order.totalPrice)}</div>
          </div>
        ))}
      </section>
    </>
  );
}
