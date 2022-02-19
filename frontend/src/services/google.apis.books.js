export const getBooks = async (q) => {
  if (q === "" || q === undefined) return [];

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${q}`
  );
  const { items } = await response.json();

  const bookTotalInfo = items.map((item) => item.volumeInfo);
  const bookRequiredInfo = bookTotalInfo.map(
    ({
      title,
      authors,
      pageCount,
      imageLinks,
      publisher,
      publishedDate,
      description,
    }) => ({
      title,
      authors,
      pageCount,
      imageLinks,
      publisher,
      publishedDate,
      description,
    })
  );

  return bookRequiredInfo;
};
