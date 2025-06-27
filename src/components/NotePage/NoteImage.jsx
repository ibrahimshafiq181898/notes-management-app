import React from 'react';

const NoteImage = ({ image, title }) => {
  if (!image) return null;

  return (
    <div className="relative w-full h-64">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default NoteImage; 