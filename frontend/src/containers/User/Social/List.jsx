import React, { useState } from "react";
import { getUsersOnSameLocation } from "../../../services/social";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";
import { Link } from "react-router-dom";

const List = () => {
  const [localUsers, setLocalUsers] = useState([]);
  const { isLoading } = useServiceFetch(getUsersOnSameLocation, setLocalUsers);

  return (
    <div>
      {isLoading ? (
        <Loading text="purple" />
      ) : (
        <div id="users-section" className="row">
          {localUsers.length === 0 && (
            <h5>We don't found any user based on your location</h5>
          )}
          {localUsers.map((user) => (
            <div
              key={user.id + user.username}
              className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4"
            >
              <Link
                to={`/profile/${user.id}/${user.username}`}
                className="card mb-3 text-decoration-none text-dark"
              >
                <div className="row g-0">
                  <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <i className="fas fa-user fa-5x p-2"></i>
                    <p> {user.username}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-center text-lg-start">
                      <h5 className="card-title text-center text-lg-start ">
                        {user.fullname}
                      </h5>
                      <p className="card-text">{user.email}</p>
                      <p className="card-text">{user.booksReaded} read books</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
