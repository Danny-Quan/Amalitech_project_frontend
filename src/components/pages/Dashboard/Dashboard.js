import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../LandingPage/Navbar";
import { LuFileStack } from "react-icons/lu";
import "./styles.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Confirm from "../../../Reusable/Confirm";
import FileForm from "../../../Reusable/FileForm";
import useRedirect from "../../../customHooks/useRedirect";
import { AuthContext } from "../../../store/Auth/AuthContext";
import Loader from "../../../Reusable/Loader";
import { toast } from "react-toastify";
import { AllFilesContext } from "../../../store/FileServices/FilesContext";

function Dashboard() {
  useRedirect("/login");
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const FILES_CONTEXT = useContext(AllFilesContext);
  const {
    uploadFile,
    file_isSuccess,
    file_isLoading,
    resetFileGlobals,
    getAllFiles,
    allFiles,
    getSingleFile,
    deleteFile,
    updateFile
  } = FILES_CONTEXT;
  const { isLoading } = GLOBAL_CONTEXT;

  const fileInitials = {
    title: "",
    description: "",
    file: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [newFileData, setNewFileData] = useState(fileInitials);
  const [editFileData, setEditFileData] = useState(fileInitials);
  const [Files, setFiles] = useState(allFiles);
  const [fileId, setFileId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [fileDeleted, setFileDeleted] = useState(false);
  const [fileAdded, setFileAdded] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editClicked, setEditClicked] = useState(false);

  //getAllFiles
  const get_FilesFromDB = async () => {
    await getAllFiles();
    setFileDeleted(false);
    setFileAdded(false);
  };

  useEffect(() => {
    get_FilesFromDB();
  }, [fileDeleted, fileAdded]);

  useEffect(() => {
    setFiles(allFiles);
  }, [allFiles]);

  //handling new file
  const handleNewFileForm = (e) => {
    setNewFileData((prev) =>
      e.target.type !== "file"
        ? {
            ...prev,
            [e.target.name]: e.target.value,
          }
        : { ...prev, [e.target.name]: e.target.files[0] }
    );
  };

  //handling edited file
  const handleEditFileForm = (e) => {
    setEditFileData((prev) =>
      e.target.type !== "file"
        ? {
            ...prev,
            [e.target.name]: e.target.value,
          }
        : { ...prev, [e.target.name]: e.target.files[0] }
    );
  };

  useEffect(() => {
    resetFileGlobals();
  }, []);
  useEffect(() => {
    if (file_isSuccess) {
      setShowModal(false);
      setNewFileData(fileInitials);
    }
  }, [file_isSuccess, fileAdded]);

  //submit new file
  const handleNewFileSubmit = async (e) => {
    e.preventDefault();
    if (!newFileData.title || !newFileData.description || !newFileData.file) {
      return toast.error("All fields are required");
    }
    let fileData = new FormData();
    fileData.append("title", newFileData.title);
    fileData.append("description", newFileData.description);
    fileData.append("filePath", newFileData.file);

    await uploadFile(fileData);
    // console.log(Array.from(fileData));
    setFileAdded(true);
  };

  //handle edit click
  const handleEdit = async (id) => {
    let feed = await getSingleFile(id);
    setEditClicked(true);
    return feed;
  };

  useEffect(() => {
    const getData = async () => {
      if (editClicked) {
        const feedData = await handleEdit(fileId);
        // console.log(feedData)
        setEditFileData((prev) => ({
          ...prev,
          title: feedData?.singleFile?.title,
          description: feedData?.singleFile?.description,
          file: feedData?.singleFile?.filePath,
        }));
      }
    };
    getData();
    setEditClicked(false);
  }, [editClicked]);

  //handle edited file
  const handleEditFileSubmit = async(e) => {
    e.preventDefault();
    if (
      !editFileData.title ||
      !editFileData.description ||
      !editFileData.file
    ) {
      return toast.error("all fields are required");
    }
    let editData = new FormData();
    editData.append("title", editFileData.title);
    editData.append("description", editFileData.description);
    editData.append("filePath", editFileData.file);
    // console.log(Array.from(editData) );

    await updateFile(fileId,editData);
    setFileAdded(true);
    setShowModal(false);
  };

  const searchHandler = (e) => {
    setSearchData(e.target.value);
  };
  useEffect(() => {
    const items = Files?.filter((item) => {
      return item.title.toLowerCase().match(searchData);
    });
    setFilteredItems(items);
  }, [searchData, Files]);

  return (
    <>
      {isLoading && <Loader />}
      {file_isLoading && <Loader />}
      <Navbar />
      <main className="bg-black/20 flex">
        <div className="w-[20%] bg-slate-700 h-[92vh] ">
          <Sidebar />
        </div>
        <div className="dashbaord dash--content w-[80%] bg-slate-100 ">
          <div className="flex gap-5 items-center bg-white px-5 py-3 shadow-sm">
            <div className="border-2 border-slate-200 p-2 rounded-md">
              <LuFileStack size={25} />
            </div>
            <h2 className="text-xl">All Files</h2>
          </div>
          {/* delete modal */}
          {showDeleteModal ? (
            <Confirm
              setShowDeleteModal={setShowDeleteModal}
              onDelete={deleteFile}
              deleteId={deleteId}
              setFileDeleted={setFileDeleted}
            />
          ) : null}

          {/* new file form */}
          {showModal ? (
            <FileForm
              title={"Add A New File"}
              inputValue={newFileData}
              handleChange={handleNewFileForm}
              handleSubmit={handleNewFileSubmit}
              setModal={setShowModal}
              setNewFileData={setNewFileData}
              setEditFileData={setEditFileData}
              fileInitials={fileInitials}
            />
          ) : null}

          {/* Edit file form */}
          {showEditModal ? (
            <FileForm
              title={"Edit File"}
              inputValue={editFileData}
              handleChange={handleEditFileForm}
              handleSubmit={handleEditFileSubmit}
              setModal={setShowEditModal}
              setNewFileData={setNewFileData}
              setEditFileData={setEditFileData}
              fileInitials={fileInitials}
            />
          ) : null}

          {/* searchbar and table here */}
          <div className="bg-white p-5 my-5 mx-5">
            {/* searchbar */}
            <div className="flex items-center gap-5 justify-between">
              <input
                type="search"
                placeholder="search file"
                className="border-[2px] border-slate-300 w-[70%]"
                value={searchData}
                onChange={searchHandler}
              />

              <button
                className="bg-slate-100 px-4 py-2 border-2 border-slate-500 rounded-sm hover:bg-slate-200 "
                onClick={() => setShowModal(true)}
              >
                + Add File
              </button>
            </div>
            {/* table */}
            <div className="mt-5">
              <table className="w-[100%] text-left">
                <thead>
                  <tr className="py-2 px-2 bg-blue-200/70">
                    <th className="font-medium text-sm">Date</th>
                    <th className="font-medium text-sm">File Title</th>
                    <th className="font-medium text-sm">Downloads</th>
                    <th className="font-medium text-sm">Emails Sent</th>
                    <th className="font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems?.map((file) => (
                    <tr key={file._id}>
                      <td>
                        {new Date(file.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "2-digit",
                        })}
                      </td>
                      <td>{file.title}</td>
                      <td>{file.downloads}</td>
                      <td>{file.emailsSent}</td>
                      <td className="flex gap-2 items-center">
                        <span
                          className="bg-blue-200/60 p-2 rounded-sm cursor-pointer"
                          onClick={() => {
                            setShowEditModal(true);
                            setFileId(file._id);
                            handleEdit(file._id);
                          }}
                        >
                          <FaPencilAlt color="rgb(36, 36, 83)" />
                        </span>
                        <span
                          className="bg-red-400/40 p-2 rounded-sm font-semibold cursor-pointer"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteId(file._id);
                          }}
                        >
                          <FaTimes color="rgb(231, 53, 53)" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
