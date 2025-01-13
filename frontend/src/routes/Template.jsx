import IsLoggedIn from "../components/Authentication/IsLoggedIn";
import Home from "../pages/Home";
import Index from "../pages/Index";
import About from "../pages/About";

const Template = {
  dev: [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/About",
      element: <About />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/",
      element: <IsLoggedIn view={Index} />,
    },
    {
      path: "/dashboard",
      element: <IsLoggedIn view={Home} />,
    },
    {
      path: "/about",
      element: <IsLoggedIn view={About} />,
    },
  ],
};

export default Template;
