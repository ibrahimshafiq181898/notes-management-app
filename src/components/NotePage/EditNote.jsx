import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../redux/notes';
import { useNoteContext } from '../../context/NoteContext';
import ImageUploader from '../ImageUploader';
import CheckboxEditor from '../CheckboxEditor';

const EditNote = ({ note }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editingNote, setEditingNote } = useNoteContext();

  if (!editingNote) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNote) {
      dispatch(updateNote(editingNote));
      navigate(`/note/${note.id}`);
    }
  };

  const handleChange = (field, value) => {
    setEditingNote((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-6 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={editingNote.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={editingNote.body}
          onChange={(e) => handleChange("body", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      {note.type === 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <ImageUploader
            currentImage={editingNote.image}
            onImageSelect={(image) => handleChange("image", image)}
          />
        </div>
      )}

      {note.type === 2 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Checklist Items
          </label>
          <CheckboxEditor
            checkboxes={editingNote.checkboxes || []}
            setCheckboxes={(checkboxes) =>
              handleChange("checkboxes", checkboxes)
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(`/note/${note.id}`)}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditNote; 