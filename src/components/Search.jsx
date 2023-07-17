import { GrFormSearch } from "react-icons/gr";
import { useProduct } from "../context/ProductContext";
export default function Search() {
  const { productDispatch } = useProduct();
  return (
    <>
      <form className="w-50 md:w-[50%]">
        <div className="relative w-full">
          <input
            className="bg-[#ABDFF1] w-full h-10 px-6 rounded-lg"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              productDispatch({type: "SORT_BY_SEARCH", payload: e.target.value })
            }}
          />
          <GrFormSearch className="absolute right-6 top-3 " />
        </div>
      </form>
    </>
  );
}
