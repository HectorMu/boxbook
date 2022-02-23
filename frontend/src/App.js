import Aos from "aos";
import { useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./css/main.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Global/Layout";
import AppRoutes from "./routes/index";
import SessionContextProvider from "./context/SessionContextProvider";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <SessionContextProvider>
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
      </SessionContextProvider>
    </div>
  );
}

export default App;
