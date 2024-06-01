import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../LandingPage/Navbar";
import { LuFileStack } from "react-icons/lu";
import "./styles.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Confirm from "../../../Reusable/Confirm";
import FileForm from "../../../Reusable/FileForm";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [newFileData, setNewFileData] = useState({
    title: "",
    description: "",
    file: "",
  });
  const [editFileData, setEditFileData] = useState({
    title: "",
    description: "",
    file: "",
  });

  const handleNewFileForm = (e) => {
    setNewFileData((prev) =>(e.target.type !== 'file'? {
      ...prev,
      [e.target.name]: e.target.value,
    }:{...prev, [e.target.name]:e.target.files[0]}));
  };
  const handleEditFileForm = (e) => {
    setEditFileData((prev) =>(e.target.type !== 'file'? {
      ...prev,
      [e.target.name]: e.target.value,
    }:{...prev, [e.target.name]:e.target.files[0]}));
  };
  const handleNewFileSubmit = (e) => {
    e.preventDefault();
    console.log(newFileData);
  };
  const handleEditFileSubmit = (e) => {
    e.preventDefault();
    console.log(editFileData);
  };

  const searchHandler = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <>
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
            <Confirm setShowDeleteModal={setShowDeleteModal} />
          ) : null}

          {/* new file form */}
          {showModal ? (
            <FileForm
              title={"Add A New File"}
              inputValue={newFileData}
              handleChange={handleNewFileForm}
              handleSubmit={handleNewFileSubmit}
              setModal={setShowModal}
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
                  <tr>
                    <td>Mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td className="flex gap-2 items-center">
                      <span
                        className="bg-blue-200/60 p-2 rounded-sm cursor-pointer"
                        onClick={() => setShowEditModal(true)}
                      >
                        <FaPencilAlt color="rgb(36, 36, 83)" />
                      </span>
                      <span
                        className="bg-red-400/40 p-2 rounded-sm font-semibold cursor-pointer"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <FaTimes color="rgb(231, 53, 53)" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td className="flex gap-2 items-center">
                      <span
                        className="bg-blue-200/60 p-2 rounded-sm cursor-pointer"
                        onClick={() => setShowEditModal(true)}
                      >
                        <FaPencilAlt color="rgb(36, 36, 83)" />
                      </span>
                      <span
                        className="bg-red-400/40 p-2 rounded-sm font-semibold cursor-pointer"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <FaTimes color="rgb(231, 53, 53)" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td className="flex gap-2 items-center">
                      <span
                        className="bg-blue-200/60 p-2 rounded-sm cursor-pointer"
                        onClick={() => setShowEditModal(true)}
                      >
                        <FaPencilAlt color="rgb(36, 36, 83)" />
                      </span>
                      <span
                        className="bg-red-400/40 p-2 rounded-sm font-semibold cursor-pointer"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <FaTimes color="rgb(231, 53, 53)" />
                      </span>
                    </td>
                  </tr>
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
