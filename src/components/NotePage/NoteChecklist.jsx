import React from 'react';

const NoteChecklist = ({ checkboxes }) => {
  if (!checkboxes?.length) return null;

  return (
    <div className="space-y-3">
      {checkboxes.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="relative flex items-center">
            <div
              className={`w-[22px] h-[22px] flex-shrink-0 rounded-[4px] border-2 ${
                item.checked
                  ? "bg-[#141414] border-[#141414]"
                  : "border-[#141414]"
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
          <span
            className={`text-[17px] leading-[22px] ${
              item.checked
                ? "text-gray-500 line-through"
                : "text-[#141414]"
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NoteChecklist; 