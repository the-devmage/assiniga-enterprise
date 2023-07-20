import React from "react";
import { AiOutlineClose } from "react-icons/ai";
export default function Modal({ modalOpen, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center z-[500] filter backdrop-blur-sm ${
        modalOpen ? "visible  bg-black/60 " : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#b7d4de] text-center rounded-xl p-6 h-[60%] ease-in-out duration-50 w-[50%] ${
          modalOpen
            ? "scale-100 opacity-100 drop-shadow-xl z-[999]"
            : "scale-125 opacity-0"
        } `}
      >
        <div className="text-center w-[50vw] ">
          <AiOutlineClose
            size={25}
            onClick={onClose}
            className="absolute top-6 right-6 cursor-pointer "
          />
          <div className="mx-auto my-4 w-[80%] h-[90%] relative "></div>
        </div>
        {React.cloneElement(children, { onClose })}
      </div>
    </div>
  );
}
