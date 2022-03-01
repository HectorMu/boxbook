import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserCatalogCommentary,
  saveCommentary,
  removeCommentary,
} from "../../../services/social";
import { alertConfig } from "../../../helpers/helpers";
import Loading from "../../../components/Global/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserOwnCommentary = ({ profile }) => {
  const [commentary, setCommentary] = useState(null);
  const [newCommentary, setNewCommentary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tLoading = toast.loading("Saving commentary...");
    const results = await saveCommentary(newCommentary, id);
    if (!results.status) {
      return toast.error(results.statusText, { id: tLoading });
    }
    toast.success(results.statusText, { id: tLoading });
    getCommentaryHandler();
  };

  const handleRemove = () => {
    Swal.fire({
      text: `¿Remove commentary?`,
      icon: "info",
      ...alertConfig,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tLoading = toast.loading("Removing..");
        const results = await removeCommentary(commentary.id);
        if (!results.status) {
          toast.error("Something wen't wrong, try again later");
        }
        toast.success(`Removed commentary from ${profile.username} catalog`, {
          id: tLoading,
        });
        getCommentaryHandler();
      }
    });
  };

  const getCommentaryHandler = useCallback(async () => {
    setIsLoading(true);
    const results = await getUserCatalogCommentary(id);
    if (!results.id) {
      setCommentary(null);
      setIsLoading(false);
      return;
    }
    setCommentary(results);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getCommentaryHandler();
  }, [getCommentaryHandler]);

  return (
    <div className="mt-5">
      {isLoading ? (
        <Loading text="purple" />
      ) : (
        <div className="container">
          <h4>Did you like the {profile.username} catalog? Leave a comment</h4>
          <div className="row">
            <div className="col">
              {commentary === null ? (
                <div className="card shadow">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 d-flex justify-content-center align-items-center flex-column">
                        <i className="fas fa-user fa-6x rounded-circle"></i>
                        <h6 className="fw-bolder mt-2">Me</h6>
                      </div>
                      <div className="col-lg-10">
                        <form onSubmit={handleSubmit}>
                          <textarea
                            className="form-control"
                            placeholder="Your commentary..."
                            rows="5"
                            onChange={(e) => setNewCommentary(e.target.value)}
                            value={newCommentary}
                          ></textarea>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-purple btn-sm mt-2">
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card shadow">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 d-flex justify-content-center align-items-center flex-column">
                        <i className="fas fa-user fa-6x rounded-circle"></i>
                        <h6 className="fw-bolder mt-2">Me</h6>
                      </div>
                      <div className="col-lg-10">
                        <div className="d-flex justify-content-between">
                          <h5>My commentary:</h5>
                          <button
                            onClick={handleRemove}
                            className="btn btn-danger btn-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <p className="card-text">{commentary.commentary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOwnCommentary;
