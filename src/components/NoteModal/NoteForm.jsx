import { useState } from 'react';
import { NOTE_TYPES } from '../../redux/notes';
import ImageUploader from '../ImageUploader';
import TypeSelector from './TypeSelector';
import ChecklistEditor from './ChecklistEditor';
import FormError from './FormError';

const NoteForm = ({ formData, onChange, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = 'Please select a note type';
    }
    if (!formData.title) {
      newErrors.title = 'Please enter a title';
    }
    if (!formData.body) {
      newErrors.body = 'Please enter a description';
    }
    if (formData.type === NOTE_TYPES.IMAGE && !formData.image) {
      newErrors.image = 'Please upload an image';
    }
    if (formData.type === NOTE_TYPES.CHECKLIST && formData.checkboxes.length === 0) {
      newErrors.checkboxes = 'Please add at least one checklist item';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleTypeSelect = (type) => {
    onChange({
      ...formData,
      type,
      ...(type !== NOTE_TYPES.IMAGE && { image: '' }),
      ...(type !== NOTE_TYPES.CHECKLIST && { checkboxes: [] })
    });
    // Clear type error when user selects a type
    if (errors.type) {
      setErrors({ ...errors, type: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <TypeSelector
          selectedType={formData.type}
          onTypeSelect={handleTypeSelect}
        />
        <FormError message={errors.type} />
      </div>

      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Header"
          className={`w-full px-4 py-3 bg-[#f4f4f4] rounded-[10px] placeholder-gray-400 ${
            errors.title ? 'border-2 border-red-500 focus:border-red-500' : ''
          }`}
        />
        <FormError message={errors.title} />
      </div>

      {formData.type === NOTE_TYPES.IMAGE && (
        <div>
          <div className={`border-2 border-dashed rounded-[10px] p-8 ${
            errors.image ? 'border-red-500' : 'border-blue-500'
          }`}>
            <ImageUploader
              onImageSelect={(imageUrl) => {
                onChange({ ...formData, image: imageUrl });
                if (errors.image) {
                  setErrors({ ...errors, image: '' });
                }
              }}
            />
          </div>
          <FormError message={errors.image} />
        </div>
      )}

      <div>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          placeholder="Description"
          className={`w-full px-4 py-3 bg-[#f4f44f4] rounded-[10px] min-h-[100px] placeholder-gray-400 resize-none ${
            errors.body ? 'border-2 border-red-500 focus:border-red-500' : ''
          }`}
        />
        <FormError message={errors.body} />
      </div>

      {formData.type === NOTE_TYPES.CHECKLIST && (
        <div>
          <ChecklistEditor
            checkboxes={formData.checkboxes}
            onCheckboxesChange={(checkboxes) => {
              onChange({ ...formData, checkboxes });
              if (errors.checkboxes) {
                setErrors({ ...errors, checkboxes: '' });
              }
            }}
          />
          <FormError message={errors.checkboxes} />
        </div>
      )}

      <button
        type="submit"
        className="w-full py-6 bg-[#8C929C] h-[40px] text-white rounded-[36px] font-medium hover:bg-[#64748B] transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_16226_1556)">
            <path d="M2.40039 0.400391H13.5996C14.13 0.400391 14.6396 0.610279 15.0146 0.985352C15.3897 1.36042 15.5996 1.86996 15.5996 2.40039V9.2002H12C11.2574 9.2002 10.5456 9.49541 10.0205 10.0205C9.49541 10.5456 9.2002 11.2574 9.2002 12V15.5996H2.40039C1.86996 15.5996 1.36042 15.3897 0.985352 15.0146C0.610279 14.6396 0.400391 14.13 0.400391 13.5996V2.40039C0.400391 1.86996 0.610279 1.36042 0.985352 0.985352C1.36042 0.610279 1.86996 0.400391 2.40039 0.400391ZM12 11.5996H15.293C15.2135 11.7264 15.1203 11.8445 15.0137 11.9512L11.9512 15.0137C11.8447 15.1202 11.7262 15.2125 11.5996 15.292V12C11.5996 11.8939 11.6418 11.7918 11.7168 11.7168C11.7918 11.6418 11.8939 11.5996 12 11.5996ZM4 9.2002C3.68174 9.2002 3.37641 9.32671 3.15137 9.55176C2.92645 9.77678 2.7998 10.0822 2.7998 10.4004C2.79991 10.7184 2.9266 11.0231 3.15137 11.248C3.37641 11.4731 3.68174 11.5996 4 11.5996H7.2002C7.51838 11.5996 7.82383 11.473 8.04883 11.248C8.27353 11.0231 8.40029 10.7183 8.40039 10.4004C8.40039 10.0823 8.27369 9.77677 8.04883 9.55176C7.82383 9.32676 7.51838 9.20025 7.2002 9.2002H4Z" fill="white" stroke="white" strokeWidth="0.8"/>
          </g>
          <defs>
            <clipPath id="clip0_16226_1556">
              <rect width="16" height="16" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        Create
      </button>
    </form>
  );
};

export default NoteForm; 