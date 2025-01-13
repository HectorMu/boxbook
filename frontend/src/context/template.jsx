import React, { useState } from "react";

export const Template = React.createContext();
function TemplateContextProvider({ children }) {
  const [data, setData] = useState("");

  return (
    <Template.Provider value={{ data, setData }}>{children}</Template.Provider>
  );
}

export default TemplateContextProvider;
