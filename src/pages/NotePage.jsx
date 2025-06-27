import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNoteContext } from "../context/NoteContext";
import ViewNote from "../components/NotePage/ViewNote";
import EditNote from "../components/NotePage/EditNote";

const NotePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { setEditingNote } = useNoteContext();

  const isEditMode = location.pathname.endsWith("/edit");

  const note = useSelector((state) =>
    state.notes.items.find((note) => note.id === parseInt(id))
  );

  useEffect(() => {
    if (!note) return;

    if (isEditMode) {
      setEditingNote({ ...note });
    } else {
      setEditingNote(null);
    }
  }, [note, isEditMode, setEditingNote]);

  useEffect(() => {
    return () => {
      if (!isEditMode) {
        setEditingNote(null);
      }
    };
  }, [isEditMode, setEditingNote]);

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-500">Note not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {isEditMode ? <EditNote note={note} /> : <ViewNote note={note} />}
      </div>
    </div>
  );
};

export default NotePage;
