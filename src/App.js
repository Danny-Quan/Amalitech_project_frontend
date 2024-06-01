import React from "react";
import {Routes,Route} from 'react-router-dom'
import LandingPage from "./components/pages/LandingPage";
import Feeds from "./components/pages/Feeds/Feeds";
import Signup from "./components/pages/Signup/Signup";
import Login from "./components/pages/Login/Login";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import FileDetails from "./components/pages/FileDetails/FileDetails";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import VerifyEmail from "./components/pages/VerifyEmail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/feeds" element={<Feeds/>}/>
        <Route path="/feeds/:id" element={<FileDetails/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify/:email/:token" element={<VerifyEmail/>}/>
        <Route path="/reset-password/:email/:token" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
