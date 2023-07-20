import { format } from "date-fns";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import CheckoutFooter from "../components/CheckoutFooter";
import { useProduct } from "../context/ProductContext";
import { sortedOrders } from "../utils/helpers/SortOrders";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useUser } from "../context/user/UserContext";

export default function Invoice() {
  const [recentOrder, setRecentOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { orders } = useProduct();
  const { currentUser } = useUser();
  const date = Date.now();

  useEffect(() => {
    // Checking if orders is fetched
    if (orders.length !== 0) {
      const firstOrder = sortedOrders(orders)?.at(0);
      setRecentOrder(firstOrder);
      const { totalPrice: price, totalQuantity: quantity } = firstOrder;
      setTotalPrice(price);
      setTotalQuantity(quantity);
    }
  }, [orders]);

  return (
    <section className=" mx-auto bg-white w-[70%] px-12 pb-4 flex flex-col justify-center">
      <header className="text-center pt-8 ">
        <h1 className="uppercase font-bold text-3xl ">Assiniga Enterprise</h1>
        <div>
          <p className="">Phone number: {currentUser?.contact} </p>
          <p className="">{currentUser?.location}</p>
        </div>
        <p className="">{format(date, "dd MMM yyy")}</p>
        <p className="">
          {format(date, "h")} : {format(date, "mm aa")}
        </p>
      </header>
      <main className="text-center mt-10 ">
        <div className="invoice-layout gap-[2rem] py-1 bg-gray-300 font-helvetica font-bold rounded-md ">
          <h2>Product</h2>
          <h2>Quantity</h2>
          <h3>Unit Price</h3>
        </div>

        {recentOrder.length !== 0 ? (
          recentOrder.cart.map((cart) => (
            <div
              key={cart.id}
              className="invoice-layout gap-[2rem] border-b border-gray-700 items-center py-1 "
            >
              <div className="flex flex-col ml-1 ">
                <p className="font-helvetica capitalize text-[16px] tracking-wide ">
                  {cart.name}
                </p>
                <p className="text-[12px]">{cart.size}</p>
              </div>
              <p className="">{cart.cartQuantity}</p>
              <p className="">{formatCurrency(Number(cart.price))}</p>
            </div>
          ))
        ) : (
          <Loading height={"100%"} />
        )}
      </main>
      <aside className="flex flex-col items-end ">
        <CheckoutFooter totalPrice={totalPrice} totalQuantity={totalQuantity} />
      </aside>
      <footer className="text-center mt-2">
        Thanks for shopping with Assiniga!
      </footer>
    </section>
  );
}
