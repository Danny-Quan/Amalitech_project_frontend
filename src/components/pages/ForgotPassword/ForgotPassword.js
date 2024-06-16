import React, { useContext, useEffect, useState } from "react";
import "./../Login/login.css";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { AuthContext } from "../../../store/Auth/AuthContext";

function ForgotPassword() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { isLoading, resetGlobals,forgotPassword } = GLOBAL_CONTEXT;

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    resetGlobals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("Please enter a valid email");
    }

    await forgotPassword({email})
    // console.log(email);
  };

  return (
    <section className="login--sec">
      <div className="row">
        <div className="login--container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={email}
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

export default ForgotPassword;
