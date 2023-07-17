import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { cartSum } from "../utils/helpers/CartSum";

const colRef = collection(db, "orders");

export const apiOrders = (cart) => {
  const { totalPrice, totalQuantity } = cartSum(cart);
  addDoc(colRef, {
    cart,
    totalPrice,
    totalQuantity,
    createdAt: serverTimestamp(),
  });
};
