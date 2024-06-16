import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Feeds from "./components/pages/Feeds/Feeds";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import FileDetails from "./components/pages/FileDetails/FileDetails";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import VerifyEmail from "./components/pages/VerifyEmail";
import ErrorPage from "./components/pages/Error/ErrorPage";
import axios from "axios";
import { AuthContext } from "./store/Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./components/pages/Search";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const {getLoginStatus,isLoggedIn}=GLOBAL_CONTEXT

  // get login status
  useEffect(() => {
    getLoginStatus();
  }, [isLoggedIn]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        theme="colored"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={3000}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/feeds/:id/:title" element={<FileDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/:email/:token" element={<VerifyEmail />} />
        <Route path="/search/:key" element={<Search/>}/>
        <Route
          path="/reset-password/:email/:token"
          element={<ResetPassword />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
