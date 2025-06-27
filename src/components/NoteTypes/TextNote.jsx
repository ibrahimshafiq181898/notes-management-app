import React from "react";
import NoteTypeIndicator from "./NoteTypeIndicator";

const TextNote = ({ note }) => {
  const titleClasses =
    "font-inter font-[590] text-[17px] leading-[22px] tracking-[-0.43px] text-[#141414] truncate flex-1 pr-2";
  const contentClasses =
    "font-inter font-normal text-sm leading-[140%] text-gray-600 align-middle line-clamp-4";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h2 className={titleClasses}>{note.title}</h2>
        <div className="flex items-center gap-2">
          <NoteTypeIndicator type={0} />
        </div>
      </div>
      <p className={contentClasses}>{note.body}</p>
    </div>
  );
};

export default TextNote;
