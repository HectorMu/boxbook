import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { removeBookFromCatalog } from "../../../services/books";
const rateStars = [1, 2, 3, 4, 5];

const BookInCatalog = ({ score, refresh }) => {
  const [onRating, setOnRating] = useState(0);
  const [rated, setRated] = useState(0);
  const { title } = useParams();

  const ratingHandlers = (i) => {
    setRated(i + 1);
  };

  const removeHandler = async () => {
    const tLoading = toast.loading("Adding...");
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
    if (score !== 0) {
      setRated(score);
    }
  }, [score]);
  return (
    <div className="d-flex">
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
      <div className="dropdown">
        <button
          className="btn btn-purple btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-check"></i> On catalog
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