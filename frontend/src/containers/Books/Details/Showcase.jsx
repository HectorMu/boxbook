import React, { useState } from "react";

const Showcase = ({ book }) => {
  const [onReadMore, setOnReadMore] = useState(false);
  return (
    <div className="row ">
      <div className="col-12 col-lg-3 col-xl-2 col-xxl-2 mb-2">
        <div className="d-flex justify-content-center">
          {book?.imageLinks && book?.imageLinks?.thumbnail ? (
            <>
              <img
                src={
                  book?.imageLinks && book?.imageLinks?.thumbnail
                    ? book?.imageLinks?.thumbnail
                    : null
                }
                className=" img-thumbnail"
                alt="Loading..."
              />
            </>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5>Looks like we can't load this book image</h5>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-12 col-lg-9 col-xl-10 col-xxl-10">
        <div className="card-body">
          <h1 className="fw-bolder text-center text-lg-start text-xxl-start">
            {book?.title}
          </h1>
          <h4 className="text-muted text-center text-lg-start text-xxl-start">
            {book?.authors}
          </h4>

          <p className={`mt-4 text-start ${onReadMore ? `d-block` : `d-none`}`}>
            {book?.description}{" "}
            <button
              onClick={() => setOnReadMore(!onReadMore)}
              className="btn btn-link text-purple"
            >
              Read less
            </button>
          </p>

          <p className={`mt-4 text-start ${onReadMore ? `d-none` : `d-block`}`}>
            {book?.description && book?.description.length > 10
              ? book?.description.substring(0, 350) + "... "
              : book?.description}
            {book?.description && book?.description.length > 10 ? (
              <button
                onClick={() => setOnReadMore(!onReadMore)}
                className="btn btn-link text-purple"
              >
                Read more
              </button>
            ) : null}
          </p>

          <div className="d-flex flex-column-reverse flex-sm-column-reverse justify-content-between  mt-5 flex-md-row">
            <div className="d-flex gap-2 justify-content-center mt-3 mt-lg-0 mt-xxl-0 mt-md-0">
              <p>Published at {book?.publishedDate}</p>
              <p>
                by <span className="fw-bold">{book?.publisher}</span>
              </p>
            </div>
            <div className="d-flex justify-content-end">
              {book?.categories?.length > 0
                ? book?.categories.map((c) => (
                    <p key={c} className="border-purple">
                      {c}
                    </p>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
