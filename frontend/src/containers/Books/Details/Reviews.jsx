import React, { useState, useEffect } from "react";
import { getBookReviews } from "../../../services/books";
import useServiceFetch from "../../../hooks/useServiceFetch";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { title } = useParams();
  const [reviews, setReviews] = useState([]);

  const getReviewsHandler = async () => {
    const fetchedReviews = await getBookReviews(title);
    setReviews(fetchedReviews);
  };

  useEffect(() => {
    getReviewsHandler();
  }, []);
  return (
    <div>
      <h5>All reviews</h5>
      {reviews.map((review) => (
        <div className="card py-2 px-5 mb-3">
          <div className="row g-0">
            <div className="col-2 col-md-1 d-flex justify-content-end align-items-center">
              <i className="fas fa-user-circle fa-6x "></i>
            </div>
            <div className="col-11 col-md-11">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  {review.username}{" "}
                  <small className="text-purple">{review.score}/5</small>
                </h5>
                <p className="card-text">{review.review}</p>
                <p className="card-text">
                  <small className="text-muted">{review.reviewDate}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
