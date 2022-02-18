import Aos from "aos";
import { useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./css/main.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Global/Layout";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import AppRoutes from "./routes/index";
import SessionContextProvider from "./context/SessionContextProvider";
import SidebarControlProvider from "./context/SidebarControlProvider";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <SessionContextProvider>
        <SidebarControlProvider>
          <Navbar />
          <div className="wrapper">
            <Sidebar />
            <Layout>
              <Routes>
                {AppRoutes.production.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Layout>
            <Toaster />
          </div>
        </SidebarControlProvider>
      </SessionContextProvider>
    </div>
  );
}

export default App;
