import React, { useState } from "react";

export const SidebarControl = React.createContext();

const SidebarControlProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <SidebarControl.Provider value={{ isActive, setIsActive }}>
      {children}
    </SidebarControl.Provider>
  );
};

export default SidebarControlProvider;
