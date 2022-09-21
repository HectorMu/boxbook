import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  getBookAdvance,
  removeBookFromCatalog,
  saveNewAdvance,
} from "../../../services/books";
import { alertConfig } from "../../../helpers/helpers";
import Swal from "sweetalert2";
import Canvas from "../../../components/Global/Canvas";
import AdvanceModel from "../../../Models/Books/AdvanceModel.js";
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";

const rateStars = [1, 2, 3, 4, 5];

const BookInCatalog = ({ book, refresh }) => {
  const [onRating, setOnRating] = useState(0);
  const [bookAdvance, setBookAdvance] = useState(0);
  const [newAdvance, setNewAdvance] = useState(AdvanceModel);
  const [rated, setRated] = useState(0);
  const { title } = useParams();

  const handleChange = (key, value) =>
    setNewAdvance({ ...newAdvance, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newAdvance.pagesReaded === 0)
      return toast.error("Provide a real advance");

    const results = await saveNewAdvance(newAdvance);
    console.log(results);
    if (!results.status) {
      return toast.error(results.statusText);
    }

    toast.success(results.statusText);
    refresh();
  };
  const getCurrentAdvance = useCallback(async () => {
    const results = await getBookAdvance(book.id);
    if (results.status) {
      setBookAdvance(results.bookAdvance.pagesReaded);
    }
  }, [book.id]);

  const removeHandler = async () => {
    Swal.fire({
      text: `¿Remove book from catalog?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tLoading = toast.loading("Removing..");
        const results = await removeBookFromCatalog(title);
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

  useEffect(() => {
    getCurrentAdvance();

    setNewAdvance((prev) => ({ ...prev, fk_book: book.id }));
    if (book.score !== 0) {
      setRated(book.score);
    }
  }, [book.score, getCurrentAdvance, book.id]);

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
      {book.status === "Pending" ? (
        <Canvas
          id="starToReadCanvas"
          buttonClass="btn btn-purple btn-sm me-2"
          buttonText="Start to read"
          icon="fas fa-glasses"
          title="Add first book advance"
        >
          <form onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="number"
              inputId="txtPages"
              placeholder="Page number"
              setValue={(e) =>
                handleChange("pagesReaded", parseInt(e.target.value))
              }
              value={bookAdvance}
            />
            <textarea
              placeholder="Commentary"
              rows="5"
              className="form-control"
              onChange={(e) => handleChange("commentary", e.target.value)}
              value={newAdvance.commentary}
            ></textarea>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-purple btn-sm">
                Save
              </button>
            </div>
          </form>
        </Canvas>
      ) : null}
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
