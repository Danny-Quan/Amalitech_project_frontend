import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { AuthContext } from "../../../store/Auth/AuthContext";
import Loader from "../../../Reusable/Loader";
import { AllFilesContext } from "../../../store/FileServices/FilesContext";

function Feeds() {
  const navigate = useNavigate();
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const FILES_CONTEXT = useContext(AllFilesContext);
  const {
    file_isLoading,
    resetFileGlobals,
    allFiles,
    getAllFiles,
    downloadFile,
  } = FILES_CONTEXT;

  const { activeUser, isLoading, sendVerificationEmail, resetGlobals } =
    GLOBAL_CONTEXT;

  const [feedSearch, setFeedSearch] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [Files, setFiles] = useState(allFiles);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${feedSearch}`);
    setFeedSearch("");
  };

  //getAllFiles
  const get_FilesFromDB = async () => {
    await getAllFiles();
  };

  useEffect(() => {
    resetFileGlobals();
  }, []);

  useEffect(() => {
    get_FilesFromDB();
  }, []);

  useEffect(() => {
    setFiles(allFiles);
  }, [allFiles]);

  useEffect(() => {
    if (activeUser && activeUser.isVerified === undefined) {
      setShowAlert(false);
    } else if (activeUser && !activeUser.isVerified) {
      setShowAlert(true);
    }
  }, [activeUser]);
  const string =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet adipisci esse ipsum";
  return (
    <React.Fragment>
      {file_isLoading && <Loader />}
      {isLoading && <Loader />}
      <div className="bg-slate-50">
        <Navbar />

        {/* sweet alert here */}
        {showAlert ? (
          <div className="p-5">
            <div className="bg-blue-50 border border-blue-400 rounded text-blue-800 text-sm p-4 flex items-start">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full">
                <p>
                  <span className="font-bold">Info:</span>
                  &nbsp; &nbsp; Your account is not{" "}
                  <span className="font-semibold">Activated</span> and as a
                  result you cannot download a file or send a file to someone. Please click the button
                  below to receive an email for the activation
                </p>
                <button
                  className="border-blue-400 bg-white hover:bg-gray-50 px-4 py-2 mt-4 border rounded font-bold"
                  onClick={() => sendVerificationEmail()}
                >
                  Activate Account
                </button>
              </div>
              <div
                onClick={() => setShowAlert(false)}
                className="hover:bg-blue-100 p-1 cursor-pointer rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : null}

        {/* sweet alert ends here */}
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

            <div className="file--card--container mt-10  ">
              {/* file card here */}
              {Files?.map((file) => (
                <div className="file--card" key={file._id}>
                  <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                    {file.title.length < 20
                      ? file.title
                      : `${file.title.substring(0, 20)}...`}
                  </h2>
                  <div className="pb-4 text-sm">March 27, 2024 </div>
                  <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                    <span className="font-semibold">size:</span>{" "}
                    {Math.round(file.fileSize / 1024) < 1024
                      ? `${Math.round(file.fileSize / 1024)} Kb`
                      : `${Math.round(file.fileSize / 1024) / 1024} Mb`}
                  </div>
                  <p>
                    {file.description.length < 86
                      ? file.description
                      : `${file.description.substring(0, 86)}...`}
                  </p>
                  <div className="buttons flex items-center gap-3 mt-7">
                    <Link
                      className="bg-blue-400/10 border-2 border-blue-400 px-3 py-1"
                      to={encodeURI(`/feeds/${file._id}/${file?.title.replace('/','%')}`)}
                    >
                      Details
                    </Link>
                    <button
                      onClick={async () => {
                        await downloadFile(file._id, file.filePath);
                        return;
                      }}
                    >
                      <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
                        Download <MdOutlineFileDownload />
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
              {/* file card ends here */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Feeds;
