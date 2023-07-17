
export default function ProductActions({
  setUpdateModalOpen,
  setDeleteModalOpen
}) {
  return (
    <>
      <li
        className="product-btn cursor-pointer"
          onClick={() => setUpdateModalOpen(true)}
      >
        update
      </li>
      <li
        className="product-btn cursor-pointer"
          onClick={() => setDeleteModalOpen(true)}
      >
        delete
      </li>
    </>
  );
}