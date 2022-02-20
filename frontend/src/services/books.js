import API from "../config/API";
import { authPostConfig } from "../helpers/helpers";

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
