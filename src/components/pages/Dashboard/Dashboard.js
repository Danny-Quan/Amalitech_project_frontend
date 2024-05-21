import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../LandingPage/Navbar";
import { LuFileStack } from "react-icons/lu";

function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="flex">
        <div className="w-[20%] bg-slate-700 h-[92vh]">
          <Sidebar />
        </div>
        <div className="dashbaord dash--content w-[80%] bg-slate-100 ">
          <div className="flex gap-5 items-center bg-white px-5 py-3 shadow-sm">
            <div className="border-2 border-slate-200 p-3 rounded-md">
              <LuFileStack size={30} />
            </div>
            <h2 className="text-xl">All Files</h2>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
