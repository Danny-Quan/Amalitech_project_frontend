import React, { useReducer } from "react";
import { AuthContext } from "./Auth/AuthContext";
import authReducer from "./Auth/authReducer";
import axios from "axios";
import {
  LOGOUT,
  ON_PENDING,
  RESET,
  ON_REJECTED,
  ON_FULFILLED,
  ON_FULFILLED_LOGIN,
  ON_FULFILLED_SIGNUP,
  ON_FORGOT_PASSWORD,
} from "./Auth/authActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//global variables
const initialVariables = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  activeUser: {},
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialVariables);
  const navigate = useNavigate();
  //fetching user status
  const getLoginStatus = async () => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.get("/users/loginStatus");
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FULFILLED, payload: response.data });
      }
      return response;
    } catch (error) {
      console.log(error);
      dispatch({ type: ON_REJECTED });

      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //loggin in user
  const loginUser = async (userData) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: "/users/login",
        data: userData,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FULFILLED_LOGIN, payload: response.data });
        toast.success("login successfull");
        window.setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //logging out user
  const logoutUser = async () => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: "/users/logout",
        withCredentials: true,
      });
      if (response) {
        toast.success(response.data.message);
      }
      dispatch({ type: LOGOUT });
      // console.log(response);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
      dispatch({ type: ON_REJECTED });
    }
  };

  //signup user
  const registerUser = async (userData) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: "/users/register",
        data: userData,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FULFILLED_SIGNUP, payload: response.data });
        toast.success("User registered successfully");
        window.setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //forgot password
  const forgotPassword = async (email) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: "/users/forgot-password",
        data: email,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FORGOT_PASSWORD });
        toast.success("Reset email sent");
        window.setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //reset Password
  const resetPassword = async (resetData, params) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: `/users/reset-password/${params.email}/${params.token}`,
        data: resetData,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FORGOT_PASSWORD });
        toast.success("Password reset successfull");
        window.setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //verify Email
  const verifyUser = async (params) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: `/users/verify-user/${params.email}/${params.token}`,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FORGOT_PASSWORD });
        toast.success("Verification successfull");
        window.setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  //send Verification Email
  const sendVerificationEmail = async () => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios({
        method: "POST",
        url: `/users/send-verification-email`,
      });
      if (response) {
        // console.log(response);
        dispatch({ type: ON_FORGOT_PASSWORD });
        toast.success("Account verification email sent");
      }
      return;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error.response.data.message)
      if (error && error.response) {
        toast.error(error.response.data.message ?? error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetGlobals = function () {
    dispatch({ type: RESET });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        getLoginStatus,
        loginUser,
        logoutUser,
        registerUser,
        forgotPassword,
        resetPassword,
        verifyUser,
        sendVerificationEmail,
        resetGlobals,

        //files context here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
