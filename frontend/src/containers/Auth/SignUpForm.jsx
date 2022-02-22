import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
//Importing custom components
import FloatingLabelInput from "../../components/Global/FloatingLabelInput";
//Importing hooks
import useServiceFetch from "../../hooks/useServiceFetch";
//importing models
import SignUpModel from "../../Models/Auth/SignUpModel";
//Importing services
import { getCountries } from "../../services/countriesnow.api";
import { SignUp } from "../../services/auth";
//importing helpers
import { checkEmptyValue } from "../../helpers/helpers";
//Importing toast
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState(SignUpModel);
  const [confirmPassword, setConfirmPassword] = useState("");
  useServiceFetch(getCountries, setCountries);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const handleChange = (key, value) => setUser({ ...user, [key]: value });

  const getCitiesFromCountry = useCallback(() => {
    if (
      user.country === "" ||
      user.country === undefined ||
      user.country === null
    ) {
      setCities([]);
      return;
    }

    const selectedCountry = countries.filter(
      ({ country }) => country === user.country
    );

    if (selectedCountry.length > 0) {
      if (selectedCountry[0].cities.length > 0) {
        setCities(selectedCountry[0].cities);
      }
    }
  }, [user.country, countries]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const hasEmpty = checkEmptyValue(user);
    if (hasEmpty.result) return toast.error(hasEmpty.expected);

    const validCountry = countries.filter(
      ({ country }) => country === user.country
    );
    if (!validCountry.length > 0)
      return toast.error("Write a country like shown in the list");

    if (user.password.length < 8)
      return toast.error("Passsword must be 8 characters long");
    if (user.password !== confirmPassword)
      return toast.error("Passwords don't match");

    const signUpResults = await SignUp(user);
    if (!signUpResults.status) {
      return toast.error(signUpResults.statusText);
    }

    toast.success(signUpResults.statusText);
    navigate("/login");
  };

  useEffect(() => {
    getCitiesFromCountry();
  }, [getCitiesFromCountry]);

  return (
    <form className="" onSubmit={handleSignUp}>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtUsername"
              placeholder="Username"
              setValue={(e) => handleChange("username", e.target.value)}
              value={user.username}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtFullname"
              placeholder="Fullname"
              setValue={(e) => handleChange("fullname", e.target.value)}
              value={user.fullname}
            />
          </div>
          <div className="col-12 col-lg-12 mx-auto">
            <FloatingLabelInput
              inputId="txtEmail"
              type="email"
              placeholder="Email"
              setValue={(e) => handleChange("email", e.target.value)}
              value={user.email}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtPassword"
              type="password"
              placeholder="Password"
              setValue={(e) => handleChange("password", e.target.value)}
              value={user.password}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtConfirm"
              type="password"
              placeholder="Password"
              setValue={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtCountry"
              type="text"
              placeholder="Country"
              dataList={"CountryList"}
              setValue={(e) => handleChange("country", e.target.value)}
              value={user.country}
            />
            <datalist id="CountryList">
              {countries && countries.length > 0
                ? countries.map(({ country, iso3, iso2, cities }) => (
                    <option
                      key={iso2 + iso3 + country + cities[0]}
                      value={country}
                    ></option>
                  ))
                : null}
            </datalist>
          </div>
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtCity"
              type="text"
              placeholder="City"
              dataList={"CityList"}
              setValue={(e) => handleChange("city", e.target.value)}
              value={user.city}
            />
            <datalist id="CityList">
              {cities && cities.length > 0
                ? cities.map((city) => (
                    <option key={city} value={city}></option>
                  ))
                : null}
            </datalist>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary rounded-pill btn-lg effect-resize"
          >
            Sign me up!
          </button>
        </div>

        <hr />
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="text-muted text-center">Already have an account?</p>
          <Link
            to={"/login"}
            className="btn btn-primary rounded-pill btn-lg effect-resize"
          >
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
