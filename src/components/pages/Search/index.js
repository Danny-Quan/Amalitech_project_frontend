import React, { useContext, useEffect, useState } from "react";
import "./../Feeds/styles.css";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { MdOutlineFileDownload } from "react-icons/md";
import { AllFilesContext } from "../../../store/FileServices/FilesContext";
import { useParams, Link } from "react-router-dom";
import Loader from "../../../Reusable/Loader";

function Search() {
  const { key } = useParams();
  const FILES_CONTEXT = useContext(AllFilesContext);
  const { file_isLoading, searchFile, downloadFile } = FILES_CONTEXT;

  const [searchedFeeds, setSearchedFeeds] = useState([]);

  useEffect(() => {
    let feeds;
    const searchFeed = async () => {
      feeds = await searchFile(key);
      setSearchedFeeds(feeds);
      return feeds;
    };
    searchFeed();
  }, [key]);

  return (
    <>
      {file_isLoading && <Loader />}
      <div className="bg-slate-50">
        <Navbar />
        <div className="container p-8 pt-32">
          <h3 className="font-semibold text-xl pb-3">Files Found</h3>
          {searchedFeeds?.files?.length >0?
               <>   
               <h5>{searchedFeeds?.files?.length} File(s)</h5>
          <div className="file--card--container mt-10  ">
            {searchedFeeds?.files?.map((feed) => (
              <div className="file--card" key={feed._id}>
                <h2 className="font-bold text-md tracking-wider capitalize mb-1">
                  {feed.title.length < 20
                    ? feed.title
                    : `${feed.title.substring(0, 20)}...`}
                </h2>
                <div className="pb-4 text-sm">March 27, 2024 </div>
                <div className="text-center text-sm border-t-[1px] border-b-[1px] py-2 mb-3">
                  <span className="font-semibold">size:</span>{" "}
                  {Math.round(feed.fileSize / 1024) < 1024
                    ? `${Math.round(feed.fileSize / 1024)} Kb`
                    : `${Math.round(feed.fileSize / 1024) / 1024} Mb`}
                </div>
                <p>
                  {feed.description.length < 86
                    ? feed.description
                    : `${feed.description.substring(0, 86)}...`}
                </p>
                <div className="buttons flex items-center gap-3 mt-7">
                  <Link
                    className="bg-blue-400/10 border-2 border-blue-400 px-3 py-1"
                    to={encodeURI(
                      `/feeds/${feed._id}/${feed?.title.replace("/", "%")}`
                    )}
                  >
                    Details
                  </Link>
                  <button
                    onClick={async () => {
                      await downloadFile(feed._id, feed.filePath);
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
          </div>
          </>
          :<>
          <h2 className="text-center">Sorry! no file matched your search</h2>
          </>}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Search;
