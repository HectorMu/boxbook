import React from "react";
import Canvas from "../../../components/Global/Canvas";

const Response = () => {
  return (
    <Canvas
      title="Responding message"
      id="canvasResponse"
      buttonClass="btn btn-sm btn-purple"
      buttonText="Response pending"
      icon="fas fa-clock"
    ></Canvas>
  );
};

export default Response;
