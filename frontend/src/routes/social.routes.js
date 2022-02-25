import IsLoggedIn from "../components/Authentication/IsLoggedIn";
import People from "../pages/Social/People";
import UserProfile from "../pages/Social/UserProfile";

const Template = {
  dev: [
    {
      path: "/meet",
      element: <People />,
    },
    {
      path: "/user/:id/:username",
      element: <UserProfile />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/meet",
      element: <IsLoggedIn view={People} />,
    },
    {
      path: "/profile/:id/:username",
      element: <IsLoggedIn view={UserProfile} />,
    },
  ],
};

export default Template;
