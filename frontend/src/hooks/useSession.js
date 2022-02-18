import React, { useContext } from "react";
import { Session } from "../context/SessionContextProvider";

const useSession = () => {
  return useContext(Session);
};

export default useSession;
