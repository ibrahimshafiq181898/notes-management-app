const NotePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Note Title</h1>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Edit
            </button>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600">Note content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
