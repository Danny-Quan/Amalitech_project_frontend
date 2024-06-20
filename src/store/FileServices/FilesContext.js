import { createContext, useReducer } from "react";
import filesReducer from "./filesReducer";
import axios from "axios";
import {
  ON_FULFILLED,
  ON_GET_ALL_FILES,
  ON_PENDING,
  ON_REJECTED,
  RESET,
} from "./filesActions";
import { toast } from "react-toastify";

export const AllFilesContext = createContext();

const FilesVariables = {
  file_isLoading: false,
  file_isSuccess: false,
  file_isError: false,
  allFiles: [],
};
function FilesContext({ children }) {
  const [state, dispatch] = useReducer(filesReducer, FilesVariables);

  //upload new file
  const uploadFile = async (fileData) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.post("/files/upload-file", fileData);
      if (response) {
        dispatch({ type: ON_FULFILLED });
        toast.success("file uploaded successfully");
        // console.log(response)
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //get All files
  const getAllFiles = async () => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.get("/files/all-files");
      if (response) {
        dispatch({ type: ON_GET_ALL_FILES, payload: response?.data });
        // console.log(response);
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //get single file
  const getSingleFile = async (fileId) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.get(`/files/single-file/${fileId}`);
      if (response) {
        dispatch({ type: ON_FULFILLED });
        // toast.success('file uploaded successfully')
        // console.log(response);
      }
      return response.data;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //send file to Email
  const sendFileToEmail = async (mailData) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.post("/files/send-file", mailData);
      if (response) {
        dispatch({ type: ON_FULFILLED });
        toast.success("file sent to receiver");
        // console.log(response)
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //delete file
  const deleteFile = async (fileId) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.delete(`/files/delete-file/${fileId}`);
      if (response) {
        dispatch({ type: ON_FULFILLED });
        toast.success(response.data.message);
        // console.log(response)
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //search file
  const searchFile = async (query) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.get(`/files/search/${query}`);
      if (response) {
        dispatch({ type: ON_FULFILLED });
        // toast.success('file uploaded successfully')
        // console.log(response);
      }
      return response.data;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //download file
  const downloadFile = async (fileId, filename) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.get(`/files/download/${fileId}/${filename}`,{
        responseType:'blob'
      });
      if (response) {
        dispatch({ type: ON_FULFILLED });
        // toast.success('file uploaded successfully')
        // console.log(response);
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  //update file
  const updateFile = async (fileId, editData) => {
    dispatch({ type: ON_PENDING });
    try {
      const response = await axios.patch(
        `/files/update-file/${fileId}`,
        editData
      );
      if (response) {
        dispatch({ type: ON_FULFILLED });
        toast.success("file updated successfully");
        // console.log(response);
      }
      return response;
    } catch (error) {
      dispatch({ type: ON_REJECTED });
      // console.log(error);
      if (error && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const resetFileGlobals = () => {
    dispatch({ type: RESET });
  };
  return (
    <AllFilesContext.Provider
      value={{
        ...state,
        uploadFile,
        resetFileGlobals,
        getAllFiles,
        getSingleFile,
        sendFileToEmail,
        deleteFile,
        searchFile,
        downloadFile,
        updateFile,
      }}
    >
      {children}
    </AllFilesContext.Provider>
  );
}

export default FilesContext;
