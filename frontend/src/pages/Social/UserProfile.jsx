import React, { useCallback, useEffect, useState } from "react";
import {
  getUserProfile,
  getUserCatalog,
  getFriendship,
} from "../../services/social";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TruncatedText from "../../components/Global/TruncatedText";
import Contact from "../../containers/User/Social/Contact";
import CatalogCommentaries from "../../containers/User/Social/CatalogCommentaries";
import UserOwnCommentary from "../../containers/User/Social/UserOwnCommentary";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [catalog, setCatalog] = useState([]);
  const [friendship, setFriendship] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCurrentFriendshipStatus = useCallback(async () => {
    const results = await getFriendship(id);

    if (results !== undefined) {
      setFriendship(results);
      return;
    }
    setFriendship(null);
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
    getCurrentFriendshipStatus();
  }, [getProfileHandler, getCatalogHandler, getCurrentFriendshipStatus]);

  return (
    <div className="container py-5">
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
                    {profile.username}{" "}
                    {friendship !== null && friendship.status === "Pending" ? (
                      <button className="btn btn-purple btn-sm">
                        Response pending
                      </button>
                    ) : (
                      <Contact
                        profile={profile}
                        refresh={getCurrentFriendshipStatus}
                      />
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
