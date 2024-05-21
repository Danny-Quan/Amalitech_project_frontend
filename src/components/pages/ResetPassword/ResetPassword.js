import React, { useState } from 'react'
import './../Login/login.css'
import { ClipLoader } from "react-spinners";



function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      password: "",
      confirmPassword:""
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
            <form className='form' onSubmit={handleSubmit}>
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
                name="ConfirmPassword"
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

export default ResetPassword