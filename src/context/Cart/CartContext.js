import { useEffect, useContext, useReducer, createContext } from "react";
import { cartReducer } from "./CartReducer";

const CartContext = createContext();
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
export default function UserCartContext({ children }) {

  const [state, dispatch] = useReducer(cartReducer, {
    cart: cartFromLocalStorage,
    checkout: false,
  });
  
  // saving cart data in localstorage
  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
