import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { LogOut } from "../../services/auth";
import useSidebarControl from "../../hooks/useSidebarControl";
import { getBooks } from "../../services/google.apis.books";
import useServiceFetch from "../../hooks/useServiceFetch";
import Loading from "../Global/Loading";

const Navbar = () => {
  const { user, setUser } = useSession();
  const { setIsActive, isActive } = useSidebarControl();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const searchHandler = async (title) => {
    setSearchTitle(title);
    if (searchTitle === "") {
      setBooks([]);
      return;
    }
    setIsLoading(true);
    const fetchedBooks = await getBooks(title);
    setBooks(fetchedBooks);
    setIsLoading(false);
  };

  const handleResultsClose = () => {
    setBooks([]);
    setSearchTitle("");
  };

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
              <div className="position-relative me-3 me-lg-5 me-xxl-5">
                <div className="input-group ">
                  <button className="btn btn-purple">
                    <i className=" fas fa-search"></i>
                  </button>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search books"
                    onChange={(e) => searchHandler(e.target.value)}
                    onFocus={(e) => searchHandler(e.target.value)}
                    value={searchTitle}
                  />

                  {IsLoading ? (
                    <div
                      className="position-absolute"
                      style={{ zIndex: 10, right: "10px", top: "10px" }}
                    >
                      <Loading small text="purple" />
                    </div>
                  ) : null}

                  {books && books.length > 0 ? (
                    <ul
                      style={{ top: "39px", zIndex: 20 }}
                      className="list-group position-absolute w-100"
                    >
                      {books !== undefined && books.length > 0 ? (
                        <div className="list-group-item text-decoration-none text-center d-flex justify-content-between align-items-center gap-3">
                          <Link
                            className="btn btn-sm btn-primary w-100"
                            to={`books/results/${searchTitle}`}
                          >
                            All results
                          </Link>
                          <button
                            onClick={handleResultsClose}
                            className="btn btn-sm btn-purple w-50"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : null}

                      {books.map((book, i) =>
                        book !== undefined ? (
                          i > 4 ? null : (
                            <Link
                              to={`/books/details/${book.title}`}
                              onClick={() => setBooks([])}
                              state={book}
                              className="list-group-item text-decoration-none"
                              style={{ cursor: "pointer" }}
                              key={book.title + book.publishedDate}
                            >
                              <div className="row">
                                <div className="col-4">
                                  <img
                                    className="img-thumbnail img-fluid"
                                    //style={{ width: "40px", height: "40px" }}
                                    src={
                                      book.imageLinks &&
                                      book.imageLinks.smallThumbnail
                                        ? book.imageLinks.smallThumbnail
                                        : null
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="col-8">
                                  <div className="row">
                                    <div className="col-12">
                                      <small>{book.title}</small>
                                    </div>
                                    <div className="col-12 ">
                                      <small className="fw-bold">
                                        by {book.authors}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        ) : null
                      )}
                    </ul>
                  ) : null}
                </div>
              </div>

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
