import { useCart } from "../context/Cart/CartContext";
import CartList from "../components/CartList";
import EmptyCart from "../components/EmptyCart";
import CheckoutInfo from "../components/CheckoutInfo";
export default function Cart() {
  const { cart, dispatch } = useCart();
  return (
    <>
      <h1 className="mb-4 ml-12 text-4xl font-bold ">Cart</h1>
      <section className="bg-[#E8F7FB] min-h-[80%] min-w-fit rounded-xl m-3 px-4 py-8 overflow-auto ">
        {cart.length > 0 ? (
          <div className="flex flex-col">
            <header className="grid grid-cols-checkout font-helvetica gap-x-[2.4rem] px-5 py-3 font-bold border-b border-[#0C4A60] ">
              <div></div>
              <div>Item</div>
              <div>Quantity</div>
              <div>Price</div>
              <div></div>
            </header>

            <section className="first:border first:border-t mx-3 ">
              {cart.map((product, index) => (
                <CartList key={index} product={product} dispatch={dispatch} />
              ))}

              <aside className="flex flex-col items-end gap-4 w-[100%]">
                <CheckoutInfo />
              </aside>
            </section>
          </div>
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  );
}
