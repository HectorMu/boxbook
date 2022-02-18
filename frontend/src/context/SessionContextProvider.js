import React, { useState } from "react";

export const Session = React.createContext();
function SessionContextProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("BoxBookSession"));
  const [user, setUser] = useState(userData);

  return (
    <Session.Provider value={{ user, setUser }}>{children}</Session.Provider>
  );
}

export default SessionContextProvider;
