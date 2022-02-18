import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/notfound.svg";

const NotFound = () => {
  return (
    <div>
      <div className="container pt-5">
        <div className="d-flex flex-column bg-coffe justify-content-center align-items-center ">
          <img src={image} className="img-fluid w-50 h-50" alt="" />
          <h5 className="mt-3  fw-bold text-center">
            Oops... Nothing here!, you must{" "}
            <span className="text-purple">b</span>e reading!.{" "}
            <Link to={-1} className="text-purple">
              <i className="fas fa-arrow-left"></i> Come back
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
