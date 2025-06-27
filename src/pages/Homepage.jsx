import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import FilterDropdown from "../components/FilterDropDown";
import Pagination from "../components/Pagination";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1> Title</h1>
          <div className="flex  gap-3">
            <FilterDropdown />

            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Add Note
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <NoteCard key={i} />
          ))}
        </div>

        <div className="mt-8">
          <Pagination />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
