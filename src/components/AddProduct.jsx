import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct({ onClose }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  // const productRef = collection(db, `Products-${sizes.toUpperCase()}`);
  const productRef = collection(db, "products");
  async function addProduct(
    name,
    price,
    finalSize,
    quantity,
    category,
    downloadURL
  ) {
    addDoc(productRef, {
      name: name.toLowerCase(),
      category,
      quantity,
      size: finalSize,
      price,
      image: downloadURL,
      createdAt: serverTimestamp(),
    });
  }

  function handleSizeChange(e) {
    setSize(e.target.value);
    if (e.target.value !== "custom") return setCustom("");
  }

  function handleProductImage(e) {
    if (e.target.files[0].type.split("/")[0] === "image") {
      setProductImage(e.target.files[0]);
    } else {
      setProductImage(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const finalSize = size === "custom" ? custom : size;
    const imageRef = ref(storage, `product-images/${productImage.name}`);

    try {
      await uploadBytes(imageRef, productImage);
      const downloadURL = await getDownloadURL(imageRef);
      await addProduct(
        name,
        price,
        finalSize,
        quantity,
        category,
        downloadURL
      );
      toast.success("added a new product!");
      setName("");
      setSize("");
      setQuantity("");
      setPrice("");
      setLoading(false);
      onClose();
    } catch (error) {
      toast.error("Failed to add product. Try again later");
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold ">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="h-[330px] flex flex-col justify-center gap-4 items-center mt-2 mx-16 "
      >
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="text"
          required
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-gray-600 text-[16px] "
          type="text"
          required
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            Category
          </option>
          <option value="building">Building</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
        </select>
        <div className="flex gap-12 h-12 w-full">
          <select
            className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] px-6 text-[16px] text-gray-600 "
            type="text"
            required
            placeholder="Size"
            value={size}
            onChange={handleSizeChange}
          >
            <option value="" disabled hidden>
              Size
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="custom">Custom</option>
          </select>
          {size === "custom" && (
            <input
              type="text"
              placeholder="custom"
              className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[120px] px-6 text-[14px]"
              onChange={(e) => setCustom(e.target.value)}
            />
          )}
        </div>
        <div className="h-12 w-full bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60]">
          <input
            type="file"
            required
            className=" w-full h-full cursor-pointer file:bg-[#0C4A60] file:text-gray-200 file:text-[14px] file:border-none file:rounded-md file:py-[6px] file:mr-6"
            onChange={handleProductImage}
          />
        </div>
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="bg-[#ABDFF1] rounded-lg shadow-lg w-[40%] h-12 px-6 hover:shadow-md ">
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}
