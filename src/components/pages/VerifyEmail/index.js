import React, { useContext } from "react";
import Footer from "../LandingPage/Footer";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/AuthContext";
import Loader from "../../../Reusable/Loader";

function VerifyEmail() {
  const { email, token } = useParams();
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { verifyUser,isLoading } = GLOBAL_CONTEXT;

  const handleVerify = async function () {
    const params = { email, token };
    await verifyUser(params);
  };

  return (
    <>
    {isLoading && <Loader/>}
      <div className="flex items-center justify-center h-[85vh]">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Account Verification</h1>
          <p className="mb-4">To verify your account, click the button below</p>
          <button disabled={isLoading} onClick={handleVerify} className="bg-blue-500/90 hover:bg-blue-500/60 text-white px-5 py-2 rounded-sm">
            Verify Account
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VerifyEmail;
