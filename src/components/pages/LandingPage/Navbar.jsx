import React from "react";
import {useNavigate} from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import {NavLink} from 'react-router-dom'

function Navbar() {
  const navigate= useNavigate()

  return (
    <nav className=" bg-blue-600/90 backdrop-blur-sm px-8 py-3 flex justify-between items-center">
      <div className="brandName text-white  text-2xl font-extrabold tracking-widest">
        Lizzy
      </div>
      <div className="nav--links flex items-center gap-7 text-white">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/feeds'}>Feeds</NavLink>
        <p>Hi, Danny</p>
        <NavLink to={'/dashboard'} className=" border-b-[1px] border-white cursor-pointer">Profile</NavLink>
        {/* <p className=" border-b-[1px] border-white cursor-pointer">Profile</p> */}
        <button className="bg-gray-700 px-3 py-1 rounded-sm text-white tracking-wider flex gap-1" onClick={()=>{navigate('/login')}}>Login <CiLogin size={23}/></button>
      </div>
    </nav>
  );
}

export default Navbar;
