import React from "react";

const TruncatedText = ({
  text = "Sample text too large to show the example of work",
  minimunLength = 15,
}) => {
  return (
    <p>
      {text.length > minimunLength
        ? text.slice(0, minimunLength) + "..."
        : text}
    </p>
  );
};

export default TruncatedText;
