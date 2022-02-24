import React from "react";
import useSession from "../../../hooks/useSession";

const UserReview = ({ book }) => {
  const { user } = useSession();
  return (
    <>
      <div className="mt-3  border-purple mb-5">
        <h2>Reviews</h2>
        <h5 className="mt-4">My review</h5>
        <div className="card py-2 px-5 mb-3">
          <div className="row g-0">
            <div className="col-1 col-md-1 d-flex justify-content-end align-items-center">
              <i className="fas fa-user-circle fa-6x text-purple"></i>
            </div>
            <div className="col-11 col-md-11">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  {user.username}
                  <small className="text-purple">{book.score}/5</small>
                </h5>
                <p className="card-text">{book.review}</p>
                <p className="card-text">
                  <small className="text-muted">{book.reviewDate}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReview;
