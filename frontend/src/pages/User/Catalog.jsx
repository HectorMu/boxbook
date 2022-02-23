import React from "react";
import List from "../../containers/User/Books/List";

const Catalog = () => {
  return (
    <div>
      <div className="container py-5 ">
        <h2 className="fw-bold text-center text-lg-start">My books</h2>

        <List />
      </div>
    </div>
  );
};

export default Catalog;
