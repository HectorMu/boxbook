import React from "react";
import TruncatedText from "../../Global/TruncatedText";
import { useNavigate } from "react-router-dom";
import { removeBookFromCatalog } from "../../../services/books";
import Swal from "sweetalert2";
import { alertConfig } from "../../../helpers/helpers";
import toast from "react-hot-toast";

const BookCard = ({ book, refresh }) => {
  const navigate = useNavigate();
  const removeHandler = async () => {
    Swal.fire({
      text: `¿Remove book from catalog?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tLoading = toast.loading("Removing..");
        const results = await removeBookFromCatalog(book.title);
        if (!results.status) {
          toast.error("Something wen't wrong, try again later");
        }
        toast.success(`Book removed from catalog`, {
          id: tLoading,
        });
        refresh();
      }
    });
  };
  return (
    <div
      key={book.title + book.id}
      className="col-6 col-sm-4  col-lg-3 col-xl-2 col-xxl-4"
    >
      <div className="floating-menu">
        <div className="floating-options">
          <button
            onClick={removeHandler}
            className="btn btn-danger btn-sm w-100"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
        <div
          onClick={() => navigate(`/books/details/${book.title}`)}
          className="card w-100 mb-5"
        >
          <img src={book.thumbnail} className="card-img-top" alt="..." />
          <div className="card-body d-flex justify-content-center flex-column">
            <TruncatedText text={book.title} minimunLength={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
