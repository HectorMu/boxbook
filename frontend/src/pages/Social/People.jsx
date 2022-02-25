import React from "react";
import List from "../../containers/User/Social/List";

const People = () => {
  return (
    <div className="container py-5 ">
      <h5 className="mb-5">Showing people based on your profile location</h5>
      <List />
    </div>
  );
};

export default People;
