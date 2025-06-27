import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotes,
  selectFilteredNotes,
  selectPaginatedNotes,
  TYPE_MAP,
  NOTE_TYPES
} from "../redux/notes";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import NoteModal from "../components/NoteModal";
import FilterDropdown from "../components/FilterDropDown";
import { useNoteContext } from "../context/NoteContext";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isModalOpen, setIsModalOpen } = useNoteContext();
  const status = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  const filteredNotes = useSelector(selectFilteredNotes);
  const paginatedNotes = useSelector(selectPaginatedNotes);
  const currentFilter = useSelector((state) => state.notes.filter);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <ErrorMessage message={error} />;
  }

  const getInitialNoteType = () => {
    if (currentFilter === "all") {
      return NOTE_TYPES.TEXT;
    }
    return TYPE_MAP[currentFilter];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="inline-flex items-center px-4 py-2 ">
            <span className="text-[#141414] font-bold text-[22px]">Title</span>
          </div>
          <div className="flex items-center space-x-4">
            <FilterDropdown />
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-[36px] shadow-sm text-white bg-[#007AFF] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="w-5 h-5 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {filteredNotes.length > 0 && (
            <Pagination totalItems={filteredNotes.length} />
          )}
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={getInitialNoteType()}
      />
    </div>
  );
};

export default HomePage;
