import React from "react";
import "./styles.css";
import { Tilt } from "react-tilt";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="row header--container">
        <div className="my--container">
          <div className="header">
            <div className="header--image">
              <Tilt options={defaultOptions}>
                <img
                  src="./images/undraw_folder_files_re_2cbm.svg"
                  alt="headerImage"
                />
              </Tilt>
            </div>
            <div className="header--content">
              <h1 className="text-4xl font-semibold">
                Secure File Sharing & <br /> Storage
              </h1>
              <p>
                Access and share your files anytime, anywhere with our secure
                and reliable file server solutions. This means you can browse
                through files, download and also send to clients regardless of
                location. simply enjoy the freedom of having your files at your
                fingertips
              </p>
              <div className="buttons">
                <button
                  className="text-center mr-6 bg-gray-800 px-6 py-3 rounded-sm text-white tracking-wider"
                  onClick={() => {
                    navigate("/feeds");
                  }}
                >
                  Browse Files
                </button>
                <button
                  className="text-center bg-blue-700 px-6 py-3 rounded-sm text-white tracking-wider"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
