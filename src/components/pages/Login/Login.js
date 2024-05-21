import React, { useState } from "react";
import "./login.css";
// import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate= useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true)
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
              autoComplete={false}
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
              <p className="text-[dodgerblue] cursor-pointer" onClick={()=>{navigate('/forgot-password')}}>reset here</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
