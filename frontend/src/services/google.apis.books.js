export const getBooks = async (q, maxResults = 10) => {
  if (!q) return []

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=${maxResults}`
  )

  const data = await response.json()
  const books = data.items

  const mappedBooks = books.map(({ id, volumeInfo }) => ({
    googleBookId: id,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    pageCount: volumeInfo.pageCount,
    imageLinks: volumeInfo.imageLinks,
    publisher: volumeInfo.publisher,
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    categories: volumeInfo.categories
  }))

  return mappedBooks
}

export const getBookById = async (id) => {
  if (!id) return undefined

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  )

  const book = await response.json()

  const { volumeInfo } = book

  const bookRequiredInfo = {
    googleBookId: book.id,
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    pageCount: volumeInfo.pageCount,
    imageLinks: volumeInfo.imageLinks,
    publisher: volumeInfo.publisher,
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    categories: volumeInfo.categories
  }

  return bookRequiredInfo
}
