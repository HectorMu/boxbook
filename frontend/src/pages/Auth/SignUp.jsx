import React from "react";
import SignUpForm from "../../containers/Auth/SignUpForm";
import image from "../../assets/signin-image.svg";

const SignUp = () => {
  return (
    <div>
      <div className="container py-5 ">
        <div className="row bg-coffee py-3 px-2 rounded-3 shadow-lg">
          <div className="col-12 col-lg-6 col-xl-6">
            <h2 className="text-center text-white fw-bolder mb-4">
              Welcome to <span className="text-purple">B</span>ox
              <span className="text-purple">B</span>ook!
            </h2>
            <img src={image} alt="" className="img-fluid" />
          </div>
          <div className="col-12 col-lg-6 col-xl-6 mt-4 mt-lg-0 mt-md-0 mt-lg-0">
            <h3 className="text-center text-white mb-4">
              Sign up to start managing your{" "}
              <span className="text-purple">b</span>ooks
            </h3>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
