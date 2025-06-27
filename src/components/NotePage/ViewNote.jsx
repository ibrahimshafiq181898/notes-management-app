import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteImage from './NoteImage';
import NoteChecklist from './NoteChecklist';
import { useNoteContext } from '../../context/NoteContext';

const ViewNote = ({ note }) => {
  const navigate = useNavigate();
  const { setEditingNote } = useNoteContext();

  const handleEdit = () => {
    setEditingNote({ ...note });
    navigate(`/note/${note.id}/edit`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold text-gray-900">
          {note.title}
        </h1>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Edit
        </button>
      </div>

      {note.type === 1 && <NoteImage image={note.image} title={note.title} />}
      {note.type === 2 && <NoteChecklist checkboxes={note.checkboxes} />}

      <p className="text-gray-600 whitespace-pre-wrap">{note.body}</p>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewNote; 