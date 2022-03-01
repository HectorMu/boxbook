import API from "../config/API";
import {
  authGetConfig,
  authPostConfig,
  authDeleteConfig,
} from "../helpers/helpers";

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

export const contactUser = async (data) => {
  try {
    const response = await fetch(`${API}/social/contact`, authPostConfig(data));
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFriendship = async (currentId) => {
  try {
    const response = await fetch(
      `${API}/social/frienship`,
      authPostConfig({ currentId })
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveCommentary = async (commentary, id) => {
  try {
    const response = await fetch(
      `${API}/social/new/commentary/${id}`,
      authPostConfig({ commentary })
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCatalogCommentaries = async (catalogId) => {
  try {
    const response = await fetch(
      `${API}/social/getcommentaries/${catalogId}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserCatalogCommentary = async (catalogId) => {
  try {
    const response = await fetch(
      `${API}/social/getusercommentary/${catalogId}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeCommentary = async (id) => {
  try {
    const response = await fetch(
      `${API}/catalog/commentary/remove/${id}`,
      authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
