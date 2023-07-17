import { AiFillCheckCircle } from "react-icons/ai";
export default function CheckoutSuccess() {
    return (
      <div className="flex flex-col gap-6 items-center ">
        <AiFillCheckCircle color="#0C4A60" size={"8em"} />
        <div className="flex flex-col gap-5 items-center font-semibold text-gray-800 text-xl">
          <p>The order has been completed successfully</p>
          <p>Click on the button below to print out the invoice</p>
        </div>
        <button className="bg-[#0C4A60] px-4 py-2 rounded-md text-gray-200 mt-5 hover:shadow-2xl ">
          Download Content
        </button>
      </div>
    );
}