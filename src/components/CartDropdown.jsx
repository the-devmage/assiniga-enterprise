import { RiDeleteBin2Line } from "react-icons/ri";
import { useCart } from "../context/Cart/CartContext";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const { cart } = useCart();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  return (
    <ul className="list-none w-[160px] py-1 px-2 ">
      {cart.length === 0 ? (
        <li className="text-center my-2">No item in cart</li>
      ) : (
        cart.map((product) => (
          <li
            key={product.id}
            className="flex justify-between h-[45px] py-[5px] mb-1 border-b border-y-gray-600 "
          >
            <div className=" h-full w-[55px] rounded-md">
              <img
                className="h-full w-full cover center bg-no-repeat rounded-md "
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="flex flex-col ml-1 ">
              <p className="font-helvetica capitalize text-[16px] tracking-wide ">
                {product.name}
              </p>
              <p className="text-[12px]">
                {formatCurrency(Number(product.price))}
              </p>
            </div>
            <button
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
              }}
            >
              <RiDeleteBin2Line size={"1.3em"} />
            </button>
          </li>
        ))
      )}
      {cart.length !== 0 && (
        <button
          onClick={() => navigate("cart")}
          className="w-full rounded-lg py-1 px-1 mt-2 text-white shadow-md bg-[#0C4A60]"
        >
          Checkout
        </button>
      )}
    </ul>
  );
}
