import React, { useContext, useEffect, useState } from "react";
import "./login.css";
// import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/AuthContext";
import { toast } from "react-toastify";


function Login() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const {isLoading,resetGlobals}=GLOBAL_CONTEXT
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    resetGlobals();
  },[navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      return toast.error('All fields are required')
    }
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    let userData={email:data.get("email"), password:data.get("password")};

    await GLOBAL_CONTEXT.loginUser(userData)
  };

  return (
    <section className="login--sec">
      <div className="row">
        <div className="login--container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <button
              className="submitBtn"
              type="submit"
              disabled={isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {isLoading ? (
                <>
                  <span style={{ marginTop: "8px" }}>
                    <ClipLoader color="#000" size={23} />
                  </span>{" "}
                  <span>Signing in ...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>

            <div className="flex justify-between items-center pt-4">
              <p>Forgot password?</p>
              <p
                className="text-[dodgerblue] cursor-pointer"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                reset here
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
