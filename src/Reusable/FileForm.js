import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

function FileForm({
  title,
  inputValue,
  handleChange,
  handleSubmit,
  setModal,
  setNewFileData,
  setEditFileData,
  fileInitials,
}) {
  const handleCancel = () => {
    setModal(false);
    if (title === "Add A New File") {
      setNewFileData(fileInitials);
    } else if (title === "Edit File") {
      setEditFileData(fileInitials);
    }
  };
  return (
    <div className=" p-5 my-5 mx-auto text-slate-800 w-screen h-screen flex items-center justify-center bg-black/40 mt-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-colors">
      <form
        className="add--file--form bg-white w-[50%] p-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <fieldset>
          <legend className="text-slate-800 px-2">{title}</legend>
          <label>File Title</label>
          <input
            type="text"
            name="title"
            value={inputValue.title}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            rows={5}
            value={inputValue.description}
            onChange={handleChange}
          ></textarea>
          <label
            htmlFor="file--upload"
            className="cursor-pointer flex gap-3 items-center justify-center rounded-sm p-2 bg-blue-600 w-[40%]"
          >
            <IoCloudUploadOutline size={40} color="black" />
            <span className="text-white">Upload File</span>
          </label>
          <input
            className="hidden"
            id="file--upload"
            type="file"
            name="file"
            multiple={false}
            file={inputValue.file}
            onChange={handleChange}
          />
          <p className="text-gray-900 text-sm mt-4">
            {inputValue?.file?.name ?? inputValue?.file}
          </p>
          <div className="text-right flex gap-5 items-center justify-end mt-5">
            <button
              type="submit"
              className="text-white bg-slate-600 px-5 py-2  rounded-sm hover:bg-slate-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 px-5 py-2  rounded-sm hover:bg-blue-600/50"
            >
              Save File
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default FileForm;
