import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBooks } from "../../services/google.apis.books";

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
    setRated(2);
    if (state !== null) {
      setBook(state);
      return;
    }
    getBookFromFetch();
  }, [state, getBookFromFetch]);
  console.log(onRating);
  return (
    <div>
      <div className="container py-3">
        <div className="row bg-coffee py-3 mb-3 rounded-3 ">
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
        <div className="row bg-coffee py-3 rounded-3">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <h1 className="bg-light py-3 text-center ">
              Rate this <span className="text-purple">b</span>ook
            </h1>
            <div className="d-flex justify-content-center pt-4">
              <button
                onMouseLeave={() => setOnRating(0)}
                onMouseOver={() => setOnRating(1)}
                onClick={() => setRated(1)}
                className={`btn btn-lg btn-star ${
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
                className={`btn btn-lg btn-star ${
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
                className={`btn btn-lg btn-star ${
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
                className={`btn btn-lg btn-star ${
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
                className={`btn btn-lg btn-star ${
                  rated >= 5
                    ? `rated`
                    : `${onRating >= 5 ? `text-purple-light` : ""} `
                } `}
              >
                <i className="fas fa-star responsive-font"></i>
              </button>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                onClick={cleanRatingHandlers}
                disabled={rated !== 0 ? false : true}
                className="btn btn-purple"
              >
                Clear rate
              </button>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
            <h1 className="bg-light py-2 text-start ps-4 rounded-3 ">
              Reviews
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
