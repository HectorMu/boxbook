import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Canvas from "../../../components/Global/Canvas";
import bookModel from "../../../Models/Books/BookModel";
import { addBookToCatalog } from "../../../services/books";

const rateStars = [1, 2, 3, 4, 5];

const AddToCatalog = ({ book = null, refresh }) => {
  const [bookToAdd, setBookToAdd] = useState(bookModel);
  const [onRating, setOnRating] = useState(0);
  const [rated, setRated] = useState(0);

  const handleChange = (key, value) =>
    setBookToAdd({ ...bookToAdd, [key]: value });

  const cleanRatingHandlers = () => {
    setRated(0);
    setOnRating(0);
  };
  const ratingHandlers = (i) => {
    setRated(i + 1);
    handleChange("score", i + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Adding...");
    const results = await addBookToCatalog(bookToAdd);
    console.log(results);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    refresh();

    toast.success(`Book added to catalog`, {
      id: tLoading,
    });
  };

  useEffect(() => {
    if (bookToAdd.status === "Pending" || bookToAdd.status === "Reading") {
      setBookToAdd({ ...bookToAdd, score: 0, review: "" });
    }
  }, [bookToAdd.status]);
  useEffect(() => {
    setBookToAdd({
      ...bookToAdd,
      title: book.title,
      publisher: book.publisher,
      pageCount: book.pageCount,
      author: book.authors,
      publishedDate: book.publishedDate,
      thumbnail:
        book.imageLinks && book.imageLinks.thumbnail
          ? book.imageLinks.thumbnail
          : null,
    });
  }, [book]);

  return (
    <Canvas
      id="addBookCanvas"
      title="Adding book to catalog"
      buttonText="Add to catalog"
      buttonClass="btn btn-sm btn-purple"
      icon="fas fa-plus"
    >
      <form onSubmit={handleSubmit}>
        <select
          className="form-select mb-2"
          onChange={(e) => handleChange("status", e.target.value)}
          value={bookToAdd.status}
        >
          <option value="Pending">Pending</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
        <div className="d-flex gap-4">
          <img
            src={
              book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : null
            }
            alt=""
            className="h-100"
          />

          <div>
            <p className="fw-bold">{book.title}</p>
            <p>
              by:{" "}
              {book.authors && book.authors.length > 0
                ? book.authors[0]
                : "Loading.."}
            </p>
            <p>Published by: {book.publisher}</p>
            <p>Released: {book.publishedDate}</p>
          </div>
        </div>

        {bookToAdd.status === "Pending" ||
        bookToAdd.status === "Reading" ? null : (
          <div id="rateSection">
            <h5 className="text-center pt-3">Rate this book</h5>
            <div className="d-flex justify-content-center ">
              {rateStars.map((el, i) => (
                <button
                  type="button"
                  key={el}
                  onMouseOver={() => setOnRating(i + 1)}
                  onMouseLeave={() => setOnRating(rated)}
                  onClick={() => ratingHandlers(i)}
                  className={`btn btn-sm btn-star ${
                    rated >= i + 1
                      ? `rated`
                      : `${onRating >= i + 1 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button
                type="button"
                onClick={cleanRatingHandlers}
                disabled={rated !== 0 ? false : true}
                className="btn btn-purple btn-sm"
              >
                Clear rate
              </button>
            </div>
          </div>
        )}

        <div className="mt-2">
          {bookToAdd.status === "Pending" ||
          bookToAdd.status === "Reading" ? null : (
            <textarea
              className="form-control"
              rows="5"
              onChange={(e) => handleChange("review", e.target.value)}
              placeholder="Write your review"
              value={bookToAdd.review}
              required
            ></textarea>
          )}
          {bookToAdd.status === "Reading" ? (
            <input
              placeholder="Advance page number"
              className="form-control mb-2 mt-3"
              onChange={(e) =>
                handleChange("pagesReaded", parseInt(e.target.value))
              }
              value={bookToAdd.pagesReaded}
              type={"number"}
            />
          ) : null}

          <div className="d-flex justify-content-center mt-1">
            <button type="submit" className="btn btn-sm btn-purple">
              Save
            </button>
          </div>
        </div>
      </form>
    </Canvas>
  );
};

export default AddToCatalog;
