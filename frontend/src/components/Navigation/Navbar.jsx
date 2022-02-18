import React from "react";
const Navbar = ({ theme }) => {
  const HandleNavTheme = () => {
    if (!theme || theme === undefined || theme === "") {
      return "navbar-light bg-light";
    }
    if (theme === "dark") {
      return "navbar-dark bg-dark";
    }
    if (theme === "primary") {
      return "navbar navbar-dark bg-primary";
    }
    if (theme === "secondary") {
      return "navbar navbar-dark bg-secondary";
    }
  };
  return (
    <nav className={`navbar navbar-expand-lg ${HandleNavTheme()} `}>
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Pricing</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item">Action</a>
                </li>
                <li>
                  <a className="dropdown-item">Another action</a>
                </li>
                <li>
                  <a className="dropdown-item">Something else here</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
