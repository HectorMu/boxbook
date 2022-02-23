import React, { useState } from "react";
import Sidebar from "../Navigation/Sidebar";
import Navbar from "../Navigation/Navbar";

const Layout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Navbar isActive={isActive} setIsActive={setIsActive} />
      <div className="wrapper">
        <Sidebar isActive={isActive} setIsActive={setIsActive} />
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
