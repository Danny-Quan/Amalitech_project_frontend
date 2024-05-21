import React, { useState } from "react";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function FileDetails() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <React.Fragment>
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
          className="w-[50%] my-0 mx-auto"
        >
          <DialogTitle className="text-gray-600 capitalize" >Send File to Email</DialogTitle>
          <DialogContent>
            <DialogContentText  >
              To send this file to a user, please enter the email address of the
              person here. please make sure you enter receiver email correctly
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Receiver Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send file</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Navbar />
      <section className="w-[60%] px-10 py-16 my-0 mx-auto">
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-3xl mb-4">File Title Here</h2>
            <p> size: 115kb</p>
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            consectetur cumque? Exercitationem, minus dolores labore aut
            praesentium fuga laborum illum est! Aut esse qui doloremque ad,
            obcaecati eveniet corporis in? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aliquam, consectetur cumque?
            Exercitationem, minus dolores labore aut praesentium fuga laborum
            illum est! Aut esse qui doloremque ad, obcaecati eveniet corporis
            in?
          </p>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            consectetur cumque? Exercitationem, minus dolores labore aut
            praesentium fuga laborum illum est! Aut esse qui doloremque ad,
            obcaecati eveniet corporis in? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aliquam, consectetur cumque?
            Exercitationem, minus dolores labore aut praesentium fuga laborum
            illum est! Aut esse qui doloremque ad, obcaecati eveniet corporis
            in?
          </p>

          <div className="buttons flex items-center gap-5 mt-12">
            <button onClick={handleClickOpen}>
              <Link className=" bg-blue-400/10 border-2 border-blue-400 px-3 py-1 flex gap-2 items-center">
                <AiOutlineMail size={20} />
                Send to Email
              </Link>
            </button>

            <Link className="flex gap-2 items-center text-center bg-blue-400/10 border-2 border-blue-400 px-3 py-1">
              <MdOutlineFileDownload size={20} />
              Download
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default FileDetails;
