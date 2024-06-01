import React, { useState } from "react";
import "./styles.css";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";

function Feeds() {
  const [feedSearch, setFeedSearch] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="row feeds ">
        <div className="container mt-5 mb-5">
          <div className=" feeds--form relative">
            <div className="absolute left-[22%] top-[25%]">
              <CiSearch size={25} />
            </div>
            <form onSubmit={submitSearch}>
              <input
                className="w-[100%] px-20"
                type="search"
                name="search"
                value={feedSearch}
                onChange={(e) => {
                  setFeedSearch(e.target.value);
                }}
              />
            </form>
          </div>

          <div className="file--card--container mt-10 flex gap-3">
            <div className="file--card">
              <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                Lorem ipsum dolor
              </h2>
              <div className="pb-4 text-sm">March 27, 2024 </div>
              <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                size: 155kb
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet adipisci esse ipsum
              </p>
              <div className="buttons flex items-center gap-3 mt-7">
                <Link className="bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Details
                </Link>
                <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Download <MdOutlineFileDownload />
                </Link>
              </div>
            </div>
            <div className="file--card ">
              <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                Lorem ipsum dolor
              </h2>
              <div className="pb-4 text-sm">March 27, 2024 </div>
              <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                size: 155kb
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet adipisci esse ipsum
              </p>
              <div className="buttons flex items-center gap-3 mt-7">
                <Link className="bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Details
                </Link>
                <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Download <MdOutlineFileDownload />
                </Link>
              </div>
            </div>
            <div className="file--card">
              <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                Lorem ipsum dolor
              </h2>
              <div className="pb-4 text-sm">March 27, 2024 </div>
              <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                size: 155kb
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet adipisci esse ipsum
              </p>
              <div className="buttons flex items-center gap-3 mt-7">
                <Link className="bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Details
                </Link>
                <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Download <MdOutlineFileDownload />
                </Link>
              </div>
            </div>
            <div className="file--card">
              <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                Lorem ipsum dolor
              </h2>
              <div className="pb-4 text-sm">March 27, 2024 </div>
              <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                size: 155kb
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet adipisci esse ipsum
              </p>
              <div className="buttons flex items-center gap-3 mt-7">
                <Link
                  className=" bg-blue-400/10 border-2 border-blue-400 px-3 py-1"
                  to={"/feeds/123"}
                >
                  Details
                </Link>
                <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                  Download
                  <MdOutlineFileDownload size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Feeds;
