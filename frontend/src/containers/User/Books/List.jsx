import React, { useCallback, useEffect, useState } from "react";
import { getCatalog } from "../../../services/books";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";
import BookCard from "../../../components/User/Books/BookCard";

//Arrays for each user book section
const booksArrays = {
  pending: [],
  reading: [],
  read: [],
};

const List = () => {
  const [books, setBooks] = useState([]);
  const { isLoading, refreshData } = useServiceFetch(getCatalog, setBooks);
  const [booksCat, setBooksCat] = useState(booksArrays);
  const [onSearch, setOnSearch] = useState("");

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
      ) : books.length > 0 ? (
        <>
          <div
            className="border-2 
          border-bottom border-secondary 
          pb-3 d-flex flex-column 
          align-items-center gap-2 flex-lg-row 
          flex-md-row justify-content-lg-between 
          justify-content-md-between"
          >
            {/* All books */}
            <h5>All books</h5>
            <div className="input-group w-auto">
              <button className="btn btn-primary">
                <i className=" fas fa-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search on my books"
                onChange={(e) => setOnSearch(e.target.value)}
                value={onSearch}
              />
            </div>
          </div>
          <div className="row mt-4">
            {books
              .filter((book) =>
                book.title.toLowerCase().includes(onSearch.toLowerCase())
              )
              .map((book) => (
                <BookCard
                  key={book.id + book.status}
                  book={book}
                  refresh={refreshData}
                />
              ))}

            {books.filter((book) =>
              book.title.toLowerCase().includes(onSearch.toLowerCase())
            ).length ? (
              0 > null
            ) : (
              <h1 className="py-5 text-center">
                No books found for title '{onSearch}'
              </h1>
            )}
          </div>
          {/* /All books */}

          {/* Reading books */}
          {booksCat.length > 0 ? (
            <>
              <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
                <h5>Reading books</h5>
              </div>

              <div className="row mt-4">
                {booksCat.reading.map((book) => (
                  <BookCard
                    key={book.id + book.status}
                    book={book}
                    refresh={refreshData}
                  />
                ))}
              </div>
            </>
          ) : null}
          {/* /Reading books */}

          {/* Pending books */}
          {booksCat.pending.length > 0 ? (
            <>
              <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
                <h5>Pending books</h5>
              </div>
              <div className="row mt-4">
                {booksCat.pending.map((book) => (
                  <BookCard
                    key={book.id + book.status}
                    book={book}
                    refresh={refreshData}
                  />
                ))}
              </div>
            </>
          ) : null}
          {/* /Pending books */}

          {/* Read books */}
          {booksCat.read.length > 0 ? (
            <>
              <div className="border-2 border-bottom border-secondary pb-3 d-flex justify-content-between">
                <h5>Read books</h5>
              </div>

              <div className="row mt-4">
                {booksCat.read.map((book) => (
                  <BookCard
                    key={book.id + book.status}
                    book={book}
                    refresh={refreshData}
                  />
                ))}
              </div>
            </>
          ) : null}
          {/* /Read books */}
        </>
      ) : (
        <h3 className="text-center">
          You dont have books yet, the books you add will show here
        </h3>
      )}
    </div>
  );
};

export default List;
