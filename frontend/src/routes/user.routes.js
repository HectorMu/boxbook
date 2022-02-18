import Home from "../pages/User/Home";
import Books from "../pages/User/Books";
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
      path: "/books",
      element: <IsLoggedIn view={Books} />,
    },
  ],
};

export default Routes;
