import React from "react";
import LoginForm from "../../containers/Auth/LoginForm";
import image from "../../assets/login-image.svg";

const Login = () => {
  return (
    <div>
      <div className="container py-5 ">
        <div className="row py-3 px-2  ">
          <div className="col-12 col-lg-6 col-xl-6">
            <h3 className="text-center mb-4 fw-bolder">We missed you!</h3>
            <LoginForm />
          </div>
          <div className="col-12 col-lg-6 col-xl-6 mt-4 mt-lg-0 mt-md-0 mt-lg-0 py-5">
            <img src={image} alt="" className="img-fluid " />
            <h1 className="text-center fw-bolder ">
              <span className="text-purple">b</span>ack to{" "}
              <span className="text-purple">B</span>ox
              <span className="text-purple">B</span>
              ook!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
