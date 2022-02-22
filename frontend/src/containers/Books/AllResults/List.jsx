import React, { useEffect, useState } from "react";
import useServiceFetch from "../../../hooks/useServiceFetch";
import { Link } from "react-router-dom";

import { getBooks } from "../../../services/google.apis.books";

const List = ({ title }) => {
  const [books, setBooks] = useState([]);

  useServiceFetch(() => getBooks(title), setBooks);

  return (
    <div>
      {books.map((b) => (
        <div key={b.title + b.publisher} className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-3 col-lg-2 col-xl-1 col-xxl-1">
                <img
                  src={b.imageLinks ? b.imageLinks.thumbnail : null}
                  className="card-img-top"
                  alt={b.title}
                />
              </div>
              <div className="col-9 col-lg-10 col-xl-5 col-xxl-11">
                <div className="d-flex flex-column">
                  <h5>{b.title}</h5>
                  <p>{b.authors}</p>
                  <p>{b.publisher}</p>
                  <p>{b.publishedDate}</p>
                </div>
              </div>
              <div className="col-9 col-lg-10 col-xl-6 col-xxl-11">
                <div className="d-flex flex-column  align-items-end">
                  <Link
                    to={`/books/details/${b.title}`}
                    className={"btn btn-primary"}
                    state={b}
                  >
                    Details <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
