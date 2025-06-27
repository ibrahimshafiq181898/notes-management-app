const FilterDropdown = () => {
  return (
    <div className="relative">
      <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
        <span>All Notes</span>
        <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
        <div className="py-1">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            All Notes
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Text Notes
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Image Notes
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Checklist Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
