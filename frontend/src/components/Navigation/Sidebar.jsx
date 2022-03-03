import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "../../hooks/useSession";

const Sidebar = ({ setIsActive, isActive }) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }

  return (
    <aside className={`sidebar ${isActive ? `active` : ``} `}>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => setIsActive(!isActive)}
          className="btn btn-sm btn-purple d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <nav className="menu">
        <NavLink to="/me/catalog" className="menu-item">
          Home
        </NavLink>
        <NavLink to="/meet" className="menu-item">
          Meet people
        </NavLink>
        <NavLink to="/friends" className="menu-item">
          Friends
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
