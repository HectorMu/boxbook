import React, { useCallback, useEffect, useState } from "react";
import {
  getUserProfile,
  getUserCatalog,
  addAsFriend,
  getFriendshipSender,
  getFriendshipReceiver,
  removeFriend,
  acceptFriend,
} from "../../services/social";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TruncatedText from "../../components/Global/TruncatedText";

import CatalogCommentaries from "../../containers/User/Social/CatalogCommentaries";
import UserOwnCommentary from "../../containers/User/Social/UserOwnCommentary";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [catalog, setCatalog] = useState([]);
  const [friendshipId, setFriendshipId] = useState(0);
  const [friendshipSender, setFriendshipSender] = useState(null);
  const [friendshipReceiver, setFriendshipReceiver] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const addAsFriendHandler = async () => {
    const results = await addAsFriend(id);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success(`Added as a friend, wait for ${profile.username} response`);
    await getCurrentFriendshipSender();
    await getCurrentFriendshipReceiver();
  };

  const removeAsFriendHandler = async () => {
    const results = await removeFriend(id);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success(`Removed ${profile.username} as a friend`);
    await getCurrentFriendshipSender();
    await getCurrentFriendshipReceiver();
  };

  const acceptAsFriendHandler = async () => {
    const results = await acceptFriend(id);
    if (!results.status) {
      return toast.error(results.statusText);
    }
    toast.success(`Accepted ${profile.username} as a friend!`);
    await getCurrentFriendshipSender();
    await getCurrentFriendshipReceiver();
  };

  const getCurrentFriendshipSender = useCallback(async () => {
    const results = await getFriendshipSender(id);
    console.log(results);
    if (results !== undefined) {
      setFriendshipSender(results);
      setFriendshipId(results.id);
      return;
    }
    setFriendshipSender(null);
  }, [id]);

  const getCurrentFriendshipReceiver = useCallback(async () => {
    const results = await getFriendshipReceiver(id);
    if (results !== undefined) {
      setFriendshipReceiver(results);
      setFriendshipId(results.id);
      return;
    }
    setFriendshipReceiver(null);
  }, [id]);

  const getProfileHandler = useCallback(async () => {
    const fetchedProfile = await getUserProfile(id);
    setProfile(fetchedProfile);
  }, [id]);

  const getCatalogHandler = useCallback(async () => {
    const fetchedCatalog = await getUserCatalog(id);
    setCatalog(fetchedCatalog);
  }, [id]);

  useEffect(() => {
    getProfileHandler();
    getCatalogHandler();
    getCurrentFriendshipSender();
    getCurrentFriendshipReceiver();
  }, [
    getProfileHandler,
    getCatalogHandler,
    getCurrentFriendshipSender,
    getCurrentFriendshipReceiver,
  ]);

  return (
    <div className="container py-5">
      {friendshipReceiver && (
        <h5>{profile.username} send you a friend request</h5>
      )}
      <div className="row  d-flex align-items-center">
        <div className="col-lg-7 ">
          <div className="mb-3  d-flex align-items-center py-5 shadow-lg">
            <div className="row g-0 ">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <i className="fas fa-user fa-7x"></i>
              </div>
              <div className="col-md-8 ">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between mb-4">
                    {profile.username}

                    {friendshipReceiver && !friendshipSender && (
                      <button
                        onClick={acceptAsFriendHandler}
                        className="btn btn-purple btn-sm"
                      >
                        Accept as a friend
                      </button>
                    )}

                    {friendshipSender && !friendshipReceiver && (
                      <button className="btn btn-purple btn-sm">
                        Response pending
                      </button>
                    )}

                    {!friendshipSender && !friendshipReceiver && (
                      <button
                        onClick={addAsFriendHandler}
                        className="btn btn-purple btn-sm"
                      >
                        <i className="fas fa-user"></i> Add to friend list
                      </button>
                    )}

                    {friendshipSender && friendshipReceiver && (
                      <button
                        onClick={removeAsFriendHandler}
                        className="btn btn-purple btn-sm"
                      >
                        <i className="fas fa-user"></i> Friends
                      </button>
                    )}
                  </h5>
                  <p className="card-text">
                    Hi, my full name is {profile.fullname} and i have readed{" "}
                    {profile.booksReaded} books.
                  </p>
                  <div className="card-text d-flex justify-content-between">
                    <small className="text-muted">{profile.email}</small>
                    <div>
                      <small className="text-muted">{profile.country}</small> -{" "}
                      <small className="text-muted">{profile.city}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <h4 className="text-center fw-bold">My books</h4>
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {catalog.map((book, i) => (
                <div
                  key={i}
                  className={`carousel-item   ${i === 0 ? `active` : ``}`}
                >
                  <div className="d-flex justify-content-center w-100">
                    <div
                      onClick={() => navigate(`/books/details/${book.title}`)}
                      className="card w-50"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={book.thumbnail}
                        className="card-img-top "
                        alt="..."
                      />
                      <div className="card-body d-flex justify-content-center flex-column">
                        <TruncatedText text={book.title} minimunLength={26} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev ms-0 ms-lg-5"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next me-0 me-lg-5"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <UserOwnCommentary profile={profile} />
      <CatalogCommentaries profile={profile} />
    </div>
  );
};

export default UserProfile;
