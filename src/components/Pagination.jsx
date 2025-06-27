import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage } from "../redux/notes";
import PageSizeDropdown from "./PageSizeDropdown";

const Pagination = ({ totalItems }) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector((state) => state.notes);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const isMobile = window.innerWidth < 640;
    const maxPages = isMobile ? 3 : 5;

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    if (currentPage > 2) {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
    }

    // Show current page and adjacent pages
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Show last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full px-4 py-3 bg-white gap-4 sm:gap-0">
      <div className="text-sm text-gray-700 order-2 sm:order-1">
        {startItem}-{endItem} of {totalItems} Records
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 order-1 sm:order-2 w-full sm:w-auto">
        <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
          {/* Previous button */}
          <button
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 sm:p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-300"
            aria-label="Previous page"
          >
            <svg
              className="w-6 h-6 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && dispatch(setCurrentPage(page))
              }
              disabled={typeof page !== "number"}
              className={`px-4 sm:px-3 py-2 sm:py-1 text-base sm:text-sm rounded-lg ${
                currentPage === page
                  ? "text-white bg-blue-600 font-semibold"
                  : typeof page === "number"
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-400"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 sm:p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-300"
            aria-label="Next page"
          >
            <svg
              className="w-6 h-6 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center items-center w-full sm:w-auto order-3">
          <PageSizeDropdown
            pageSize={itemsPerPage}
            setPageSize={(value) => {
              dispatch(setItemsPerPage(value));
              dispatch(setCurrentPage(1)); // reset to first page on size change
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
