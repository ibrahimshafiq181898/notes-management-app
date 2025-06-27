import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage } from "../redux/notes";
import PageSizeDropdown from "./PageSizeDropdown";

const Pagination = ({ totalItems }) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector((state) => state.notes);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white">
      <div className="text-sm text-gray-700">
        {start}-{end} of {totalItems} Records
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-300"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && dispatch(setCurrentPage(page))
              }
              disabled={typeof page !== "number"}
              className={`px-3 py-1 text-sm ${
                currentPage === page
                  ? "text-blue-600 font-semibold"
                  : typeof page === "number"
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-gray-400"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-300"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-end items-center p-4">
          <PageSizeDropdown
            pageSize={itemsPerPage}
            setPageSize={(value) => {
              dispatch(setItemsPerPage(value));
              dispatch(setCurrentPage(1));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
