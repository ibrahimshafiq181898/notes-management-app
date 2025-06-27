import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/notes";
import NoteForm from "./NoteForm";

const NoteModal = ({ isOpen, onClose, initialType = "" }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    body: "",
    image: "",
    checkboxes: []
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        type: "",
        title: "",
        body: "",
        image: "",
        checkboxes: []
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] w-full max-w-[600px] p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[32px] font-bold">Create New Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <NoteForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default NoteModal;
