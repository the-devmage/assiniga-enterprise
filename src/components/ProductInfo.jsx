import { useState } from "react";
import Modal from "./Modal";
import UpdateProduct from "./UpdateProduct";
import ProductActions from "./ProductActions";
import { formatCurrency } from "../utils/helpers/formatCurrency";
import DeleteModal from "./DeleteModal";
import { useCart } from "../context/Cart/CartContext";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";

export default function ProductInfo({ product, handleDelete }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { cart, dispatch } = useCart();

  // adding product to cart
  function addToCart() {
    if (cart.some((item) => item.id === product.id)) {
      return toast.error("Product already in cart");
    } else {
      toast.success("Successfully added product to cart");
      return dispatch({ type: "ADD_TO_CART", payload: product });
    }
  }

  return (
    <div className="grid grid-cols-custom gap-x-[2.4rem] items-center px-5 py-3 border-b border-b-[#ABDFF1] hover:bg-[#ABDFF1] hover:rounded-md duration-300 ">
      <div className="cursor-pointer" onClick={addToCart}>
        <img
          src={product.image}
          className="product-img max-w-full rounded-md "
          alt={product.name}
        />
      </div>
      <div className="capitalize font-medium">{product.name}</div>
      <div className="capitalize">{product.category}</div>
      <div className="capitalize text-sm ">{product.size}</div>
      <div>{product.quantity}</div>
      <div>{formatCurrency(product.price)}</div>
      <Dropdown id={product.id}>
        <ProductActions
          product={product}
          setDeleteModalOpen={setDeleteModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
        />
      </Dropdown>

      {updateModalOpen && (
        <Modal
          modalOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <UpdateProduct id={product.id} />
        </Modal>
      )}

      {deleteModalOpen && (
        <Modal
          modalOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DeleteModal handleDelete={handleDelete} id={product.id} />
        </Modal>
      )}
    </div>
  );
}
