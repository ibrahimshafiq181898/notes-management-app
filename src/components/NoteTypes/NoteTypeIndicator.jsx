import React from "react";
import { NOTE_TYPES } from "../../redux/notes/types";

const NoteTypeIndicator = ({ type }) => {
  const types = {
    [NOTE_TYPES.TEXT]: { label: "Text", color: "bg-gray-100 text-gray-600" },
    [NOTE_TYPES.IMAGE]: { label: "Image", color: "bg-blue-100 text-blue-600" },
    [NOTE_TYPES.CHECKLIST]: {
      label: "Checklist",
      color: "bg-green-100 text-green-600"
    }
  };

  const { label, color } = types[type] || types[NOTE_TYPES.TEXT];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
};

export default NoteTypeIndicator;
