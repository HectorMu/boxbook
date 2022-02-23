import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getBookAdvance, removeBookFromCatalog } from "../../../services/books";
const rateStars = [1, 2, 3, 4, 5];

const BookInCatalog = ({ book, refresh }) => {
  const [onRating, setOnRating] = useState(0);
  const [bookAdvance, setBookAdvance] = useState(0);
  const [rated, setRated] = useState(0);
  const { title } = useParams();

  const ratingHandlers = (i) => {
    setRated(i + 1);
  };

  const getCurrentAdvance = useCallback(async () => {
    const results = await getBookAdvance(book.id);
    if (results.status) {
      setBookAdvance(results.bookAdvance.pagesReaded);
    }
  }, [book.id]);

  const removeHandler = async () => {
    const tLoading = toast.loading("Removing..");
    const results = await removeBookFromCatalog(title);
    if (!results.status) {
      toast.error("Something wen't wrong, try again later");
    }
    toast.success(`Book removed from catalog`, {
      id: tLoading,
    });
    refresh();
  };

  useEffect(() => {
    getCurrentAdvance();
    if (book.score !== 0) {
      setRated(book.score);
    }
  }, [book.score, getCurrentAdvance]);

  return (
    <div className="d-flex">
      {book.status === "Reading" ? (
        <h5 className="me-3">
          {bookAdvance}/{book.pageCount}
        </h5>
      ) : null}
      {book.status !== "Read" ? null : (
        <>
          {rateStars.map((el, i) => (
            <button
              type="button"
              key={el}
              onMouseOver={() => setOnRating(i + 1)}
              onMouseLeave={() => setOnRating(rated)}
              className={`btn btn-sm btn-star ${
                rated >= i + 1
                  ? `rated`
                  : `${onRating >= i + 1 ? `text-purple-light` : ""} `
              } `}
            >
              <i className="fas fa-star responsive-font"></i>
            </button>
          ))}
        </>
      )}

      <div className="dropdown">
        <button
          className="btn btn-purple btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-check"></i> {book.status}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <button onClick={removeHandler} className="dropdown-item" href="#">
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookInCatalog;
