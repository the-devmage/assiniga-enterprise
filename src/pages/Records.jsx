import { useState } from "react";
import { sortedOrders } from "../utils/helpers/SortOrders";
import { useProduct } from "../context/ProductContext";
import { format, isSameDay } from "date-fns";
import { sortBooks } from "../utils/helpers/sortBooks";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import CheckoutFooter from "../components/CheckoutFooter";

export default function Records() {
  const [date, setDate] = useState(
    `${format(new Date(Date.now()), "yyyy")}-${format(
      new Date(Date.now()),
      "MM"
    )}-${format(new Date(Date.now()), "dd")}`
  );

  const { orders } = useProduct();
  const newSales = sortedOrders(orders);

  //    filter sales
  const filteredSales = newSales.filter((sale) =>
    isSameDay(sale.createdAt, new Date(`${date}`))
  );

  //    check and update books
  const sales = sortBooks(filteredSales);

  //    calculating total price and quantity
  const totalPrice = sales.reduce((total, sale) => total + sale.price, 0);
  const totalQuantity = sales.reduce((total, sale) => total + sale.quantity, 0);

  return (
    <>
      <h1 className="mb-4 ml-12 text-4xl font-bold">Records</h1>
      <section className="bg-[#E8F7FB] min-h-[80%] min-w-fit rounded-xl m-3 py-8 px-4 overflow-auto ">
        <header className="pb-6 flex justify-end">
          <input
            type="date"
            className="bg-white px-2 py-1 rounded-md cursor-pointer select-none "
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </header>
        <main className="">
          <header className="invoice-layout gap-[1rem] font-helvetica gap-x-[2.4rem] mb-2 mx-5 uppercase px-5 font-bold border-b border-[#0C4A60]">
            <h2>Name</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
          </header>
          {sales.length !== 0 ? (
            <section className="mx-3 capitalize ">
              {sales.map((sale) => (
                <div
                  className="invoice-layout gap-[1rem] items-center px-5 py-3 mx-5 border-b border-b-[#ABDFF1] hover:bg-[#ABDFF1] hover:rounded-md duration-300"
                  key={sale.id}
                >
                  <div className="capitalize flex flex-col gap-1">
                    <span className="font-semibold">{sale.name}</span>
                    <span className="font-light text-[12px]">{sale.size}</span>
                  </div>
                  <div>{sale.quantity}</div>
                  <div>{formatCurrency(sale.price)}</div>
                </div>
              ))}
              <aside className="flex flex-col items-end gap-4 w-[100%]">
                <CheckoutFooter
                  totalPrice={totalPrice}
                  totalQuantity={totalQuantity}
                />
              </aside>
            </section>
          ) : (
            <div className="text-center font-raleway font-bold text-4xl my-16">
              No sales for today
            </div>
          )}
        </main>
      </section>
    </>
  );
}
