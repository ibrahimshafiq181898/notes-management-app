import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNote } from "../redux/notes";
import editIcon from "../assets/editicon.svg";
import showIcon from "../assets/showicon.svg";
import TextNote from "./NoteTypes/TextNote";
import ImageNote from "./NoteTypes/ImageNote";
import CheckboxNote from "./NoteTypes/CheckboxNote";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/note/${note.id}/edit`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(note.id));
      navigate("/");
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/note/${note.id}`);
  };

  const renderContent = () => {
    switch (note.type) {
      case 1:
        return <ImageNote note={note} />;
      case 2:
        return <CheckboxNote note={note} />;
      case 3:
        return <TextNote note={note} />;
      default:
        return <TextNote note={note} />;
    }
  };

  return (
    <div className="group relative bg-white rounded-[20px] p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all touch-manipulation">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-2 sm:p-1.5 rounded-full hover:bg-gray-100 transition sm:opacity-0 sm:group-hover:opacity-100 bg-white shadow-sm sm:shadow-none"
        title="Delete Note"
      >
        <svg
          className="w-5 h-5 sm:w-4 sm:h-4 text-gray-500 hover:text-red-600 transition"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6L18.343 19.656C18.289 20.555 17.541 21.25 16.641 21.25H7.359C6.459 21.25 5.711 20.555 5.657 19.656L5 6M9 10V17M15 10V17"></path>
          <path d="M10 6V4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6"></path>
        </svg>
      </button>

      <div className="relative">{renderContent()}</div>

      <div className="mt-4 flex justify-end gap-3 sm:hidden">
        <button
          onClick={handleView}
          className="p-2 hover:bg-gray-100 transition-colors rounded-full"
        >
          <img src={showIcon} alt="View" className="w-5 h-5" />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 hover:bg-gray-100 transition-colors rounded-full"
        >
          <img src={editIcon} alt="Edit" className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden sm:flex absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px] items-center justify-center gap-3">
        <button
          onClick={handleView}
          className="p-3 hover:scale-105 transition-transform bg-white rounded-full"
        >
          <img src={showIcon} alt="View" className="w-6 h-6" />
        </button>
        <button
          onClick={handleEdit}
          className="p-3 hover:scale-105 transition-transform bg-white rounded-full"
        >
          <img src={editIcon} alt="Edit" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
