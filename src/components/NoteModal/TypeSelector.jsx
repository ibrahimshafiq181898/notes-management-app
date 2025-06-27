import { useState } from "react";
import { NOTE_TYPES } from "../../redux/notes";

const cardTypes = [
  { id: NOTE_TYPES.TEXT, label: "Text Note" },
  { id: NOTE_TYPES.IMAGE, label: "Image Note" },
  { id: NOTE_TYPES.CHECKLIST, label: "Checklist Note" }
];

const TypeSelector = ({ selectedType, onTypeSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTypeSelect = (type) => {
    onTypeSelect(type);
    setIsDropdownOpen(false);
  };

  const getSelectedTypeLabel = () => {
    const selectedCard = cardTypes.find((type) => type.id === selectedType);
    return selectedCard ? selectedCard.label : "Select type of card";
  };

  const placeholderStyles = `
    font-inter
    font-bold
    text-sm
    leading-[140%]
    text-[#070707]
  `;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full h-[56px] px-4 text-left bg-[#f4f4f4] rounded-[10px] flex justify-between items-center"
      >
        <span
          className={
            selectedType === ""
              ? `${placeholderStyles}`
              : "text-black  font-semibold"
          }
        >
          {getSelectedTypeLabel()}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10">
          {cardTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleTypeSelect(type.id)}
              className={`w-full px-4 py-3 h-[56px] text-left hover:bg-[#f4f4f4] first:rounded-t-[10px] last:rounded-b-[10px] ${placeholderStyles}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeSelector;
