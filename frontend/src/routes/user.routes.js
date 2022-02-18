import Home from "../pages/User/Home";
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
  ],
};

export default Routes;
