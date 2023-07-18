import { format } from "date-fns";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import CheckoutFooter from "../components/CheckoutFooter";
import { useProduct } from "../context/ProductContext";
import { sortedOrders } from "../utils/helpers/SortOrders";

export default function Invoice() {
  const { orders } = useProduct();
  const recentOrder = sortedOrders(orders)?.at(0);
  const { cart, totalPrice, totalQuantity } = recentOrder;
  const date = Date.now();

  return (
    <section className=" mx-auto bg-white w-[70%] px-12 pb-4 flex flex-col justify-center">
      <header className="text-center pt-8 ">
        <h1 className="uppercase font-bold text-3xl ">Assiniga Enterprise</h1>
        <div>
          <p className="">Phone number: 020000000</p>
          <p className="">Adum, Kumasi</p>
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
        {cart.map((cart) => (
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
        ))}
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
