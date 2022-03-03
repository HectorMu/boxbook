import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
//Importing custom components
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
//Importing hooks
import useServiceFetch from "../../../hooks/useServiceFetch";
import { getProfileData, editProfile } from "../../../services/profile";

//Importing services
import { getCountries } from "../../../services/countriesnow.api";

//Importing toast
import toast from "react-hot-toast";

const EditForm = () => {
  const [countries, setCountries] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [onEditPassword, setonEditPassword] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  useServiceFetch(getCountries, setCountries);
  const [cities, setCities] = useState([]);

  const toggleEditPassword = () => {
    setonEditPassword(!onEditPassword);
    setUserProfile(delete userProfile.password);
  };

  const toggleOnEditing = () => {
    setOnEditing(!onEditing);
  };

  const handleChange = (key, value) =>
    setUserProfile({ ...userProfile, [key]: value });

  const getProfileHandler = useCallback(async () => {
    const fetchedData = await getProfileData();
    delete fetchedData.password;
    setUserProfile(fetchedData);
  }, []);

  const getCitiesFromCountry = useCallback(() => {
    if (
      userProfile.country === "" ||
      userProfile.country === undefined ||
      userProfile.country === null
    ) {
      setCities([]);
      return;
    }

    const selectedCountry = countries.filter(
      ({ country }) => country === userProfile.country
    );

    if (selectedCountry.length > 0) {
      if (selectedCountry[0].cities.length > 0) {
        setCities(selectedCountry[0].cities);
      }
    }
  }, [userProfile.country, countries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditPassword) {
      if (userProfile.password.length < 8) {
        return toast.error("Password must be 8 characters long");
      }
      if (userProfile.password !== confirmPassword) {
        return toast.error("Passwords don't match");
      }
    }

    const tLoading = toast.loading("Updating profile data...");
    const results = await editProfile(userProfile);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toggleOnEditing();
    toast.success(results.statusText, { id: tLoading });
  };

  useEffect(() => {
    getCitiesFromCountry();
    getProfileHandler();
  }, [getCitiesFromCountry, getProfileHandler]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="d-flex justify-content-end mb-2">
          <button
            onClick={toggleOnEditing}
            type={"button"}
            className="btn btn-purple btn-sm"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtUsername"
              placeholder="Username"
              setValue={(e) => handleChange("username", e.target.value)}
              value={userProfile.username}
              status={onEditing ? false : true}
            />
          </div>

          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtFullname"
              placeholder="Fullname"
              setValue={(e) => handleChange("fullname", e.target.value)}
              value={userProfile.fullname}
              status={onEditing ? false : true}
            />
          </div>
          <div className="col-12 col-lg-12 mx-auto">
            <FloatingLabelInput
              inputId="txtEmail"
              type="email"
              placeholder="Email"
              setValue={(e) => handleChange("email", e.target.value)}
              value={userProfile.email}
              status={onEditing ? false : true}
            />
          </div>
          <div className="d-flex justify-content-start gap-3 mb-3">
            <input
              id="password"
              type={"checkbox"}
              onChange={toggleEditPassword}
              className="form-check"
              disabled={onEditing ? false : true}
            />
            <label htmlFor="password">Edit password?</label>
          </div>
          {onEditPassword ? (
            <>
              <div className="col-12 col-lg-6">
                <FloatingLabelInput
                  inputId="txtPassword"
                  type="password"
                  placeholder="Password"
                  setValue={(e) => handleChange("password", e.target.value)}
                  value={userProfile.password}
                  status={onEditing ? false : true}
                />
              </div>
              <div className="col-12 col-lg-6">
                <FloatingLabelInput
                  inputId="txtConfirm"
                  type="password"
                  placeholder="Password"
                  setValue={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  status={onEditing ? false : true}
                />
              </div>
            </>
          ) : null}
          <div className="col-12 col-lg-6">
            <FloatingLabelInput
              inputId="txtCountry"
              type="text"
              placeholder="Country"
              dataList={"CountryList"}
              setValue={(e) => handleChange("country", e.target.value)}
              value={userProfile.country}
              status={onEditing ? false : true}
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
              value={userProfile.city}
              status={onEditing ? false : true}
            />
            <datalist id="CityList">
              {cities && cities.length > 0
                ? cities.map((city) => (
                    <option key={city} value={city}></option>
                  ))
                : null}
            </datalist>
          </div>
          <div className="col-12 col-lg-6 mx-auto">
            <h6 className="mb-3">Readed {userProfile.booksReaded} of</h6>
            <FloatingLabelInput
              inputId="txtGoal"
              type="text"
              placeholder="Yearly goal"
              setValue={(e) => handleChange("yearlyGoal", e.target.value)}
              value={userProfile.yearlyGoal}
              status={onEditing ? false : true}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {onEditing ? (
            <button
              type="submit"
              className="btn btn-primary rounded-pill btn-lg effect-resize"
            >
              Save Changes
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default EditForm;
