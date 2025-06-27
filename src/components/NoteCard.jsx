const NoteCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Text Note
          </span>
          <div className="flex space-x-2">
            <button className="p-1 text-gray-400 hover:text-red-500">
              Delete
            </button>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Note Title</h3>
        <p className="text-gray-600">Note content</p>
      </div>
    </div>
  );
};

export default NoteCard;
