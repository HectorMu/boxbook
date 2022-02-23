import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabelInput from "../../components/Global/FloatingLabelInput";
import LogInModel from "../../Models/Auth/LogInModel";
import { LogIn } from "../../services/auth";
import { checkYearlyGoal, setYearlyGoal } from "../../services/user";
import useSession from "../../hooks/useSession";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [credentials, setCredentials] = useState(LogInModel);
  const { setUser } = useSession();
  const navigate = useNavigate();

  const handleChange = (key, value) =>
    setCredentials({ ...credentials, [key]: value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const tLoading = toast.loading("Validating...");
    const loginResults = await LogIn(credentials);
    if (!loginResults.status) {
      return toast.error(loginResults.statusText, {
        id: tLoading,
      });
    }

    window.localStorage.setItem(
      "BoxBookSession",
      JSON.stringify(loginResults.SessionData)
    );

    setUser(JSON.parse(window.localStorage.getItem("BoxBookSession")));
    toast.success(`Welcome back ${loginResults.SessionData.username}`, {
      id: tLoading,
    });

    navigate("/home");
    const hasYearlyGoal = await checkYearlyGoal();
    if (!hasYearlyGoal.status && hasYearlyGoal.statusText === "NotSetted") {
      const { value: settedGoal } = await Swal.fire({
        title: "You dont have a yearly goal setted!, set it now",
        input: "number",
        inputPlaceholder: "I swear that I will read these books...",
        confirmButtonText: "Save!",
        cancelButtonText: "Later",
      });

      if (settedGoal) {
        const results = await setYearlyGoal(settedGoal);
        if (results.status) {
          Swal.fire(`Goal saved!, we believe in you!`);
        } else {
          Swal.fire(`Someething wen't wrong, try again later`);
        }
      }
    }
  };

  return (
    <form className=" py-2" onSubmit={handleSignUp}>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <FloatingLabelInput
              inputId="txtEmail"
              placeholder="Email"
              setValue={(e) => handleChange("email", e.target.value)}
              value={credentials.email}
            />
          </div>
          <div className="col-12">
            <FloatingLabelInput
              inputId="txtPassword"
              placeholder="Password"
              type="password"
              setValue={(e) => handleChange("password", e.target.value)}
              value={credentials.password}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary rounded-pill btn-lg effect-resize"
          >
            Log in
          </button>
        </div>
        <hr />
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="text-muted text-center">Don't have an account?</p>
          <Link
            to={"/signup"}
            className="btn btn-primary rounded-pill btn-lg effect-resize"
          >
            Sign up now!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
