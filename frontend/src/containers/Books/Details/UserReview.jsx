import useSession from '../../../hooks/useSession'
import { FaUserCircle } from 'react-icons/fa'

const UserReview = ({ book }) => {
  const { user } = useSession()
  return (
    <>
      <div className="mt-3  border-purple mb-5">
        <h5 className="mt-4">My review</h5>
        <div className="card py-2 px-5 mb-3">
          <div className="row g-0">
            <div className="col-12 col-md-4 col-lg-2 d-flex justify-content-center  align-items-center">
              <FaUserCircle style={{ fontSize: '115px' }} />
            </div>
            <div className="col-11 col-md-8 col-lg-10">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  {user.username}
                  <small className="text-purple">{book.score}/5</small>
                </h5>
                <p className="card-text">{book.review}</p>
                <p className="card-text">
                  <small className="text-muted">{book.reviewDate}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserReview
