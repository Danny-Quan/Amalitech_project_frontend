import React, { useContext} from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { AuthContext } from "../../../store/Auth/AuthContext";
import Loader from "../../../Reusable/Loader";

function LandingPage() {
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { isLoading } = GLOBAL_CONTEXT;

  return (
    <div>
      {isLoading  && <Loader />}
        <>
          <Navbar />
          <Header />
          <Footer />
        </>
    </div>
  );
}

export default LandingPage;
