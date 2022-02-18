import Home from "../pages/User/Home";
import Catalog from "../pages/User/Catalog";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";

const Routes = {
  dev: [
    {
      path: "/home",
      element: <Home />,
    },
  ],

  production: [
    {
      path: "/home",
      element: <IsLoggedIn view={Home} />,
    },
    {
      path: "/me/catalog",
      element: <IsLoggedIn view={Catalog} />,
    },
  ],
};

export default Routes;
