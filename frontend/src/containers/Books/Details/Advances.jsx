import React, { useState, useEffect, useCallback } from "react";
import { getBookAdvance, getAdvancesHistory } from "../../../services/books";
import Canvas from "../../../components/Global/Canvas";
import AdvancesList from "../../../components/Books/AdvancesList";
import FloatingLabelInput from "../../../components/Global/FloatingLabelInput";
import AdvanceModel from "../../../Models/Books/AdvanceModel";

const Advances = ({ book, onCatalogBook }) => {
  const [currentAdvance, setCurrentAdvance] = useState({});
  const [advancesHistory, setAdvancesHistory] = useState([]);
  const [newAdvance, setNewAdvance] = useState(AdvanceModel);

  const handleChange = (key, value) =>
    setNewAdvance({ ...newAdvance, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChange("fk_book", onCatalogBook.id);

    console.log(newAdvance);
  };

  const getAdvanceHandler = useCallback(async () => {
    const results = await getBookAdvance(onCatalogBook.id);
    if (results.status) {
      setCurrentAdvance(results.bookAdvance);
    }
  }, [onCatalogBook.id]);

  const getAdvancesHistoryHandler = useCallback(async () => {
    const advances = await getAdvancesHistory(onCatalogBook.id);
    setAdvancesHistory(advances);
  }, [onCatalogBook.id]);

  useEffect(() => {
    getAdvanceHandler();
    getAdvancesHistoryHandler();
  }, [getAdvanceHandler, getAdvancesHistoryHandler]);

  console.log(newAdvance);
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between">
        <div>
          <h3>
            Current advance{" "}
            {Math.round((currentAdvance.pagesReaded * 100) / book.pageCount)}
            <i className="fas fa-percentage text-purple"></i>
          </h3>
        </div>

        <Canvas
          buttonClass="btn btn-purple btn-sm"
          title="Adding new advance"
          id="advancesCanvas"
          buttonText="New advance"
          icon="fas fa-plus"
        >
          <h6 className="mb-3">Current page: {currentAdvance.pagesReaded}</h6>
          <form onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="number"
              inputId="txtPages"
              placeholder="Page number"
              setValue={(e) =>
                handleChange("pagesReaded", parseInt(e.target.value))
              }
              value={newAdvance.pagesReaded}
            />
            <textarea
              placeholder="Commentary"
              rows="5"
              className="form-control"
              onChange={(e) => handleChange("commentary", e.target.value)}
              value={newAdvance.commentary}
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
          <i className="fas fa-book-open text-purple "></i> Read:{" "}
          {currentAdvance.pagesReaded}/{book.pageCount} pages
        </h6>
        <div className="d-flex gap-2">
          <h5>Commentary:</h5> <h5>{currentAdvance.commentary}</h5>
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
                Advance from pages: {advance.pagesReaded}/{book.pageCount}
              </button>
            </p>
            <div className="collapse mb-3" id={`collapseAdvance${advance.id}`}>
              <div className="card card-body">{advance.commentary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advances;
