import Home from "../pages/User/Home";
import Catalog from "../pages/User/Catalog";
import Profile from "../pages/User/Profile";
import IsLoggedIn from "../components/Authentication/IsLoggedIn";
import Friends from "../pages/User/Friends";

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
    {
      path: "/profile",
      element: <IsLoggedIn view={Profile} />,
    },
    {
      path: "/friends",
      element: <IsLoggedIn view={Friends} />,
    },
  ],
};

export default Routes;
