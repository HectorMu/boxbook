import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBooks } from "../../services/google.apis.books";
import Canvas from "../../components/Global/Canvas";

const Details = () => {
  const [book, setBook] = useState({});
  const { state } = useLocation();
  const { title } = useParams();
  const [onRating, setOnRating] = useState(0);
  const [rated, setRated] = useState(0);

  const cleanRatingHandlers = () => {
    setRated(0);
    setOnRating(0);
  };

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
    <div>
      <div className="container py-3">
        <div className="row bg-coffee py-3 mb-3 rounded-3 ">
          <div className="d-flex justify-content-end mb-2">
            <Canvas
              id="addBookCanvas"
              title="Adding book to catalog"
              buttonText="Add to catalog"
              buttonClass="btn btn-sm btn-purple"
              icon="fas fa-plus"
            >
              <select
                className="form-select mb-2"
                aria-label="Default select example"
              >
                <option value="1" selected>
                  Pending
                </option>
                <option value="2">Reading</option>
                <option value="3">Read</option>
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
              <h5 className="text-center pt-3">Rate this book</h5>
              <div className="d-flex justify-content-center ">
                <button
                  onMouseLeave={() => setOnRating(0)}
                  onMouseOver={() => setOnRating(1)}
                  onClick={() => setRated(1)}
                  className={`btn btn-sm btn-star ${
                    rated >= 1
                      ? `rated`
                      : `${onRating >= 1 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
                <button
                  onMouseOver={() => setOnRating(2)}
                  onMouseLeave={() => setOnRating(rated)}
                  onClick={() => setRated(2)}
                  className={`btn btn-sm btn-star ${
                    rated >= 2
                      ? `rated`
                      : `${onRating >= 2 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
                <button
                  onMouseOver={() => setOnRating(3)}
                  onMouseLeave={() => setOnRating(rated)}
                  onClick={() => setRated(3)}
                  className={`btn btn-sm btn-star ${
                    rated >= 3
                      ? `rated`
                      : `${onRating >= 3 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
                <button
                  onMouseOver={() => setOnRating(4)}
                  onMouseLeave={() => setOnRating(rated)}
                  onClick={() => setRated(4)}
                  className={`btn btn-sm btn-star ${
                    rated >= 4
                      ? `rated`
                      : `${onRating >= 4 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
                <button
                  onMouseOver={() => setOnRating(5)}
                  onMouseLeave={() => setOnRating(rated)}
                  onClick={() => setRated(5)}
                  className={`btn btn-sm btn-star ${
                    rated >= 5
                      ? `rated`
                      : `${onRating >= 5 ? `text-purple-light` : ""} `
                  } `}
                >
                  <i className="fas fa-star responsive-font"></i>
                </button>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <button
                  onClick={cleanRatingHandlers}
                  disabled={rated !== 0 ? false : true}
                  className="btn btn-purple btn-sm"
                >
                  Clear rate
                </button>
              </div>
              <div className="mt-2">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your review"
                ></textarea>
                <div className="d-flex justify-content-center mt-1">
                  <button className="btn btn-sm btn-purple">Save</button>
                </div>
              </div>
            </Canvas>
          </div>
          <div className="col-12 col-lg-4 col-xl-2 col-xxl-2 mb-2">
            <div className="d-flex justify-content-center">
              {book.imageLinks && book.imageLinks.thumbnail ? (
                <img
                  src={
                    book.imageLinks && book.imageLinks.thumbnail
                      ? book.imageLinks.thumbnail
                      : null
                  }
                  className=" img-thumbnail w-100"
                  alt="Loading..."
                />
              ) : (
                <div className="card">
                  <div className="card-body">
                    <h5>Looks like we can't load this book image</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-8 col-xl-10 col-xxl-10">
            <div className="card ">
              <div className="card-body">
                <h1 className="fw-bolder text-center text-lg-start text-xxl-start">
                  {book.title}
                </h1>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#descCollapse"
                    aria-expanded="false"
                    aria-controls="descCollapse"
                  >
                    Watch description <i className="fas fa-arrow-down"></i>
                  </button>
                </div>

                <div className="collapse" id="descCollapse">
                  <p className="py-2 text-start">{book.description}</p>
                </div>
                <p className="py-2 text-start d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
