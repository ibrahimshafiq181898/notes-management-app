import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/notes";
import threelines from "../assets/threelines.svg";

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.notes.filter);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "text", label: "Text Note" },
    { value: "image", label: "Image Note" },
    { value: "checklist", label: "Checklist Note" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border gap-2 justify-center border-gray-300 text-white font-medium rounded-full h-9 text-sm bg-black hover:bg-gray-800 focus:outline-none transition"
      >
        <span>Filter</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16210_2159)">
            <path
              d="M0 1.9C0 1.66131 0.0948212 1.43239 0.263604 1.2636C0.432387 1.09482 0.661305 1 0.9 1H11.1C11.3387 1 11.5676 1.09482 11.7364 1.2636C11.9052 1.43239 12 1.66131 12 1.9C12 2.13869 11.9052 2.36761 11.7364 2.5364C11.5676 2.70518 11.3387 2.8 11.1 2.8H0.9C0.661305 2.8 0.432387 2.70518 0.263604 2.5364C0.0948212 2.36761 0 2.13869 0 1.9ZM2.4 5.5C2.4 5.26131 2.49482 5.03239 2.6636 4.8636C2.83239 4.69482 3.06131 4.6 3.3 4.6H8.7C8.93869 4.6 9.16761 4.69482 9.3364 4.8636C9.50518 5.03239 9.6 5.26131 9.6 5.5C9.6 5.7387 9.50518 5.96761 9.3364 6.1364C9.16761 6.30518 8.93869 6.4 8.7 6.4H3.3C3.06131 6.4 2.83239 6.30518 2.6636 6.1364C2.49482 5.96761 2.4 5.7387 2.4 5.5ZM5.1 8.2C4.86131 8.2 4.63239 8.29482 4.4636 8.4636C4.29482 8.63239 4.2 8.86131 4.2 9.1C4.2 9.3387 4.29482 9.56761 4.4636 9.7364C4.63239 9.90518 4.86131 10 5.1 10H6.9C7.1387 10 7.36761 9.90518 7.5364 9.7364C7.70518 9.56761 7.8 9.3387 7.8 9.1C7.8 8.86131 7.70518 8.63239 7.5364 8.4636C7.36761 8.29482 7.1387 8.2 6.9 8.2H5.1Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_16210_2159">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-2">
          {filterOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center px-4 py-2 cursor-pointer ${
                currentFilter === option.value
                  ? "bg-[#EEF6FF]"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={currentFilter === option.value}
                  onChange={() => handleSelect(option.value)}
                  className="appearance-none w-[18px] h-[18px] border-2 border-[#3D4D5A] rounded-[4px] checked:bg-[#2F80ED] checked:border-[#2F80ED] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                {currentFilter === option.value && (
                  <img src={threelines} alt="" />
                )}
              </div>
              <span className="ml-3 font-geist font-normal text-[14px] leading-[18px] text-[#0A0C11]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
