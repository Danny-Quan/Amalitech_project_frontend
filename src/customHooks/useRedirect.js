import { useContext, useEffect } from "react";
import { AuthContext } from "../store/Auth/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useRedirect(path) {
  const navigate = useNavigate();
  const GLOBAL_CONTEXT = useContext(AuthContext);
  const { getLoginStatus, isLoggedIn } = GLOBAL_CONTEXT;

  useEffect(() => {
    const redirectUsers = async () => {
      let responseStatus;
      try {
        const response = await getLoginStatus();
        responseStatus = response.data;
      } catch (error) {
        // console.log(error);
        navigate(path, { replace: true });
        return;
      }
      if (responseStatus.status !== true) {
        toast.info("Unauthorized. Login to continue");
        navigate(path, { replace: true });
      } else if (responseStatus?.user?.role !== "admin") {
        toast.info("Not authorized as an admi");
        navigate(path, { replace: true });
      }
      return;
    };
    redirectUsers();
  }, [navigate, path, isLoggedIn]);
}

export default useRedirect;
