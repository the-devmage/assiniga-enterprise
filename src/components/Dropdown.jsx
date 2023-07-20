import { useState, useRef, useEffect } from "react";

export default function Dropdown({ children, id }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);
  const optionRef = useRef(null);

  // toggling options
  //   const toggleDropdown = (e) => {
  //     e.stopPropagation();
  //     setDropdownOpen(!dropdownOpen);
  //   };
  const toggleDropdown = (e, dropdownId) => {
    e.stopPropagation();
    if (dropdownId === activeDropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  // detecting click outside dropdown
  function handleOutsideClick(e) {
    e.stopPropagation();
    if (e.target !== menuRef.current && e.target !== optionRef.current) {
      setActiveDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== optionRef.current) {
        setDropdownOpen(false);
      }
    });

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <button
        id={id}
        ref={optionRef}
        className=" p-2 text-sm font-medium text-center text-gray-900 bg-[#cff3fd] rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#ABDFF1]"
        type="button"
        onClick={(e) => toggleDropdown(e, id)}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {activeDropdown === id && (
        <div
          ref={menuRef}
          className="z-50 absolute top-10 duration-150 right-3 bg-[#cff3fd]  rounded-lg drop-shadow-2xl w-[130px] font-medium"
        >
          <ul
            className=" text-sm text-gray-700 "
            aria-labelledby="dropdownMenuIconButton"
          >
            {children}
          </ul>
        </div>
      )}
    </div>
  );
}
// block px-4 py-3 pt-4 hover:bg-[#ABDFF1]
