import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override = {
  display: "flex",
};

function Loader() {
  return (
    <div className="sweet-loading flex items-center justify-center w-full h-screen bg-black/25 fixed z-50" >
      <BounceLoader
        color={"dodgerblue"}
        // loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
