import { Navigate } from "react-router-dom";
import React from "react";
import useSession from "../../hooks/useSession";

const IsLoggedIn = ({ view: View }) => {
  const { user } = useSession();
  if (user !== null) return <View />;
  return <Navigate to="/login" replace={true} />;
};

export default IsLoggedIn;
