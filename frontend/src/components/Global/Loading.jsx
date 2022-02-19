import React from "react";
const Loading = ({ small, text = `primary` }) => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className={`spinner-border text-${text} ${
          small ? `spinner-border-sm` : ``
        }`}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
