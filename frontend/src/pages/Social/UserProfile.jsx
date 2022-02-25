import React, { useCallback, useEffect, useState } from "react";
import { getUserProfile, getUserCatalog } from "../../services/social";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TruncatedText from "../../components/Global/TruncatedText";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [catalog, setCatalog] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
  }, [getProfileHandler, getCatalogHandler]);

  console.log(profile);
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-7">
          <div className="d-flex flex-column align-items-center ">
            <i className="fas fa-user fa-6x"></i>
            <h4>{profile.username}</h4>
            <h6> {profile.fullname}</h6>
            <h6> {profile.email}</h6>
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
                <div className={`carousel-item   ${i === 0 ? `active` : ``}`}>
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
    </div>
  );
};

export default UserProfile;
