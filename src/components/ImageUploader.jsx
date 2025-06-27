import { useState, useRef } from "react";
import imgUploaderIcon from "../assets/imgpreview.svg";

const ImageUploader = ({ onImageSelect, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreview(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreview("");
    onImageSelect("");
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-[200px]  rounded-[10px] cursor-pointer ${
        isDragging ? "bg-blue-50" : "bg-transparent"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {preview ? (
        <div className="relative w-full flex items-center justify-center">
          <div className="relative w-[200px] h-[150px]">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <img src={imgUploaderIcon} alt="Upload" className="w-10 h-10" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-[#007AFF] font-medium">
              Click to upload
              <span className="text-[#64748B]"> or drag and drop</span>
            </p>
            <p className="text-sm text-[#64748B]">SVG, PNG, JPG or GIF</p>
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUploader;
