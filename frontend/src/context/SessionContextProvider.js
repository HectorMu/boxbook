import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export const Session = React.createContext();
function SessionContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const userData = JSON.parse(window.localStorage.getItem("BoxBookSession"));
  const [user, setUser] = useState(userData);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    socket && socket.emit("subscription", JSON.stringify(user));
  }, [socket, user]);

  return (
    <Session.Provider value={{ user, setUser, socket }}>
      {children}
    </Session.Provider>
  );
}

export default SessionContextProvider;
