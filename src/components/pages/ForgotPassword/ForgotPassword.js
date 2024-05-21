import React, { useState } from 'react'
import './../Login/login.css'
import { ClipLoader } from "react-spinners";


function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email,setEmail] = useState("");
  
    const handleInputChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
      setIsLoading(true)
    };
  
    return (
      <section className="login--sec">
        <div className="row">
          <div className="login--container">
            <form className='form' onSubmit={handleSubmit}>
              <h3>Forgot Password</h3>
  
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                autoComplete={false}
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
                    <span>Sending ...</span>
                  </>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
}

export default ForgotPassword