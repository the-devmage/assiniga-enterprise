import { useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { useProduct } from "../context/ProductContext";
export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const { productDispatch } = useProduct();
  return (
    <>
      <form
        className={`w-50 ${
          isOpen ? "md:w-[50%]" : "md:w-[30%]"
        } md:transition md:ease-in-out md:delay-150 md:duration-700
 `}
      >
        <div
          className="relative w-full"
          onClick={(e) => e.stopPropagation()}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          <input
            className="bg-[#ABDFF1] w-full h-10 px-6 rounded-lg"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              productDispatch({
                type: "SORT_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
          <GrFormSearch className="absolute right-6 top-3 " />
        </div>
      </form>
    </>
  );
}
