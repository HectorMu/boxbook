import API from "../config/API";
import { authPostConfig, authGetConfig } from "../helpers/helpers";

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
