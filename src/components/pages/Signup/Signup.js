import React, { useContext, useEffect, useState } from "react";
import "./../Login/login.css";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/AuthContext";
import { toast } from "react-toastify";

function Signup() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { isLoading, registerUser, resetGlobals } = GLOBAL_CONTEXT;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    resetGlobals();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("Please enter a valid email");
    }
    const Data = new FormData();
    Data.append("username", formData.username);
    Data.append("email", formData.email);
    Data.append("password", formData.password);
    Data.append("confirmPassword", formData.confirmPassword);

    const userData = {
      username: Data.get("username"),
      email: Data.get("email"),
      password: Data.get("password"),
      confirmPassword: Data.get("confirmPassword"),
    };
    // console.log(formData);

    await registerUser(userData);
  };

  return (
    <section className="login--sec">
      <div className="row">
        <div className="login--container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
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
                  <span>Signing up ...</span>
                </>
              ) : (
                <span>Signup</span>
              )}
            </button>

            <div className="flex justify-between items-center pt-4">
              <p>Already have account?</p>
              <p
                className="text-[dodgerblue] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login here
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
