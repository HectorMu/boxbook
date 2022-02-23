import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBooks } from "../../services/google.apis.books";
import { checkBookInCatalog } from "../../services/books";
import Showcase from "../../containers/Books/Details/Showcase";
import AddToCatalog from "../../containers/Books/Details/AddToCatalog";
import BookInCatalog from "../../containers/Books/Details/BookInCatalog";

const catalogData = {
  inCatalog: false,
  book: {},
};

const Details = () => {
  const [book, setBook] = useState({});
  const [onUserCatalog, setOnUserCatalog] = useState(catalogData);
  const { state } = useLocation();
  const { title } = useParams();

  const checkOnCatalog = useCallback(async (bookToSearch) => {
    const results = await checkBookInCatalog(bookToSearch);
    if (results.status) {
      setOnUserCatalog({
        ...onUserCatalog,
        inCatalog: true,
        book: results.book,
      });
    } else {
      setOnUserCatalog({
        ...onUserCatalog,
        inCatalog: false,
        book: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBookFromFetch = useCallback(async () => {
    const fetchedBooks = await getBooks(title);
    const exactBook = fetchedBooks.filter((book) => book.title === title);
    await checkOnCatalog(exactBook[0]);

    setBook(exactBook[0]);
  }, [title, checkOnCatalog]);

  useEffect(() => {
    if (state !== null) {
      setBook(state);
      checkOnCatalog(state);
    } else {
      getBookFromFetch();
    }
  }, [state, getBookFromFetch, checkOnCatalog]);
  return (
    <div className="container py-3">
      <div>
        <div className="d-flex justify-content-center justify-content-lg-end  mb-2">
          {onUserCatalog.inCatalog ? (
            <BookInCatalog
              book={onUserCatalog.book}
              refresh={getBookFromFetch}
            />
          ) : (
            <AddToCatalog book={book} refresh={getBookFromFetch} />
          )}
        </div>
        <Showcase book={book} />
      </div>
    </div>
  );
};

export default Details;
