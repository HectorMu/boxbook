import { useState, useEffect, useCallback } from 'react'
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
import { FaBookOpen, FaPercentage, FaPlus, FaStar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const rateStars = [1, 2, 3, 4, 5]

const Advances = ({ book, onCatalogBook, refresh }) => {
  const [newAdvance, setNewAdvance] = useState(() => ({
    fk_book: onCatalogBook.id,
    pagesReaded: 0,
    commentary: ''
  }))

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

  if (advancesHistory.length === 0) return null
  return (
    <div className="mt-5 border-purple">
      <h5 className="mb-3">Advances history</h5>
      {advancesHistory.map((advance, index) => (
        <div key={advance.id} className="card mb-3 w-full">
          <div className="card-body p-3 w-full">
            <div
              className="d-flex gap-2
        flex-column-reverse 
        justify-content-between
        align-items-center 
        flex-md-row 
        flex-sm-column-reverse 
        flex-lg-row 
        flex-xl-row 
        flex-xxl-row w-full"
            >
              <div
                style={{ width: '100%' }}
                className="d-flex justify-content-between w-full"
              >
                <h6 className="fw-bold d-flex gap-1">
                  {Math.round(
                    (advance?.pagesReaded * 100) / book?.pageCount ?? 0
                  )}
                  <FaPercentage className="text-purple" />
                  at page{' '}
                  <h6 className="d-flex gap-1 fw-bold">
                    <FaLocationDot className="text-purple" />{' '}
                    {advance?.pagesReaded}
                  </h6>
                </h6>
                {index === 0 && (
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="d-flex gap-1 fw-bold">
                      <FaBookOpen className="text-purple" />{' '}
                      {advance?.pagesReaded}/{book?.pageCount} pages
                    </h6>
                    {onCatalogBook.status !== 'Read' && (
                      <Canvas
                        buttonClass="btn btn-purple btn-sm"
                        title="Adding new advance"
                        id="advancesCanvas"
                        buttonText="New advance"
                        icon={<FaPlus />}
                      >
                        <p className="mb-3">
                          Current page: {advance?.pagesReaded}
                        </p>
                        {newAdvance?.pagesReaded === book?.pageCount ? (
                          <div>
                            <div className="my-4 text-start">
                              Looks like you finshed this book, this final
                              commentary will count as the book final review and
                              the book status will be changed to read.
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
                                      : `${
                                          onRating >= i + 1
                                            ? `text-purple-light`
                                            : ''
                                        } `
                                  } `}
                                >
                                  <FaStar className="responsive-font" />
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
                              handleChange(
                                'pagesReaded',
                                parseInt(e.target.value)
                              )
                            }
                            value={newAdvance.pagesReaded}
                          />
                          <textarea
                            placeholder="Commentary"
                            rows="5"
                            className="form-control"
                            onChange={
                              newAdvance?.pagesReaded >= book?.pageCount
                                ? (e) =>
                                    handleChangeFinishedReading(
                                      'review',
                                      e.target.value
                                    )
                                : (e) =>
                                    handleChange('commentary', e.target.value)
                            }
                            value={
                              newAdvance?.pagesReaded >= book?.pageCount
                                ? finishedReading.review
                                : newAdvance.commentary
                            }
                          ></textarea>
                          <div className="d-flex justify-content-center mt-3">
                            <button
                              type="submit"
                              className="btn btn-purple btn-sm"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </Canvas>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column">
              <p>
                {advance.commentary === ''
                  ? 'No comentary'
                  : advance.commentary}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Advances
