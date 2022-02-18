import API from "../config/API";
import { postConfig } from "../helpers/helpers";

export const SignUp = async (user) => {
  try {
    const response = await fetch(`${API}/signup`, postConfig(user));
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const LogIn = async (credentials) => {
  try {
    const response = await fetch(`${API}/login`, postConfig(credentials));
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = () => {
  window.localStorage.removeItem("BoxBookSession");
};
