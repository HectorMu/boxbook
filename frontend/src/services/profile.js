import API from "../config/API";
import { authPutConfig, authGetConfig } from "../helpers/helpers";

export const getProfileData = async () => {
  try {
    const response = await fetch(`${API}/user/getprofile`, authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (data) => {
  try {
    const response = await fetch(
      `${API}/user/editprofile`,
      authPutConfig(data)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
