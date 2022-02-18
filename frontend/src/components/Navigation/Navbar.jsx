import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { LogOut } from "../../services/auth";
const Navbar = () => {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark py-3 bg-coffee`}>
      <div className="container-fluid">
        <Link
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Tooltip on top"
          to={"/home"}
          className="navbar-brand fw-bolder fs-4"
        >
          <span className="text-purple">B</span>
          <span className="text-white">B</span>
        </Link>

        {user !== null ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block d-xxl-inline-block">
                  {user.username}
                </span>{" "}
                <i className="fas fa-user"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end rounded-3 shadow p-3 position-absolute"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item py-1  text-muted" href="#">
                    <i className="fas fa-cog"></i> Profile
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-black-50"
                    href="#"
                  >
                    <i className="fas fa-sign-out-alt"></i> Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
