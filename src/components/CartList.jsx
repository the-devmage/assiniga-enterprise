import { RiDeleteBin2Line } from "react-icons/ri";

export default function CartList({
  product,
  totalPrice,
  totalQuantity,
  dispatch,
}) {
  // updating the cart items
  function handleUpdate(e) {
    dispatch({
      type: "UPDATE_CART",
      payload: { id: product.id, quantity: e.target.value },
    });
  }

  // deleting the cart items
  function handleDelete() {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: product.id } });
  }

  return (
    <div className="grid grid-cols-checkout gap-x-[6rem] items-center px-5 py-3 border-b border-b-[#ABDFF1] hover:bg-[#ABDFF1] hover:rounded-md duration-300  ">
      <img
        src={product.image}
        alt={product.image}
        className="product-img max-w-full rounded-md "
      />
      <div className="capitalize flex flex-col gap-1">
        <span className="font-semibold">{product.name}</span>
        <span className="font-light text-[12px]">{product.size}</span>
      </div>
      <select
        value={product.cartQuantity}
        onChange={handleUpdate}
        className="outline-none bg-[#E0E7E9] px-5 rounded-md border-none cursor-pointer "
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <div className="">{product.price}</div>
      <div className="flex justify-center items-center cursor-pointer">
        <RiDeleteBin2Line
          size={"1.5em"}
          color="#0C4A60"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
