import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCatalogCommentaries } from "../../../services/social";

const CatalogCommentaries = () => {
  const [commentaries, setCommentaries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCommentariesHandler = useCallback(async () => {
    const commentariesFetched = await getCatalogCommentaries(id);
    setCommentaries(commentariesFetched);
  }, [id]);

  useEffect(() => {
    getCommentariesHandler();
  }, [getCommentariesHandler]);
  console.log(commentaries);
  return (
    <div className="mt-5">
      <h4>All commentaries</h4>
      {commentaries.length > 0 ? (
        <div className="row">
          {commentaries.map((comment) => (
            <div key={comment.id} className="col">
              <div className="card shadow">
                <div className="card-body">
                  <div className="row">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/profile/${comment.fk_visitor}/${comment.username}`
                        )
                      }
                      className="col-lg-2 d-flex justify-content-center align-items-center flex-column"
                    >
                      <i className="fas fa-user fa-6x rounded-circle"></i>
                      <h6 className="fw-bolder mt-2">{comment.username}</h6>
                    </div>
                    <div className="col-lg-10">
                      <p className="card-text">{comment.commentary}</p>

                      <div className="card-text d-flex justify-content-end">
                        <div>
                          <small className="text-muted">
                            {comment.country}
                          </small>
                          - <small className="text-muted">{comment.city}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h6>No more commentaries yet</h6>
      )}
    </div>
  );
};

export default CatalogCommentaries;
