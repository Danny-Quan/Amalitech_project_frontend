import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="px-5 py-10">
      <div>
        <ul>
          <li className="text-white py-3 px-3 text-xl hover:bg-blue-500/70 hover:transition-all">
            <NavLink className={'flex'} to={'/dashboard'}>Dashboard</NavLink>
          </li>
          {/* <li className="text-white py-3 px-3 mt-5 text-xl hover:bg-blue-500/70 hover:transition-all">
            <NavLink className={'flex'}>Settings</NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
