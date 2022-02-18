import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

const Routes = {
  dev: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ],

  //Protected for production
  //   production: [
  //     {
  //       path: "/",
  //       element: <IsLoggedIn view={Index} />,
  //     },
  //     {
  //       path: "/dashboard",
  //       element: <IsLoggedIn view={Home} />,
  //     },
  //     {
  //       path: "/about",
  //       element: <IsLoggedIn view={About} />,
  //     },
  //   ],
};

export default Routes;
