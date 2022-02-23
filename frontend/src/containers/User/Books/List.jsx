import React, { useCallback, useEffect, useState } from "react";
import { getCatalog } from "../../../services/books";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";
import { Link } from "react-router-dom";
import TruncatedText from "../../../components/Global/TruncatedText";

const booksArrays = {
  pending: [],
  reading: [],
  read: [],
};

const List = () => {
  const [books, setBooks] = useState([]);
  const { isLoading } = useServiceFetch(getCatalog, setBooks);
  const [booksCat, setBooksCat] = useState(booksArrays);
  const [onSearch, setOnSearch] = useState([]);

  const handleSearch = (e) => {
    setOnSearch(e.target.value);

    const filteredBooks = books.filter((book) =>
      book.title.includes(e.target.value)
    );
    setBooks(filteredBooks);
  };

  const filterBooksByStatus = useCallback(() => {
    const pendingBooks = books.filter((b) => b.status === "Pending");
    const readingBooks = books.filter((b) => b.status === "Reading");
    const readBooks = books.filter((b) => b.status === "Read");

    setBooksCat({
      ...booksArrays,
      pending: pendingBooks,
      reading: readingBooks,
      read: readBooks,
    });
  }, [books]);

  useEffect(() => {
    filterBooksByStatus();
  }, [filterBooksByStatus]);

  return (
    <div className="mt-5">
      {isLoading ? (
        <Loading text="purple" />
      ) : (
        <>
          <div
            className="border-2 
            border-bottom border-secondary 
            pb-3 d-flex flex-column 
            align-items-center gap-2 flex-lg-row 
            flex-md-row justify-content-lg-between 
            justify-content-md-between"
          >
            <h5>All books</h5>
            <div className="input-group w-auto">
              <button className="btn btn-primary">
                <i className=" fas fa-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search on my books"
                onChange={handleSearch}
                value={onSearch}
              />
            </div>
          </div>

          <div className="row mt-4">
            {books.map((book) => (
              <div
                key={book.title + book.id}
                className="col-6 col-sm-4  col-lg-3 col-xl-2 col-xxl-4"
              >
                <div className="floating-menu">
                  <div className="floating-options">
                    <Link
                      className="btn btn-purple btn-sm w-100"
                      to={`/books/details/${book.title}`}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Link>
                    <button className="btn btn-purple btn-sm w-100">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn btn-danger btn-sm w-100">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="card w-100 mb-5">
                    <img
                      src={book.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body d-flex justify-content-center flex-column">
                      <TruncatedText text={book.title} minimunLength={15} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
            <h5>Reading books</h5>
          </div>

          <div className="row mt-4">
            {booksCat.reading.map((book) => (
              <div
                key={book.title + book.id}
                className="col-6 col-sm-4  col-lg-3 col-xl-2 col-xxl-4"
              >
                <div className="floating-menu">
                  <div className="floating-options">
                    <Link
                      className="btn btn-purple btn-sm w-100"
                      to={`/books/details/${book.title}`}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Link>
                    <button className="btn btn-purple btn-sm w-100">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn btn-danger btn-sm w-100">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="card w-100 mb-5">
                    <img
                      src={book.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body d-flex justify-content-center flex-column">
                      <TruncatedText text={book.title} minimunLength={15} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
            <h5>Pending books</h5>
          </div>

          <div className="row mt-4">
            {booksCat.pending.map((book) => (
              <div
                key={book.title + book.id}
                className="col-6 col-sm-4  col-lg-3 col-xl-2 col-xxl-4"
              >
                <div className="floating-menu">
                  <div className="floating-options">
                    <Link
                      className="btn btn-purple btn-sm w-100"
                      to={`/books/details/${book.title}`}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Link>
                    <button className="btn btn-purple btn-sm w-100">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn btn-danger btn-sm w-100">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="card w-100 mb-5">
                    <img
                      src={book.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body d-flex justify-content-center flex-column w-100">
                      <TruncatedText text={book.title} minimunLength={15} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
            <h5>Read books</h5>
          </div>

          <div className="row mt-4">
            {booksCat.read.map((book) => (
              <div
                key={book.title + book.id}
                className="col-6 col-sm-4  col-lg-3 col-xl-2 col-xxl-4"
              >
                <div className="floating-menu">
                  <div className="floating-options">
                    <Link
                      className="btn btn-purple btn-sm w-100"
                      to={`/books/details/${book.title}`}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Link>
                    <button className="btn btn-purple btn-sm w-100">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn btn-danger btn-sm w-100">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className="card w-100 mb-5">
                    <img
                      src={book.thumbnail}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body d-flex justify-content-center flex-column">
                      <TruncatedText text={book.title} minimunLength={15} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
