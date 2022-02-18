import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { LogOut } from "../../services/auth";
import useSidebarControl from "../../hooks/useSidebarControl";

const Navbar = () => {
  const { user, setUser } = useSession();
  const { setIsActive, isActive } = useSidebarControl();
  const navigate = useNavigate();

  const handleLogout = () => {
    LogOut();
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark py-3 bg-coffee`}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
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
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn btn-sm text-white dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="d-none d-sm-inline-block d-md-inline-block d-lg-inline-block d-xl-inline-block d-xxl-inline-block">
                    {user.username}
                  </span>{" "}
                  <i className="fas fa-user"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end position-absolute"
                  aria-labelledby="dropdownMenuButton1"
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
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className="btn text-white btn-sm d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
