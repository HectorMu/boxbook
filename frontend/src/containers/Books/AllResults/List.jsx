import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getBooks } from '../../../services/google.apis.books'
import { booksCache } from '../../../cache'

const List = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      if (booksCache.has('books')) {
        setBooks(booksCache.get('books'))
      } else {
        setIsLoading(true)
        const fetchedBooks = await getBooks(title, 40)
        setBooks(fetchedBooks ?? [])
        booksCache.set('books', fetchedBooks)
        setIsLoading(false)
      }
    }
    loadBooks()
  }, [title])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        books.map((b) => (
          <div key={b.googleBookId} className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-3 col-lg-2 col-xl-1 col-xxl-1">
                  <img
                    src={b.imageLinks ? b.imageLinks.thumbnail : null}
                    className="card-img-top"
                    alt={b.title}
                  />
                </div>
                <div className="col-9 col-lg-10 col-xl-5 col-xxl-11">
                  <div className="d-flex flex-column">
                    <h5>{b.title}</h5>
                    <p>{b.authors}</p>
                    <p>{b.publisher}</p>
                    <p>{b.publishedDate}</p>
                  </div>
                </div>
                <div className="col-9 col-lg-10 col-xl-6 col-xxl-11">
                  <div className="d-flex flex-column  align-items-end">
                    <Link
                      to={`/books/details/${b.googleBookId}`}
                      className={'btn btn-primary'}
                      state={b}
                    >
                      Details <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default List
