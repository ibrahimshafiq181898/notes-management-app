import { useState, useRef, useEffect } from "react";

const PageSizeDropdown = ({ pageSize, setPageSize }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const options = [10, 20, 30];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-sm text-gray-700" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1   rounded hover:bg-gray-100"
      >
        {pageSize}/Page
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full  rounded shadow-md">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setPageSize(opt);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                pageSize === opt ? "bg-blue-50 text-blue-600 font-medium" : ""
              }`}
            >
              {opt}/Page
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageSizeDropdown;
