import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBooks } from "../../services/google.apis.books";
import Showcase from "../../containers/Books/Details/Showcase";
import AddToCatalog from "../../containers/Books/Details/AddToCatalog";

const Details = () => {
  const [book, setBook] = useState({});
  const { state } = useLocation();
  const { title } = useParams();

  const getBookFromFetch = useCallback(async () => {
    const fetchedBooks = await getBooks(title);
    const exactBook = fetchedBooks.filter((book) => book.title === title);
    setBook(exactBook[0]);
  }, [title]);

  useEffect(() => {
    if (state !== null) {
      setBook(state);
      return;
    }
    getBookFromFetch();
  }, [state, getBookFromFetch]);

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-end mb-2">
        <AddToCatalog book={book} />
      </div>
      <Showcase book={book} />
    </div>
  );
};

export default Details;
