import { formatCurrency } from "../utils/helpers/formatCurrency";
export default function CheckoutFooter({ totalQuantity, totalPrice }) {
  return (
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
  );
}
