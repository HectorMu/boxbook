import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { LogOut } from '../../services/auth'
import { getBooks } from '../../services/google.apis.books'
import Loading from '../Global/Loading'
//import MessagesDropdown from "./MessagesDropdown";
import NotificationsDropdown from './NotificationsDropdown'
import { DebounceInput } from 'react-debounce-input'
import { useCallback } from 'react'
import { useEffect } from 'react'

const Navbar = ({ setIsActive, isActive }) => {
  const { user, setUser } = useSession() || {}
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [IsLoading, setIsLoading] = useState(false)

  const getFoundedBooks = useCallback(async () => {
    if (searchTitle === '') {
      setBooks([])
      return
    }
    setIsLoading(true)
    setBooks([])

    const fetchedBooks = await getBooks(searchTitle.toLowerCase())
    setBooks(fetchedBooks)
    setIsLoading(false)
  }, [searchTitle])

  const handleResultsClose = () => {
    setBooks([])
    setSearchTitle('')
  }

  const handleLogout = () => {
    LogOut()
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    getFoundedBooks()
  }, [getFoundedBooks])

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-coffee`}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <Link
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Tooltip on top"
            to={user === null ? '/' : '/me/catalog'}
            className="navbar-brand fw-bolder fs-4"
          >
            {user === null ? (
              <>
                <span className="text-purple">Box</span>
                <span className="text-white">Book</span>
              </>
            ) : (
              <i className="fas fa-home"></i>
            )}
          </Link>

          {user !== null ? (
            <div className="d-flex align-items-center">
              <div className="position-relative me-3 me-lg-5 me-xxl-5">
                <div className="input-group ">
                  <button className="btn btn-purple">
                    <i className=" fas fa-search"></i>
                  </button>
                  <DebounceInput
                    debounceTimeout={500}
                    type="text"
                    className="form-control"
                    placeholder="Search books"
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onFocus={(e) => setSearchTitle(e.target.value)}
                    value={searchTitle}
                  />

                  {IsLoading ? (
                    <div
                      className="position-absolute"
                      style={{ zIndex: 10, right: '10px', top: '10px' }}
                    >
                      <Loading small text="purple" />
                    </div>
                  ) : null}

                  <ul
                    style={{ top: '39px', zIndex: 20 }}
                    className="list-group position-absolute w-100"
                  >
                    {books !== undefined && books.length > 0 ? (
                      <div className="list-group-item text-decoration-none text-center d-flex justify-content-between align-items-center gap-3">
                        <button
                          className="btn btn-sm btn-primary w-100"
                          onClick={() => {
                            navigate(`books/results/${searchTitle}`)
                            handleResultsClose()
                          }}
                        >
                          All results
                        </button>
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
                            to={`/books/details/${book.googleBookId}`}
                            onClick={() => setBooks([])}
                            state={book}
                            className="list-group-item text-decoration-none"
                            style={{ cursor: 'pointer' }}
                            key={book.googleBookId}
                          >
                            <div className="row">
                              <div className="col-4">
                                <img
                                  className="img-thumbnail img-fluid"
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
                </div>
              </div>

              <NotificationsDropdown />
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
                  </span>{' '}
                  <i className="fas fa-user"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end position-absolute"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      className="dropdown-item py-1  text-muted"
                      to="/profile"
                    >
                      <i className="fas fa-cog"></i> Profile
                    </Link>
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
          ) : (
            <ul className="d-flex  mb-2  " style={{ listStyle: 'none' }}>
              <Link to={'/login'} className="nav-link fw-bolder text-light">
                Login
              </Link>

              <Link to={'/signup'} className="nav-link fw-bolder text-light">
                Signup
              </Link>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
