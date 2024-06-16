import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex items-center text-center justify-center h-screen">
      <div>
        <h1 className="text-red-500 text-8xl font-bold">404</h1>
        <h2 className="text-3xl font-bold capitalize">Page not found</h2>
        <button className="mt-5 bg-blue-500 px-8 py-4 rounded-sm">
          <Link to={"/"} className="text-white flex">Back to Home</Link>
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
