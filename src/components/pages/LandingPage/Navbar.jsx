import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const GLOBAL_STATE = useContext(AuthContext);
  const { isLoggedIn, activeUser } = GLOBAL_STATE;

  return (
    <nav className=" bg-blue-600/90 backdrop-blur-sm px-8 py-3 flex justify-between items-center">
      <div className="brandName text-white  text-2xl font-extrabold tracking-widest">
        Lizzy's File Hub
      </div>
      <div className="nav--links flex items-center gap-7 text-white">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/feeds"}>Feeds</NavLink>
        {isLoggedIn && <p className="capitalize">Hi, {activeUser?.username}</p>}
        {isLoggedIn && activeUser?.role === "admin" && (
          <NavLink
            to={"/dashboard"}
            className=" border-b-[1px] border-white cursor-pointer"
          >
            Dashboard
          </NavLink>
        )}

        {/* <p className=" border-b-[1px] border-white cursor-pointer">Profile</p> */}
        {isLoggedIn ? (
          <button
            className="bg-gray-700 px-3 py-1 rounded-sm text-white tracking-wider flex gap-1"
            onClick={async () => {
              await GLOBAL_STATE.logoutUser();
            }}
          >
            <CiLogout size={23} /> Logout
          </button>
        ) : (
          <button
            className="bg-gray-700 px-3 py-1 rounded-sm text-white tracking-wider flex gap-1"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login <CiLogin size={23} />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
