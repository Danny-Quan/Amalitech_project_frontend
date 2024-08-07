import React, { useContext, useEffect, useState } from "react";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { Link, useParams } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AllFilesContext } from "../../../store/FileServices/FilesContext";
import Loader from "../../../Reusable/Loader";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function FileDetails() {
  const { id } = useParams();
  const FILES_CONTEXT = useContext(AllFilesContext);
  const {
    file_isLoading,
    file_isSuccess,
    resetFileGlobals,
    getSingleFile,
    sendFileToEmail,
    downloadFile,
  } = FILES_CONTEXT;

  const [open, setOpen] = useState(false);
  const [singleFeed, setSingleFeed] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    resetFileGlobals();
  }, []);

  useEffect(() => {
    let feed;
    const singleFile = async () => {
      feed = await getSingleFile(id);
      setSingleFeed(feed);
      return feed;
    };
    singleFile();
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  const sendFileToReceiver = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("please enter a valid email");
    }
    const mailData = { fileId: id, receiverEmail: email };
    await sendFileToEmail(mailData);
    setEmail("");
  };

  //download handler
  const handleDownload = async function (id, filename) {
    try {
      const response= await downloadFile(id,filename);

      if(response && response.data){
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <React.Fragment>
        {file_isLoading && <Loader />}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
          className="w-[50%] my-0 mx-auto max-md:w-[80%] max-sm:w-[100%]"
        >
          <DialogTitle className="text-gray-600 capitalize">
            Send File to Email
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To send this file to a user, please enter the email address of the
              person here. please make sure you enter receiver email correctly
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Receiver Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              onClick={sendFileToReceiver}
              disabled={file_isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                backgroundColor: "dodgerblue",
              }}
            >
              {file_isLoading ? (
                <>
                  <span style={{ marginTop: "8px" }}>
                    <ClipLoader color="#fff" size={20} />
                  </span>{" "}
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send File</span>
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Navbar />
      <section className="w-[60%] px-10 py-16 my-0 mx-auto pt-32 max-md:w-[80%] max-sm:w-[100%]">
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-2xl mb-4 capitalize">
              {singleFeed?.singleFile?.title}
            </h2>
            <p>
              {" "}
              <span className="font-semibold text-xl">size:</span>{" "}
              {Math.round(singleFeed?.singleFile?.fileSize / 1024) < 1024
                ? `${Math.round(singleFeed?.singleFile?.fileSize / 1024)} Kb`
                : `${
                    Math.round(singleFeed?.singleFile?.fileSize / 1024) / 1024
                  } Mb`}
            </p>
          </div>
          <p className="text-left">{singleFeed?.singleFile?.description}</p>
          <br />

          <div className="buttons md:flex items-center gap-5 mt-12">
            <button onClick={handleClickOpen}>
              <Link className=" bg-blue-400/10 border-2 border-blue-400 px-3 py-1 flex gap-2 items-center">
                <AiOutlineMail size={20} />
                Send Email
              </Link>
            </button>

            <button
              onClick={() => {
                handleDownload(
                  singleFeed?.singleFile?._id,
                  singleFeed?.singleFile?.fileName
                );
              }}
              className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1"
            >
              <MdOutlineFileDownload size={20} />
              Download
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default FileDetails;
