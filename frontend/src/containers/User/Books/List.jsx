import React, { useCallback, useEffect, useState } from "react";
import { getCatalog } from "../../../services/books";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";
import { Link } from "react-router-dom";

const booksArrays = {
  pending: [],
  reading: [],
  read: [],
};

const List = () => {
  const [books, setBooks] = useState([]);

  const { isLoading } = useServiceFetch(getCatalog, setBooks);
  const [booksCat, setBooksCat] = useState(booksArrays);

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

  console.log(booksCat);
  return (
    <div className="mt-5">
      {isLoading ? (
        <Loading text="purple" />
      ) : (
        <>
          <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
            <h5>All books</h5>
            <div className="input-group w-50">
              <button className="btn btn-primary">
                <i className=" fas fa-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search on my books"
              />
            </div>
          </div>

          <div className="row mt-4">
            {books.map((book) => (
              <div
                key={book.title + book.id}
                className="col-12 col-lg-6 col-xl-2 col-xxl-4"
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
                      <p className="text-truncate">{book.title}</p>
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
