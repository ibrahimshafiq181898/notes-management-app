import React from "react";

const NoteTypeIndicator = ({ type }) => {
  const types = {
    0: { label: "Text", color: "bg-gray-100 text-gray-600" },
    1: { label: "Image", color: "bg-blue-100 text-blue-600" },
    2: { label: "Checklist", color: "bg-green-100 text-green-600" }
  };

  const { label, color } = types[type] || types[0];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
};

export default NoteTypeIndicator;
