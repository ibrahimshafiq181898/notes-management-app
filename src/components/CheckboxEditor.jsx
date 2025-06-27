const CheckboxEditor = ({ checkboxes, setCheckboxes }) => {
  const handleAddOption = () => {
    setCheckboxes([...checkboxes, { text: '', checked: false }]);
  };

  const handleRemoveOption = (index) => {
    setCheckboxes(checkboxes.filter((_, i) => i !== index));
  };

  const handleTextChange = (index, text) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].text = text;
    setCheckboxes(newCheckboxes);
  };

  const handleCheckedChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {checkboxes.map((checkbox, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleCheckedChange(index)}
                className="w-[22px] h-[22px] border-2 border-blue-600 rounded-[4px] checked:bg-blue-600 checked:border-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              {checkbox.checked && (
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
            <input
              type="text"
              value={checkbox.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
              placeholder="Add your task here..."
              className="flex-1 font-inter text-[17px] leading-[22px] tracking-[-0.43px] text-[#141414] bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
            />
            {checkboxes.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddOption}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[17px] font-medium text-[#141414] bg-[#F8F8F8] hover:bg-gray-100 rounded-[10px] transition-colors"
      >
        <span>+</span>
        <span>Add option</span>
      </button>
    </div>
  );
};

export default CheckboxEditor; 