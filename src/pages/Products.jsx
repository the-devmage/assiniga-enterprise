import Modal from "../components/Modal";
import AddProduct from "../components/AddProduct";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import ProductInfo from "../components/ProductInfo";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { Sort } from "../utils/helpers/SortProduct";
import { useProduct } from "../context/ProductContext";

export default function Products() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("all");

  // fetching products
  const { products, loading, productDispatch } = useProduct();

  // deleting product
  async function handleDelete(id) {
    const docRef = doc(db, "products", id);
    try {
      await deleteDoc(docRef);
      toast.success("item successfully deleted");
    } catch (error) {
      toast.error("couldn't delete item");
    }
  }
  //  sorting by size
  function handleSort(e) {
    let selectedText = e.target.textContent.toUpperCase();
    productDispatch({ type: `SORT_BY_${selectedText}`});
    setSortBy(e.target.textContent.toLowerCase());
  }

  const sortedProducts = Sort(products, sortBy);

  return (
    <>
      <h1 className="mb-5 mt-1 ml-12 text-4xl font-bold ">Products</h1>
      <section className="bg-[#E8F7FB] min-h-[80%] min-w-fit rounded-xl m-3 py-8 px-4 overflow-auto ">
        <header className="pb-6 border-b-[#0C4A60] flex justify-end gap-5 ">
          <Filter handleSort={handleSort} sortBy={sortBy} />
          <button
            className="bg-[#ABDFF1] text-sm hover:bg-[#559cb4] text-gray-800 hover:text-white shadow-none hover:shadow-lg transition-shadow px-6 py-2 rounded-xl min-w-fit "
            onClick={() => setAddModalOpen(true)}
          >
            Add Products
          </button>
        </header>

        <div className="flex flex-col ">
          <header className="grid grid-cols-custom gap-x-[2.4rem] mb-2 uppercase font-bold px-5 font-helvetica ">
            <div></div>
            <div className="">Product</div>
            <div>Category</div>
            <div>Size</div>
            <div>Quantity</div>
            <div>Price</div>
            <div></div>
          </header>

          <section>
            {loading && <Loading height={"100%"} />}
            {sortedProducts?.map((product) => (
              <ProductInfo
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
          </section>
        </div>
      </section>
      <Modal modalOpen={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <AddProduct />
      </Modal>
    </>
  );
}
