import React, { useState, useEffect, useCallback } from 'react'
import {
  getAdvancesHistory,
  saveNewAdvance,
  setBookToRead
} from '../../../services/books'
import Canvas from '../../../components/Global/Canvas'
import FloatingLabelInput from '../../../components/Global/FloatingLabelInput'
import AdvanceModel from '../../../Models/Books/AdvanceModel'
import BookReadModel from '../../../Models/Books/BookReadModel'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'

const rateStars = [1, 2, 3, 4, 5]

const Advances = ({ book, onCatalogBook, refresh }) => {
  const [newAdvance, setNewAdvance] = useState(() => ({
    fk_book: onCatalogBook.id,
    pagesReaded: 0,
    commentary: ''
  }))

  const [currentAdvance, setCurrentAdvance] = useState({})
  const [advancesHistory, setAdvancesHistory] = useState([])

  const [finishedReading, setFinishedReading] = useState(BookReadModel)
  const [onRating, setOnRating] = useState(0)
  const [rated, setRated] = useState(0)

  const ratingHandlers = (i) => {
    setRated(i + 1)
    handleChangeFinishedReading('score', i + 1)
  }

  const handleChange = (key, value) =>
    setNewAdvance({ ...newAdvance, [key]: value })

  const handleChangeFinishedReading = (key, value) =>
    setFinishedReading({ ...finishedReading, [key]: value })

  const getAdvancesHistoryHandler = useCallback(async () => {
    const advances = await getAdvancesHistory(onCatalogBook.id)
    setAdvancesHistory(advances)
    setCurrentAdvance(advances.at(0))
  }, [onCatalogBook.id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (parseInt(newAdvance.pagesReaded) === 0)
      return toast.error('Add a valid advance')

    if (newAdvance.pagesReaded === book.pageCount) {
      const results = await setBookToRead(finishedReading)
      if (!results.status) {
        return toast.error(results.statusText)
      }
      toast.success(results.statusText)
      refresh()
    } else {
      const results = await saveNewAdvance(newAdvance)
      if (!results.status) {
        return toast.error(results.statusText)
      }
      toast.success(results.statusText)
      getAdvancesHistoryHandler()
      refresh()
    }
    setNewAdvance(AdvanceModel)
  }

  useEffect(() => {
    getAdvancesHistoryHandler()
  }, [getAdvancesHistoryHandler])

  useEffect(() => {
    if (onCatalogBook?.id) {
      setNewAdvance((prev) => ({ ...prev, fk_book: onCatalogBook?.id }))
      setFinishedReading((prev) => ({ ...prev, id: onCatalogBook?.id }))
    }
  }, [onCatalogBook])

  return (
    <div className="mt-5">
      <div
        className="d-flex gap-2
        flex-column-reverse 
        justify-content-between
        align-items-center 
        flex-md-row 
        flex-sm-column-reverse 
        flex-lg-row 
        flex-xl-row 
        flex-xxl-row"
      >
        <div>
          <h3>
            Current advance{' '}
            {Math.round(
              (currentAdvance?.pagesReaded * 100) / book?.pageCount ?? 0
            )}
            <i className="fas fa-percentage text-purple"></i>
          </h3>
        </div>

        <Canvas
          buttonClass="btn btn-purple btn-sm"
          title="Adding new advance"
          id="advancesCanvas"
          buttonText="New advance"
          icon={<FaPlus />}
        >
          <h6 className="mb-3">Current page: {currentAdvance?.pagesReaded}</h6>
          {newAdvance?.pagesReaded === book?.pageCount ? (
            <div>
              <div className="my-4 text-start">
                Looks like you finshed this book, this final commentary will
                count as the book final review and the book status will be
                changed to read.
              </div>
              <h5 className="text-center pt-3">Rate this book</h5>
              <div className="d-flex justify-content-center mb-4">
                {rateStars.map((el, i) => (
                  <button
                    type="button"
                    key={el}
                    onMouseOver={() => setOnRating(i + 1)}
                    onMouseLeave={() => setOnRating(rated)}
                    onClick={() => ratingHandlers(i)}
                    className={`btn btn-sm btn-star ${
                      rated >= i + 1
                        ? `rated`
                        : `${onRating >= i + 1 ? `text-purple-light` : ''} `
                    } `}
                  >
                    <i className="fas fa-star responsive-font"></i>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="number"
              inputId="txtPages"
              placeholder="Page number"
              setValue={(e) =>
                handleChange('pagesReaded', parseInt(e.target.value))
              }
              value={newAdvance.pagesReaded}
            />
            <textarea
              placeholder="Commentary"
              rows="5"
              className="form-control"
              onChange={
                newAdvance?.pagesReaded >= book?.pageCount
                  ? (e) => handleChangeFinishedReading('review', e.target.value)
                  : (e) => handleChange('commentary', e.target.value)
              }
              value={
                newAdvance?.pagesReaded >= book?.pageCount
                  ? finishedReading.review
                  : newAdvance.commentary
              }
            ></textarea>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-purple btn-sm">
                Save
              </button>
            </div>
          </form>
        </Canvas>
      </div>
      <div className="pt-3 mb-2 d-flex gap-3 border-purple flex-column">
        <h6>
          <i className="fas fa-book-open text-purple "></i> Read:{' '}
          {currentAdvance?.pagesReaded}/{book?.pageCount} pages
        </h6>
        <div className="d-flex gap-2">
          <h5>Commentary:</h5>{' '}
          <h5>
            {currentAdvance.commentary === ''
              ? 'No comentary'
              : currentAdvance.commentary}
          </h5>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-3">Advances history</h3>
        {advancesHistory.map((advance) => (
          <div key={advance.id}>
            <p>
              <button
                className="btn btn-purple w-100"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseAdvance${advance.id}`}
                aria-expanded="false"
                aria-controls={`collapseAdvance${advance.id}`}
              >
                Advance from page: {advance.pagesReaded}
              </button>
            </p>
            <div className="collapse mb-3" id={`collapseAdvance${advance.id}`}>
              <div className="card card-body">
                {advance.commentary === ''
                  ? 'No commentary'
                  : advance.commentary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Advances
