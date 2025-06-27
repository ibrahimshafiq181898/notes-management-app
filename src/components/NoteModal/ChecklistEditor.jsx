import { useState } from 'react';

const ChecklistEditor = ({ checkboxes, onCheckboxesChange }) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      onCheckboxesChange([
        ...checkboxes,
        { text: newOption.trim(), checked: false }
      ]);
      setNewOption('');
    }
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    onCheckboxesChange(newCheckboxes);
  };

  const handleTextChange = (index, text) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].text = text;
    onCheckboxesChange(newCheckboxes);
  };

  const handleDelete = (index) => {
    const newCheckboxes = checkboxes.filter((_, i) => i !== index);
    onCheckboxesChange(newCheckboxes);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Add option</h3>
      {checkboxes.map((checkbox, index) => (
        <div key={index} className="flex items-center gap-3 px-4 py-3 bg-[#f4f44f4] rounded-[10px]">
          <input
            type="checkbox"
            checked={checkbox.checked}
            onChange={() => handleCheckboxChange(index)}
            className="w-[22px] h-[22px] border-2 border-blue-600 rounded-[4px] checked:bg-blue-600 checked:border-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <input
            type="text"
            value={checkbox.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            placeholder="Add your task here..."
            className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => handleDelete(index)}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add your task here..."
          className="flex-1 px-4 py-3 h-[48px] rounded-2xl bg-[#f4f4f4] placeholder-gray-400 outline-none"
        />
        <button
          type="button"
          onClick={handleAddOption}
          className="px-6 py-3 bg-[#14AE5C] text-[#FFFFFF] rounded-[36px] font-inter font-semibold text-sm hover:bg-[#0EA975] transition-colors"
        >
          + Add option
        </button>
      </div>
    </div>
  );
};

export default ChecklistEditor; 