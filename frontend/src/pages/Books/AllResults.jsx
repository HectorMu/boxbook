import React from "react";
import { useParams } from "react-router-dom";
import List from "../../containers/Books/AllResults/List";

const AllResults = () => {
  const { title } = useParams();
  return (
    <div className="container py-3">
      <div className="mb-3">
        <div className="d-flex justify-content-center justify-content-lg-end  mb-2"></div>
        <h3>All results for '{title}'</h3>
      </div>
      <List title={title} />
    </div>
  );
};

export default AllResults;
