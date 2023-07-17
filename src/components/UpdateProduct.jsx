import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateProduct({ onClose, id }) {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  //   const productRef = collection(db, `Products-${sizes.toUpperCase()}`);

  // updating product
  const docRef = doc(db, "products", id);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(docRef, { quantity, price });
      toast.success("successfully updated product");
      setQuantity("");
      setPrice("");
      setLoading(false);
      onClose();
    } catch (error) {
      toast.error("couldn't update item");
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold ">Update Product</h2>
      <form
        onSubmit={handleSubmit}
        className="h-[270px] flex flex-col justify-center gap-6 items-center mt-4 "
      >
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          placeholder="Quantity"
          type="Quantity"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="Price"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="bg-[#ABDFF1] mt-8 rounded-lg border-[1px] border-[#0C4A60] h-10 px-6 place-self-end hover:shadow-md "
        disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </>
  );
}
