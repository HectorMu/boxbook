import { useContext } from "react";
import { SidebarControl } from "../context/SidebarControlProvider";

const useSidebarControl = () => {
  return useContext(SidebarControl);
};

export default useSidebarControl;
