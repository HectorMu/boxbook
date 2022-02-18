import { useState } from "react";
import { getBooks } from "../services/google.apis.books";
import useServiceFetch from "../hooks/useServiceFetch";
const Index = () => {
  const [books, setBooks] = useState([]);
  const { isLoading } = useServiceFetch(getBooks, setBooks);

  const searchHandler = async (title) => {
    while (title === "") {
      setBooks([]);
      return;
    }
    setBooks(await getBooks(title));
  };

  return (
    <div className="card-body mx-auto mt-2 w-50">
      <div className="search-books position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search for books"
          style={{ zIndex: 1 }}
          onChange={(e) => searchHandler(e.target.value)}
        />
        {books !== undefined && books.length > 0 ? (
          <ul className="list-group position-absolute w-100">
            {books.map((book) =>
              book !== undefined ? (
                <li
                  className="list-group-item"
                  key={book.title + book.publishedDate}
                >
                  <div className="d-flex gap-2">
                    <img
                      className="img-thumbnail img-fluid"
                      src={
                        book.imageLinks && book.imageLinks.smallThumbnail
                          ? book.imageLinks.smallThumbnail
                          : null
                      }
                      alt=""
                    />
                    <div className="p-3"> {book.title}</div>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Index;
