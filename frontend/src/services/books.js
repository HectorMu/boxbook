import API from "../config/API";
import {
  authPostConfig,
  authGetConfig,
  authPutConfig,
} from "../helpers/helpers";

export const getCatalog = async () => {
  try {
    const response = await fetch(`${API}/user/books/listall`, authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOneBook = async (title) => {
  try {
    const response = await fetch(
      `${API}/user/books/listone/${title}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addBookToCatalog = async (book) => {
  try {
    const response = await fetch(
      `${API}/user/books/save`,
      authPostConfig(book)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const checkBookInCatalog = async (book) => {
  try {
    const response = await fetch(
      `${API}/user/catalog/book/check`,
      authPostConfig(book)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeBookFromCatalog = async (title) => {
  try {
    const response = await fetch(
      `${API}/user/catalog/book/remove`,
      authPostConfig({ title })
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBookAdvance = async (id) => {
  try {
    const response = await fetch(
      `${API}/user/books/getadvance/${id}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAdvancesHistory = async (id) => {
  try {
    const response = await fetch(
      `${API}/user/books/advances/${id}`,
      authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveNewAdvance = async (advance) => {
  try {
    const response = await fetch(
      `${API}/user/books/advance/save`,
      authPostConfig(advance)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const setBookToRead = async (data) => {
  try {
    const response = await fetch(
      `${API}/user/books/setread`,
      authPutConfig(data)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBookReviews = async (title) => {
  try {
    const response = await fetch(
      `${API}/user/books/reviews/${title}`,
      authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
