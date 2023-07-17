import { useCart } from "../context/Cart/CartContext"
export default function CartBadge() {
    const {cart} = useCart();
  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-[#ABDFF1] rounded-lg hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#0C4A60] dark:hover:bg-[#ABDFF1]"
      >
        <svg
          stroke="currentColor"
          fill="#0C4A60"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10.5" cy="19.5" r="1.5"></circle>
          <circle cx="17.5" cy="19.5" r="1.5"></circle>
          <path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path>
        </svg>
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#0C4A60] border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          {cart.length}
        </div>
      </button>
    </>
  );
}
