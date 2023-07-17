import { useRef } from "react";
import { IoPrint } from "react-icons/io5";
import ReactToPrint from "react-to-print";
import Invoice from "../ui/Invoice";

export default function Print() {
  const componentRef = useRef();

  return (
    <section className="h-[100%] mt-10">
      <div className="flex justify-end mt-2 mr-12">
        <ReactToPrint
          trigger={() => (
            <button className="bg-violet-500 px-4 py-2 font-helvetica text-gray-200 rounded-lg shadow-xl ">
              <IoPrint className="inline-block mr-2" />
              Print invoice!
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <section ref={componentRef}>
        <Invoice />{" "}
      </section>
    </section>
  );
}
