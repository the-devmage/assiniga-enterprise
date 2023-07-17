import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { cartSum } from "../utils/helpers/CartSum";
import { useCart } from "../context/Cart/CartContext";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import { apiOrders } from "../services/apiOrders";
import Modal from "./Modal";
import CheckoutSuccess from "./CheckoutSuccess";

export default function CheckoutInfo() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const { cart, dispatch } = useCart();
  const { totalQuantity, totalPrice } = cartSum(cart);

  // updating quantity
  async function updateQuantity() {
    const updatePromises = cart.map((product) => {
      const productRef = doc(db, "products", product.id);
      return updateDoc(productRef, {
        quantity: Number(product.quantity - product.cartQuantity),
      });
    });
    await Promise.all(updatePromises);
  }

  function handleCheckout() {
    apiOrders(cart, totalPrice, totalQuantity);
    updateQuantity();
    setCheckoutModalOpen(true);
  }

  return (
    <>
      <ul className="w-[40%] ">
        <li className="flex justify-between my-4 p-4 border-b border-[#0C4A60] ">
          <span className="font-medium">Total items:</span>
          <span className="font-semibold">{totalQuantity}</span>
        </li>
        <li className="flex justify-between my-4  p-4 border-b border-[#0C4A60]">
          <span className="font-medium ">Total Cost:</span>
          <span className="font-semibold text-xl ">
            {formatCurrency(totalPrice)}
          </span>
        </li>
      </ul>
      <button
        className="bg-[#0C4A60] hover:shadow-lg transition-all rounded-md tracking-wider text-gray-100 px-10 py-3"
        onClick={handleCheckout}
      >
        Checkout
      </button>

      <Modal
        modalOpen={checkoutModalOpen}
        onClose={() => {
          dispatch({ type: "CHECKOUT" });
          setCheckoutModalOpen(false);
        }}
      >
        <CheckoutSuccess />
      </Modal>
    </>
  );
}
