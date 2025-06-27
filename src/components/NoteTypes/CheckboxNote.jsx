import React from "react";
import NoteTypeIndicator from "./NoteTypeIndicator";

const CheckboxNote = ({ note }) => {
  const titleClasses =
    "font-inter font-[590] text-[17px] leading-[22px] tracking-[-0.43px] text-[#141414] truncate flex-1 pr-2";
  const contentClasses =
    "font-inter font-normal text-sm leading-[140%] text-gray-600 align-middle line-clamp-4";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h2 className={titleClasses}>{note.title}</h2>
        <div className="flex items-center gap-2">
          <NoteTypeIndicator type={2} />
        </div>
      </div>
      {note.checkboxes && note.checkboxes.length > 0 && (
        <div className="space-y-3 max-h-[200px] overflow-y-auto">
          {note.checkboxes.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="relative flex items-center mt-[3px]">
                <div
                  className={`w-[22px] h-[22px] flex-shrink-0 rounded-[4px] border-2 ${
                    item.checked
                      ? "bg-blue-600 border-blue-600"
                      : "border-blue-600"
                  }`}
                >
                  {item.checked && (
                    <svg
                      className="absolute left-[4px] top-[4px] w-[14px] h-[14px] text-white pointer-events-none"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="font-inter text-[17px] leading-[22px] tracking-[-0.43px] text-[#141414] flex-1 truncate overflow-hidden">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
      <p className={contentClasses}>{note.body.split("\n\nComments:")[0]}</p>
    </div>
  );
};

export default CheckboxNote;
