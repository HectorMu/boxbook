import API from "../config/API";
import { authGetConfig } from "../helpers/helpers";

export const getUsersOnSameLocation = async () => {
  try {
    const response = await fetch(
      `${API}/social/users/samelocation`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (id) => {
  try {
    const response = await fetch(
      `${API}/social/listone/${id}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserCatalog = async (id) => {
  try {
    const response = await fetch(
      `${API}/social/catalog/${id}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
