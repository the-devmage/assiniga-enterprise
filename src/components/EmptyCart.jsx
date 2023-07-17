import { BsCartX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col pt-12 justify-center items-center h-full gap-6">
      <BsCartX size={"10em"} color="#0C4A60" />
      <p className="">Your cart is currently empty</p>
      <button
        onClick={() => navigate("/app/product")}
        className="tracking-wide font-bold text-sm text-gray-100 py-2 px-3 rounded-md bg-[#0C4A60] "
      >
        Explore more products
      </button>
    </div>
  );
}
