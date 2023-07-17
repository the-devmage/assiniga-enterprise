import { CgDanger } from "react-icons/cg";
export default function DeleteModal({id, handleDelete, onClose}) {

    return (
      <div className="flex flex-col items-center gap-6 justify-center ">
        <CgDanger color="red" size={"8em"} />
        <h1 className="font-bold text-3xl tracking-wide text-center ">
          You are about to delete a product
        </h1>
        <div>
          <p className="font-medium text-gray-600 ">
            This will delete the product from your catalog.
          </p>
          <p className="text-center font-medium text-gray-600 mt-2 ">
            Are you sure?
          </p>
        </div>

        <div className="mt-7 self-end flex gap-2 ">
          <button className="text-gray-700 px-4 font-medium " onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-6 py-1 bg-red-600 rounded-md hover:bg-red-500 transition-all text-white "
            onClick={() => {
              handleDelete(id).then(() => onClose());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
}