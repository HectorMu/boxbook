import React from "react";
import { getFriends } from "../../../services/user";
import useServiceFetch from "../../../hooks/useServiceFetch";
import Loading from "../../../components/Global/Loading";
import { Link } from "react-router-dom";

const FriendList = () => {
  const { hookData, isLoading } = useServiceFetch(getFriends);

  console.log(hookData);
  return (
    <div className="mt-5">
      {isLoading ? (
        <Loading text="purple" />
      ) : hookData.length > 0 ? (
        <div id="users-section" className="row">
          {hookData.map((user) => (
            <div
              key={user.id + user.username}
              className="col-12 col-md-6 col-lg-6 col-xl-3 col-xxl-2"
            >
              <Link
                to={`/profile/${user.sender}/${user.username}`}
                className="card mb-3 text-decoration-none text-dark"
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <i className="fas fa-user fa-5x p-2"></i>
                  <p> {user.username}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center text-lg-start">
          You don't have any friends yet{" "}
          <Link className="text-purple " to={"/meet"}>
            Meet people!
          </Link>{" "}
        </h3>
      )}
    </div>
  );
};

export default FriendList;
