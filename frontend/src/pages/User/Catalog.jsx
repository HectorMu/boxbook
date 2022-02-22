import React from "react";
import List from "../../containers/User/Books/List";

const Catalog = () => {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold flex-grow">My books</h2>
      </div>
      <List />
    </div>
  );
};

export default Catalog;
