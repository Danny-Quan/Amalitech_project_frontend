import React, { useContext, useEffect, useState } from "react";
import "./../Login/login.css";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../store/Auth/AuthContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { isLoading, resetPassword, resetGlobals } = GLOBAL_CONTEXT;

  const { email, token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    resetGlobals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      return toast.error("All fields are required");
    }
    if(formData.password.length <6){
      return toast.error('Password cannot be less than 6 characters')
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    const Data = new FormData();
    Data.append("password", formData.password);
    Data.append("confirmPassword", formData.confirmPassword);
    const resetData = {
      password: Data.get("password"),
      confirmPassword: Data.get("confirmPassword"),
    };
    const params = { email, token };
    await resetPassword(resetData, params);
    // console.log(formData);
  };

  return (
    <section className="login--sec">
      <div className="row">
        <div className="login--container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Reset Password</h3>

            <label htmlFor="password">New Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              id="ConfirmPassword"
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
                  <span>Reseting ...</span>
                </>
              ) : (
                <span>Reset</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
