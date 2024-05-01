import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getBookById, getBooks } from '../../services/google.apis.books'
import { checkBookInCatalog } from '../../services/books'
import Showcase from '../../containers/Books/Details/Showcase'
import AddToCatalog from '../../containers/Books/Details/AddToCatalog'
import BookInCatalog from '../../containers/Books/Details/BookInCatalog'
import Advances from '../../containers/Books/Details/Advances'
import Loading from '../../components/Global/Loading'
import UserReview from '../../containers/Books/Details/UserReview'
import Reviews from '../../containers/Books/Details/Reviews'

const Details = () => {
  const [catalogUserbook, setUserCatalogBook] = useState(null)
  const [googleBook, setGoogleBook] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  const getBookInCatalog = useCallback(async () => {
    setIsLoading(true)
    const foundUserBook = await checkBookInCatalog(id)
    setUserCatalogBook(foundUserBook)
    setIsLoading(false)
  }, [id])

  useEffect(() => {
    const getGoogleBookData = async () => {
      if (!id) return
      setIsLoading(true)

      const fetchedBook = await getBookById(id)
      setGoogleBook(fetchedBook)

      setIsLoading(false)
    }

    getBookInCatalog()
    getGoogleBookData()
  }, [id, getBookInCatalog])

  return (
    <div className="container py-3">
      {isLoading ? (
        <Loading text="purple" />
      ) : (
        <div>
          <div className="d-flex justify-content-center justify-content-lg-end  mb-2">
            {catalogUserbook ? (
              <BookInCatalog
                book={catalogUserbook}
                refresh={getBookInCatalog}
              />
            ) : (
              <AddToCatalog book={googleBook} refresh={getBookInCatalog} />
            )}
          </div>

          <Showcase book={googleBook} />

          {catalogUserbook?.status === 'Reading' && (
            <Advances
              book={googleBook}
              onCatalogBook={catalogUserbook}
              refresh={getBookInCatalog}
            />
          )}

          {catalogUserbook?.status === 'Read' && (
            <>
              <UserReview book={catalogUserbook} />
              <Reviews />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Details
