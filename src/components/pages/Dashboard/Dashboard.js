import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../LandingPage/Navbar";
import { LuFileStack } from "react-icons/lu";
import "./styles.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import Confirm from "../../../Reusable/Confirm";


function Dashboard() {
  const [showModal,setShowModal]= useState(false)
  const [showEditModal,setShowEditModal]= useState(false)
  const [showDeleteModal,setShowDeleteModal]= useState(false)

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
          {showDeleteModal?<Confirm setShowDeleteModal={setShowDeleteModal}/>:null}
          {/* end delete modal */}
          {/* new file form */}
          {showModal? 
                 <div className="bg-white p-5 my-5 mx-auto text-slate-800 w-screen h-screen flex items-center justify-center bg-black/40 mt-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-colors">
            <form className="add--file--form bg-white w-[50%] p-5">
              <fieldset>
                <legend className="text-slate-800 px-2">Add A New File</legend>
                <label>File Title</label>
                <input type="text" name="title" />
                <label>Description</label>
                <textarea name="description"  rows={5}></textarea>
                <label htmlFor="file--upload" className="cursor-pointer flex gap-3 items-center justify-center rounded-sm p-2 bg-blue-600 w-[40%]">
                <IoCloudUploadOutline size={40} color="black"/>
                  <span className="text-white">Upload File</span>
                </label>
                <input className="hidden" id="file--upload" type="file" name="file"/>
                <div className="text-right flex gap-5 items-center justify-end mt-5">
                <button type="submit" className="text-white bg-slate-600 px-5 py-2  rounded-sm hover:bg-slate-400" onClick={()=>setShowModal(false)}>Cancel</button>
                <button type="submit" className="text-white bg-blue-600 px-5 py-2  rounded-sm hover:bg-blue-600/50">Save File</button>
                </div>
              </fieldset>
            </form>
          </div>
          :null}
   
          {/* Edit file form */}
          {showEditModal? 
                 <div className="bg-white p-5 my-5 mx-auto text-slate-800 w-screen h-screen flex items-center justify-center bg-black/40 mt-0 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-colors">
            <form className="add--file--form bg-white w-[50%] p-5">
              <fieldset>
                <legend className="text-slate-800 px-2">Edit File</legend>
                <label>File Title</label>
                <input type="text" name="title" />
                <label>Description</label>
                <textarea name="description"  rows={5}></textarea>
                <label htmlFor="file--upload" className="cursor-pointer flex gap-3 items-center justify-center rounded-sm p-2 bg-blue-600 w-[40%]">
                <IoCloudUploadOutline size={40} color="black"/>
                  <span className="text-white">Upload File</span>
                </label>
                <input className="hidden" id="file--upload" type="file" name="file"/>
                <div className="text-right flex gap-5 items-center justify-end mt-5">
                <button type="submit" className="text-white bg-slate-600 px-5 py-2  rounded-sm hover:bg-slate-400" onClick={()=>setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="text-white bg-blue-600 px-5 py-2  rounded-sm hover:bg-blue-600/50">Save File</button>
                </div>
              </fieldset>
            </form>
          </div>
          :null}
   
          {/* searchbar and table here */}
          <div className="bg-white p-5 my-5 mx-5">
            {/* searchbar */}
            <div className="flex items-center gap-5 justify-between">
              <input
                type="search"
                placeholder="search file"
                className="border-[2px] border-slate-300 w-[70%]"
              />
              <button className="bg-slate-100 px-4 py-2 border-2 border-slate-500 rounded-sm hover:bg-slate-200" onClick={()=>setShowModal(true)}>
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
                    <td>mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td className="flex gap-2 items-center">
                      <span className="bg-blue-200/60 p-2 rounded-sm cursor-pointer" onClick={()=>setShowEditModal(true)}>
                        <FaPencilAlt color="rgb(36, 36, 83)" />
                      </span>
                      <span className="bg-red-400/40 p-2 rounded-sm font-semibold cursor-pointer" onClick={()=>setShowDeleteModal(true)}>
                        <FaTimes color="rgb(231, 53, 53)" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td>first file</td>
                  </tr>
                  <tr>
                    <td>mar 10, 2024</td>
                    <td>first file</td>
                    <td>20</td>
                    <td>15</td>
                    <td>first file</td>
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
