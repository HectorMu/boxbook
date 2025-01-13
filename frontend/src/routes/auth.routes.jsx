import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import IsAlreadyLogged from "../components/Authentication/IsAlreadyLogged";

const Routes = [
  {
    path: "/login",
    element: <IsAlreadyLogged view={Login} />,
  },
  {
    path: "/signup",
    element: <IsAlreadyLogged view={SignUp} />,
  },
];

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

export default Routes;
