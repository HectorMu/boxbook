export const getBooks = async (q) => {
  while (q === "" || q === undefined) return [];

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${q}`
  );
  const { items } = await response.json();

  const bookTotalInfo = items.map((item) => item.volumeInfo);
  //console.log(bookTotalInfo);
  const bookRequiredInfo = bookTotalInfo.map(
    ({ title, authors, pageCount, imageLinks, publisher, publishedDate }) => ({
      title,
      authors,
      pageCount,
      imageLinks,
      publisher,
      publishedDate,
    })
  );

  return bookRequiredInfo;
};
